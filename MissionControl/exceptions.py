"""Defines custom exception classes for the app."""


class ConfigError(LookupError):
    """Raise when incorrect configuration mode is set."""
    pass
