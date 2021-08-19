"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

var _productRts = _interopRequireDefault(require("./routes/productRts"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _multer = _interopRequireDefault(require("multer"));

var app = (0, _express["default"])(); // settings

app.set("port", _config["default"].port); // Middlewares

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("short"));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());

var storage = _multer["default"].diskStorage({
  destination: _path["default"].join(__dirname, './public/'),
  filename: function filename(req, file, fnCallback) {
    fnCallback(null, "".concat(new Date().getTime() + _path["default"].extname(file.originalname)));
  }
});

app.use((0, _multer["default"])({
  storage: storage
}).single('imagen')); // ROUTES

app.use(_productRts["default"]);
var _default = app;
exports["default"] = _default;