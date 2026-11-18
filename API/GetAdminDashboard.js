const { connectDB } = require("../connection");

let GetAdminDashboard = async (req, res) => {
  try {
    let db = await connectDB();
    let totalSongs = await db.collection("songs").countDocuments();
    let totalArtists = await db.collection("artists").countDocuments();
    let totalUsers = await db.collection("users").countDocuments();
    let totalPlaylists = await db.collection("playlists").countDocuments();
    let totalCategories = await db.collection("BrowseCategory").countDocuments();

    let totalAds = await db.collection("ads").countDocuments();
     let recentSongs = await db.collection("songs").find({}).sort({_id:-1}).limit(5).toArray();

    return res.status(200).send({
      totalSongs: totalSongs,
      totalArtists: totalArtists,
      totalUsers: totalUsers,
      totalPlaylists: totalPlaylists,
      totalCategories: totalCategories,
      totalAds: totalAds,
      recentSongs: recentSongs
    });
  } catch (e) {
    return res.status(500).send({message: "Internal Server Error"});
  }
};

module.exports = { GetAdminDashboard };