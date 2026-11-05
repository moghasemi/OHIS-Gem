"""
Testing settings for OHIS automated tests and CI integration.
Configured for live PostgreSQL and Redis integration testing.
"""
import os
from .base import *

DEBUG = False

SECRET_KEY = os.environ.get('SECRET_KEY', 'ohis-testing-secret-key-ci-only-not-for-production')

ALLOWED_HOSTS = ['*']

# Ensure live PostgreSQL configuration for integration testing
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'ohis_test_db'),
        'USER': os.environ.get('DB_USER', 'test_user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'test_password_secure_123'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Faster password hashing for test suites
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

# In-memory email backend for testing
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
