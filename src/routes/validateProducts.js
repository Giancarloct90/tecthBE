import {
  body,
  validationResult
} from "express-validator";

const validateProductRules = () => {
  return [
    body("nombre", "Nombre no puede estar vacio").not().isEmpty(),
    body("precio").not().isEmpty().withMessage("Precio no puede estar vacio").isFloat().withMessage("Precio debe ser numero"),
    body("cantidad").not().isEmpty().withMessage("Cantidad no puede estar vacio").isFloat().withMessage("Cantidad tiene que se numero"),
  ];
};

const validate = (req, res, next) => {
  const errorsVal = validationResult(req);
  if (errorsVal.isEmpty()) {
    return next();
  }
  console.log(errorsVal.array());
  let message = [];
  let params = [];
  errorsVal.array().map((item) => {
    message.push(item.msg);
    params.push(item.param);
  });
  console.log(message);
  return res.status(422).json({
    ok: false,
    validate: true,
    message,
    params,
  });
};

export {
  validateProductRules,
  validate
};