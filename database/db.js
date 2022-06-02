const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    password :'root',
    user: 'root',
    port: '3308',
    database :'stay' 
})

conexion.connect((error)=>{
    if(error){
       console.log('error de :'+error);
    }else{
        console.log('conexiona a base exitosa');
    }
})
module.exports = conexion;