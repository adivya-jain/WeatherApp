const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
 res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res)
{
    const query=req.body.CityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=dab868a2a76d48998617885e89872fb6"
    https.get(url, function (response) {
        console.log(response.statusCode);



        response.on("data", function (data) {
            // console.log(data)//will give data in hexadecimal formate

            const weatherdata = JSON.parse(data)
            console.log(weatherdata)



            const object = {
                name: "Adivya",
                age: "19"

            }

            // const obj1 = JSON.stringify(object);//does oppossite of parse
            console.log(JSON.stringify(object))
            // console.log(JSON.parse(obj1)


            const temp = weatherdata.main.temp
            const weatherDescription = weatherdata.weather[0].description




            const icon = weatherdata.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"



            // res.send("<h1>temperature in london is"+temp+"celcius degrees </h1>")//now if we have to send multiple lines then we will use res.write mulitpletimes and then lastly res.send
            res.write("<p> weather description in "+ query +" is " + weatherDescription + "</p>")
            res.write("<h1>temperature in "+ query +" is " + temp + " celcius degrees </h1>")
            res.write("<img src=" + imageURL + "></img>")

            res.send()








            //only one res.send can be used in one app.get


        })
    })
})




app.listen(3000, function () {
    console.log("server is running on port 3000")
})