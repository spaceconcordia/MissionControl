"""Defines a Manager object for the create_app factory function."""
from flask_script import Manager
from MissionControl.app import create_app

manager = Manager(create_app)
manager.add_option('-c', '--config', dest='config_name',
                   choices=['dev', 'test', 'prod'], default='dev',
                   help='sets configuration type')
