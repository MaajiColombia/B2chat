const express = require('express');
const router =  express.Router();

//Dependencias que permiten llevar a cabo validación login
const passport = require('passport');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;


router.use(express.urlencoded({extended: true}));

router.use(cookieParser('Maaji2021'));

 router.use(session({
  secret: 'Maaji2021',
  resave:true,
  saveUninitialized: true
 }));

 router.use(passport.initialize());
 router.use(passport.session());


 // simulamos usuario
 passport.use(new PassportLocal(function(username,password,done){

  if( username==="maajiADMIN2021" && password ==="Maaji2021+*")
  return done(null,{ id: 1, name: "maaji" });
  done(null, false);

  }));

  //{id:1, name: "cody"}
  // => serialización

   passport.serializeUser(function(user,done){
    done(null,user.id);
    });

    //descerialización
  passport.deserializeUser(function(id,done){
  done(null, { id: 1, name: "maaji"});
  });



//ruta principal
router.get('/',(req,res,next)=>{
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
} ,(req, res) =>{

  res.render('index.html',{ title :  'Sign in'});
  
});


//ruta cierre sesion

router.get('/cerrar',(req,res,next)=>{
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
} ,(req, res) =>{

  res.render('cerrar_sesion.html',{ title :  'Sign in'});
  req.session.destroy();
  
});

//vista formulario 
router.get("/login",(req,res)=>{

 res.render('inicio_sesion.html',{ title : 'login'});
 

});

//vista formulario 
router.post("/login", passport.authenticate('local',{
successRedirect:"/", 
failureRedirect:"/login" 
}));



//ruta de la página que realiza el envio masivo al ser cargada.
router.get('/comfirm',(req,res,next)=>{
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
} ,(req, res) =>{

    res.render('comfirm.html',{ title :  'comfirm'});
    

    var XLSX = require("xlsx");

    const ExcelAJSON = () =>{
     const excel = XLSX.readFile(
         "W:\\Ord_por_emitir\\B2CHAT\\b2chat.xlsx"
     );

     var nombreHoja = excel.SheetNames; // da como resultado un array
     let datos = XLSX.utils.sheet_to_json(excel.Sheets[[nombreHoja[0]]]);
     
      var i;

      for(i = 0; i < datos.length; i++){
       const Telefono_iterador = datos[i].numero;
       const Nombre_iterador  = datos[i].nombre;
       const Numero_guia = datos[i].noguia;
       const Nombre_empresa = datos[i].nomemp;
       const Link_asociado = datos[i].link;


       

       var https = require('follow-redirects').https;
       var fs = require('fs');
   
       var qs = require('querystring');
   
       var options = {
        'method': 'POST',
        'hostname': 'api.b2chat.io',
         'path': '/oauth/token',
         'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic NzlmNDM0N2ItY2I0OC00MDdkLTkwNzItMjE2OTk5N2ZlZTRjOjQyODY4ZDM3LTZkM2UtNDhlNS1hMTdiLTI2ODJiNjRmNWE1MQ=='
     },
     'maxRedirects': 20
   };
   
   var req = https.request(options, function (res) {
     var chunks = [];
   
     res.on("data", function (chunk) {
       chunks.push(chunk);
     });
   
     res.on("end", function (chunk) {
       var body = Buffer.concat(chunks);
       console.log(body.toString());
       asistente = JSON.parse(body);
       const TOKEN1 = asistente.access_token;
   
  //extraer info con token creado previamente
   
   var https = require('follow-redirects').https;
   var fs = require('fs');
   
   var options = {
     'method': 'POST',
     'hostname': 'api.b2chat.io',
     'path': '/broadcast',
     'headers': {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${TOKEN1}`
     },
     'maxRedirects': 20
   };
   
   var req = https.request(options, function (res) {
     var chunks = [];
   
     res.on("data", function (chunk) {
       chunks.push(chunk);
     });
   
     res.on("end", function (chunk) {
       var body = Buffer.concat(chunks);
       console.log(body.toString());
     });
   
     res.on("error", function (error) {
       console.error(error);
     });
   });
   
   var postData = JSON.stringify({"from":"+573173648959","to":`${Telefono_iterador}`,"contact_name":"MAAJI","template_name":"notificacion1","campaign_name":"christmas campaign","values":[`${Nombre_iterador}`,`${Numero_guia}`,`${Nombre_empresa}`,`${Link_asociado}`]});
   
   req.write(postData);
   
   req.end();
   
   // ACA TERMINA PETICIÓN
       
        
   
      
     
   
   
     });
   
   
   
   
   
     res.on("error", function (error) {
       console.error(error);
     });
   });
   
   var postData = qs.stringify({
     'grant_type': 'client_credentials'
   });
   
   req.write(postData);
   
   req.end();
   


       
      }
      
     
    }

    ExcelAJSON();




    

   





    

});



module.exports = router;