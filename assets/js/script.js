let cardWidth = 200;
document.addEventListener("DOMContentLoaded", event => {
  fetch("assets/html/sidebar.html")
    .then(response => response.text())
    .then(data => loadSidebar(data));

  fetch("assets/html/player.html")
    .then(response => response.text())
    .then(data => initAudio(data));

  window.addEventListener("resize", hideCard);
});

async function loadSidebar(data) {
  document.getElementById("sidebar").innerHTML = data;
  const side = await query("playlist/10361569942");
  printSideCards(side);
  hideCard();
  document.querySelectorAll(".home-sidebar-list a").forEach(elm => elm.addEventListener("click", sidebarSelection));
  const pathName = window.location.pathname;
  if (pathName === "/search.html") {
    document.getElementById("sidebar-link-home").classList.remove("text-reset");
    document.getElementById("sidebar-link-search").classList.add("text-reset");
  }
}
//885547a862msh72c9372ebc31c61p1f6b27jsn187746473b51
// mf 4ba7a35e2emsh5b7d70d861796cbp1d1951jsnc270044357e6
// mk e13be1f8d2msha90dfa9e08e83f5p16dc04jsn33020578052c

const url = "https://deezerdevs-deezer.p.rapidapi.com/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e13be1f8d2msha90dfa9e08e83f5p16dc04jsn33020578052c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};
let queryStr = "";
const maxCard = 9;

