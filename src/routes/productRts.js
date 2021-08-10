import { Router } from "express";
import {
    getProducts,
    postProducts
} from '../controllers/productCtrls'

const router = Router();

router.get('/products', getProducts);
// router.get('/products',getOneProducts);
router.post('/products', postProducts);
// router.delete('/products',deleteProducts);
// router.put('/products',updateProducts);

export default router