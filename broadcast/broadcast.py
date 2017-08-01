"""
Defines the server-side subscription protocol and a broadcaster class to
maintain a collection of subscribers.
"""
import asyncio
import logging

logger = logging.getLogger(__name__)


class SubscriptionProtocol(asyncio.Protocol):
    """
    An instance of this class is created whenever a client connects to the
    broadcast server. The protocol registers the client to the collection of
    subscribers, and can be prompted to notify the client whenever a message is
    ready.
    """
    TIMEOUT = 100

    def __init__(self, broadcaster, loop=None):
        self.broadcaster = broadcaster
        self.client_sock = None
        self.loop = loop
        self.message_queue = asyncio.Queue(loop=self.loop)
        self.transport = None

    def connection_made(self, transport):
        self.client_sock = transport.get_extra_info('socket')
        logger.debug('Connection made: fd=%d.', self.client_sock.fileno())
        self.transport = transport
        self.broadcaster.subscribe(self)
        asyncio.ensure_future(self.send_messages(), loop=self.loop)

    def data_received(self, data):
        # Ignore client data.
        pass

    def eof_received(self):
        # Ignore client data.
        pass

    def connection_lost(self, exc):
        logger.error('Connection lost: fd=%d.', self.client_sock.fileno(),
                     exc_info=exc)
        self.broadcaster.unsubscribe(self)
        self.transport.close()

    async def notify(self, message):
        await self.message_queue.put(message)
        logger.debug('Protocol notified: fd=%d.', self.client_sock.fileno())

    async def send_messages(self):
        while not self.transport.is_closing():
            try:
                message = await asyncio.wait_for(self.message_queue.get(),
                                                 timeout=self.TIMEOUT)
                self.transport.write(message.encode('utf-8'))
                logger.debug('Message sent: fd=%d.', self.client_sock.fileno())
            except TimeoutError:
                pass


class Broadcaster:
    """
    Maintains a collection of subscribers, who can be notified when a message is
    ready.
    """

    def __init__(self, loop=None):
        self.subscribers = set()
        self.loop = loop

    def subscribe(self, subscriber):
        self.subscribers.add(subscriber)

    def unsubscribe(self, subscriber):
        self.subscribers.discard(subscriber)

    async def broadcast(self, message):
        coros = [sub.notify(message) for sub in self.subscribers if sub]
        if coros:
            logger.debug('Broadcasting.')
            await asyncio.wait(coros, loop=self.loop)
