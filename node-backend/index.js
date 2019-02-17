const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const mongoose = require('mongoose');
const Config=require('./constant');
const userRoute=require('./routes/user.route');
const secureRoute=express.Router();

const app = express();


// configure mongoDB

let mongoDB = process.env.MONGODB_URI || Config.MONGO_DB_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', secureRoute);
secureRoute.use((req, res, next) =>{
     
    var token = req.headers['access-token'];
  
    if (token) {
  
        if(token===Config.AUTH_TOKEN)
        {
            next();
        }
        else
        {
            return res.status(403).send({
                message: 'Invalid Token' 
            });
        }      
  
    } else {  
      return res.status(403).send({
          message: 'No token provided.' 
      });
  
    }
  });


app.use('/api/user', userRoute);

app.get('/health', (req, res) => {
    res.send('service is ready to receive request');
  })
const port = process.env.PORT || Config.PORT;
app.listen(port, () => {
    console.log('node server is running on port numner ' + port);
});