from .base import *

DATABASES["default"]["OPTIONS"]["pool"] = {
    "min_size": 2,
    "max_size": 10,
    "timeout": 10,
    "max_lifetime": 1800,
    "max_idle": 300,
}
