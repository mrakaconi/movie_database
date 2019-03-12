const prikaz = document.getElementById('ispis')
const kriterij = document.getElementById('title')
const strGoreGod = document.getElementById('gore_god')
const strDoleGod = document.getElementById('dole_god')
const strGoreNaz = document.getElementById('gore_naz')
const strDoleNaz = document.getElementById('dole_naz')



let sviFilmovi = []

function render(niz) {
  let sablon = ''
  for (var i = 0; i < niz.length; i++) {
    sablon += ` <img src="${niz[i].slika}" alt="" width="100">
                <h3>${niz[i].naziv}</h3>
                <h3>${niz[i].godina}</h3>
                `
  }
  prikaz.innerHTML = sablon
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

function compareGodinaUp(a,b) {
  if (a.godina < b.godina)
    return -1;
  if (a.godina > b.godina)
    return 1;
  return 0;
}

strGoreGod.addEventListener('click', function(e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareGodinaUp);
  render(sortirano)
  console.log(sortirano);
  
});

function compareGodinaDown(a,b) {
  if (a.godina > b.godina)
    return -1;
  if (a.godina < b.godina)
    return 1;
  return 0;
}

strDoleGod.addEventListener('click', function(e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareGodinaDown);
  render(sortirano)
  console.log(sortirano);
});

function compareNazivUp(a,b) {
  if (a.naziv < b.naziv)
    return -1;
  if (a.naziv > b.naziv)
    return 1;
  return 0;
}

strGoreNaz.addEventListener('click', function(e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareNazivUp);
  render(sortirano)
  console.log(sortirano);
});

function compareNazivuDown(a,b) {
  if (a.naziv > b.naziv)
    return -1;
  if (a.naziv < b.naziv)
    return 1;
  return 0;
}

strDoleNaz.addEventListener('click', function(e) {
  e.preventDefault();
  let sortirano = sviFilmovi.sort(compareNazivuDown);
  render(sortirano)
  console.log(sortirano);
});
