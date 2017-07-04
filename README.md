# MissionControl
Mission control software for Aleksandr, Space Concordia's CubeSat project, based
on NASA's Open MCT. This README is intended for project developers.

## Install
1. In the project directory, execute `workon MC` to activate the MissionControl
   virtual environment.
1. Install the required Python modules with `pip3 install -r requirements.txt`.
1. Install the required JavaScript libraries with `yarn install
--modules-folder MissionControl/static/js/node_modules --no-bin-links`.

## Launch
The server can be launched in developer mode with the command `python3 app.py
runserver` and accessed via `localhost:5000`. To modify the default
default mode and configuration, use.
```angular2html
python3 [-c {dev,prod,test}] runserver [OPTIONS]
```
`python3 runserver -?` displays a complete list of supported options.
