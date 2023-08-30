const artistId = 13;
const options = {
  url: `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`,
  headers: {
    "X-RapidAPI-Key": "4dee4a6d79msh10e7f11101e9eafp1eb14cjsn68ce37f58686",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

async function fetchArtistData() {
  try {
    const response = await axios.request(options);
    const artistData = response.data;

    document.getElementById("artist-name").textContent = artistData.name;
    const artistImage = document.getElementById("artist-image");
    artistImage.style.backgroundImage = `url(${artistData.picture_xl})`;
  } catch (error) {
    console.error(error);
  }
}

fetchArtistData();
