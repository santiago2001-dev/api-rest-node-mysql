//llamado de conexion a la base 
const conexion = require("./database/db");


//llamdo de express 
const express = require('express');
const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//configuracion de puerto
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
 console.log('servidor corriendo en: ',app.get('port'))
}); 
//llamado de cors para que nno genre error en angular
const cors = require('cors');
app.use (cors());

//llamado de nuestro router
app.use('/api', require('./router')); 


