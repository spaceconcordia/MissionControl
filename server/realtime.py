"""
Defines a blueprint for delivering real time telemetry data over a WebSocket
connection.
"""
import logging
import json
import socket
from flask import Blueprint, current_app as app, jsonify
from geventwebsocket.websocket import WebSocket

__all__ = ['realtime']

logger = logging.getLogger(__name__)
realtime = Blueprint(name='realtime', import_name='server')


def separate(data: dict):
    """
    Yield a telemetry datum.
    """
    # Incoming timestamp is in seconds.
    timestamp = int(data['timestamp'] * 1000)
    for key, value in data.items():
        if key == 'timestamp':
            continue
        yield {
            'value': value,
            'timestamp': timestamp,
            'id': 'telem.{}'.format(key),
        }


@realtime.route('')
def subscribe(ws: WebSocket):
    """
    Connect to the broadcast server and subscribe to telemetry data, which is
    sent down the WebSocket whenever it is received.
    """
    sock = socket.socket(socket.AF_UNIX)
    server_address = app.config['BROADCAST_PATH']

    try:
        sock.connect(server_address)
    except socket.error as e:
        logging.error('Could not connect to broadcast server.', exc_info=e)
        ws.close()
        return

    sock_file = sock.makefile(mode='r')
    while True:
        data = sock_file.readline()
        if not ws.closed:
            logging.debug(data.strip())
            for datum in separate(json.loads(data)):
                ws.send(json.dumps(datum))
