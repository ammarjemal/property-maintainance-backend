const express = require("express");
const database = require("./database/database");
const bodyparser = require("body-parser");
const serviceRouter = require("./router/serviceRouter");
const adminRouter = require("./router/adminRouter");
const advertismentRouter = require("./router/advertismentRouter");
const app = express();
const cors = require('cors');

database();
const PORT = 5000
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyparser.json());

// app.use(express.static('public'));

app.use("/", serviceRouter);
app.use("/", adminRouter);
app.use("/", advertismentRouter);

// app.listen(5000, (req, res) => {
//   console.log("Listening on port 5000");
// });


let users = []

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});