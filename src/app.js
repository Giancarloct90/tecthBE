import express from "express";
import config from './config';
import productRoutes from './routes/productRts'
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import multer from 'multer';

const app = express();

// settings
app.set("port", config.port);

// Middlewares
app.use(cors());
app.use(morgan("short"));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

const storage = multer.diskStorage({
    destination: path.join(__dirname, './public/'),
    filename: (req, file, fnCallback) => {
        fnCallback(null, `${new Date().getTime() + path.extname(file.originalname)}`)
    }
});
app.use(multer({
    storage
}).single('imagen'));

// ROUTES
app.use(productRoutes);


export default app;