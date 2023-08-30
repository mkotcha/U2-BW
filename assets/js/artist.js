const options = {
  method: "GET",
  url: "https://deezerdevs-deezer.p.rapidapi.com/search",
  params: { q: "eminem" },
  headers: {
    "X-RapidAPI-Key": "4dee4a6d79msh10e7f11101e9eafp1eb14cjsn68ce37f58686",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

async function fetchArtistData() {
  try {
    const response = await axios.request(options);
    const artistData = response.data.data[0].artist;
    const artistList = document.getElementById("artist-list");
    const popularSongs = response.data.data.slice(0, 10);
    artistList.innerHTML = "";
    let songNumber = 1;

    document.getElementById("artist-name").textContent = artistData.name;
    const artistImage = document.getElementById("artist-image");
    artistImage.style.backgroundImage = `url(${artistData.picture_xl})`;

    popularSongs.forEach((song, index) => {
      const listItemContainer = document.createElement("div");
      listItemContainer.className = "artist-list-items-container p-2 px-3 rounded-2 row";

      const listItem = document.createElement("li");
      listItem.className = "row d-flex align-items-center justify-content-between";

      listItem.innerHTML = `
      <span class="col">${songNumber}</span>
      <div id="artist-song-title" class="d-flex col-6">
      <img src="${song.album.cover_small}" class="me-3" width="40" height="40" alt="" />
      <div>
        <div class="text-white">${song.title}</div>
        <i class="bi bi-explicit-fill text-secondary"></i>
      </div>
    </div>
    <div id="artist-song-plays" class="d-flex col-3">${song.rank}</div>
    <div id="artist-song-minutes" class="d-flex col-2 justify-content-between align-items-center">
      <div><i class="bi bi-heart"></i></div>
      <div>${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, "0")}</div>
      <div class="dropdown">
        <a class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i
            class="bi bi-three-dots"
            data-toggle="tooltip"
            data-placement="top"
            title="Altre opzioni per"
          ></i>
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
          <li><hr class="dropdown-divider" /></li>
        </ul>
      </div>
    </div>
  `;

      if (index >= popularSongs.length - 5) {
        listItemContainer.classList.add("d-none");
        listItemContainer.classList.add("hidden-item");
      }

      songNumber++;
      listItemContainer.appendChild(listItem);
      artistList.appendChild(listItemContainer);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchArtistData();

const showMoreButton = document.getElementById("showMoreButton");

let areSongsVisible = false;

showMoreButton.addEventListener("click", () => {
  const hiddenItems = document.querySelectorAll(".hidden-item");

  if (areSongsVisible) {
    hiddenItems.forEach(item => {
      item.classList.add("d-none");
    });
    showMoreButton.textContent = "Visualizza altro";
  } else {
    hiddenItems.forEach(item => {
      item.classList.remove("d-none");
    });
    showMoreButton.textContent = "Mostra meno";
  }

  areSongsVisible = !areSongsVisible;
});
