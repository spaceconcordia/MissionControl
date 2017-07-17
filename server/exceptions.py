"""Defines custom exception classes for the application."""


class ConfigError(LookupError):
    """Raise when invalid configuration mode is set."""
    pass
