window.onload = async function () {
  const recentData = await query("playlist/752286631");
  const showData = await query("playlist/7456464544");
  const userData = await query("playlist/11470122864");

  const recentElm = document.querySelector(".recent-list");
  const showElm = document.querySelector(".show-list");
  const userElm = document.querySelector(".user-list");

  const side = await query("playlist/10361569942");
  printSideCards(side);
  printCard(recentElm, recentData);
  printCard(showElm, showData);
  printCard(userElm, userData);

  cardWidth = 200;
  hideCard();

  const sidebarSelectorList = document.querySelectorAll(".home-sidebar-list a");
  sidebarSelectorList.forEach(elm => {
    elm.addEventListener("click", sidebarSelection);
  });
  document.querySelector(".home-hero-container").addEventListener("scroll", setTopBg);
};
