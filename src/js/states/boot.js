var BootState = function() {};
var DefaultKeyBindings = require('./../constants/default_key_bindings.js');
var GameplayConstants = require('./../constants/gameplay_constants.js');
var Resources = require('./../constants/resources.js');
var UserActions = require('./../constants/user_actions.js');
var _ = require('lodash');

(function(Boot) {
  'use strict';

  Boot.prototype = {

    preload: function() {
      Resources.tilemaps.forEach(function(tilemap) {
        this.load.tilemap.apply(this.load, tilemap);
      }, this);

      Resources.images.forEach(function(image) {
        this.load.image.apply(this.load, image);
      }, this);
    },

    create: function() {
      this._initMap();
      this._initInput();
    },

    update: function() {
      this._onInput();
    },

    _actions: {},

    _boundKeys: {},

    _initInput: function() {
      var reduceFn = _.bind(function(accumulator, action, key) {
        accumulator[action] = this.input.keyboard.addKey(Phaser.Keyboard[key]);
      }, this);

      this._boundKeys = _.transform(DefaultKeyBindings, reduceFn, {});

      this._actions[UserActions.MOVE_CAMERA_UP] = '_moveCamera';
      this._actions[UserActions.MOVE_CAMERA_DOWN] = '_moveCamera';
      this._actions[UserActions.MOVE_CAMERA_LEFT] = '_moveCamera';
      this._actions[UserActions.MOVE_CAMERA_RIGHT] = '_moveCamera';
    },

    _initMap: function() {
      var layer;
      var map;

      map = this.add.tilemap('demo_map');
      map.addTilesetImage('summer_terrain', 'summer_terrain');

      layer = map.createLayer('Tile Layer 1');
      layer.scale = {
        x: 2,
        y: 2
      };
      layer.resizeWorld();
    },

    _onInput: function() {
      var action;
      var self = this;

      if (!this.input.activePointer.withinGame) {
        this.input.enabled = false;
        return;
      }

      this.input.enabled = true;

      _.forEach(this._boundKeys, function(keyPressed, keyAction) {
        if (keyPressed.isDown) {
          action = self._actions[keyAction];
          self[action](keyAction);
        }
      });
    },

    _moveCamera: function(action) {
      switch (action) {
        case UserActions.MOVE_CAMERA_UP:
          this.camera.y -= GameplayConstants.CAMERA_SPEED;
          break;
        case UserActions.MOVE_CAMERA_DOWN:
          this.camera.y += GameplayConstants.CAMERA_SPEED;
          break;
        case UserActions.MOVE_CAMERA_LEFT:
          this.camera.x -= GameplayConstants.CAMERA_SPEED;
          break;
        case UserActions.MOVE_CAMERA_RIGHT:
          this.camera.x += GameplayConstants.CAMERA_SPEED;
          break;
        default:
          break;
      }
    }
  };

  return Boot;
})(BootState);

module.exports = BootState;

