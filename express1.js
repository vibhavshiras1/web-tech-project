const { RSA_NO_PADDING } = require('constants');
var express = require('express'); 
var app = express(); 
var PORT = 3000; 

// View engine setup 
app.set('view engine', 'ejs'); 
//app.use(express.static('images'));
  
// Without middleware 
app.get('/home', function(req, res){ 
  
    // Rendering home.ejs page 
    res.render('home'); 
    
}) 

//document.getElementById('info_btn').addEventListener("click",func1);

app.post('/home/info',function(req,res){
    res.render('info');

})

app.post('/home/action',function(req,res){
    res.render('action');
})

app.post('/home/drama',function(req,res){
    res.render('drama');
})

app.post('/home/thriller',function(req,res){
    res.render('thriller');
})

app.get('/home/action/venom',function(req,res){
    res.render('venom');
})


/*app.get('/user2',function(req,res){
    res.render('home1');
})*/
  
app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
}); 