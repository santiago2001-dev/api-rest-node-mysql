const conexion = require("./database/db");

const router = require('express').Router();
const login  = require('./controller/login');
const products  = require('./controller/crudProducts');
const users = require('./controller/crudUsers')
const res = require("express/lib/response");
const { route } = require("express/lib/application");

//consultas de registros

router.get('/users',users.getUsers);
router.get('/',products.getProducts);
router.get('/',products.getProductsbyid);
router.post('/search',products.search);
router.post('/',products.insertProdcut);
router.put('/:codigo_prod',products.updateProducts);
router.delete('/:codigo_prod',products.deleteProduct);

//login and autentication
router.post('/sigin',login.sigin);

router.post('/test',login.test);











 


  module.exports = router; 

