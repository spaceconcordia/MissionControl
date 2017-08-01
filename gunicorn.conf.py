"""
Gunicorn configuration file.
"""
import os

PORT = os.environ.get('PORT', default=5000)
LOG_LEVEL = os.environ.get('APP_LOGGING', default='info')

bind = ['0.0.0.0:{port}'.format(port=PORT)]
loglevel = LOG_LEVEL
workers = 4
worker_class = 'flask_sockets.worker'
proc_name = 'MissionControl'
