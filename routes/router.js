

const router = require('express').Router();

const login  = require('../controller/login');
const products  = require('../controller/crudProducts');
const users = require('../controller/crudUsers')


//crud users

router.get('/users',users.getUsers);

//crud products
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

