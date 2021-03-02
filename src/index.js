//variables
const express = require('express');
const app = express();
const path = require('path');


//settingsh
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

//routes
app.use(require('./routes/index'));

//static files 
app.use(express.static(path.join(__dirname, 'public')));

//midlewares
app.use(express.urlencoded({extended: true}));

//listening de server
app.listen(app.get('port'), () =>{

  console.log('escucho por el puerto', app.get('port') ); 
  
});

