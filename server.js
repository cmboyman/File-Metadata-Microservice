var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var app = express();
var fs = require('fs')
var path = require('path');

app.use(cors());
app.use(multer({
  
  dest:__dirname+'/uploads/',
  rename: function (fieldname, filename) {
      return Date.now()
    },
    limits: {
      fileSize: 100000
    },
    onFileSizeLimit: function (file) {
      console.log('Failed: ' + file.originalname + ' is limited')
      fs.unlink(file.path)
    }
  
  
  }).any());


// app.use('/public', express.static(process.cwd() + '/public'));
// app.use(
//   multer({
//     dest: __dirname + '/uploads/',
//     rename: function (fieldname, filename) {
//       return Date.now()
//     },
//     limits: {
//       fileSize: 100000
//     },
//     onFileSizeLimit: function (file) {
//       console.log('Failed: ' + file.originalname + ' is limited')
//       fs.unlink(file.path)
//     }
//   })
// )




app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',(req, res)=>{

    req.files.forEach(function(value, key) {
    res.json({'name': value.originalname,'type': value.mimetype, 'size' : value.size})
})



})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
