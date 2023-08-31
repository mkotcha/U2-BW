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
  printDiscover();
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
  console.log(discoverData);
  const container = document.querySelector(".search-view-container");
  container.innerHTML = "";
  discoverData.data.forEach((data, i) => {
    container.innerHTML += `<div class="search-card .col">
    <div class="ratio ratio-1x1 bg-danger rounded-3 overflow-hidden">
      <div>
        <p>${data.title}</p>
        <img src="${data.cover_medium}" class="" alt="" />
      </div>
    </div>
  </div>`;
  });
  console.log(document.querySelector(".search-card img"));
  const rgb = getAverageRGB(document.querySelector(".search-card img"));
  console.log(rgb);
}
