"""Creates a Manager object to configure and run the application based on
command line options."""
from flask_script import Command, Manager
from gunicorn.app.base import Application
from config import config
from .appconfig import create_app

__all__ = ['manager']


class GunicornServer(Application):
    def __init__(self, app, usage=None, prog=None):
        super().__init__(usage, prog)
        self.app = app

    def init(self, parser, opts, args):
        pass   # TODO

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


manager = Manager(create_app)
manager.add_option('-c', '--config', dest='config_name',
                   choices=sorted(config.keys()),
                   help="sets configuration type. defaults to 'dev'.")
manager.add_command('runserver', GunicornCommand())
