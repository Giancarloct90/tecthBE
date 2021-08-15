import Products from '../models/productMdls';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import e from 'express';
import config from '../config';

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET
})

export const getProducts = async (req, res) => {
  try {
    let productsDB = await Products.find({
      disponible: true
    });
    res.status(200).json({
      ok: true,
      products: productsDB
    });
    return;
  } catch (error) {
    console.log('error trying to get products')
    res.status(500).json({
      ok: false,
      message: 'Error to get all data'
    });
  }

};

// export const yay = async (req, res) => {
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

export const postProducts = async (req, res) => {
  let {
    nombre,
    precio,
    cantidad
  } = req.body;
  const imageUploaded = await uploadImageCloud(req.file.path);
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
        res.status(200).json({
          ok: true,
          message: 'Success',
        });
        return;
      }
      res.status(500).json({
        ok: false,
        message: 'error to insert server'
      });
      return;

    } catch (e) {
      console.log('Error Trying insert');
      console.log(e);
      res.status(500).json({
        ok: false,
        message: 'error to insert server'
      });
      return;
    }

  }
  console.log(imageUploaded.message);
  res.status(500).json({
    ok: false,
    message: 'error to upload image'
  });
  return;
};

const uploadImageCloud = async (image) => {
  try {
    let imageUpload = await cloudinary.v2.uploader.upload(image);
    await fs.unlink(image);
    console.log('subido');
    return {
      ok: true,
      imageUpload
    }
  } catch (error) {
    return {
      ok: false,
      message: error
    }
  }
}