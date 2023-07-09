//jshint esversion: 6
const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const request=require("request");
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res)
{
    const email=req.body.email;
    const pass=req.body.password;
    const data={
        members: [
        {
        email_address:email,
        status: "subscribed",
        merge_fields:{
            FNAME:pass
        }
        }
        
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/72240fdb3b";
    const options={
        method:"post",
        auth: "teesha:7f1409ffc390e827b51c557e6db3f896-us21"
    }
   const request= https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
            if(response.statusCode===200)
            {
            
                res.sendFile(__dirname+"/success.html");
            }
            else
            {
                
                    res.sendFile(__dirname+"/failure.html");
            }
           
            
        })
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
    console.log("server started");
})

//7f1409ffc390e827b51c557e6db3f896-us21
//