const conexion = require('../database/db');
exports.getUsers= (req,res)=>{
    const sql = 'SELECT * from users';
    
    
    conexion.query(  sql,(error,results)=>{
        if(error){
           throw error;
           
       }else{
            res.json(results);
           
       } 
       
   })
    
}  