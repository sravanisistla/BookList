import express from 'express';
import bodyParser from 'body-parser';
import * as bookCtrl from '../controllers/bookControl';

const app = express();

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data


app.route('/').get(bookCtrl.getBooks);
app.route('/createBook').post(bookCtrl.addBook);
app.route('/searchBooks').post(bookCtrl.getBooks);
app.route('/deleteBook').post(bookCtrl.removeBook);
app.route('/updateBook').post(bookCtrl.updateBook);

export default app;
