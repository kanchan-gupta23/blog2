require('dotenv').config();

const express = require("express")
const app = express()
const connectDB = require("./db/mongodb")
const router = require("./router/auth-router");
const PORT = 8000
const cors = require ("cors")
const corsOptions = {
    origin: "http://localhost:5173",  // Frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
    optionsSuccessStatus: 200,
  };
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);
app.use(express.urlencoded({ extended: true }));                                



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);   
    });
});

module.exports = app;