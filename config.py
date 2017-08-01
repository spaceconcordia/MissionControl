"""
Defines configuration classes for Flask server.
"""
import os


class Config:
    """
    Base configuration class.
    """
    BROADCAST_PATH = os.environ.get('BROADCAST_PATH')


class DevConfig(Config):
    """
    Configurations for development.
    """
    LOGGING = 'DEBUG'
    DEBUG = True


class ProdConfig(Config):
    """
    Configurations for production.
    """
    LOGGING = 'INFO'


# Maps configuration names to their corresponding config class.
config_lookup = {
    'development': DevConfig,
    'production': ProdConfig,
}
