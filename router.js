const conexion = require("./database/db");

const router = require('express').Router();
const controller  = require('./controller/controlador');
const res = require("express/lib/response");

//consultas de registros
router.post('/search',controller.search);
router.post('/sigin',controller.sigin);
router.get('/users',controller.getUsers);
router.post('/test',controller.test);


// traer todos los registros
router.get('/',(req,res)=>{
    const sql = 'SELECT * from productos';
  conexion.query(sql,(error,rows,fields,results)=>{
        if(error){
            throw error;
            console.log("ha ocurrido un error de "+error);
        }else{
            res.json(rows);
            console.log(rows);
        } 
    })
})
 
// traer registros por codigo
router.get('/:codigo_prod',(req,res)=>{ 
    const {codigo_prod} = req.params;
    const sql = 'select * from productos where  codigo_prod = ?';
    conexion.query(sql,[codigo_prod],(error,rows,fields)=>{
        if(error){
             throw error;
            
        }else{
            res.json(rows);
            console.log(rows);
        }
    }) 
})

//agregar registro 

//llamdo de cloundynary
const cloundynary = require('cloudinary').v2;
//autenticacion en cloundynary
cloundynary.config({
    cloud_name: 'decsantg',
    api_key : '238788223631362',
    api_secret: 'tDRcAEO7BJJLFQULn6HOIz8gSKU'

    
})
router.post('/',async(req,res)=>{
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
})


//actualizar registro
router.put('/:codigo_prod', async(req, res) => {
    const {codigo_prod}= req.params
    const {titulo ,fecha,precio,tipo,sinopsis, imagen} = req.body
    const result =  await cloundynary.uploader.upload(imagen);
    var imgHosting = result.url;
    let sql =  `update productos set titulo ='${titulo}',fecha = '${fecha}',precio = '${precio}', tipo = '${tipo}',  sinopsis = '${sinopsis}', imagen ='${imgHosting}'
     where codigo_prod = '${codigo_prod}'`
   conexion.query(sql, (error, results) => {
        if (error) { 
            throw error;
           
        } else {  
            res.json({ 
                status: 'registro actualizado'
            }) 
 
        }
    }) 


}) 

//eliminar registro 

router.delete('/:codigo_prod',(req,res)=>{
    const {codigo_prod}= req.params
    let  sql =  `delete from productos where codigo_prod = '${codigo_prod}'`
    conexion.query(sql,(error,rows,fields)=>{ 
        if(error){
            throw error;
         console.log("ha ocurrido un error de "+error);
        }else{
            res.json({status : 'registro eliminado'})
 
        }    
    })
 }) 
 





 


  module.exports = router; 

