const req = require('express/lib/request');
const res = require('express/lib/response');
const conexion = require('../database/db');
//llamdo de cloundynary
const cloundynary = require('cloudinary').v2;
//autenticacion en cloundynary
cloundynary.config({
    cloud_name: 'decsantg',
    api_key : '238788223631362',
    api_secret: 'tDRcAEO7BJJLFQULn6HOIz8gSKU'

    
})


//nav bar
exports.search = async(req,res) =>{
    const {busqueda} = req.body
    console.log(req.body)
    const sql = `SELECT * FROM productos WHERE  codigo_prod = '${busqueda}' OR titulo = '${busqueda}' OR fecha = '${busqueda}'OR tipo = '${busqueda}}' OR  tipo = '${busqueda}'  OR sinopsis = '${busqueda}'`
     await conexion.query(sql, (error,rows,fields) => {
  
        if(error){
            throw error;
           
       }else{
           res.json(rows);
           console.log(rows);
       }
    }
    )
}
//get all products
exports.getProducts =async(req,res)=>{
    const sql = 'SELECT * from productos';
     await conexion.query(sql,(error,rows,fields,results)=>{
          if(error){
              throw error;
              console.log("ha ocurrido un error de "+error);
          }else{
              res.json(rows);
              console.log(rows);
          } 
      })
}

// get products by id
exports.getProductsbyid =  ('/:codigo_prod',async(req,res)=>{ 
    const {codigo_prod} = req.params;
    const sql = 'select * from productos where  codigo_prod = ?';
       await conexion.query(sql,[codigo_prod],(error,rows,fields)=>{
        if(error){
             throw error;
            
        }else{
            res.json(rows);
            console.log(rows);
        }
    }) 
})
//insert product
exports.insertProdcut = async(req,res)=>{
    const {titulo ,fecha,precio,tipo,sinopsis, imagen} = req.body
    const result =  await cloundynary.uploader.upload(imagen);
    var imgHosting = result.url;
   let sql =`INSERT INTO productos (titulo,fecha,precio,tipo,sinopsis ,imagen) values ('${titulo}','${fecha}','${precio}','${tipo}','${sinopsis}','${imgHosting}')`
   
   conexion.query(sql,(error,rows,fields)=>{
       if(error){
        throw error;
        console.log("ha ocurrido un error de "+error);
       }else{
           res.json({status : 'registro agregado'}) 
       }
   })
}

//uodate products

exports.updateProducts =  async(req,res)=>{
    const {codigo_prod}= req.params
    const {titulo ,fecha,precio,tipo,sinopsis, imagen} = req.body
    const result =  await cloundynary.uploader.upload(imagen);
    var imgHosting = result.url;
    let sql =  `update productos set titulo ='${titulo}',fecha = '${fecha}',precio = '${precio}', tipo = '${tipo}',  sinopsis = '${sinopsis}', imagen ='${imgHosting}'
     where codigo_prod = '${codigo_prod}'`
     await conexion.query(sql, (error, results) => {
        if (error) { 
            throw error;
           
        } else {  
            res.json({ 
                status: 'registro actualizado'
            }) 
 
        }
    }) 
}


exports.deleteProduct = async (req,res)=>{
    const {codigo_prod}= req.params
    let  sql =  `delete from productos where codigo_prod = '${codigo_prod}'`
     await conexion.query(sql,(error,rows,fields)=>{ 
        if(error){
            throw error;
         console.log("ha ocurrido un error de "+error);
        }else{
            res.json({status : 'registro eliminado'})
 
        }    
    })
}



