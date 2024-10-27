const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Registration function
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    console.log("Salt:", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      validDocument: req.file.path ,
    });

    // res.status(201).json({ message: "User registered successfully" });
    res.render("login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "jpsecret",
      {
        expiresIn: "1h",
      }
    );
    

    //checking whether user is jobseeker or employer
    
     if(user.role === 'Employer'){
      res.render("employer_dashboard");
    }
    else if(user.role === 'Admin'){
      res.render("admin_dashboard");
    }
    else{
      res.render("jobseeker_dashboard");
    }

    // res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
