"""
Common utility functions for OHIS backend.
Standardized helpers for validation, string sanitization, and date formatting.
"""
import re


def validate_iranian_national_code(code: str) -> bool:
    """
    Validates Iranian 10-digit National ID (کد ملی) using check-digit checksum algorithm.
    """
    if not code or not re.match(r'^\d{10}$', code):
        return False

    # Filter out repeated digits like 0000000000 or 1111111111
    if len(set(code)) == 1:
        return False

    check = int(code[9])
    s = sum(int(code[x]) * (10 - x) for x in range(9)) % 11
    return (s < 2 and check == s) or (s >= 2 and check + s == 11)


def sanitize_input_text(text: str) -> str:
    """
    Strips leading/trailing whitespaces and normalizes Persian Arabic characters.
    """
    if not text:
        return ""
    text = text.strip()
    # Normalize Arabic Yeh/Kaf to Persian
    text = text.replace('ي', 'ی').replace('ك', 'ک')
    return text
