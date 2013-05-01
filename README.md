node-robosmart
==============

A node.js library for the [RoboSmart](http://www.smarthome-labscom/#!about1/c218d) by [Smart Home Labs](http://www.smarthome-labs.com).

Special thanks to [@mrose17](https://github.com/mrose17) for sending me a bulb!

Install
-------

npm install robosmart

Usage
-----

    var RoboSmart = require('robosmart');

__Discover__

    RoboSmart.discover(callback(sensorTag));

__Connect__

    roboSmart.connect(callback);

__Disconnect__

    roboSmart.disconnect(callback);

__isOn__

    roboSmart.isOn(callback(on));

__switchOn__

    roboSmart.switchOn(callback);
    
__switchOff__

    roboSmart.switchOff(callback);

__getDim__

    roboSmart.getDim(callback(dim));

__setDim__

    roboSmart.setDim(dim, callback); // dim: 0 - 255

__getPowerConsumed__

    roboSmart.getPowerConsumed(callback(powerConsumed)); // watts per hour

__getLightName__

    roboSmart.getLightName(callback(lightName));

__setLightName__

    roboSmart.setLightName(lightName, callback(lightName)); // lightName is string

__getGroupName__

    roboSmart.getGroupName(callback(groupName));

__setGroupName__

    roboSmart.setGroupName(groupName, callback(groupName)); // groupName is string


__getRoomName__

    roboSmart.getRoomName(callback(roomName));

__setRoomName__

    roboSmart.setRoomName(roomName, callback(roomName)); // roomName is string
