// IMPORTS
import fs from 'fs-extra';
import cloudinary from 'cloudinary';
import config from '../../config';

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET
});

// DELETE A FILE
export const deleteAFIle = async (file) => {
    if (fs.existsSync(file)) {
        await fs.unlink(file);
        return console.log('Se borro con exito');
    } else {
        return console.log('No existe el file');
    }
}

// TO UPLOAD A IMAGE
export const uploadImageCloud = async (imagen) => {
    try {
        let imageUpload = await cloudinary.v2.uploader.upload(imagen);
        await deleteAFIle(imagen);
        console.log('subido');
        return {
            ok: true,
            imageUpload
        }
    } catch (error) {
        await deleteAFIle(imagen);
        return {
            ok: false,
            message: error
        }
    }
}