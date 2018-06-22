import express from 'express';
import apiRoutes from './routes/bookRoute';
import mongo from 'then-mongo';
import config from './config/config';

const mongoUrl = process.env.MONGO_URL || config.MONGO_URL;

let db = mongo(mongoUrl, [config.COLLECTION_NAME]);
export default db ;

const port = process.env.PORT || config.PORT;

const app = express();

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/api', apiRoutes);

app.listen(port,() => {
    console.log(`Server is running at port-> ${port}`);
});
