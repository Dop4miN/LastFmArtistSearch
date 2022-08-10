# Artist Search and CSV Export

This repository is a REST API for last.fm's [artist.search](https://www.last.fm/api/show/artist.search) endpoint. It creates a RESTful webservice on `http://localhost:5000/api/artists/{artistname}`.


## Usage

To search for an artist, make a GET request on `http://localhost:5000/api/artists/{artistname}`.
This will give you the results in a JSON format. The response will then be exported as a CSV file in the output folder. If you'd like to have a specific output name, just append the `filename` query parameter to the URI:

`http://localhost:5000/api/artists/{artistname}?filename=someFileName`

This will create a `someFileName.csv`.

If there are no results for the given artist, it will create a `.txt` file with a random artist name inside. (taken from `/assets/randomArtists.json`)

## Installation

After cloning the repository, make sure, that you create a `.env` file at the root. It should look somewhat like this (with your own api key):

Example:
```
PORT = 5000
API_KEY = lastfmapikey1337
```

Then you can just install the dependencies with `nmp i`.

To get the server running, call `npm start`.