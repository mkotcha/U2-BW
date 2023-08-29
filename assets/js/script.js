const url = "https://deezerdevs-deezer.p.rapidapi.com/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4ba7a35e2emsh5b7d70d861796cbp1d1951jsnc270044357e6",
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

window.onload = async () => {
  const recent = await query("playlist/752286631");
  const elm = document.querySelector(".recent-list");
  const side = await query("playlist/10361569942");
  printCard(elm, recent);
  printSideCard(side);
  hideCard();
};

const printCard = (elm, data) => {
  for (let i = 0; i < maxCard; i++) {
    const col = document.createElement("div");
    col.classList = "col";
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
    const titleLink = document.createElement("a");
    titleLink.classList = "text-reset text-decoration-none";
    titleLink.href = "track.html/id=" + data.tracks.data[i].id;
    titleLink.innerText = data.tracks.data[i].title;
    const artist = document.createElement("p");
    artist.classList = "fs-6 fw-bold m-0 mb-1 text-truncate";
    const artistLink = document.createElement("a");
    artistLink.classList = "text-reset text-decoration-none";
    artistLink.href = "track.html?id=" + data.tracks.data[i].id;
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
};

const printSideCard = data => {
  //   fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/10361569942", options)
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.log(error));
  const list = document.querySelector(".side-list");
  list.innerHtml = "";
};

const numCol = () => {
  const container = document.querySelector("main");
  return container.offsetWidth / 200;
};

const hideCard = () => {
  const num = parseInt(numCol());
  const cards = document.querySelectorAll(".recent-list .col");
  if (num < maxCard) cards[0].parentElement.classList = `row row-cols-${num} g-2 recent-list`;
  else cards[0].parentElement.classList = `row row-cols-${maxCard} g-2 recent-list`;
  cards.forEach((elm, index) => {
    if (index >= num) {
      elm.classList.add("d-none");
    } else {
      elm.classList.remove("d-none");
    }
  });
};

window.addEventListener("resize", hideCard);
