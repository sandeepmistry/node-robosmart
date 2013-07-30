var async = require('async');

var RoboSmart = require('./index');

RoboSmart.discover(function(roboSmart) {
  async.series([
    function(callback) {
      console.log('connect');
      roboSmart.connect(callback);
    },
    function(callback) {
      console.log('discoverServicesAndCharacteristics');
      roboSmart.discoverServicesAndCharacteristics(callback);
    },
    function(callback) {
      roboSmart.isOn(function(on) {
        console.log('on = ' + on);
        callback();
      });
    },
    function(callback) {
      console.log('off');
      roboSmart.switchOff(callback);
    },
    function(callback) {
      setTimeout(callback, 1000);
    },
    function(callback) {
      console.log('on');
      roboSmart.switchOn(callback);
    },
    function(callback) {
      roboSmart.getDim(function(dim) {
        console.log('dim = ' + dim);
        callback();
      });
    },
    function(callback) {
      console.log('dim');
      roboSmart.setDim(127, callback);
    },
    function(callback) {
      roboSmart.getPowerConsumed(function(powerConsumed) {
        console.log('power consumed = ' + powerConsumed + ' watts per hour');
        callback();
      });
    },
    function(callback) {
      roboSmart.getLightName(function(lightName) {
        console.log('light name = ' + lightName);
        callback();
      });
    },
    function(callback) {
      console.log('set light name');
      roboSmart.setLightName('Soffit 3', callback);
    },
    function(callback) {
      roboSmart.getGroupName(function(groupName) {
        console.log('group name = ' + groupName);
        callback();
      });
    },
    function(callback) {
      console.log('set group name');
      roboSmart.setGroupName('Soffit', callback);
    },
    function(callback) {
      roboSmart.getRoomName(function(roomName) {
        console.log('room name = ' + roomName);
        callback();
      });
    },
    function(callback) {
      console.log('set room name');
      roboSmart.setRoomName('Living Room', callback);
    },
    // function(callback) {
    //   console.log('remote disconnect');
    //   roboSmart.remoteDisconnect(callback);
    // }
    function(callback) {
      console.log('disconnect');
      roboSmart.disconnect(callback);
    }
  ],
  function() {
    process.exit(0);
  });
});
