import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import usersRoutes from './router/user.js';

const app = express();
const PORT = 5500;
dotenv.config()
app.use(express.json())


// app.get('*', (req, res) => {
//     resizeBy.sandFile(path.join(__dirname, '../client/build/index.html'))
// })



mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    try {
        console.log('mongodb connect');
        app.use('/api/user', usersRoutes);
        app.listen(PORT, () => console.log('express server listening port ' + PORT));

    } catch(err) {
        console.error(err)
    }
})
