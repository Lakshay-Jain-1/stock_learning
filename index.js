const { createServer } = require("node:http");
const express = require("express");
const { Server } = require("socket.io");
const { join } = require("node:path");

const cookieParser = require("cookie-parser");
const user = require("./models/user");
const app = express();

//for chat bot
const { Configuration, OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.static(join(__dirname, "public")));

const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get("/", (req, res) => {
  const data = Boolean(req.cookies.loggedin);
  console.log("New Data", data);
  if (data) {
    res.sendFile(join(__dirname, "ht.html"));
  } else {
    res.redirect("/login");
  }
});
app.post("/", async (req, res) => {
  console.log(req.cookies);
  const d = new Date();
  const document = await user.findOne({ name: req.name });
  console.log(document);
  // document.endedAt = document.startedAt - d.getMinutes();
  // const updated = user.findOneAndReplace({ getname }, document);
  res.clearCookie("loggedin").redirect("/login");
});

app.get("/login", (req, res) => {
  console.log(req.cookies.loggedin);
  const data = Boolean(req.cookies.loggedin);
  if (data) {
    console.log(1);
    res.redirect("/");
  } else {
    res.render("login");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { name, pass } = req.body;
    const check = await user.findOne({ name: name });
    if (check) {
      console.log(1);
      req.user = name;
      res
        .clearCookie()
        .cookie("name", `${name}`)
        .cookie("loggedin", `true`, { path: "/" })
        .redirect("/");
    } else {
      res.clearCookie().redirect("/signup");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/lead",async(req,res)=>{
  const alldata= await user.find({})
  console.log(alldata)
  res.render("leaderboard",{user:alldata})
})


app.get("/stock", (req, res) => {
  res.sendFile(join(__dirname, "stock.html"));
});
app.get("/quiz", (req, res) => {
  res.sendFile(join(__dirname, "quiz.html"));
});
app.get("/com", (req, res) => {
  res.sendFile(join(__dirname, "com.html"));
});
app.get("/quizrew.html", (req, res) => {
  res.sendFile(join(__dirname, "reward.html"));
});
app.get("/news", (req, res) => {
  res.sendFile(join(__dirname, "news.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(join(__dirname, "game.html"));
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/casestudy")

app.post("/signup", async (req, res) => {
  try {
    const { name, pass } = req.body;
    const date = new Date().getSeconds();
    console.log("data", date);
    const user_info = await user.create({
      name,
      pass,
      startedAt: date,
      endedAt: 0,
    });
    res
      .cookie("name", `${name}`)
      .cookie("loggedin", `true`, { path: "/" })
      .redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// i am touching this section
io.on("connection", (socket) => {
  const soc = socket.handshake.headers.cookie || socket.request.headers.cookie;
  console.log(soc);
  console.log(soc.split(";")[0].split("=")[1]);

  socket.on("check", async (data) => {
    try{
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${data.check} and  answer it in indian finance context and   it should be in fun and unique way and easy to understand and you could roast also and should be short in 20 words`,
          },
        ],
      });
  
      const data_gpt = chatCompletion.choices[0].message.content;
  
      io.emit("chatgpt", { message: `${data_gpt}` });
    }catch(err){
      console.log(err)
    }
    
  });

  socket.on("disconnect", async () => {
    const d = new Date();
    try {
      const document = await user.findOne({
        name: soc.split(";")[0].split("=")[1],
      });
      console.log(document);
      document.endedAt += Number(d.getSeconds()) -  Number(document.startedAt) ;
      console.log(document);
      const updated = await user.findOneAndUpdate(
        { name: soc.split(";")[0].split("=")[1] },
        document
      );
      console.log("updated")
    } catch (err) {

      console.log("User disconnected");
    }
  });
});

/// ---------------------------------- finishing this section

server.listen("4000", () => {
  console.log("Server is connected");
});
