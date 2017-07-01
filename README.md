# MissionControl
Mission control software for Aleksandr, Space Concordia's CubeSat project, based
on NASA's Open MCT. This README is intended for project developers.

## Installation
1. In the project directory, execute `workon MC` to activate the MissionControl
   virtual environment.
1. Install the required Python modules with `pip install -r requirements.txt`.
1. Install the required JavaScript libraries with `yarn install
--modules-folder MissionControl/static/js/node_modules`.

To run the server, execute the command `python app.py runserver` while in the
virtual environment. This will launch the server in 'dev' mode. Pass a
`-c,--config` option to change to 'test' or 'prod' mode. `python app.py` simply
displays a help page.

If you are developing with the [Space Concordia Vagrant environment](
https://github.com/spaceconcordia/vagrant) then you should run `python app.py
runserver -h 0.0.0.0` to access the localhost
from the host machine.
