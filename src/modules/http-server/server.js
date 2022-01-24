const express = require("express");
const config = require("../../../config.json");
const app = express();
const path = require("path");
const bp = require("body-parser");
const { sendEmbedMessage } = require("../functions/embedMessages");
const { decrypt } = require("../crypto/crypto");


const hostname = config.host.name;
const port = config.host.port;

let timerData = [];

app.use("*/assets", express.static("public/assets"));
app.use("*/css",express.static("public/css"));
app.use("*/js",express.static("public/js"));
app.use("*/success", express.static("public/success"));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.post("/discord/form/:discordId", (req, res) => {
    const found = timerData.find(user => user.id === decrypt(req.params["discordId"]));

    if (typeof found === "undefined" || Date.now() - found.time >= config.limiter.person) {
        const body = req.body;
        sendEmbedMessage(
            config.channel.ids.judge,
            "Jelentkezési lap",
            "",
            [
                {name: body.q1.question, value: body.q1.answer},
                {name: body.q2.question, value: body.q2.answer},
                {name: body.q3.question, value: body.q3.answer},
                {name: body.q4.question, value: body.q4.answer},
                {name: body.q5.question, value: body.q5.answer},
                {name: body.q6.question, value: body.q6.answer},
                {name: body.q7.question, value: body.q7.answer},
                {name: body.q8.question, value: body.q8.answer},
                {name: "Felhasználó", value: `<@${decrypt(req.params["discordId"])}> - ${body.discord}` }
            ],
            "#5ACFF5",
            true,
            false,
            {text: "Cryptológusok", iconURL: "asd"}
        );
        timerData.push({id: decrypt(req.params["discordId"]), time: Date.now()})
        res.status(200).send({href:"https://cryptologusok.hu/success/success.html"});
        return;
    }
    res.status(403).send({time: Date.now(), error: "403 - Forbidden"});
});

app.get("/form/:id", (req, res) => {
    res.sendFile(path.join(process.cwd(),"/views/index.html"));
});

setInterval(()=>{
    for (let i=0; i<timerData.length; i++){
        if (Date.now() - timerData[i].time >= config.limiter.person){
            timerData.splice(i, 1);
        }
    }
},config.limiter.person);

exports.listen = () => {
    app.listen(port, (error) =>{
        if (error) throw error;
        console.log(path.join(process.cwd(), "/public"));
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}