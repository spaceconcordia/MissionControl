"""
Defines a factory function for creating Flask objects based on configuration
details.
"""
from flask import Flask
from flask_sockets import Sockets
import logging
from config import config_lookup
from server.exceptions import ConfigError
from server.realtime import realtime


def create_app(config_name):
    """
    Factory function for creating and configuring a Flask object based on the
    provided configuration name. Raise a ConfigError exception if invalid
    configuration name specified.
    """
    app = Flask('server', static_url_path='', static_folder='../webapp')
    try:
        app.config.from_object(config_lookup[config_name])
    except KeyError as e:
        raise ConfigError(e)

    logging.basicConfig(level=app.config['LOGGING'])

    @app.route(app.static_url_path or '/')
    def index():
        return app.send_static_file('index.html')

    sockets = Sockets(app)
    sockets.register_blueprint(realtime, url_prefix='/api/telemetry')

    return app
