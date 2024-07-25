require('dotenv').config({ path: '../.env' });

const express=require('express');
const connectDB = require('./config/dbconfig.js');
const app=express();

app.use(express.json())

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERRR: ", error);
        throw error;
    })
    app.listen(process.env.PORT || 5000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
    
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

const usersRoute=require('./routes/usersRoute.js')
const transactionsRoute = require("./routes/transactionsRoute");
const requestsRoute = require("./routes/requestsRoute");
app.use('/api/users',usersRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/requests", requestsRoute);
const path=require("path");
if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  
  }