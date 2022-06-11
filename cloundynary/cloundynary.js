const cloundynary = require('cloudinary').v2;
//autenticacion en cloundynary
 const clound = cloundynary.config({
    cloud_name: 'decsantg',
    api_key : '238788223631362',
    api_secret: 'tDRcAEO7BJJLFQULn6HOIz8gSKU'

    
})


module.exports = clound;