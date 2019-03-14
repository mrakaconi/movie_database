const prikaz = document.getElementById('ispis')
const kriterij = document.getElementById('title')
const strGoreGod = document.getElementById('gore_god')
const strDoleGod = document.getElementById('dole_god')
const strGoreNaz = document.getElementById('gore_naz')
const strDoleNaz = document.getElementById('dole_naz')
const logIn = document.getElementById('login')
const username = document.getElementById('username')
const password = document.getElementById('password')
let sviFilmovi = [];
console.log(sviFilmovi);


logIn.addEventListener('click', function () {
  if (username.value == "admin" && password.value == "admin") {
    const iks = document.getElementsByClassName('iks')
    console.log(iks);
    for (let i = 0; i < iks.length; i++) {
      iks[i].style.display = "block"
    }
  }
})

function render(niz) {
  stringUpis = ""
  const limit = niz.length >= 50 ? 50 : niz.length
  for (let i = 0; i < limit; i++) {
    stringUpis +=
      `
      <div class="filmski-div">
      <div class="iks"><i class="fas fa-times-circle"></i></div>
      <h3 class= "naslov-filma">${niz[i].naziv}</h3> 
      <img src=${niz[i].slika} alt="" class="slike" width="100">
      <p> Godina : ${niz[i].godina}</p> 
      </div> 
    `
  }
  prikaz.innerHTML = stringUpis;
}

fetch('https://baza-filmova.herokuapp.com/filmovi/ ')
  .then(res => res.json())
  .then(data => {
    sviFilmovi = data
    render(data)
  })

kriterij.addEventListener('input', function () {
  // TODO: da bude neosetljivo na velika i mala slova
  const rezultati = sviFilmovi.filter(film => film.naziv.includes(kriterij.value))
  render(rezultati)  
})

function compareGodinaUp(a, b) {
  if (a.godina < b.godina)
    return -1;
  if (a.godina > b.godina)
    return 1;
  return 0;
}

strGoreGod.addEventListener('click', function (e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareGodinaUp);
  render(sortirano);
  console.log(sortirano);
});

function compareGodinaDown(a, b) {
  if (a.godina > b.godina)
    return -1;
  if (a.godina < b.godina)
    return 1;
  return 0;
}

strDoleGod.addEventListener('click', function (e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareGodinaDown);
  render(sortirano);

  console.log(sortirano);
});

function compareNazivUp(a, b) {
  if (a.naziv < b.naziv)
    return -1;
  if (a.naziv > b.naziv)
    return 1;
  return 0;
}

strGoreNaz.addEventListener('click', function (e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareNazivUp);
  render(sortirano);
  console.log(sortirano);
});

function compareNazivuDown(a, b) {
  if (a.naziv > b.naziv)
    return -1;
  if (a.naziv < b.naziv)
    return 1;
  return 0;
}

strDoleNaz.addEventListener('click', function (e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareNazivuDown);
  render(sortirano);
  console.log(sortirano);
});

// MODAL

$(document).on('click', ".filmski-div", function (){
  $("#myModal").modal('show');
  let ime = $(this).find("h3").html()
  
  fetch(`http://www.omdbapi.com/?t=${ime}&plot=full&apikey=c3d2adef`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    
    document.querySelector(".naziv").innerHTML = data.Title;
    document.querySelector(".glumci").innerHTML = data.Actors;
    document.querySelector(".plot").innerHTML = data.Plot;
    document.querySelector(".nagrade").innerHTML = data.Awards;
})

});
$('#ok').on('click', function () {
  $("#myModal").modal('hide');
})

// MODAL END 





