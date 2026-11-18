const { connectDB } = require("../connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let jwtSecret = process.env.JWT_SECRET;

let AdminLogin = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("admin");
    let {email, password} = req.body;

    if (!email) {return res.status(400).send({message: "Email is required"});
    }
    if (!password) {return res.status(400).send({message: "Password is required"});
    }

    let adminExists = await collection.findOne({email});
    if (!adminExists) {return res.status(404).send({message: "Invalid admin email"});
    }
    if (password !== adminExists.password) {return res.status(401).send({message: "Invalid password"});
    }

    let adminData = {
      id: adminExists._id,
      email: adminExists.email,
    };

    let token = jwt.sign(adminData, jwtSecret, { expiresIn: "1h" });

    return res.status(200).send({message: "Admin login successful", token, admin: adminData});
  } catch (e) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

module.exports = { AdminLogin };
