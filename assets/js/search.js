document.addEventListener("DOMContentLoaded", event => {
  const sidebarElm = document.getElementById("sidebar");
  fetch("assets/html/sidebar.html")
    .then(response => response.text())
    .then(data => {
      sidebarElm.innerHTML = data;
      document.getElementById("sidebar-link-home").classList.remove("text-reset");
      document.getElementById("sidebar-link-search").classList.add("text-reset");
    });
  load();
  document.getElementById("sidebar-link-home").classList.remove("text-reset");
});

async function load() {
  const side = await query("playlist/10361569942");
  printSideCards(side);

  hideCard();

  const sidebarSelectorList = document.querySelectorAll(".home-sidebar-list a");
  sidebarSelectorList.forEach(elm => {
    elm.addEventListener("click", sidebarSelection);
  });
}
