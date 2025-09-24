const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const player = {};
let currentPlayer = "W";
const path = require("path");

const app = express();
const server = http.createServer(app);
const chess = new Chess;
const io = socket(server);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.render("index");
})
io.on("connection", function (unq) {
    // console.log(chess.turn())
    console.log("connected 1");
    if (!player.white) {
    player.white = unq.id;
    unq.emit("playerRole", "w");
}
else if (!player.black) {
    player.black = unq.id;
    unq.emit("playerRole", "b");
}

    else {
        unq.emit("spectatorRole");
    }
    // console.log(currentPlayer)

    // console.log(player)

    unq.on("disconnect", function () {
        if (unq.id === player.white) {
            delete player.white;
            // delete player.black;

        }
        else if (unq.id === player.black) {
            delete player.black;
            // delete player.white;
        }
    })
    unq.on("move", (move) => {
        try {
            if (chess.turn() === "w" && unq.id !== player.white) return;
            if (chess.turn() === "b" && unq.id !== player.black) return;
            console.log(move);
            const legal = chess.move(move);
            if (legal) {
                currentPlayer = chess.turn();
                // document.querySelector(".role").innerHTML = currentPlayer;
                io.emit("move", move);
                io.emit("boardstate", chess.fen());
            }
            else {
                console.log("Invalid move : ", move);
                unq.emit("invalidmove", move);
            }
        } catch (error) {
            console.log(error.message)
            console.log("Invalid move : ", move);
        }
    })
});

server.listen(3000, () => {
    console.log("server start");
})