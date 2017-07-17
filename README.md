# Mission Control
Mission control software for Aleksandr, Space Concordia's CubeSat project, based
on NASA's Open MCT. This README is intended for project developers.

## Installation
1. In the project directory, execute workon MC to activate the MissionControl
virtual environment.
1. Install the required Python modules with `pip3 install -r requirements.txt`.
1. Install the required JavaScript libraries with `yarn`.

To run the server, execute the command `gunicorn server:app`. 
