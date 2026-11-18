const { connectDB } = require("../connection");

let GetAdminPlaylists = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("playlists");

    let playlists = await collection.find({}).toArray();

    if (playlists.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Playlists Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      playlists: playlists,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { GetAdminPlaylists };