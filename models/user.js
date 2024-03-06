const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/stock")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const schema = new mongoose.Schema({
  name: String,
  pass: String,
  startedAt: Number,
  endedAt: Number
});

const usermodel = mongoose.model("investors", schema);

module.exports = usermodel;

/*



home_screen [icon: home] {
  auth(middleware)  // this is done 
    name string                                     user ke model 
                                                    name 
                                                    password
                                                    startedAt 
                                                    endedAt
  
  startedAt number
  endedAt number

  
}

game(model)  {
  name string
  startedAt number
   endedAt number 
}

signup  {
   name string
   password string 
}
login{
  referallbonus
}

signup.name <> home_screen.name
signup.name <> game(model).name



*/
