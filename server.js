const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());

// HTTP header สิทธ์การเข้าถึง
var corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// Default Route
app.get('/',(req, res)=>{
    res.json({ message: 'Welcome to recipe Web!!'});
})

//require routes
require('./app/routes/userRoutes')(app);
require('./app/routes/recipeRoutes')(app);
require('./app/routes/reviewRoutes')(app);



//Port Server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Server is running on port.'+PORT);
})