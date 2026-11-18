const { connectDB } = require("../connection");

let AddAdminUsers = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("users");

    let { username, email, profileImage } = req.body;

    if (!username || !email) {
      return res.status(400).send({
        success: false,
        message: "Username and email are required",
      });
    }

    let existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Email already exists",
      });
    }

    let insertUser = await collection.insertOne({
      username,
      email,
      profileImage: profileImage || "",
      createdAt: new Date(),
    });

    if (insertUser.acknowledged) {
      return res.status(201).send({
        success: true,
        message: "User added successfully",
        user_id: insertUser.insertedId,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { AddAdminUsers };