"""Gunicorn configuration file."""

bind = ['0.0.0.0:5000']
workers = 2
worker_class = 'geventwebsocket.gunicorn.workers.GeventWebSocketWorker'
proc_name = 'mission-control'
