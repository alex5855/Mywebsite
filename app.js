const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

/////////////***********Contact form DataBase *********************/////////

const url = "mongodb+srv://Habilla885:habilla@cluster0.qvb54.mongodb.net/userDB?retryWrites=true&w=majority";
mongoose.connect(url);
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    messege:String
});
const User = mongoose.model("User",userSchema);

/////////////***********login credentials DataBase *********************/////////
// schema 
const logSchema = new mongoose.Schema({
    email:String,
    password:String
});

const Login = mongoose.model("Login",logSchema);

/////////////////////*****************************///////////////////

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});
 
app.post("/index.html", (req, res) => {

    const userLog = new Login({
        email:req.body.logemail,
        password:req.body.logpass
    });
    userLog.save();

    res.sendFile(__dirname + "/index.html");
})

app.post("/success", (req, res) => {
    const userName = req.body.uname;
    const userEmail = req.body.uemail;
    const userSubject = req.body.usubject;
    const usermsg = req.body.umsg;

    const userN = new User({
        name: userName,
        email:userEmail,
        subject:userSubject,
        messege:usermsg
    });

    userN.save();

    res.render("success");
});

app.post("/login.html", (req, res) => {
    res.redirect("/");
})

app.post("/mycontact",(req,res)=>{
    res.sendFile(__dirname + "/mycontact.html");
});













app.listen(3000, () => {
    console.log(`Server started on port`);
});