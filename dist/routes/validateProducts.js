"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.validateProductRules = void 0;

var _expressValidator = require("express-validator");

var validateProductRules = function validateProductRules() {
  return [(0, _expressValidator.body)("nombre", "Nombre no puede estar vacio").not().isEmpty(), (0, _expressValidator.body)("precio").not().isEmpty().withMessage("Precio no puede estar vacio").isFloat().withMessage("Precio debe ser numero"), (0, _expressValidator.body)("cantidad").not().isEmpty().withMessage("Cantidad no puede estar vacio").isFloat().withMessage("Cantidad tiene que se numero")];
};

exports.validateProductRules = validateProductRules;

var validate = function validate(req, res, next) {
  var errorsVal = (0, _expressValidator.validationResult)(req);

  if (errorsVal.isEmpty()) {
    return next();
  }

  console.log(errorsVal.array());
  var message = [];
  var params = [];
  errorsVal.array().map(function (item) {
    message.push(item.msg);
    params.push(item.param);
  });
  console.log(message);
  return res.status(422).json({
    ok: false,
    validate: true,
    message: message,
    params: params
  });
};

exports.validate = validate;