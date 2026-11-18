const { connectDB } = require("../connection");

let GetAdminArtists = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("artists");

    let artists = await collection.find({}).toArray();

    if (artists.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Artists Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      artists: artists,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { GetAdminArtists };