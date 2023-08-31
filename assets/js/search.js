const deezerUrl = "https://api.deezer.com/";
const deezerOptions = {
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

window.onload = async function () {
  cardWidth = 220;
  hideCard();
  // printDiscover();
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
    container.innerHTML += `<div class="search-card .col">
    <div class="search-card-int ratio ratio-1x1 bg-danger rounded-3 overflow-hidden">
      <a href="" class="text-reset text-decoration-none">
        <p class="fw-bold p-3 fs-4">${data.title}</p>
        <img src="${data.cover_medium}" class="" alt="" crossorigin/>
      </a>
    </div>
  </div>`;
  });
  console.log(document.querySelector(".search-card img"));
  const rgb = getAverageRGB(document.querySelector(".search-card img"));
  console.log(rgb.r);
  const div = container.querySelector("div:last-child");
  div.style = "background-color: blue";
  console.log(div);
}
