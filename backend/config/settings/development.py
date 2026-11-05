"""
Development settings for OHIS local development.
DEBUG enabled, dev secret fallback, permissive CORS.
"""
import os
from .base import *

DEBUG = True

SECRET_KEY = os.environ.get('SECRET_KEY', 'ohis-dev-insecure-secret-key-local-only-2026')

ALLOWED_HOSTS = ['*']

CORS_ALLOW_ALL_ORIGINS = True

# Development database fallback
DATABASES['default']['NAME'] = os.environ.get('DB_NAME', 'ohis_db')
DATABASES['default']['USER'] = os.environ.get('DB_USER', 'ohis_admin')
DATABASES['default']['PASSWORD'] = os.environ.get('DB_PASSWORD', 'dev_password_local')
DATABASES['default']['HOST'] = os.environ.get('DB_HOST', 'localhost')
DATABASES['default']['PORT'] = os.environ.get('DB_PORT', '5432')
