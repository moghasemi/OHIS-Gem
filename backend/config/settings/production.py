"""
Production settings for OHIS live deployment.
Strict security by design, no default secrets, SSL/HSTS enforcement.
"""
import os
from django.core.exceptions import ImproperlyConfigured
from .base import *

DEBUG = False

SECRET_KEY = os.environ.get('SECRET_KEY')
if not SECRET_KEY:
    raise ImproperlyConfigured("The SECRET_KEY setting must not be empty in production.")

ALLOWED_HOSTS = [h.strip() for h in os.environ.get('ALLOWED_HOSTS', '').split(',') if h.strip()]
if not ALLOWED_HOSTS:
    raise ImproperlyConfigured("ALLOWED_HOSTS must not be empty in production.")

# Production database credentials verification
if not DATABASES['default']['NAME'] or not DATABASES['default']['USER'] or not DATABASES['default']['PASSWORD']:
    raise ImproperlyConfigured("Database credentials (DB_NAME, DB_USER, DB_PASSWORD) must be provided in production.")

# Production Security & SSL
SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT', '0') == '1'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
