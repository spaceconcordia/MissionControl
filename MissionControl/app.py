"""Defines a factory function for creating Flask objects."""
from flask import Flask, render_template
from config import config
from .exceptions import ConfigError


def create_app(config_name):
    """Factory pattern for creating and configuring a Flask object based on the
    provided configuration name.
    """
    app = Flask('MissionControl')
    try:
        app.config.from_object(config[config_name])
    except KeyError as e:
        raise ConfigError('Invalid configuration name: ' + str(e))

    @app.route('/')
    def index():
        """Renders index.html."""
        return render_template('index.html')

    @app.route('/scripts/main.js')
    def main():
        """Renders scripts/main.js, which initializes and runs the Open MCT
        application.
        """
        return render_template('scripts/main.js')

    return app
