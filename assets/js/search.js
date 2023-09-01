const qrId = new URLSearchParams(window.location.search).get("q");

const deezerUrl = "https://api.deezer.com/";
const deezerOptions = {
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};
let queryResp = [];
let queryRespPlay = [];
let queryRespAlb = [];
let queryRespArt = [];

window.onload = async function () {
  cardWidth = 220;

  // console.log(qrId);
  if (qrId) {
    document.getElementById("search-discover").classList.add("d-none");
    document.getElementById("query-result").classList.remove("d-none");
    queryResp = await query("search?q=" + qrId);
    queryResp = queryResp.data;
    printResult();

    const elm = document.querySelector(".track-result");
    printCardq(elm, queryResp);

    queryRespPlay = await deezerQuery("search/playlist?q=" + qrId);
    queryRespPlay = queryRespPlay.data;
    const elmP = document.querySelector(".playlist-result");
    printCardp(elmP, queryRespPlay);

    queryRespAlb = await deezerQuery("search/album?q=" + qrId);
    queryRespAlb = queryRespAlb.data;
    const elmA = document.querySelector(".album-result");
    printCarda(elmA, queryRespAlb);

    queryRespArt = await deezerQuery("search/artist?q=" + qrId);
    queryRespArt = queryRespArt.data;
    const elmAr = document.querySelector(".artist-result");
    printCardArtist(elmAr, queryRespArt);
  } else {
    printDiscover();
  }
  document.querySelector("form").addEventListener("submit", search);
  hideCard();
};

async function search(event) {
  event.preventDefault();
  document.getElementById("search-discover").classList.add("d-none");
  document.getElementById("query-result").classList.remove("d-none");
  const qrStr = event.target.query.value;
  queryResp = await query("search?q=" + qrId);
  queryResp = queryResp.data;
  printResult();

  const elm = document.querySelector(".track-result");
  printCardq(elm, queryResp);

  queryRespPlay = await deezerQuery("search/playlist?q=" + qrId);
  queryRespPlay = queryRespPlay.data;
  const elmP = document.querySelector(".playlist-result");
  printCardp(elmP, queryRespPlay);

  queryRespAlb = await deezerQuery("search/album?q=" + qrId);
  queryRespAlb = queryRespAlb.data;
  const elmA = document.querySelector(".album-result");
  printCarda(elmA, queryRespAlb);

  queryRespArt = await deezerQuery("search/artist?q=" + qrId);
  queryRespArt = queryRespArt.data;
  const elmAr = document.querySelector(".artist-result");
  printCardArtist(elmAr, queryRespArt);
  hideCard();
}

const printResult = () => {
  const container = document.getElementById("query-result");
  container.querySelector("#search-artist-box img").src = queryResp[0].artist.picture_medium;
  container.querySelector("#search-artist-box h2").innerText = queryResp[0].artist.name;
  container.querySelector("#search-artist-box a").href = "artist.html?id=" + queryResp[0].artist.name;

  const sideContainer = document.querySelector("#search-artist-side-box div");
  sideContainer.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    sideContainer.innerHTML += `<div class="d-flex mb-2 p2">
    <a href="album.html?id=${queryResp[i].album.id}" >
    <img src="${queryResp[i].album.cover_medium}" alt="${queryResp[i].title}" class="" />
    </a>
    <div class="d-flex flex-column ps-2 me-auto">
    <p class="text-truncate"><span onclick="playTrack(${queryResp[i].id})" class="play-track text-truncate">${queryResp[i].title}</span></p>
    <p class="fs-7">
    <a href="" class="text-decoration-none text-sub">${queryResp[i].artist.name}</a>
    </p>
    </div>
    <p class="text-sub">${queryResp[i].duration}</p>
    </div>`;
  }
};

async function deezerQuery(query) {
  try {
    const resp = await fetch(
      "https://corsproxy.io/?" + encodeURIComponent("https://cors-anywhere.herokuapp.com/" + deezerUrl + query)
    );
    const result = await resp.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function printDiscover() {
  const discoverData = await deezerQuery("editorial/0/releases");
  // const discoverData = await query("search/?q=fantozzi");
  const container = document.querySelector(".search-view-container");
  container.innerHTML = "";
  discoverData.data.forEach(async function (data, i) {
    let rgb = {};
    const img = document.createElement("img");
    img.crossOrigin = "";
    // img.src = data.album.cover_medium;
    img.src = data.cover_medium;
    img.alt = data.title;
    const title = document.createElement("p");
    title.classList = "fw-bold p-3 fs-4";
    title.innerText = data.title;
    const link = document.createElement("a");
    link.href = `artist.html?id=${data.artist.name}`;
    link.classList = "text-reset text-decoration-none";
    const cardInt = document.createElement("div");
    cardInt.classList = "search-card-int ratio ratio-1x1 rounded-3 overflow-hidden";
    const searchCard = document.createElement("div");
    searchCard.classList = "search-card .col";
    link.appendChild(title);
    link.appendChild(img);
    cardInt.appendChild(link);
    searchCard.appendChild(cardInt);
    container.appendChild(searchCard);
  });
  setAverageBackground(container);
}

const setAverageBackground = cont => {
  const imgs = cont.querySelectorAll("img");
  rgbs = [];
  // console.log(rgbs);
  imgs.forEach(img => {
    rgbs.push(getAverageRGB(img));
  });
  const cards = cont.querySelectorAll(".search-card-int");
  cards.forEach((card, i) => {
    card.style = `background-color: rgb(${rgbs[i].r},${rgbs[i].g},${rgbs[i].b})`;
  });
};

const filterResult = event => {
  const filter = event.target.innerText;
  const all = document.querySelectorAll(`[class*="filter-selector"]`);
  console.log(filter);
  all.forEach(elm => {
    elm.classList.add("d-none");
  });
  switch (filter) {
    case "Artisti":
      document.querySelector(".filter-selector-artist").classList.remove("d-none");
      break;
    case "PlayList":
      document.querySelector(".filter-selector-playlist").classList.remove("d-none");
      break;
    case "Album":
      document.querySelector(".filter-selector-album").classList.remove("d-none");
      break;
    case "Brani":
      document.querySelector(".filter-selector-track").classList.remove("d-none");
      break;

    default:
      all.forEach(elm => {
        elm.classList.remove("d-none");
      });

      break;
  }
};
