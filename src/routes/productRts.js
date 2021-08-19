import {
    response,
    Router
} from "express";
import {
    getProducts,
    postProducts,
    getWelcome
} from '../controllers/productCtrls'
import {
    validate,
    validateProductRules
} from './validateProducts';


const router = Router();

router.get('/', getWelcome);
router.get('/products', getProducts);
router.post('/products', validateProductRules(), validate, postProducts);
export default router