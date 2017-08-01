"""
Initializes the Flask app based on environment variables.
"""
import os
import sys
from server.appconfig import create_app
from server.exceptions import ConfigError

try:
    config_name = os.environ.get('APP_CONFIG', default='development')
    app = create_app(config_name)
except ConfigError as e:
    print('ERROR: invalid config name {}'.format(e), file=sys.stderr)
    sys.exit(1)
