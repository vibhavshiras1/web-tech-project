const { RSA_NO_PADDING } = require('constants');
var express = require('express'); 
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var app = express(); 
var PORT = 3000; 

app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup 
app.set('view engine', 'ejs'); 
//app.use(express.static('images'));
  
// Without middleware 
app.get('/',function(req,res){
    res.render('login_signup');
})

app.post('/',function(req,res){
    var username1 = req.body.username1;
    var password1 = req.body.password1;
    var name = req.body.name2;
    var username2 = req.body.username2;
    var email = req.body.email2;
    var phone = req.body.phone2;
    var password2 = req.body.password2;
    //console.log(username1,password1,name,username2,email,phone,password2);
    //res.send('Done');
    //res.redirect('/home');
    if(username1==undefined && password1==undefined){
        MongoClient.connect(url,{useUnifiedTopology : true}, function(err, db){
            if(err) throw err;

            var dbo = db.db("mydb1");
            var info = {
                "name":name,
                "username":username2,
                "email":email,
                "phone":phone,
                "password":password2
            }
            dbo.collection('users_info').insertOne(info,function(err,res){
                if(err) throw err;
                console.log('1 document inserted.');
                db.close();
            })
            
        })
        res.send("Your have signed up!!");
    }
    if(name==undefined && username2==undefined && email==undefined && phone==undefined && password2==undefined){
        MongoClient.connect(url,{useUnifiedTopology : true}, function(err, db){
            if(err) throw err;

            var dbo = db.db("mydb1");
            var query = {username:username1};
            dbo.collection("users_info").find(query).toArray(function(err,result){
                if(err) throw err;
                var password_verify = result[0].password;
                if(password1==password_verify){
                    res.redirect('/home');
                }
                else{
                    res.send("Wrong password.")
                }
                db.close();
              })
            
        })

        //res.redirect('/home');
    }
})

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