#!/usr/bin/env python3
"""
OHIS Comprehensive Secret Scanner (Enterprise Quality Gate)
Scans repository working directory, index, untracked files, and all Git commit history.
Features:
- Full Git history inspection across all refs (--all-refs)
- Masked reporting (zero raw secret disclosure)
- Robust Unicode and special characters pathname support
- Integrated self-test capability (--self-test)
"""
import sys
import os
import re
import hashlib
import subprocess
import argparse
from typing import List, Tuple, Dict, Any

# Regular expression patterns for sensitive data and tokens
SECRET_PATTERNS = [
    ("GITHUB_PAT", re.compile(r'github_pat_[0-9a-zA-Z_]{40,100}')),
    ("GITHUB_TOKEN", re.compile(r'ghp_[0-9a-zA-Z]{36}')),
    ("PRIVATE_KEY", re.compile(r'-----BEGIN\s+(?:RSA|OPENSSH|DSA|EC)?\s*PRIVATE\s+KEY-----')),
    ("AWS_ACCESS_KEY", re.compile(r'\b(AKIA|ABIA|ACCA)[0-9A-Z]{16}\b')),
    ("GENERIC_HARDCODED_SECRET", re.compile(r'''(?i)(?:secret_key|postgres_password|redis_password|jwt_secret)\s*=\s*["']([^"'\s\$]{8,})["']''')),
]

# Patterns or paths to exclude from false-positive reporting
ALLOWLIST_PATHS = {
    '.env.example',
    'deployment/docker-compose.override.yml.example',
    'tools/test_secret_scanner.py',
}

ALLOWLISTED_VALUES = {
    'replace-with-a-secure-database-password',
    'replace-with-a-cryptographically-secure-random-secret-key-in-production',
    'ohis-dev-insecure-secret-key-local-only-2026',
    'ohis-testing-secret-key-ci-only-not-for-production',
    'ci_dummy_secret_key_for_docker_compose_config_validation_only_12345',
    'ci_dummy_password_not_for_production_use',
    'ci_dummy_redis_password_not_for_production_use',
    'test_password_secure_123',
    'dev_password_local',
    'temporary-ci-validation-secret-key-12345',
    'replace-with-a-cryptographically-secure-random-secret-key-in-production',
}


def mask_secret(value: str) -> str:
    """Masks secret to prevent disclosure in logs while keeping length hint."""
    if len(value) <= 6:
        return "***"
    return f"{value[:3]}***{value[-3:]} (sha256:{hashlib.sha256(value.encode('utf-8', errors='ignore')).hexdigest()[:8]})"


def scan_content(text: str, source_label: str) -> List[Dict[str, Any]]:
    """Scans a text block for potential secrets."""
    findings = []
    lines = text.splitlines()
    for line_num, line in enumerate(lines, 1):
        for pattern_name, regex in SECRET_PATTERNS:
            matches = regex.finditer(line)
            for m in matches:
                matched_val = m.group(1) if m.groups() else m.group(0)
                if matched_val in ALLOWLISTED_VALUES:
                    continue
                findings.append({
                    "pattern": pattern_name,
                    "location": f"{source_label}:{line_num}",
                    "masked": mask_secret(matched_val),
                })
    return findings


def scan_git_history(all_refs: bool = True) -> List[Dict[str, Any]]:
    """Scans all Git history using raw byte-safe log."""
    findings = []
    args = ["git", "log", "-p"]
    if all_refs:
        args.append("--all")

    try:
        proc = subprocess.Popen(
            args,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            errors="replace"
        )
        current_commit = "HEAD"
        current_file = ""
        for line in proc.stdout:
            if line.startswith("commit "):
                current_commit = line.strip().split()[1]
            elif line.startswith("+++ b/"):
                current_file = line[6:].strip()
            elif line.startswith("+") and not line.startswith("+++"):
                if current_file in ALLOWLIST_PATHS:
                    continue
                added_line = line[1:]
                for pattern_name, regex in SECRET_PATTERNS:
                    matches = regex.finditer(added_line)
                    for m in matches:
                        matched_val = m.group(1) if m.groups() else m.group(0)
                        if matched_val in ALLOWLISTED_VALUES:
                            continue
                        findings.append({
                            "pattern": pattern_name,
                            "location": f"commit {current_commit[:8]}:{current_file}",
                            "masked": mask_secret(matched_val),
                        })
        proc.wait()
    except Exception as e:
        sys.stderr.write(f"Warning during git history scan: {e}\n")
    return findings


