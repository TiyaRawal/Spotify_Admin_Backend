const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let UpdateAdminSongs = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("songs");

    let { id } = req.params;

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

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Valid Song ID is required",
      });
    }

    let update = {
      updated_at: new Date(),
    };

    if (title !== undefined) update.title = title;
    if (artist !== undefined) update.artist = artist;
    if (image !== undefined) update.image = image;
    if (category !== undefined) update.category = category;
    if (type !== undefined) update.type = type;
    if (album !== undefined) update.album = album;
    if (year !== undefined) update.year = Number(year);
    if (duration !== undefined) update.duration = duration;
    if (songsCount !== undefined) update.songsCount = Number(songsCount);
    if (albumDuration !== undefined) update.albumDuration = albumDuration;
    if (audio !== undefined) update.audio = audio;
    if (description !== undefined) update.description = description;

    if (tracks !== undefined) {
      if (!Array.isArray(tracks)) {
        return res.status(400).send({
          success: false,
          message: "Tracks must be an array",
        });
      }

      update.tracks = tracks;
    }

    let updateSong = await collection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: update },
    );

    if (updateSong.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Song not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Song updated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { UpdateAdminSongs };