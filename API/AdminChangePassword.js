const { connectDB } = require("../connection");
const { ObjectId } = require("mongodb");

let AdminChangePassword = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("admin");

    let { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).send({ message: "Current password is required" });
    }

    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    if (!confirmPassword) {
      return res.status(400).send({ message: "Confirm password is required" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send({ message: "New password and confirm password do not match" });
    }

    if (currentPassword === newPassword) {
      return res
        .status(400)
        .send({
          message: "New password must be different from current password",
        });
    }

    let adminExists = await collection.findOne({
      _id: new ObjectId(req.admin.id),
    });

    if (!adminExists) {
      return res.status(404).send({ message: "Admin not found" });
    }

    if (currentPassword !== adminExists.password) {
      return res.status(401).send({ message: "Current password is incorrect" });
    }

    let result = await collection.updateOne(
      { _id: adminExists._id },
      { $set: { password: newPassword } },
    );

    if (result.modifiedCount === 0) {
      return res.status(400).send({ message: "Password was not updated" });
    }

    return res.status(200).send({
      message: "Password changed successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { AdminChangePassword };