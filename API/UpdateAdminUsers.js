const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let UpdateAdminUsers = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("users");

    let { user_id, username, email, profileImage } = req.body;

    if (!user_id || !ObjectId.isValid(user_id)) {
      return res.status(400).send({
        success: false,
        message: "Valid User ID is required",
      });
    }

    let update = {
      updatedAt: new Date(),
    };

    if (username !== undefined) update.username = username;
    if (email !== undefined) update.email = email;
    if (profileImage !== undefined) update.profileImage = profileImage;

    if (email !== undefined) {
      let existingUser = await collection.findOne({
        email,
        _id: { $ne: ObjectId.createFromHexString(user_id) },
      });

      if (existingUser) {
        return res.status(409).send({
          success: false,
          message: "Email already exists",
        });
      }
    }

    let updateUser = await collection.updateOne(
      { _id: ObjectId.createFromHexString(user_id) },
      { $set: update },
    );

    if (updateUser.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { UpdateAdminUsers };