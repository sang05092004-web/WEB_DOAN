const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    res.render("dashboard");

});

app.get("/monitor", (req, res) => {

    res.render("monitor");

});

let systemData = {

    autoMode:false,
    systemRun:false,
    fault:false,

    teaPercent:"100",
    milkPercent:"100",
    sugarPercent:"100",
    icePercent:"100"

};

io.on("connection", (socket) => {

    console.log("Client Connected");

    socket.emit("syncData", systemData);

    socket.on("toggleAuto", () => {

        systemData.autoMode = !systemData.autoMode;

        io.emit("syncData", systemData);

    });

    socket.on("startSystem", () => {

        if(systemData.autoMode){

            systemData.systemRun = true;

            io.emit("syncData", systemData);

        }

    });

    socket.on("stopSystem", () => {

        systemData.systemRun = false;

        io.emit("syncData", systemData);

    });

    socket.on("resetSystem", () => {

        systemData.fault = false;

        io.emit("syncData", systemData);

    });
    socket.on("setTea",(value)=>{

    systemData.teaPercent = value;

    io.emit("syncData",systemData);

});

socket.on("setMilk",(value)=>{

    systemData.milkPercent = value;

    io.emit("syncData",systemData);

});

socket.on("setSugar",(value)=>{

    systemData.sugarPercent = value;

    io.emit("syncData",systemData);

});

socket.on("setIce",(value)=>{

    systemData.icePercent = value;

    io.emit("syncData",systemData);

});
    

});

server.listen(3000, "0.0.0.0", () => {

    console.log("Server Running");

});