async function query(query) {
  try {
    const resp = await fetch(url + query, options);
    const result = await resp.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function queryTrack(id) {
  try {
    const resp = await fetch(url + "track/" + id, options);
    const result = await resp.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function printCard(elm, data) {
  for (let i = 0; i < maxCard; i++) {
    const col = document.createElement("div");
    col.classList = "col col-hidable";
    const card = document.createElement("div");
    card.classList = "home-card rounded-2 d-flex flex-column p-3 h-100";
    const albumLink = document.createElement("a");
    albumLink.href = "album.html?id=" + data.tracks.data[i].album.id;
    const img = document.createElement("img");
    img.classList = "rounded-2 mb-3 w-100";
    img.src = data.tracks.data[i].album.cover_medium;
    img.alt = data.tracks.data[i].album.title + " cover";
    const title = document.createElement("p");
    title.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const titleLink = document.createElement("span");
    titleLink.classList = "play-track";
    // titleLink.href = "track.html?id=" + data.tracks.data[i].id;
    titleLink.addEventListener("click", event => playTrack(data.tracks.data[i].id));
    titleLink.innerText = data.tracks.data[i].title;
    const artist = document.createElement("p");
    artist.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const artistLink = document.createElement("a");
    artistLink.classList = "text-decoration-none";
    artistLink.href = "artist.html?id=" + data.tracks.data[i].artist.name;
    artistLink.innerText = data.tracks.data[i].artist.name;

    albumLink.appendChild(img);
    card.appendChild(albumLink);
    title.appendChild(titleLink);
    card.appendChild(title);
    artist.appendChild(artistLink);
    card.appendChild(artist);
    col.appendChild(card);
    elm.appendChild(col);
  }
}

const printCardq = (elm, data) => {
  for (let i = 0; i < maxCard; i++) {
    const col = document.createElement("div");
    col.classList = "col col-hidable";
    const card = document.createElement("div");
    card.classList = "home-card rounded-2 d-flex flex-column p-3 h-100";
    const albumLink = document.createElement("a");
    albumLink.href = "album.html?id=" + data[i].album.id;
    const img = document.createElement("img");
    img.classList = "rounded-2 mb-3 w-100";
    img.src = data[i].album.cover_medium;
    img.alt = data[i].album.title + " cover";
    const title = document.createElement("p");
    title.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const titleLink = document.createElement("span");
    titleLink.classList = "play-track";
    // titleLink.href = "track.html?id=" + data.tracks.data[i].id;
    titleLink.addEventListener("click", event => playTrack(data[i].id));
    titleLink.innerText = data[i].title;
    const artist = document.createElement("p");
    artist.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const artistLink = document.createElement("a");
    artistLink.classList = "text-decoration-none";
    artistLink.href = "artist.html?id=" + data[i].artist.name;
    artistLink.innerText = data[i].artist.name;

    albumLink.appendChild(img);
    card.appendChild(albumLink);
    title.appendChild(titleLink);
    card.appendChild(title);
    artist.appendChild(artistLink);
    card.appendChild(artist);
    col.appendChild(card);
    elm.appendChild(col);
  }
};

const printCardp = (elm, data) => {
  for (let i = 0; i < maxCard; i++) {
    const col = document.createElement("div");
    col.classList = "col col-hidable";
    const card = document.createElement("div");
    card.classList = "home-card rounded-2 d-flex flex-column p-3 h-100";
    const albumLink = document.createElement("a");
    albumLink.href = "album.html?id=" + data[i].id;
    const img = document.createElement("img");
    img.classList = "rounded-2 mb-3 w-100";
    img.src = data[i].picture_medium;
    img.alt = data[i].title + " cover";
    const title = document.createElement("p");
    title.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const titleLink = document.createElement("span");
    titleLink.classList = "play-track";
    // titleLink.href = "track.html?id=" + data.tracks.data[i].id;
    // titleLink.addEventListener("click", event => playTrack(data[i].id));
    titleLink.innerText = data[i].title;
    const artist = document.createElement("p");
    artist.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const artistLink = document.createElement("a");
    artistLink.classList = "text-decoration-none";
    artistLink.href = "index.htm";
    artistLink.innerText = "Playlist";

    albumLink.appendChild(img);
    card.appendChild(albumLink);
    title.appendChild(titleLink);
    card.appendChild(title);
    artist.appendChild(artistLink);
    card.appendChild(artist);
    col.appendChild(card);
    elm.appendChild(col);
  }
};

const printCarda = (elm, data) => {
  for (let i = 0; i < maxCard; i++) {
    const col = document.createElement("div");
    col.classList = "col col-hidable";
    const card = document.createElement("div");
    card.classList = "home-card rounded-2 d-flex flex-column p-3 h-100";
    const albumLink = document.createElement("a");
    albumLink.href = "album.html?id=" + data[i].id;
    const img = document.createElement("img");
    img.classList = "rounded-2 mb-3 w-100";
    img.src = data[i].cover_medium;
    img.alt = data[i].title + " cover";
    const title = document.createElement("p");
    title.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const titleLink = document.createElement("span");
    titleLink.classList = "play-track";
    // titleLink.href = "track.html?id=" + data.tracks.data[i].id;
    // titleLink.addEventListener("click", event => playTrack(data[i].id));
    titleLink.innerText = data[i].title;
    const artist = document.createElement("p");
    artist.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const artistLink = document.createElement("a");
    artistLink.classList = "text-decoration-none";
    artistLink.href = "artist.html?id=" + data[i].artist.name;
    artistLink.innerText = data[i].artist.name;

    albumLink.appendChild(img);
    card.appendChild(albumLink);
    title.appendChild(titleLink);
    card.appendChild(title);
    artist.appendChild(artistLink);
    card.appendChild(artist);
    col.appendChild(card);
    elm.appendChild(col);
  }
};

const printCardArtist = (elm, data) => {
  for (let i = 0; i < maxCard; i++) {
    const col = document.createElement("div");
    col.classList = "col col-hidable";
    const card = document.createElement("div");
    card.classList = "home-card rounded-2 d-flex flex-column p-3 h-100";
    const albumLink = document.createElement("a");
    albumLink.href = "artist.htm?id=" + data[i].name;
    const img = document.createElement("img");
    img.classList = "rounded-2 mb-3 w-100";
    img.src = data[i].picture_medium;
    img.alt = data[i].name + " artist";
    const title = document.createElement("p");
    title.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const titleLink = document.createElement("span");
    titleLink.classList = "play-track";
    // titleLink.href = "track.html?id=" + data.tracks.data[i].id;
    // titleLink.addEventListener("click", event => playTrack(data[i].id));
    // titleLink.innerText = data[i].title;
    const artist = document.createElement("p");
    artist.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const artistLink = document.createElement("a");
    artistLink.classList = "text-decoration-none";
    artistLink.href = "artist.htm?id=" + data[i].name;
    artistLink.innerText = data[i].name;

    albumLink.appendChild(img);
    card.appendChild(albumLink);
    title.appendChild(titleLink);
    card.appendChild(title);
    artist.appendChild(artistLink);
    card.appendChild(artist);
    col.appendChild(card);
    elm.appendChild(col);
  }
};

const printSideCards = data => {
  const list = document.querySelector(".side-list");
  list.innerHTML = "";
  data.tracks.data.forEach(track => {
    printSideCard(track);
  });
};

const printSideCard = track => {
  const list = document.querySelector(".side-list");
  list.innerHTML += `<div class="d-flex mb-3">
                      <a href="album.html?id=${track.album.id}">
                        <img class="" src="${track.album.cover_medium}" alt="" /></a>
                      <div class="ps-3 fs-6 flex-shrink-1 text-truncate d-none d-lg-block">
                        <p class="fw-bold m-0 text-truncate">
                        <span onclick="playTrack(${track.id})" class="play-track">
                          ${track.title}</span></p>
                        <p class="text-body-secondary m-0">
                          <i class="bi bi-pin-angle text-success d-none"></i> 
                          <span class="category">
                          <a href="artist.html?id=${track.artist.name}" class="text-reset text-decoration-none">
                          ${track.artist.name}</a></span>
                        </p>
                      </div>`;
};

const numCol = () => {
  const container = document.querySelector("main");
  return parseInt(container.offsetWidth / cardWidth);
};

const hideCard = () => {
  const num = numCol();
  const rowLists = document.querySelectorAll(".row-list");
  rowLists.forEach(list => {
    for (let i = 1; i <= maxCard; i++) {
      list.classList.remove("row-cols-" + i);
    }
    if (num < maxCard) {
      list.classList.add("row-cols-" + num);
    } else {
      // list.classList = `row row-cols-${maxCard} g-4 recent-list`;
      list.classList.add("row-cols-" + maxCard);
    }
    const cards = list.querySelectorAll(".col-hidable");
    cards.forEach((elm, index) => {
      if (index >= num) {
        elm.classList.add("d-none");
      } else {
        elm.classList.remove("d-none");
      }
    });
  });
};

async function sidebarSelection(event) {
  const selection = event.target.innerText;
  const side = await query("playlist/10361569942");
  const arrLists = [];

  switch (selection) {
    case "Recently Added":
      side.tracks.data.forEach(elm => {
        arrLists.push([elm.id, elm.time_add]);
      });
      arrLists.sort(compareSecondColumn);
      break;

    case "Alphabetical":
      side.tracks.data.forEach(elm => {
        arrLists.push([elm.id, elm.title]);
      });
      arrLists.sort(compareSecondColumn);
      break;

    case "Artist":
      side.tracks.data.forEach(elm => {
        arrLists.push([elm.id, elm.artist.name]);
      });
      arrLists.sort(compareSecondColumn);
      break;

    default:
      printSideCards(side);
      break;
  }
  const list = document.querySelector(".side-list");
  list.innerHTML = "";
  for (const id of arrLists) {
    const track = await queryTrack(id[0]);
    printSideCard(track);
  }
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
}

function compareSecondColumn(a, b) {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] < b[1] ? -1 : 1;
  }
}

async function initAudio(data) {
  document.getElementById("player").innerHTML += data;
  const audioElm = document.querySelector("audio");
  let nowPlaing = localStorage.getItem("nowPlaing") ? localStorage.getItem("nowPlaing") : 104731108;
  const track = await queryTrack(nowPlaing);
  audioElm.src = track.preview;
  const audioContext = new AudioContext();
  const audioTrack = audioContext.createMediaElementSource(audioElm);
  audioTrack.connect(audioContext.destination);

  // const duration = track.duration;
  // const minutes = Math.floor(duration / 60);
  // const seconds = duration - minutes * 60;
  // document.getElementById("total-time").innerText = minutes + ":" + seconds;
  document.getElementById("total-time").innerText = "00:30";

  const playButton = document.getElementById("play-button-player");
  playButton.addEventListener(
    "click",
    () => {
      // Check if context is in suspended state (autoplay policy)
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // Play or pause track depending on state
      if (playButton.dataset.playing === "false") {
        audioElm.play();
        playButton.dataset.playing = "true";
      } else if (playButton.dataset.playing === "true") {
        audioElm.pause();
        playButton.dataset.playing = "false";
      }
    },
    false
  );
  audioElm.addEventListener("timeupdate", () => {
    document.getElementById("seekbar").setAttribute("value", audioElm.currentTime / audioElm.duration);
    document.getElementById("elapsed-time").innerText =
      "00:" + parseInt(audioElm.currentTime).toString().padStart(2, "0");
  });
  document.getElementById("range").oninput = function () {
    let value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background =
      "linear-gradient(to right, green 0%, green " + value + "%, #535353 " + value + "%, #535353 100%)";

    document.getElementById("range").addEventListener("mouseleave", () => {
      value = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.background =
        "linear-gradient(to right, white 0%, white " + value + "%, #535353 " + value + "%, #535353 100%)";
    });
    //manipolazione volume utente
    const player = document.querySelector("audio");
    const volumeSlider = document.querySelector("#range");

    volumeSlider.addEventListener("input", function () {
      let dato;
      dato = (this.value / 100).toFixed(1);
      player.volume = dato;
    });
  };

  document.getElementById("player-img").src = track.album.cover_medium;
  document.getElementById("player-title").innerText = track.title;
  document.getElementById("player-artist").innerText = track.artist.name;
}

async function playTrack(id) {
  let nowPlaing = localStorage.getItem("nowPlaing") ? localStorage.getItem("nowPlaing") : id;
  let history = [];
  if (localStorage.getItem("history")) {
    history = JSON.parse(localStorage.getItem("history"));
  } else {
    history.push(nowPlaing);
  }
  const audioElm = document.querySelector("audio");
  const playButton = document.getElementById("play-button-player");
  const track = await queryTrack(id);
  audioElm.src = track.preview;
  if (playButton.dataset.playing === "false") {
    audioElm.play();
    playButton.dataset.playing = "true";
  } else {
    audioElm.play();
  }

  document.getElementById("player-img").src = track.album.cover_medium;
  document.getElementById("player-title").innerText = track.title;
  document.getElementById("player-artist").innerText = track.artist.name;

  history.push(nowPlaing);
  localStorage.setItem("nowPlaing", id);
  localStorage.setItem("history", JSON.stringify(history));
}

function getAverageRGB(imgEl) {
  let blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    console.log("dif domain?", e);
    return defaultRGB;
  }
  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
}

const setTopBg = event => {
  let scroll = document.querySelector(".home-hero-container").scrollTop;
  const bar = document.querySelector(".home-hero-nav");

  if (scroll > 200) {
    bar.classList.add("bg-primary");
  } else {
    bar.classList.remove("bg-primary");
  }
};

// Aggiungi un gestore di eventi al tuo elemento di scorrimento
document.querySelector(".home-hero-container").addEventListener("scroll", setTopBg);
