"""Defines a factory function for creating Flask objects."""
from flask import Flask, render_template, url_for
from config import config


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
    def index():
        """Renders index.html."""
        return render_template('index.html')

    @app.route('/scripts/main.js')
    def main():
        """Renders scripts/main.js, which initializes and runs the Open MCT
        application.
        """
        requirejs_config = {
            'baseUrl': url_for('static', filename='js'),
            'paths': {
                'openmct': '../node_modules/openmct/dist',
                'plugins': 'plugins',
            }
        }
        return render_template('scripts/main.js',
                               requirejs_config=requirejs_config)

    return app
