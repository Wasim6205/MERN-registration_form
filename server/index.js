const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./database/dbconnect");
const User = require("./models/User");
const cors = require("cors");

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`app is successfully running at port ${port}`);
});

// app.use("/api/v1",user);

dbConnect();

app.get("/", (req, res) => {
  res.send("app is running successfully");
});


// signup route
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ sucess: false, message: "All fields are required" });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot registered",
    });
  }
});

// login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "please signup first",
      });
    }

    if(user.password != password)
    {
      return res.status(403).json({
        success:false,
        message:"Password incorrect",
      })
    }

    return res.status(200).json({
      success: true,
      message: "User login successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
});
