exports.getUsers= (req,res)=>{
    const sql = 'SELECT * from users';
    console.log(sql)
    
    conexion.query(  sql,(error,results)=>{
        if(error){
           throw error;
           console.log("ha ocurrido un error de "+error);
       }else{
           // res.json(results);
           console.log(results);
       } 
       
   })
    
}  