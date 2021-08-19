"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _productCtrls = require("../controllers/productCtrls");

var _validateProducts = require("./validateProducts");

var router = (0, _express.Router)();
router.get('/', _productCtrls.getWelcome);
router.get('/products', _productCtrls.getProducts);
router.post('/products', (0, _validateProducts.validateProductRules)(), _validateProducts.validate, _productCtrls.postProducts);
var _default = router;
exports["default"] = _default;