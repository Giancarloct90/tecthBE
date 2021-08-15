import {
    config
} from 'dotenv';
config();

export default {
    port: process.env.PORT || 3000,
    URI_DB: process.env.URI_DB,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET
}