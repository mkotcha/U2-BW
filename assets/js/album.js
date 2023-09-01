const id = new URLSearchParams(window.location.search).get("id");
const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/" + `${id}`;
const idArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + `${id}`;
const urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + sessionStorage.getItem("nameArtist");
const appare = document.getElementsByClassName("appare");
const scompare = document.getElementsByClassName("scompare");
const scrollo = document.getElementById("scrollo");
//--------------Play move
scrollo.addEventListener("scroll", event => {
  if (scompare[0].getBoundingClientRect().top < 60) {
    appare[0].style.opacity = 1;
    appare[0].style.transition = "opacity 0.5s ease-in-out";
    scompare[0].style.opacity = 0;
    scompare[0].style.transition = "opacity 0.3s ease-in-out";
  } else {
    appare[0].style.opacity = 0;
    scompare[0].style.opacity = 1;
  }
});

//------------------------------------
window.onload = async event => {
  //check se ho dati per creare pagina
  if (!id) {
    window.location.href = "index.html";
  }
  //se ok prova questo
  try {
    //fetch creazione dati album e tracce con relativi eventi
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
        const cuori = document.getElementsByClassName("cuori");
        cuori[0].addEventListener("click", () => {
          if (!cuori[0].classList.contains("selectedDue")) {
            cuori[0].classList.remove("bi-suit-heart");
            cuori[0].classList.add("selectedDue", "bi-suit-heart-fill");
            cuori[0].style.color = "green";
          } else {
            cuori[0].classList.add("bi-suit-heart");
            cuori[0].style.color = "white";
            cuori[0].classList.remove("selectedDue", "bi-suit-heart-fill");
          }
        });
        cuori[1].addEventListener("click", () => {
          if (!cuori[1].classList.contains("selectedDue")) {
            cuori[1].classList.remove("bi-suit-heart");
            cuori[1].classList.add("selectedDue", "bi-suit-heart-fill");
            cuori[1].style.color = "green";
          } else {
            cuori[1].classList.add("bi-suit-heart");
            cuori[1].style.color = "white";
            cuori[1].classList.remove("selectedDue", "bi-suit-heart-fill");
          }
        });
        const copyrightLabel = document.getElementsByClassName("copyright-label");
        copyrightLabel[0].innerHTML = `©${obj.label}`;
        img[0].src = `${obj.cover}`;
        img[1].src = `${obj.cover}`;
        titoloAlbum[0].innerHTML = `${obj.title}`;
        artist[0].innerHTML = `${obj.artist.name} ◦`;
        artist[1].innerHTML = `${obj.artist.name}`;
        artist[2].innerHTML = `${obj.artist.name}`;
        ntracce[0].innerHTML = `${obj.tracks.data.length} brani, `;
        anno[0].innerHTML = `${obj.release_date.slice(0, 4)} ◦`;
        anno[1].innerHTML = `${obj.release_date.slice(0, 4)} `;
        dtracce[0].innerHTML = `${(Math.floor((obj.duration / 60) * 100) / 100).toString().replace(".", " min ")} sec.`;
        const media = document.getElementsByClassName("media");
        media[0].style.background = "linear-gradient(to bottom, #090909 0%, #0f0f0f 100%)";
        media[1].style.background = "linear-gradient(to bottom, #0f0f0f 0%, #1f1f1f 100%)";
        media[2].style.background = "linear-gradient(to bottom, #1f1f1f 0%, #0f0f0f 100%)";

        console.log(media);
        //CREAZIONE TRACCE e relati eventi e dettagli(cuore e pallini)
        const tracce = document.getElementsByClassName("tracce");
        for (let i = 0; i < obj.tracks.data.length; i++) {
          const titolo = obj.tracks.data[i].title;
          const durata = obj.tracks.data[i].duration;
          const durataConvertita = (Math.round((durata / 60) * 100) / 100).toString().replace(".", ":");
          //Gestione Separata per risultati con durata che termina con 0 e non
          if (durataConvertita.length === 3) {
            const convertito = durataConvertita + "0";
            const row = document.createElement("div");
            row.classList.add("row", "g-3", "my-2", "hov");
            row.innerHTML = `
                  
                  <div class="col-1 p-0 ps-2 " style="font-size: 1em; font-weight: lighter; width:30px;">${i + 1}</div>
                  <div class="col my-1 p-0" style="font-size: 1em; font-weight: lighter">
                  <p class="rip text-decoration-none" style ="margin:0;padding:0;">${titolo}</p>
                  <p style="font-size: 0.8em;margin:0; padding:0; ">${obj.artist.name}</p></div>
                  <div class="col-1 p-0" style="width:55px;"><i class="plusPiu bi bi-suit-heart"></i></div>
                  <div class="col-1 p-0" style="width:55px;font-size: 0.8em; font-weight: lighter">${convertito}</div>
                  <div class="col-1 p-0" style="width:55px;"><i class="plusPiuDot bi bi-three-dots"></i></div>
                  
                  `;
            tracce[0].appendChild(row);
          } else {
            const row = document.createElement("div");
            row.classList.add("row", "g-3", "my-2", "hov");
            row.innerHTML = `
                  
                  <div class="col-1 p-0 ps-2" style="font-size: 0.8em; font-weight: lighter; width:30px;">${i + 1}</div>
                  <div class="col my-1 p-0" style="font-size: 1em; font-weight: lighter">
                  <p class="rip text-decoration-none" style ="margin:0;padding:0;">${titolo}</p>
                  <p style="font-size: 0.8em;margin:0; padding:0; ">${obj.artist.name}</p></div>
                  <div class="col-1 p-0" style="width:55px;"><i class="plusPiu bi bi-suit-heart"></i></div>
                  <div class="col-1 p-0" style="width:55px;font-size: 0.8em; font-weight: lighter">${durataConvertita}</div>
                  <div class="col-1 p-0" style="width:55px;"><i class="plusPiuDot bi bi-three-dots"></i></div>
                  
                  
                  `;
            tracce[0].appendChild(row);
          }
          //Fine if else
          //i play e le tracce riproducono traccia selezionata
          const traccePlay = document.getElementsByClassName("rip");
          traccePlay[i].addEventListener("click", event => {
            const canzone = document.querySelector(".canzone");
            img[2].src = `${obj.tracks.data[i].album.cover}`;
            canzone.innerHTML = `${event.target.innerHTML}`;
            playTrack(obj.tracks.data[i].id);
          });
          const tracceSel = document.getElementsByClassName("hov");
          const plusPiu = document.getElementsByClassName("plusPiu");
          const plusPiuDot = document.getElementsByClassName("plusPiuDot");
          plusPiu[i].classList.add("opacity-0");
          plusPiuDot[i].classList.add("opacity-0", "dropdown");
          plusPiuDot[i].setAttribute("data-bs-toggle", "dropdown");
          plusPiuDot[i].innerHTML = `  <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Salva in playlist</a></li>
          <li><a class="dropdown-item" href="#">Togli dalla playlist</a></li>
          <li><a class="dropdown-item" href="#">Aggiungi in coda</a></li>
          </ul>`;

          //Evento click su elemento traccia con hover attivo si colora backroun con mouse enter e leave escono cuori e punti e eventi click per menu e colore
          tracceSel[i].addEventListener("click", () => {
            const check = document.getElementsByClassName("selected");
            //per avere solo una traccia selezionata
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
          tracceSel[i].addEventListener("mouseenter", () => {
            plusPiu[i].classList.remove("opacity-0");
            plusPiuDot[i].classList.remove("opacity-0");
          });
          tracceSel[i].addEventListener("mouseleave", () => {
            plusPiu[i].classList.add("opacity-0");
            plusPiuDot[i].classList.add("opacity-0");
          });
          plusPiu[i].addEventListener("click", () => {
            if (!plusPiu[i].classList.contains("selectedDue")) {
              const sempreVerde = document.createElement("i");
              plusPiu[i].classList.remove("bi-suit-heart");
              plusPiu[i].classList.add("selectedDue", "bi-suit-heart-fill");
              plusPiu[i].style.color = "green";
              sempreVerde.classList.add("secondHeart", "bi-suit-heart-fill");
              sempreVerde.style.color = "green";
              sempreVerde.addEventListener("click", () => {
                if (!sempreVerde.classList.contains("selectedDue")) {
                  sempreVerde.classList.remove("bi-suit-heart");
                  sempreVerde.classList.add("selectedDue", "bi-suit-heart-fill");
                  sempreVerde.style.color = "green";
                } else {
                  sempreVerde.classList.add("bi-suit-heart");
                  sempreVerde.style.color = "white";
                  sempreVerde.classList.remove("selectedDue", "bi-suit-heart-fill");
                }
              });
              plusPiu[i].classList.add("d-none");
              plusPiu[i].parentElement.appendChild(sempreVerde);
              tracceSel[i].style.backgroundColor = "rgba(255, 255, 255, 0.11)";
              tracceSel[i].style.borderRadius = "20px";
            } else {
              plusPiu[i].classList.add("bi-suit-heart");
              plusPiu[i].style.color = "white";
              plusPiu[i].classList.remove("selectedDue", "bi-suit-heart-fill");
            }
          });
        }
      });
    //--------------Fetch card Album
    sessionStorage.clear();
    fetch(urlArtist)
      .then(risposta => risposta.json())
      .then(objArray => objArray.data)
      .then(array => {
        //numero di elementi casuali senza ripetizione da prendere nel obj di risposta.
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
        //------------------
        //CREA CARD ALBUM
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
  } catch {
    error => console.log(error);
  }
};
