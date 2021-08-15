"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _productCtrls = require("../controllers/productCtrls");

var router = (0, _express.Router)();
router.get('/products', _productCtrls.getProducts); // router.get('/products',getOneProducts);

router.post('/products', _productCtrls.postProducts); // router.delete('/products',deleteProducts);
// router.put('/products',updateProducts);

var _default = router;
exports["default"] = _default;