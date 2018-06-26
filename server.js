const express=require('express');
const hbs = require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now= new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if(err){
      console.log('unable to append to log.');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('down.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req, res) =>{
  res.render('home.hbs',{
    pageTitle:'home page',
    welcome: 'Hello welcome'
  })
});

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page 1234',
  });
});

// /bad - errorMesage
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'bad request no data'
  });
});


app.listen(port,()=>{
  console.log(`server on port ${port}`)
});
