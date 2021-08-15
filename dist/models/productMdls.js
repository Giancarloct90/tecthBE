"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var product = new Schema({
  nombre: {
    type: String,
    required: [true, 'El Nombre es necesario']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es necesario']
  },
  imagen: {
    type: String
  },
  cantidad: {
    type: Number,
    required: [true, 'la cantidad es necesaria']
  },
  disponible: {
    type: Boolean
  }
});

var _default = _mongoose["default"].model('Products', product);

exports["default"] = _default;