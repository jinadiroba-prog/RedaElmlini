const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.post("/log", (req, res) => {
    const ip =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;

    const log = {
        ip: ip,
        device: req.body.userAgent,
        platform: req.body.platform,
        language: req.body.language,
        screen: req.body.screen,
        enteredAt: req.body.enteredAt
    };

    console.log(log);

    fs.appendFileSync(
        "logs.txt",
        JSON.stringify(log) + "\n"
    );

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log("Server running");
});