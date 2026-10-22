from .base import *

MAILERS = {
    "default": {
        "BACKEND": "django.core.mail.backends.smtp.EmailBackend",
        "OPTIONS": {
            "host": "localhost",
            "port": 1025,
        },
    },
}
