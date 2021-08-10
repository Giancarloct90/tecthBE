import Products from '../models/productMdls';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import e from 'express';

cloudinary.config({
  cloud_name: "ddnzwfrmo",
  api_key: "751465344374982",
  api_secret: "MNMtnqvFuL4XBiRu5LLXPtxygEA"
})

export const getProducts = async (req, res) => {
  try {
    let productsDB = await Products.find({
      disponible: true
    });
    res.status(200).json({
      products: productsDB
    });
  } catch (error) {
    console.log('error trying to get products')
  }

};

export const postProducts = async (req, res) => {
  let { nombre, precio, cantidad } = req.body;
  console.log( nombre, precio, cantidad);
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
      if(productDB){
        res.status(200).json({
          ok: true,
          message: 'Success',
        });
      }else{
        res.status(500).json({
          ok: false,
          message: 'error to insert server'
        });
      }
    } catch (e) {
      console.log('Error Trying insert');
      console.log(e);
      res.status(500).json({
        ok: false,
        message: 'error to insert server'
      });
    }
  }else{
    res.status(500).json({
      ok: false,
      message: 'error to upload image'
    });
  }
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
      message: e
    }
  }
}