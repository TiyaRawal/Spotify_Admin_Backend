const { connectDB } = require("../connection");

let GetAdminSongs = async (req, res) => {
  try {
    let db = await connectDB();

    let songs = await db.collection("songs").find({}).toArray();

    return res.status(200).send({
      songs: songs,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = { GetAdminSongs };