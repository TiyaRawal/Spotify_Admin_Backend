const { connectDB } = require("../connection");

let GetAdminUsers = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("users");

    let users = await collection
      .find(
        {},
        {
          projection: {
            password: 0,
          },
        },
      )
      .toArray();

    if (users.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Users Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      users: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { GetAdminUsers };