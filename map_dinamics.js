let mappa = L.map('mappa').setView([40.8351, 14.2486], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom : 10,
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mappa);

let tour = [
            {
                nome: "Napoli reale e lungomare",
                colore: "#e63946",
                descrizione: "Castelli, piazze e palazzi del lungomare.",
                punti: [
                { nome: "Castel dell'Ovo", coord: [40.8281, 14.2477], testo: "Il castello più antico della città." },
                { nome: "Piazza del Plebiscito", coord: [40.8358, 14.2488], testo: "La grande piazza davanti al Palazzo Reale." },
                { nome: "Galleria Umberto I", coord: [40.8388, 14.2494], testo: "Galleria ottocentesca con cupola di vetro." },
                { nome: "Castel Nuovo", coord: [40.8383, 14.2531], testo: "Il Maschio Angioino, vicino al porto." }
                ]
            },
            {
                nome: "Centro storico e presepi",
                colore: "#1d6fb8",
                descrizione: "Vicoli, chiese e botteghe di San Gregorio Armeno.",
                punti: [
                { nome: "Museo Archeologico Nazionale", coord: [40.8535, 14.2509], testo: "Reperti di Pompei ed Ercolano." },
                { nome: "Chiesa del Gesù Nuovo", coord: [40.8473, 14.2531], testo: "Facciata a punte di diamante." },
                { nome: "Napoli Sotterranea", coord: [40.8516, 14.2568], testo: "Ingresso in Piazza San Gaetano." },
                { nome: "San Gregorio Armeno", coord: [40.8515, 14.2582], testo: "La via dei presepi." },
                { nome: "Duomo di Napoli", coord: [40.8528, 14.2594], testo: "La cattedrale di San Gennaro." }
                ]
            }
            ];


// Il layerGroup di Leaflet è un contenitore. livello parte vuoto. Ogni linea o pin che aggiungeremo con .addTo(livello) finirà lì dentro, e livello.clearLayers() lo svuoterà.
let livello = L.layerGroup().addTo(mappa);

function showGeneral() {
  livello.clearLayers();
  document.getElementById('indietro').style.display = 'none';
  document.getElementById('titolo').textContent = 'Clicca su un percorso per vedere il tour';

  let tutteLeCoordinate = [];

  tour.forEach(function (t) {
    let coords = t.punti.map(function (p) { return p.coord; });

    let linea = L.polyline(coords, { color: t.colore, weight: 6 }).addTo(livello);
    linea.bindTooltip(t.nome, { sticky: true });
    linea.on('click', function () { showTour(t); });

    tutteLeCoordinate = tutteLeCoordinate.concat(coords);
  });

  mappa.fitBounds(tutteLeCoordinate);
}

// tour.forEach(function (t) {...}) ripete il blocco una volta per ogni tour dell’elenco, e dentro t è il tour corrente.
// t.punti.map(...) estrae da ogni punto solo le coordinate, perché L.polyline vuole una lista di coordinate.
// L.polyline(coords, {...}) disegna una linea che passa per i punti. color è il colore e weight lo spessore in pixel (6 la rende facile da cliccare).
// bindTooltip mostra il nome del tour mentre il mouse è sopra la linea. Sul telefono non esiste il “passaggio del mouse”, quindi lì si vede solo toccando.
// linea.on('click', ...) dice: “quando qualcuno clicca questa linea, esegui showTour(t)”. Quella funzione la scriviamo al passo successivo.
// fitBounds(...) sposta e zooma la mappa in modo da far stare tutti quei punti nello schermo.

function showTour(t) {
  livello.clearLayers();                                   // svuota: via le altre linee
  document.getElementById('indietro').style.display = 'inline';
  document.getElementById('titolo').textContent = t.nome + ' – ' + t.descrizione;

  let coords = t.punti.map(function (p) { return p.coord; });

  L.polyline(coords, { color: t.colore, weight: 4 }).addTo(livello);   // il percorso

  t.punti.forEach(function (p) {                           // un pin per ogni punto
    L.marker(p.coord).addTo(livello)
      .bindPopup('<b>' + p.nome + '</b><br>' + p.testo);
  });

  mappa.fitBounds(coords);                                 // zoom su questo tour
}

document.getElementById('indietro').addEventListener('click', showGeneral);

showGeneral();