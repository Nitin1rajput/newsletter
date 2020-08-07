const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
require('dotenv').config();
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
    


    
    options={
        hostname:"us17.api.mailchimp.com",
        path:"/3.0/lists/297ec8e366",
        method:"POST",
        auth:"nitin1:" + process.env.API_KEY
    }
    const request = https.request(options,function(response){
        if (response.statusCode===200) {
            res.sendFile(__dirname+"/html/success.html");
    
        }else{
            res.sendFile(__dirname+"/html/failure.html");
        }
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })
        console.log(response);
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

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Running at port " + port);
})


