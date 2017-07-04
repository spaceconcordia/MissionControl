"""Contains configuration classes for MissionControl."""


class Config:
    """Base configuration class."""
    pass


class DevConfig(Config):
    """Configurations for development."""
    DEBUG = True


class TestConfig(Config):
    """Configurations for testing."""
    TESTING = True


class ProdConfig(Config):
    """Configurations for production."""
    pass


# Maps configuration names to their corresponding config class.
config_lookup = {
    'dev': DevConfig,
    'test': TestConfig,
    'prod': ProdConfig,
}
