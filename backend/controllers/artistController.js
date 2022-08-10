const converter = require("json-2-csv");
const fs = require("fs");
const artistJson = require("../assets/randomArtists.json");

const getRandomArtist = () => {
  let item = artistJson[Math.floor(Math.random() * artistJson.length)];
  return item;
};

const getItems = async (req, res) => {
  let fileName = req.query.filename || "output";
  let artist = req.params.searchQuery;
  let url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${process.env.API_KEY}&format=json`;

  try {
    let response = await fetch(url);
    response = await response.json();
    if (response.error) {
      throw Error(response.message);
    }
    response = response.results.artistmatches.artist;
    if (response.length < 1) {
      response = getRandomArtist();
      fs.writeFileSync(`./backend/output/${fileName}.txt`, response);
      res.status(404).json({
        msg: `No artists found for the search query: "${artist}"! Exported random artist name instead.`,
      });
    } else {
      converter.json2csv(response, (err, csv) => {
        if (err) {
          throw err;
        }

        fs.writeFileSync(`./backend/output/${fileName}.csv`, csv);
      });

      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getItems,
};
