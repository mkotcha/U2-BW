const deezerUrl = "https://api.deezer.com/";
const deezerOptions = {
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};
let queryResp = [];

window.onload = async function () {
  cardWidth = 220;
  hideCard();
  printDiscover();
  document.querySelector("form").addEventListener("submit", search);
};

async function search(event) {
  event.preventDefault();
  document.getElementById("search-discover").classList.add("d-none");
  const qrStr = event.target.query.value;
  queryResp = await query("search?q=" + qrStr);
  queryResp = queryResp.data;
  console.log(queryResp[0].title);
  printResult();
}

const printResult = () => {
  const container = document.querySelector(".query-result");
  container.innerHTML = "";
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
  const container = document.querySelector(".search-view-container");
  container.innerHTML = "";
  discoverData.data.forEach((data, i) => {
    //   container.innerHTML += `<div class="search-card .col">
    //   <div class="search-card-int ratio ratio-1x1 rounded-3 overflow-hidden">
    //     <a href="" class="text-reset text-decoration-none">
    //       <p class="fw-bold p-3 fs-4">${data.title}</p>
    //       <img src="${data.cover_medium}" class="" alt="" crossorigin/>
    //     </a>
    //   </div>
    // </div>`;

    const img = document.createElement("img");
    img.src = data.cover_medium;
    img.alt = data.title;
    img.setAttribute("crossorigin", "");
    const title = document.createElement("p");
    title.classList = "fw-bold p-3 fs-4";
    title.innerText = data.title;
    const link = document.createElement("a");
    link.href = `artist.html?id=${data.artist.id}`;
    link.classList = "text-reset text-decoration-none";
    const cardInt = document.createElement("div");
    cardInt.classList = "search-card-int ratio ratio-1x1 rounded-3 overflow-hidden";
    const rgb = getAverageRGB(img);
    cardInt.style = `background-color: rgb(${rgb.r},${rgb.g},${rgb.b})`;
    const searchCard = document.createElement("div");
    searchCard.classList = "search-card .col";

    link.appendChild(title);
    link.appendChild(img);
    cardInt.appendChild(link);
    searchCard.appendChild(cardInt);
    container.appendChild(searchCard);
  });
  // console.log(document.querySelector(".search-card img"));
  // const rgb = getAverageRGB(document.querySelector(".search-card img"));
  // console.log(rgb.r);
  // const div = container.querySelector("div:last-child");
  // div.style = `background-color: rgb(${rgb.r},${rgb.g},${rgb.b})`;
  // console.log(div);
}
