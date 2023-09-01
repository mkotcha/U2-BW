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
      listItemContainer.className = "artist-list-items-container p-2 px-3 rounded-2 justify-content-between";

      const listItem = document.createElement("li");
      listItem.className = "row d-flex align-items-center justify-content-between p-0";

      listItem.innerHTML = `
      <div class="d-flex col-6 col-md-6 col-lg-6 flex-grow-1">
      <span onclick="playTrack(${
        song.id
      })" class="align-items-center song-number justify-content-between">${songNumber}</span>
      <div id="artist-song-title" class="d-flex text-truncate align-middle">
        <div class="m-auto "><img src="${song.album.cover_small}" class="me-3" width="40" height="40" alt="" /></div>
        <div class="d-flex flex-column justify-content-around text-truncate">
        <p class="text-truncate m-0">
          <a id="artist-song-link" href="track.html?id=${
            song.id
          }" class="text-white artist-song-link text-decoration-none">
          ${song.title} 
        </a>
        </p>
      ${song.explicit_lyrics ? '<i class="bi bi-explicit-fill text-secondary-emphasis"></i>' : ""}
        </div>
      </div>
    </div>
    <div id="artist-song-plays" class="d-none d-lg-block col col-lg-3">
      <div class="d-flex text-end">${song.rank.toLocaleString()}</div>
    </div>
    <div id="artist-song-minutes" class="d-flex col-4 col-lg-3 align-items-center justify-content-between">
      <i id="heart-icon" class="plusPiu bi bi-suit-heart me-3 heart-icon heart-icon-clickable flex-grow-1" style="width:20px"></i>
      <div width="20px" class="flex-grow-1">${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(
        2,
        "0"
      )}</div>
        <div class="dropdown dots-icon flex-grow-1">
          <a class="btn border-0" style="width:20px" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="plusPiuDot bi bi-three-dots" data-toggle="tooltip" data-placement="top" title="Altre opzioni per"></i>
          </a>
          <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Salva in playlist</a></li>
          <li><a class="dropdown-item" href="#">Togli dalla playlist</a></li>
          <li><a class="dropdown-item" href="#">Aggiungi in coda</a></li>
          </ul>
      </div>
    </div>
    
  `;

      //FUNZIONE PER LO SFONDO DELLE CANZONI
      function handleSongClick(songContainer) {
        const allSongContainers = document.querySelectorAll(".artist-list-items-container");
        allSongContainers.forEach(container => {
          container.classList.remove("selected-song");
        });

        songContainer.classList.add("selected-song");
      }

      function handleSongClick(songContainer) {
        const heartIcon = songContainer.querySelector(".heart-icon-clickable");

        if (heartIcon) {
          if (!heartIcon.classList.contains("green")) {
            heartIcon.classList.add("green");
            heartIcon.classList.remove("heart-icon");
          } else {
            heartIcon.classList.remove("green");
            heartIcon.classList.add("heart-icon");
          }
        }
      }

      const allSongContainers = document.querySelectorAll(".artist-list-items-container");
      allSongContainers.forEach(container => {
        container.addEventListener("click", () => {
          handleSongClick(container);
        });
      });

      listItemContainer.addEventListener("mouseenter", () => {
        const heartIcon = listItemContainer.querySelector("#heart-icon");
        const dotsIcon = listItemContainer.querySelector(".dots-icon");
        heartIcon.classList.add("active");
        dotsIcon.classList.add("active");
      });

      listItemContainer.addEventListener("mouseleave", () => {
        const heartIcon = listItemContainer.querySelector("#heart-icon");
        const dotsIcon = listItemContainer.querySelector(".dots-icon");
        heartIcon.classList.remove("active");
        dotsIcon.classList.remove("active");
      });

      //SOSTITUISCO I NUMERI CON L'ICONA PLAY

      const songNumberContainer = listItem.querySelector(".song-number");
      const originalNumber = songNumber;

      listItemContainer.addEventListener("mouseenter", () => {
        songNumberContainer.innerHTML = '<i class="bi bi-play-fill"></i>';
      });

      listItemContainer.addEventListener("mouseleave", () => {
        songNumberContainer.innerHTML = originalNumber;
      });

      //METTO L'UNDERLINE ALLE CANZONI

      const artistSongLink = listItem.querySelector("#artist-song-link");

      artistSongLink.addEventListener("mouseenter", () => {
        artistSongLink.classList.remove("text-decoration-none");
      });

      artistSongLink.addEventListener("mouseleave", () => {
        artistSongLink.classList.add("text-decoration-none");
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

const artistCardUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + urlParams.get("id");
sessionStorage.clear();
fetch(artistCardUrl)
  .then(risposta => risposta.json())
  .then(objArray => objArray.data)
  .then(array => {
    const rand = [];
    const rigaAltroAlbum = document.getElementById("card-append");
    for (let i = 0; i < 9; i++) {
      const casual = Math.floor(Math.random() * array.length);
      if (!rand.includes(casual)) {
        rand.push(casual);
      } else {
        i--;
      }
    }
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.classList.add("col", "col-hidable");
      div.innerHTML = `
                    <div class="home-card rounded-2 d-flex flex-column p-3 h-100">
                            <div class="mb-3">
                            <a
                            href="./album.html?id=${array[rand[i]].album.id}"
                            ><img
                                src="${array[rand[i]].album.cover_big}"
                                class="rounded-2"
                                alt="${array[rand[i]].album.title} cover" />
                            </div></a>
                            <p class="fs-6 fw-bold m-0 mb-1 text-truncate">
                              <a
                                href="./album.html?id=${array[rand[i]].album.id}"
                                class="text-reset text-decoration-none text-truncate"
                                >${array[rand[i]].album.title}</a
                              >
                            </p>
                            <p class="fs-6 m-0">
                              <a
                                href="artist.html?id=${array[rand[i]].artist.name}"
                                class="text-decoration-none"
                                >${array[rand[i]].artist.name}</a
                              >
                            </p>
                          </div>

                    `;

      rigaAltroAlbum.appendChild(div);
    }
  });

hideCard();
