"""Defines a factory function for producing Flask objects."""
from flask import Flask, render_template
from config import config

# Path to Open MCT distribution directory relative to 'static'.
OPENMCT_DIR = 'node_modules/openmct/dist/'


def create_app(config_name):
    """Factory pattern for creating and configuring a Flask object based on the
    provided configuration name.
    """
    app = Flask('MissionControl')
    try:
        app.config.from_object(config[config_name])
    except KeyError as e:
        raise ValueError('Invalid configuration name: ' + str(e))

    @app.route('/')
    def main():
        """Renders main.html, the entry point to the Open MCT application."""
        return render_template('main.html', openmct_dir=OPENMCT_DIR)

    return app
