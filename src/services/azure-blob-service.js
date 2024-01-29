'use strict'

const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');


exports.UploadImage = async (image) => {

     //cria instancia blob service
     const blobService = azure.createBlobService(config.containerConnectionString);

     let filename = guid.raw().toString() + '.jpg';
     let rawdata = image; //base64 da imagem
     let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/); //expressão regular para pegar o tipo e o base64 da imagem
     let type = matches[1]; //tipo da imagem
     let buffer = new Buffer.from(matches[2], 'base64'); //converte o base64 para buffer
    
     //salva a imagem
     await blobService.createBlockBlobFromText('produtos-images', filename, buffer, {
          contentType: type
      }, function(error, result, response){
          if(error){
              filename = 'default-product.png';
          }
      });
}