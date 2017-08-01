"""
Configuration from environment variables.
"""
import os

cfg = {
    'BROADCAST_PATH': os.environ.get('BROADCAST_PATH'),
    'LOG_LEVEL': os.environ.get('APP_LOGGING', 'WARNING')
}
