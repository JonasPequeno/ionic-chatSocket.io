const http = require("http").Server();
const io = require("socket.io")(http);

io.on("connection", socket => {
    console.log('Usuario conecatado');
    socket.on("user-connected", user => {

        console.log('Usuario conecatado -- ' + user);
        socket.user = user;

        socket.broadcast.emit("users-changed", { user: user, event: "connected" });
    });

    socket.on("message", data => {
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        io.emit("users-changed", { user: socket.user, event: "disconnected" });
    });
});

let port = Number(process.env.PORT || 3000);

http.listen(port, () => {
    console.log("Rodando em ==> " + port);
});