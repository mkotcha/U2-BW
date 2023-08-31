const urlParams = new URLSearchParams(window.location.search);
const artistName = urlParams.get("id");

const artistOptions = {
  method: "GET",
  url: "https://deezerdevs-deezer.p.rapidapi.com/search",
  params: { q: artistName },
  headers: {
    "X-RapidAPI-Key": "4dee4a6d79msh10e7f11101e9eafp1eb14cjsn68ce37f58686",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

async function fetchArtistData() {
  try {
    const response = await axios.request(artistOptions);
    const artistCardContainer = document.getElementById("artist-card-container");

    //ARTIST DATA
    const artistData = response.data.data[0].artist;
    const artistList = document.getElementById("artist-list");
    const popularSongs = response.data.data.slice(0, 10);

    //ALBUM DATA
    const artistpageAlbumData = response.data.data[0].album;

    //ALBUM COVER
    const artistpageAlbumCoverURL = artistpageAlbumData.cover_medium;
    const artistpageAlbumCover = document.getElementById("artist-album-image");
    artistpageAlbumCover.src = artistpageAlbumCoverURL;
    const artistAlbumLink = document.getElementById("artist-album-link");
    artistAlbumLink.href = `album.html?id=${artistpageAlbumData.id}`;

    //ALBUM TITLE
    const artistpageAlbumTitle = artistpageAlbumData.title;
    const artistpageAlbumTitleContainer = document.getElementById("artist-album-title");
    artistpageAlbumTitleContainer.textContent = artistpageAlbumTitle;
    artistpageAlbumTitleContainer.href = `album.html?id=${artistpageAlbumData.id}`;

    //ARTIST FAN NUMBER

    const artistId = artistData.id;

    const artistInfoOptions = {
      method: "GET",
      url: `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`,
      headers: {
        "X-RapidAPI-Key": "4dee4a6d79msh10e7f11101e9eafp1eb14cjsn68ce37f58686",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    async function fetchArtistInfo() {
      try {
        const response = await axios.request(artistInfoOptions);

        const artistInfoData = response.data;

        console.log("Artist Info Data:", artistInfoData);
        const artistFans = artistInfoData.nb_fan;
        const artistFansNb = document.getElementById("artist-fan-nb");
        artistFansNb.textContent = artistFans.toLocaleString();
      } catch (error) {
        console.error(error);
      }
    }
    fetchArtistInfo();

    const artistNameElements = document.querySelectorAll("#artist-name");

    artistNameElements.forEach(element => {
      element.innerHTML = artistData.name;
    });
    const artistImage = document.getElementById("artist-image");
    artistImage.style.backgroundImage = `url(${artistData.picture_xl})`;

    const artistIconUrl = artistData.picture;
    const artistIcon = document.getElementById("artist-icon");
    artistIcon.src = artistIconUrl;

    artistList.innerHTML = "";
    let songNumber = 1;
    //FUNZIONE PER CREARE LE CANZONI
    popularSongs.forEach((song, index) => {
      const listItemContainer = document.createElement("div");
      listItemContainer.className = "artist-list-items-container p-2 px-3 rounded-2 row justify-content-between";
      listItemContainer.addEventListener("mouseenter", () => {
        const songOptions = listItemContainer.querySelector(".song-options");
        songOptions.classList.add("active");
      });

      listItemContainer.addEventListener("mouseleave", () => {
        const songOptions = listItemContainer.querySelector(".song-options");
        songOptions.classList.remove("active");
      });

      const listItem = document.createElement("li");
      listItem.className = "row d-flex align-items-center justify-content-between p-0";

      listItem.innerHTML = `
      <div class="d-flex col-6 col-md-6 col-lg-7 flex-grow-1">
      <span class="align-items-center song-number justify-content-between">${songNumber}</span>
      <div id="artist-song-title" class="d-flex text-truncate">
        <img src="${song.album.cover_small}" class="me-3" width="40" height="40" alt="" />
        <div class="d-flex flex-column justify-content-around text-truncate">
          ${song.title} ${song.explicit_lyrics ? '<i class="bi bi-explicit-fill text-secondary"></i>' : ""}
        </div>
      </div>
    </div>
    <div id="artist-song-plays" class="d-none d-lg-block col col-lg-3">
      <div class="d-flex text-end">${song.rank.toLocaleString()}</div>
    </div>
    <div id="artist-song-minutes" class="d-flex col-4 col-lg-2 align-items-center justify-content-between">
      <div><i class="bi bi-heart me-3 song-options"></i></div>
      <div>${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, "0")}</div>
        <div class="dropdown song-options">
          <a class="btn " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-three-dots " data-toggle="tooltip" data-placement="top" title="Altre opzioni per"></i>
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

      const songNumberContainer = listItem.querySelector(".song-number");
      const originalNumber = songNumber;

      listItemContainer.addEventListener("mouseenter", () => {
        songNumberContainer.innerHTML = '<i class="bi bi-play-fill"></i>';
      });

      listItemContainer.addEventListener("mouseleave", () => {
        songNumberContainer.innerHTML = originalNumber;
      });

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
