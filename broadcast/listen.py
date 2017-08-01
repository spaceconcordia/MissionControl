"""
Listener for incoming telemetry data. Presently this is mocked by reading from
a data file.
"""
import asyncio
from collections.abc import AsyncIterator
import csv
from datetime import date, datetime, time
from itertools import chain

__all__ = ['MockTelemListener']


def format_row(csv_row: dict):
    """
    Perform type conversion on the values in the row.
    """
    for key in csv_row:
        if key in ('bearing', 'speed', 'altitude', 'pressure'):
            csv_row[key] = int(csv_row[key])
        elif key in ('latitude', 'longitude', 'temperature'):
            csv_row[key] = float(csv_row[key])
    return csv_row


def timestamp(csv_row: dict):
    """
    Return the timestamp from the row in seconds.
    """
    # TODO timezone?
    month, day, year = map(int, csv_row['date'].split('/'))
    hour, minute, second = map(int, csv_row['time'].split(':'))
    d, t = date(year, month, day), time(hour, minute, second, microsecond=0)
    dt = datetime.combine(d, t)
    return dt.timestamp()


def values(csv_row: dict, timestamp=None):
    """
    Return a dictionary of the telemetry values from the row. If timestamp is
    None, add current timestamp in seconds.
    """
    if timestamp is None:
        timestamp = datetime.now().timestamp()

    def valid_key(key):
        return key not in ('date', 'time')

    return dict(((k, v) for k, v in csv_row.items() if valid_key(k)),
                timestamp=timestamp)


def pairwise(iterable):
    """
    Return an iterator of paired items, overlapping, from the original.
    """
    it = iter(iterable)
    a = next(it)
    for b in it:
        yield a, b
        a = b


class MockTelemListener(AsyncIterator):
    """
    Asynchronous iterator over the values in a CSV file.
    # TODO make asynchronous context manager.
    """
    SPEED_UP = 10

    def __init__(self, filename):
        self.file = open(filename, mode='r', newline='')
        self.reader = csv.DictReader(self.file)
        self.rows = map(format_row, self.reader)
        # Iterate over rows in pairs to calculate time differences, prepending
        # rows with None so first row can be detected.
        self.row_pairs = pairwise(chain((None,), self.rows))

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        return self.file.__exit__(exc_type, exc_val, exc_tb)

    def __aiter__(self):
        return self

    async def __anext__(self):
        try:
            prev, curr = next(self.row_pairs)
        except StopIteration:
            raise StopAsyncIteration

        delay = (timestamp(curr) - timestamp(prev)) / self.SPEED_UP \
            if prev else 0
        data = values(curr)
        await asyncio.sleep(delay)
        return data
