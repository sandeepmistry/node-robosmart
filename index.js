var events = require('events');
var util = require('util');

var noble = require('noble');

var PUBLIC_SERVICE_UUID = 'ff10';

var LIGHT_SWITCH_UUID   = 'ff11';
var DIMMER_SETTING_UUID = 'ff12';
var POWER_CONSUME_UUID  = 'ff16';
var LIGHT_NAME_PUB_UUID = 'ff17';
var GROUP_NAME_PUB_UUID = 'ff18';
var ROOM_NAME_PUB_UUID  = 'ff19';
var DISCONNECT_UUID     = 'ff1a';

function Robosmart(peripheral) {
  this._peripheral = peripheral;

  this._publicService = null;
  this._characteristics = {};
}

util.inherits(Robosmart, events.EventEmitter);

Robosmart.discover = function(callback) {
  noble.once('stateChange', function() {
    noble.once('discover', function(peripheral) {
      noble.stopScanning();

      var roboSmart = new Robosmart(peripheral);

      callback(roboSmart);
    });
    noble.startScanning([PUBLIC_SERVICE_UUID]);
  });
};

Robosmart.prototype.connect = function(callback) {
  this._peripheral.connect(callback);
};

Robosmart.prototype.disconnect = function(callback) {
  this._peripheral.disconnect(callback);
};

Robosmart.prototype.discoverServices = function(callback) {
  this._peripheral.discoverServices([PUBLIC_SERVICE_UUID], function(error, services) {
    this._publicService = services[0];

    callback();
  }.bind(this));
};

Robosmart.prototype.discoverCharacteristics = function(callback) {
  this._publicService.discoverCharacteristics([], function(error, characteristics) {
    for(var i in characteristics) {
      var characteristic = characteristics[i];

      this._characteristics[characteristic.uuid] = characteristic;
    }

    callback();
  }.bind(this));
};

Robosmart.prototype.readCharacteristic = function(uuid, callback) {
  this._characteristics[uuid].read(function(error, data) {
    callback(data);
  });
};

Robosmart.prototype.writeCharacteristic = function(uuid, data, callback) {
  this._characteristics[uuid].write(data, false, callback);
};

Robosmart.prototype.isOn = function(callback) {
  this.readCharacteristic(LIGHT_SWITCH_UUID, function(data) {
    callback(data.readUInt8(0) ? true : false);
  });
};

Robosmart.prototype.switchOn = function(callback) {
  this.writeCharacteristic(LIGHT_SWITCH_UUID, new Buffer([0x01]), callback);
};

Robosmart.prototype.switchOff = function(callback) {
  this.writeCharacteristic(LIGHT_SWITCH_UUID, new Buffer([0x00]), callback);
};

Robosmart.prototype.getDim = function(callback) {
  this.readCharacteristic(DIMMER_SETTING_UUID, function(data) {
    callback(data.readUInt8(0));
  });
};

Robosmart.prototype.setDim = function(dim, callback) {
  this.writeCharacteristic(DIMMER_SETTING_UUID, new Buffer([dim]), callback);
};

Robosmart.prototype.getPowerConsumed = function(callback) {
  this.readCharacteristic(POWER_CONSUME_UUID, function(data) {
    callback(parseFloat(data.toString()));
  });
};

Robosmart.prototype.readStringCharacteristic = function(uuid, callback) {
  this.readCharacteristic(uuid, function(data) {
    callback(data.toString());
  });
};

Robosmart.prototype.writeStringCharacteristic = function(uuid, string, callback) {
  this.writeCharacteristic(uuid, new Buffer(string), callback);
};

Robosmart.prototype.getLightName = function(callback) {
  this.readStringCharacteristic(LIGHT_NAME_PUB_UUID, callback);
};

Robosmart.prototype.setLightName = function(lightName, callback) {
  this.writeStringCharacteristic(LIGHT_NAME_PUB_UUID, lightName, callback);
};

Robosmart.prototype.getGroupName = function(callback) {
  this.readStringCharacteristic(GROUP_NAME_PUB_UUID, callback);
};

Robosmart.prototype.setGroupName = function(groupName, callback) {
  this.writeStringCharacteristic(GROUP_NAME_PUB_UUID, groupName, callback);
};

Robosmart.prototype.getRoomName = function(callback) {
  this.readStringCharacteristic(ROOM_NAME_PUB_UUID, callback);
};

Robosmart.prototype.setRoomName = function(roomName, callback) {
  this.writeStringCharacteristic(ROOM_NAME_PUB_UUID, roomName, callback);
};

Robosmart.prototype.remoteDisconnect = function(callback) {
  this.writeCharacteristic(DISCONNECT_UUID, new Buffer([0x01]), callback);
};

module.exports = Robosmart;
