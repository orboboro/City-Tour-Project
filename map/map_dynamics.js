let mappa = L.map('mappa').setView([40.8351, 14.2486], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom : 11,
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mappa);

function latLon(path) {
return path.map(function (c) { return [c[1], c[0]]; });
}


// Il layerGroup di Leaflet è un contenitore. livello parte vuoto. Ogni linea o pin che aggiungeremo con .addTo(livello) finirà lì dentro, e livello.clearLayers() lo svuoterà.
let livello = L.layerGroup().addTo(mappa);

function showGeneral() {
  livello.clearLayers();
  document.getElementById('indietro').style.display = 'none';
  document.getElementById('titolo-tour').textContent = 'Clicca su un tour per vedere i dettagli';
  document.getElementById('titolo-tour').style.removeProperty('--colore-tour');

  let tutteLeCoordinate = [];

  tours.forEach(function (t) {
    let coords = latLon(t.path);
    let linea = L.polyline(coords, { color: t.colore, weight: 6 }).addTo(livello);
    linea.bindTooltip(t.nome, { sticky: true });
    linea.on('click', function () { showTour(t); });

    tutteLeCoordinate = tutteLeCoordinate.concat(coords);
  });

  mappa.fitBounds(tutteLeCoordinate);
}

// tour.forEach(function (t) {...}) ripete il blocco una volta per ogni tour dell’elenco, e dentro t è il tour corrente.
// t.hotspots.map(...) estrae da ogni punto solo le coordinate, perché L.polyline vuole una lista di coordinate.
// L.polyline(coords, {...}) disegna una linea che passa per i hotspots. color è il colore e weight lo spessore in pixel (6 la rende facile da cliccare).
// bindTooltip mostra il nome del tour mentre il mouse è sopra la linea. Sul telefono non esiste il “passaggio del mouse”, quindi lì si vede solo toccando.
// linea.on('click', ...) dice: “quando qualcuno clicca questa linea, esegui showTour(t)”. Quella funzione la scriviamo al passo successivo.
// fitBounds(...) sposta e zooma la mappa in modo da far stare tutti quei hotspots nello schermo.

function showTour(t) {
  livello.clearLayers();                                   // svuota: via le altre linee
  document.getElementById('indietro').style.display = 'inline';
  document.getElementById('titolo-tour').textContent = t.nome + ' – ' + t.descrizione;
  document.getElementById('titolo-tour').style.setProperty('--colore-tour', t.colore);

  let coords = latLon(t.path);

  L.polyline(coords, { color: t.colore, weight: 4 }).addTo(livello);

  t.hotspots.forEach(function (p) {
    L.marker(p.coord).addTo(livello)
      .bindPopup(
        '<b>' + p.nome + '</b>' +
        '<br>' + p.testo + '</b>' +
        '<img src ="map/images/hotspot_images/' + p.image + '" style="width: 200px; height: 130px">'
      )
  });

  mappa.fitBounds(coords);
}

document.getElementById('indietro').addEventListener('click', showGeneral);

showGeneral();