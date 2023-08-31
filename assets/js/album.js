const id = new URLSearchParams(window.location.search).get("id");
const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/" + `${id}`;
const idArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + `${id}`;

//--------------Fetch card
const urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + sessionStorage.getItem("nameArtist");
sessionStorage.clear();
fetch(urlArtist)
  .then(risposta => risposta.json())
  .then(objArray => objArray.data)
  .then(array => {
    console.log(array);
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
    console.log("if", rand);
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.classList.add("col", "col-hidable");
      div.innerHTML = `
                    <div class="home-card rounded-2 d-flex flex-column p-3 h-100">
                            <div class="mb-3">
                              <img
                                src="${array[rand[i]].album.cover}"
                                class="rounded-2"
                                alt="${array[rand[i]].album.title} cover" />
                            </div>
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
//--------------Play move
const appare = document.getElementsByClassName("appare");
const scompare = document.getElementsByClassName("scompare");
const scrollo = document.getElementById("scrollo");
scrollo.addEventListener("scroll", event => {
  if (scompare[0].getBoundingClientRect().top < 10) {
    appare[0].style.opacity = 1;
    scompare[0].style.opacity = 0;
  } else {
    appare[0].style.opacity = 0;
    scompare[0].style.opacity = 1;
  }
});
//------------------------------------
window.onload = async event => {
  try {
    await fetch(urlAlbum)
      .then(rispostaServer => rispostaServer.json())
      .then(async obj => {
        console.log("obj", obj);
        sessionStorage.setItem("nameArtist", obj.artist.name);
        const img = document.getElementsByClassName("img-album");
        const titoloAlbum = document.getElementsByClassName("titolo-album");
        const artist = document.getElementsByClassName("artist");
        const ntracce = document.getElementsByClassName("ntracks");
        const dtracce = document.getElementsByClassName("dtracks");
        const anno = document.getElementsByClassName("year");
        const copyrightLabel = document.getElementsByClassName("copyright-label");
        //copyright.innerHTML=`${ogj}`
        copyrightLabel[0].innerHTML = `©${obj.label}`;
        img[0].src = `${obj.cover}`;
        img[1].src = `${obj.cover}`;
        img[2].src = `${obj.cover}`;
        titoloAlbum[0].innerHTML = `${obj.title}`;
        artist[0].innerHTML = `${obj.artist.name} ◦`;
        artist[1].innerHTML = `${obj.artist.name}`;
        artist[2].innerHTML = `${obj.artist.name}`;
        ntracce[0].innerHTML = `${obj.tracks.data.length} brani, `;
        anno[0].innerHTML = `${obj.release_date.slice(0, 4)} ◦`;
        anno[1].innerHTML = `${obj.release_date.slice(0, 4)} `;
        dtracce[0].innerHTML = `${(Math.floor((obj.duration / 60) * 100) / 100).toString().replace(".", " min ")} sec.`;
        console.log(obj.duration);
        const tracce = document.getElementsByClassName("tracce");
        for (let i = 0; i < obj.tracks.data.length; i++) {
          const titolo = obj.tracks.data[i].title;
          const durata = obj.tracks.data[i].duration;
          const durataConvertita = (Math.round((durata / 60) * 100) / 100).toString().replace(".", ":");
          if (durataConvertita.length === 3) {
            const convertito = durataConvertita + "0";
            const titoloPlayer = document.getElementsByClassName("titolo");
            titoloPlayer[0].innerHTML = ``; //titolo canzone in riproduzione
            const row = document.createElement("div");
            row.classList.add("row", "g-3", "my-2", "hov");
            row.innerHTML = `
                  
                  <div class="col-1 p-0 ps-2 " style="font-size: 1em; font-weight: lighter; width:30px;">${i + 1}</div>
                  <div class="col my-1 p-0" style="font-size: 1em; font-weight: lighter"><a class"text-decoration-none" href="" style ="margin:0;padding:0;">${titolo}</a><p style="font-size: 0.8em;margin:0; padding:0; ">${
              obj.label
            }, ${obj.artist.name}</p></div>
                  <div class="col text-end" style="font-size: 0.8em; font-weight: lighter">${convertito}</div>
                  
                  `;
            tracce[0].appendChild(row);
          } else {
            const row = document.createElement("div");
            row.classList.add("row", "g-3", "my-2", "hov");
            row.innerHTML = `
                  
                  <div class="col-1 p-0 ps-2" style="font-size: 0.8em; font-weight: lighter; width:30px;">${i + 1}</div>
                  <div class="col my-1 p-0" style="font-size: 1em; font-weight: lighter"><a class"text-decoration-none" href="" style ="margin:0;padding:0;">${titolo}</a><p style="font-size: 0.8em;margin:0; padding:0; ">${
              obj.artist.name
            }</p></div>
                  <div class="col text-end" style="font-size: 0.8em; font-weight: lighter">${durataConvertita}</div>
                  
                  `;
            tracce[0].appendChild(row);
          }
          const tracceSel = document.getElementsByClassName("hov");
          console.log(tracceSel[i]);
          tracceSel[i].addEventListener("click", () => {
            const check = document.getElementsByClassName("selected");
            if (!tracceSel[i].classList.contains("selected")) {
              for (var j = 0; j < check.length; j++) {
                check[j].style.backgroundColor = "";
                check[j].classList.remove("selected");
              }
              tracceSel[i].style.backgroundColor = "rgba(255, 255, 255, 0.4)";
              tracceSel[i].style.borderRadius = "20px";
              tracceSel[i].classList.add("selected");
            } else {
              tracceSel[i].style.backgroundColor = "";
              tracceSel[i].classList.remove("selected");
            }
          });
        }
      });
  } catch {
    error => console.log(error);
  }
};
