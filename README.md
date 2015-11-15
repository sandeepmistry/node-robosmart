node-robosmart
==============

[![Analytics](https://ga-beacon.appspot.com/UA-56089547-1/sandeepmistry/node-robosmart?pixel)](https://github.com/igrigorik/ga-beacon)

A Node.js library for the [RoboSmart](http://www.smarthome-labscom/#!about1/c218d) by [Smart Home Labs](http://www.smarthome-labs.com).

Special thanks to [@mrose17](https://github.com/mrose17) for sending me a bulb!

Install
-------

npm install robosmart

Usage
-----

    var RoboSmart = require('robosmart');

__Discover__

    RoboSmart.discover(callback(roboSmart)); // Discovers first bulb to respond

__Discover Multiple__

    RoboSmart.discoverAll(timeout, callback(devices)); // Returns array of devices discovered within timeout (2000ms seems adequate)

__Connect__

    roboSmart.connect(callback);

__Disconnect__

    roboSmart.disconnect(callback);

__Discover Services and Characteristics__

**Must** be called after connecting, for other API's to work.

    roboSmart.discoverServicesAndCharacteristics(callback);

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
