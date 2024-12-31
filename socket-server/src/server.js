const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const PORT = 3030;

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log(socket.id);
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", `${socket.id}: ${msg}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
