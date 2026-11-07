#!/usr/bin/env python3
"""
Unit tests for OHIS Secret Scanner.
Provides standalone test automation with positive and negative test assertions.
"""
import sys
from secret_scanner import run_self_test, scan_content


def test_positive_private_key():
    dummy_key = "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA0...\n-----END RSA PRIVATE KEY-----"
    findings = scan_content(dummy_key, "cert_test.pem")
    assert any(f["pattern"] == "PRIVATE_KEY" for f in findings), "Failed to detect RSA Private Key"
    # Ensure raw secret is not leaked in masked output
    assert "MIIEow" not in findings[0]["masked"], "Raw key data leaked in masked output!"
    print("PASS: test_positive_private_key passed.")


def test_positive_github_pat():
    dummy_pat = "github_pat_" + "11ABCDEF" * 6 + "_SECRETKEY"
    findings = scan_content(f"TOKEN = '{dummy_pat}'", "settings_test.py")
    assert any(f["pattern"] == "GITHUB_PAT" for f in findings), "Failed to detect GitHub PAT"
    assert "11ABCDEF" not in findings[0]["masked"], "Raw PAT leaked in masked output!"
    print("PASS: test_positive_github_pat passed.")


def test_negative_safe_code():
    safe_code = """
    class DatabaseConfig:
        HOST = 'postgres'
        PORT = 5432
        ENGINE = 'django.db.backends.postgresql'
    """
    findings = scan_content(safe_code, "safe_module.py")
    assert len(findings) == 0, f"Expected 0 findings, got {findings}"
    print("PASS: test_negative_safe_code passed.")


if __name__ == "__main__":
    try:
        assert run_self_test() is True
        test_positive_private_key()
        test_positive_github_pat()
        test_negative_safe_code()
        print("\nAll Secret Scanner Unit Tests PASSED.")
        sys.exit(0)
    except AssertionError as e:
        print(f"\nTEST ASSERTION FAILED: {e}")
        sys.exit(1)
