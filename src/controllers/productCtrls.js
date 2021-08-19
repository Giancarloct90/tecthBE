import Products from '../models/productMdls';
import {
  deleteAFIle,
  uploadImageCloud
} from './utils/utils';

// TO GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    let productsDB = await Products.find({
      disponible: true
    });
    if (!productsDB) {
      return res.status(500).json({
        ok: false,
        message: 'Error trying to get Products'
      })
    }
    return res.status(200).json({
      ok: true,
      products: productsDB
    });
  } catch (e) {
    console.log('Error with the DB Server');
    return res.status(500).json({
      ok: false,
      message: 'Error with the DB Server',
      e
    });
  }

};

//TO INSERT A PRODUCTS TO DB 
export const postProducts = async (req, res) => {
  let {
    nombre,
    precio,
    cantidad
  } = req.body;
  // console.log(req.file);
  if (!req.file) {
    let message = ['La imagen no puede estar vacio'];
    let params = ['file'];
    return res.status(200).json({
      ok: false,
      validate: true,
      message,
      params
    });
  }
  try {
    let imagen = req.file.path;
    const imageUploaded = await uploadImageCloud(imagen);
    if (imageUploaded.ok) {
      try {
        const product = new Products();
        product.nombre = nombre;
        product.precio = precio;
        product.imagen = imageUploaded.imageUpload.url;
        product.cantidad = cantidad;
        product.disponible = true;
        const productDB = await product.save();
        if (productDB) {
          return res.status(200).json({
            ok: true,
            message: 'El producto se guardo con exito',
          });
        }
        await deleteAFIle(imagen);
        return res.status(500).json({
          ok: false,
          message: 'Error in DATABASE'
        });
      } catch (e) {
        await deleteAFIle(imagen);
        console.log('Error Trying insert');
        console.log(e);
        return res.status(500).json({
          ok: false,
          message: 'Error in DATABASE'
        });
      }

    }
    console.log(imageUploaded.message);
    await deleteAFIle(imagen);
    return res.status(500).json({
      ok: false,
      message: 'Error Upload Image'
    });
  } catch (e) {
    await deleteAFIle(imagen);
    console.log('Error with image')
    return res.status(400).json({
      ok: false,
      message: 'Error Upload Image'
    });
  }

};

// WELCOME TO API
export const getWelcome = (req, res) => {
  return res.status(200).json({
    ok: true,
    message: 'Hello Hellooo',
    api_name: 'techStore'
  })
}