const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.sendFile(__dirname+"/html/index.html");
});

app.post("/", function(req,res){
   
    
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    const check = req.body.check;
    console.log(firstName,lastName);
    const data = {
        members: [
            {
                email_address:email,
                status:check,
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    


    url = "https://us17.api.mailchimp.com/3.0/lists/297ec8e366"
    options={
        method:"POST",
        auth:"nitin1:c8d20354fff2b4087992c16bc190ec18-us17"
    }
    const request = https.request(url,options,function(response){
        if (response.statusCode===200) {
            res.sendFile(__dirname+"/html/success.html");
    
        }else{
            res.sendFile(__dirname+"/html/failure.html");
        }
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })

    });

    

    
    
    request.write(jsonData);
    request.end();
});

app.post("/success",function(req,res){
    res.redirect("/");
});
app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Running");
})



// List id 
// 297ec8e366

// API Key 
// c8d20354fff2b4087992c16bc190ec18-us17