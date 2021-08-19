"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImageCloud = exports.deleteAFIle = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _config = _interopRequireDefault(require("../../config"));

// IMPORTS
_cloudinary["default"].config({
  cloud_name: _config["default"].CLOUD_NAME,
  api_key: _config["default"].API_KEY,
  api_secret: _config["default"].API_SECRET
}); // DELETE A FILE


var deleteAFIle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!_fsExtra["default"].existsSync(file)) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return _fsExtra["default"].unlink(file);

          case 3:
            return _context.abrupt("return", console.log('Se borro con exito'));

          case 6:
            return _context.abrupt("return", console.log('No existe el file'));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deleteAFIle(_x) {
    return _ref.apply(this, arguments);
  };
}(); // TO UPLOAD A IMAGE


exports.deleteAFIle = deleteAFIle;

var uploadImageCloud = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(imagen) {
    var imageUpload;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _cloudinary["default"].v2.uploader.upload(imagen);

          case 3:
            imageUpload = _context2.sent;
            _context2.next = 6;
            return deleteAFIle(imagen);

          case 6:
            console.log('subido');
            return _context2.abrupt("return", {
              ok: true,
              imageUpload: imageUpload
            });

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            _context2.next = 14;
            return deleteAFIle(imagen);

          case 14:
            return _context2.abrupt("return", {
              ok: false,
              message: _context2.t0
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function uploadImageCloud(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.uploadImageCloud = uploadImageCloud;