const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
  const query=req.body.cityName;
  const apiKey="a3b630b66a45a3d79c38045b8f65afa1";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    //console.log(response.statusCode);
    response.on("data",function(data){
      // console.log(data);
      const weatherData=JSON.parse(data);  // to convert hexadecimal format to JSON format

  const temp=weatherData.main.temp;
  const description=weatherData.weather[0].description;
  const icon=weatherData.weather[0].icon;
  const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

  res.write("<p>Weather is currently "+description+"</p>");
  res.write("<h1>Temperature in "+query+" is "+temp+" degree celcius</h1>");
  res.write("<img src="+imageURL+">");
  res.send();
  // const object={
  //   name: "mansi",
  //   favcolor: "blue"
  // }
  //   console.log(JSON.stringify(object));          //to convert format to a single string

    })
  })

})



app.listen(3000,function(){
  console.log("server is running");
})
