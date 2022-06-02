const req = require('express/lib/request');
//LLAMADO DE BD
const conexion = require('../database/db');
//llamado de jsonwebtoken
const jwt =  require('jsonwebtoken');

//barra de busqueda 
exports.search = (req,res) =>{
    const {busqueda} = req.body
    console.log(req.body)
    const sql = `SELECT * FROM productos WHERE  codigo_prod = '${busqueda}' OR titulo = '${busqueda}' OR fecha = '${busqueda}'OR tipo = '${busqueda}}' OR  tipo = '${busqueda}'  OR sinopsis = '${busqueda}'`
    conexion.query(sql, (error,rows,fields) => {
  
        if(error){
            throw error;
           
       }else{
           res.json(rows);
           console.log(rows);
       }
    }
    )
}


//SIGIN

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


exports.sigin = (req,res)=>{
    const {user} = req.body
    const {password} = req.body
 
   const sql = ` SELECT * FROM USERS WHERE  user = '${user}' AND password = '${password}'`
    conexion.query(sql,(err,rows,fields)=>{
        
    if(!err){
        if(rows.length >0){
            let data = JSON.stringify(rows[0]);
            const token = jwt.sign(data,'stil')
            res.json({token})
            console.log("loggeado")
        }else{
            
            res.json('usuario incorrecto')
        }
    }else{
          console.log(err)

        } 
    })

}

//AUTENTICACION

exports.test = (req,res,next) =>{
   
    if(!req.headers.authorization) return res.status(401).json('no autorizado');

    const token = req.headers.authorization.substr(7)
    console.log(token)
    if(token!==''){
        const content  = jwt.verify(token,'stil');
        req.data = content;
        next();
    }else{
     res.status(401).json('token vacio')
    }

res.json('infromacion secreta')
//DESDE ACA PODEMOS REALIZAR VALIDACIONES CON EL USUARIO
//EJ 
// if(req.data.roleid == 'admin'){

// }

}

//usuarios
