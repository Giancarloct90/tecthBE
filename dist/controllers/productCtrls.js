"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postProducts = exports.getProducts = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _productMdls = _interopRequireDefault(require("../models/productMdls"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("../config"));

_cloudinary["default"].config({
  cloud_name: _config["default"].CLOUD_NAME,
  api_key: _config["default"].API_KEY,
  api_secret: _config["default"].API_SECRET
});

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
            res.status(200).json({
              ok: true,
              products: productsDB
            });
            return _context.abrupt("return");

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log('error trying to get products');
            res.status(500).json({
              ok: false,
              message: 'Error to get all data'
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getProducts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // export const yay = async (req, res) => {
//   let { nombre,
//     precio,
//     cantidad,
//   } = req.body;
//   console.log(nombre, precio, cantidad);
//   res.status(200).json({
//     ok: true,
//     message: 'Recived'
//   })
// }


exports.getProducts = getProducts;

var postProducts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, nombre, precio, cantidad, imageUploaded, product, productDB;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, precio = _req$body.precio, cantidad = _req$body.cantidad;
            _context2.next = 3;
            return uploadImageCloud(req.file.path);

          case 3:
            imageUploaded = _context2.sent;

            if (!imageUploaded.ok) {
              _context2.next = 28;
              break;
            }

            _context2.prev = 5;
            product = new _productMdls["default"]();
            product.nombre = nombre;
            product.precio = precio;
            product.imagen = imageUploaded.imageUpload.url;
            product.cantidad = cantidad;
            product.disponible = true;
            _context2.next = 14;
            return product.save();

          case 14:
            productDB = _context2.sent;

            if (!productDB) {
              _context2.next = 18;
              break;
            }

            res.status(200).json({
              ok: true,
              message: 'Success'
            });
            return _context2.abrupt("return");

          case 18:
            res.status(500).json({
              ok: false,
              message: 'error to insert server'
            });
            return _context2.abrupt("return");

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](5);
            console.log('Error Trying insert');
            console.log(_context2.t0);
            res.status(500).json({
              ok: false,
              message: 'error to insert server'
            });
            return _context2.abrupt("return");

          case 28:
            console.log(imageUploaded.message);
            res.status(500).json({
              ok: false,
              message: 'error to upload image'
            });
            return _context2.abrupt("return");

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 22]]);
  }));

  return function postProducts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postProducts = postProducts;

var uploadImageCloud = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(image) {
    var imageUpload;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _cloudinary["default"].v2.uploader.upload(image);

          case 3:
            imageUpload = _context3.sent;
            _context3.next = 6;
            return _fsExtra["default"].unlink(image);

          case 6:
            console.log('subido');
            return _context3.abrupt("return", {
              ok: true,
              imageUpload: imageUpload
            });

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", {
              ok: false,
              message: _context3.t0
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function uploadImageCloud(_x5) {
    return _ref3.apply(this, arguments);
  };
}();