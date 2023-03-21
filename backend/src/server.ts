import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.router';
import workshopRouter from './routers/workshop.router';
import chatRouter from './routers/chat.router';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/radionica2023');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok')
})

const router = express.Router();
app.use('/', router);
router.use('/users', userRouter);
router.use('/workshops', workshopRouter);
router.use('/chats', chatRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));



