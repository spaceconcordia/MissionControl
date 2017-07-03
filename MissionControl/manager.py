"""Creates a Manager object to configure and run the application based on
command line options."""
from flask_script import Command, Manager
from gunicorn.app.base import Application
import functools
import sys
from config import config_lookup
from .appconfig import create_app
from .exceptions import ConfigError

__all__ = ['manager']


class GunicornServer(Application):
    def __init__(self, app, usage=None, prog=None):
        super().__init__(usage, prog)
        self.app = app

    def init(self, parser, opts, args):
        pass  # TODO

    def load(self):
        return self.app


class GunicornCommand(Command):
    """Command to run the app with the Gunicorn server."""
    help = description = 'Runs the application with the Gunicorn server.'

    def get_options(self):
        options = ()
        return options

    def __call__(self, app=None, *args, **kwargs):
        gs = GunicornServer(app)
        gs.run()


def log_configerror(func):
    """Decorator to log a ConfigError exception and exit with error."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            func(*args, **kwargs)
        except ConfigError as e:
            print('ERROR: invalid config name {}'.format(e), file=sys.stderr)
            sys.exit(1)

    return wrapper


manager = Manager(create_app)
manager.add_command('runserver', GunicornCommand())
manager.add_option('-c', '--config', dest='config_name',
                   choices=sorted(config_lookup.keys()), default='dev',
                   help="sets configuration type. defaults to 'dev'.")

manager.run = log_configerror(manager.run)
