"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWelcome = exports.postProducts = exports.getProducts = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _productMdls = _interopRequireDefault(require("../models/productMdls"));

var _utils = require("./utils/utils");

// TO GET ALL PRODUCTS
var getProducts = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var productsDB;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _productMdls["default"].find({
              disponible: true
            });

          case 3:
            productsDB = _context.sent;

            if (productsDB) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(500).json({
              ok: false,
              message: 'Error trying to get Products'
            }));

          case 6:
            return _context.abrupt("return", res.status(200).json({
              ok: true,
              products: productsDB
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log('Error with the DB Server');
            return _context.abrupt("return", res.status(500).json({
              ok: false,
              message: 'Error with the DB Server',
              e: _context.t0
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getProducts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //TO INSERT A PRODUCTS TO DB 


exports.getProducts = getProducts;

var postProducts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, nombre, precio, cantidad, message, params, _imagen, imageUploaded, product, productDB;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, precio = _req$body.precio, cantidad = _req$body.cantidad; // console.log(req.file);

            if (req.file) {
              _context2.next = 5;
              break;
            }

            message = ['La imagen no puede estar vacio'];
            params = ['file'];
            return _context2.abrupt("return", res.status(200).json({
              ok: false,
              validate: true,
              message: message,
              params: params
            }));

          case 5:
            _context2.prev = 5;
            _imagen = req.file.path;
            _context2.next = 9;
            return (0, _utils.uploadImageCloud)(_imagen);

          case 9:
            imageUploaded = _context2.sent;

            if (!imageUploaded.ok) {
              _context2.next = 35;
              break;
            }

            _context2.prev = 11;
            product = new _productMdls["default"]();
            product.nombre = nombre;
            product.precio = precio;
            product.imagen = imageUploaded.imageUpload.url;
            product.cantidad = cantidad;
            product.disponible = true;
            _context2.next = 20;
            return product.save();

          case 20:
            productDB = _context2.sent;

            if (!productDB) {
              _context2.next = 23;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              message: 'El producto se guardo con exito'
            }));

          case 23:
            _context2.next = 25;
            return (0, _utils.deleteAFIle)(_imagen);

          case 25:
            return _context2.abrupt("return", res.status(500).json({
              ok: false,
              message: 'Error in DATABASE'
            }));

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2["catch"](11);
            _context2.next = 32;
            return (0, _utils.deleteAFIle)(_imagen);

          case 32:
            console.log('Error Trying insert');
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              ok: false,
              message: 'Error in DATABASE'
            }));

          case 35:
            console.log(imageUploaded.message);
            _context2.next = 38;
            return (0, _utils.deleteAFIle)(_imagen);

          case 38:
            return _context2.abrupt("return", res.status(500).json({
              ok: false,
              message: 'Error Upload Image'
            }));

          case 41:
            _context2.prev = 41;
            _context2.t1 = _context2["catch"](5);
            _context2.next = 45;
            return (0, _utils.deleteAFIle)(imagen);

          case 45:
            console.log('Error with image');
            return _context2.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error Upload Image'
            }));

          case 47:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 41], [11, 28]]);
  }));

  return function postProducts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // WELCOME TO API


exports.postProducts = postProducts;

var getWelcome = function getWelcome(req, res) {
  return res.status(200).json({
    ok: true,
    message: 'Hello Hellooo',
    api_name: 'techStore',
    version: '1.0.2',
    date: '19-08-21'
  });
};

exports.getWelcome = getWelcome;