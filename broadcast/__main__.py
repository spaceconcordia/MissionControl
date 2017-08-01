"""
Listens for incoming telemetry data and broadcasts it over a Unix domain socket
connection.
"""
import asyncio
import json
import logging
from broadcast.broadcast import Broadcaster, SubscriptionProtocol
from broadcast.config import cfg
from broadcast.listen import MockTelemListener

logging.basicConfig(level=cfg['LOG_LEVEL'])
logger = logging.getLogger(__name__)


async def broadcast(broadcaster):
    with MockTelemListener('broadcast/mock_data.csv') as listener:
        async for data in listener:
            logger.debug('Telemetry received.')
            await broadcaster.broadcast(json.dumps(data) + '\n')


broadcaster = Broadcaster()
loop = asyncio.get_event_loop()

logger.info('Starting broadcast server on %s.', cfg['BROADCAST_PATH'])
coro = loop.create_unix_server(lambda: SubscriptionProtocol(broadcaster),
                               path=cfg['BROADCAST_PATH'])
server = loop.run_until_complete(coro)
logger.info('Starting broadcast service.')
broadcast_service = asyncio.ensure_future(broadcast(broadcaster), loop=loop)

logger.info('Starting event loop.')
try:
    loop.run_forever()
finally:
    logger.info('Stopping broadcast service.')
    broadcast_service.cancel()
    logger.info('Closing server.')
    server.close()
    loop.run_until_complete(server.wait_closed())
    logger.info('Closing event loop.')
    loop.close()
    logging.shutdown()
