const { connectDB } = require("../connection");
const { ObjectId } = require("mongodb");

let EditAdminPlan = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("plans");

    let { id } = req.params;
    let { name, price, duration, description, features, status } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid plan ID",
      });
    }

    if (
      !name ||
      price === undefined ||
      !duration ||
      !description ||
      !Array.isArray(features)
    ) {
      return res.status(400).send({
        success: false,
        message: "All plan fields are required",
      });
    }

    let planExists = await collection.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      _id: { $ne: new ObjectId(id) },
    });

    if (planExists) {
      return res.status(400).send({
        success: false,
        message: "Another plan with this name already exists",
      });
    }

    let result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: name.trim(),
          price: Number(price),
          duration,
          description,
          features,
          status: status || "Active",
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Plan not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Plan updated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { EditAdminPlan };
