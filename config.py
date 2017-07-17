"""Defines configuration classes."""


class Config:
    """Base configuration class."""
    pass


class DevConfig(Config):
    """Configurations for development."""
    DEBUG = True


class ProdConfig(Config):
    """Configurations for production."""
    pass


# Maps configuration names to their corresponding config class.
config_lookup = {
    'development': DevConfig,
    'production': ProdConfig,
}