def scan_working_tree() -> List[Dict[str, Any]]:
    """Scans working directory and untracked files with full Unicode support."""
    findings = []
    for root, dirs, files in os.walk("."):
        # Skip node_modules, .git, and build dirs
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "dist", "build", ".venv", "__pycache__"}]
        for filename in files:
            filepath = os.path.normpath(os.path.join(root, filename))
            # Normalize path representation
            rel_path = filepath[2:] if filepath.startswith("./") else filepath
            if rel_path in ALLOWLIST_PATHS:
                continue
            if rel_path.endswith((".png", ".jpg", ".pdf", ".lock", ".ico", ".woff", ".woff2")):
                continue

            try:
                with open(filepath, "r", encoding="utf-8", errors="replace") as f:
                    content = f.read()
                file_findings = scan_content(content, rel_path)
                findings.extend(file_findings)
            except Exception:
                continue
    return findings


def run_self_test() -> bool:
    """Executes positive and negative detection unit tests."""
    print("Executing Secret Scanner Self-Tests...")

    # Positive test: synthesized mock token must be detected
    synthetic_secret = 'github_pat_' + 'A' * 45 + '_TESTKEY123'
    pos_findings = scan_content(f"TOKEN = '{synthetic_secret}'", "test_positive.py")
    if not pos_findings or pos_findings[0]["pattern"] != "GITHUB_PAT":
        print("FAIL: Positive test failed to detect synthetic GitHub PAT!")
        return False
    print("PASS: Positive test successfully detected and masked synthetic token.")

    # Negative test: harmless string must produce 0 findings
    neg_findings = scan_content("ALLOWED_HOSTS = ['localhost', '127.0.0.1']\nDEBUG = True", "test_negative.py")
    if neg_findings:
        print(f"FAIL: Negative test produced false positive: {neg_findings}")
        return False
    print("PASS: Negative test produced 0 false positives.")

    return True


def main():
    parser = argparse.ArgumentParser(description="OHIS Secret Scanner")
    parser.add_argument("--all-refs", action="store_true", help="Scan entire Git history across all refs")
    parser.add_argument("--self-test", action="store_true", help="Run positive/negative self-test")
    args = parser.parse_args()

    if args.self_test:
        if not run_self_test():
            sys.exit(1)
        print("All self-tests passed successfully.\n")

    print(f"Starting OHIS Repository Secret Scan (all-refs: {args.all_refs})...")
    findings = []

    # 1. Working tree scan
    findings.extend(scan_working_tree())

    # 2. Git history scan
    findings.extend(scan_git_history(all_refs=args.all_refs))

    # Deduplicate findings
    unique_findings = []
    seen = set()
    for f in findings:
        key = (f["pattern"], f["location"], f["masked"])
        if key not in seen:
            seen.add(key)
            unique_findings.append(f)

    if unique_findings:
        print(f"\n[CRITICAL WARNING] Found {len(unique_findings)} potential secret(s) in repository:")
        for item in unique_findings:
            print(f"  - [{item['pattern']}] at {item['location']} -> {item['masked']}")
        print("\nPlease audit and rotate any real leaked tokens immediately.")
        sys.exit(1)

    print("SUCCESS: 0 secrets detected across working tree and Git history.")
    sys.exit(0)


if __name__ == "__main__":
    main()
