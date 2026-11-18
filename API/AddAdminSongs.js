const { connectDB } = require("../connection");

let AddAdminSongs = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("songs");

    let {
      title,
      artist,
      image,
      category,
      type,
      album,
      year,
      duration,
      songsCount,
      albumDuration,
      audio,
      description,
      tracks,
    } = req.body;

    if (
      !title ||
      !artist ||
      !image ||
      !category ||
      !type ||
      !album ||
      year === undefined ||
      year === ""
    ) {
      return res.status(400).send({
        success: false,
        message: "All required fields must be filled",
      });
    }

    let newSong = {
      title,
      artist,
      image,
      category,
      type,
      album,
      year: Number(year),
      duration: duration || "",
      songsCount: Number(songsCount) || 1,
      albumDuration: albumDuration || "",
      audio: audio || "",
      description: description || "",
      tracks: Array.isArray(tracks) ? tracks : [],
      created_at: new Date(),
    };

    let insertSong = await collection.insertOne(newSong);

    if (insertSong.acknowledged) {
      return res.status(201).send({
        success: true,
        message: "Song added successfully",
        song_id: insertSong.insertedId,
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

module.exports = { AddAdminSongs };