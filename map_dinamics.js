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

let pin = L.marker([40.8351, 14.2486]).addTo(mappa);
pin.bindPopup("<b>Napoli</b><br>città.");

// Il layerGroup di Leaflet è un contenitore. livello parte vuoto. Ogni linea o pin che aggiungeremo con .addTo(livello) finirà lì dentro, e livello.clearLayers() lo svuoterà.
var livello = L.layerGroup().addTo(mappa);

function showGeneral() {
  livello.clearLayers();                                   // 1. svuota la mappa
  document.getElementById('indietro').style.display = 'none';   // 2. nasconde il pulsante
  document.getElementById('titolo').textContent = 'Clicca su un percorso per vedere il tour';

  var tutteLeCoordinate = [];

  tour.forEach(function (t) {                              // 3. per ogni tour...
    var coords = t.punti.map(function (p) { return p.coord; });   // lista delle sole coordinate

    var linea = L.polyline(coords, { color: t.colore, weight: 6 }).addTo(livello);
    linea.bindTooltip(t.nome, { sticky: true });           // etichetta al passaggio del mouse
    linea.on('click', function () { mostraTour(t); });     // al clic, apri questo tour

    tutteLeCoordinate = tutteLeCoordinate.concat(coords);
  });

  mappa.fitBounds(tutteLeCoordinate);                      // 4. inquadra tutti i percorsi
}



let mappa = L.map('mappa').setView([40.8351, 14.2486], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom : 10,
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mappa);