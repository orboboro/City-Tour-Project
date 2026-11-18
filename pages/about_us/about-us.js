// 1. Dati verificati sull'impatto socio-ambientale del progetto
const statisticheImpatto = [
  {
    valore: "1.480 km",
    titolo: "Percorsi a impatto zero",
    dettaglio: "920 km a piedi nei vicoli, 410 km in bici nei Campi Flegrei e 150 km in kayak a Posillipo."
  },
  {
    valore: "310 kg",
    titolo: "CO₂ risparmiata",
    dettaglio: "Emissioni evitate sostituendo pullman turistici e mezzi motorizzati con mobilità dolce."
  },
  {
    valore: "18 botteghe",
    titolo: "Realtà locali sostenute",
    dettaglio: "Panifici storici, orti urbani comunitari e artigiani del Rione Sanità e Forcella coinvolti."
  },
  {
    valore: "85%",
    titolo: "Cibo a km 0 e plant-based",
    dettaglio: "Percentuale di degustazioni realizzate con prodotti campani stagionali e a basso impatto."
  }
];

// 2. Dati dei 5 tour per il calcolatore interattivo (media bus turistico: ~0.21 kg CO2/km per passeggero)
const datiCalcolatore = [
  { nome: "Tour Marittimo (Kayak a Posillipo)", km: 6, mezzo: "Kayak / SUP", azioneSociale: "Monitoraggio pulizia acque (citizen science) nella Baia di Trentaremi." },
  { nome: "Tour in Bici (Campi Flegrei)", km: 18, mezzo: "Bicicletta", azioneSociale: "Sostegno ai vigneti eroici e tutela dell'oasi di Monte Nuovo." },
  { nome: "Tour per Famiglie (Pedamentina e Petraio)", km: 3.5, mezzo: "A piedi", azioneSociale: "Valorizzazione degli orti urbani e delle aree pedonali collinari." },
  { nome: "Tour Gastronomico (Rione Sanità)", km: 4, mezzo: "A piedi", azioneSociale: "Supporto diretto a fornai storici e botteghe antispreco di quartiere." },
  { nome: "Tour Culturale (Gotico dimenticato)", km: 4.5, mezzo: "A piedi", azioneSociale: "Contributo al recupero di chiese e chiostri gestiti da giovani del territorio." }
];

// 3. Stampa le card delle statistiche al caricamento della pagina
function caricaStatistiche() {
  const griglia = document.getElementById("griglia-statistiche");

  statisticheImpatto.forEach((stat) => {
    const card = document.createElement("div");
    card.className = "card-stat";
    card.innerHTML = `
      <span class="numero-stat">${stat.valore}</span>
      <span class="titolo-stat">${stat.titolo}</span>
      <p class="dettaglio-stat">${stat.dettaglio}</p>
    `;
    griglia.appendChild(card);
  });
}

// 4. Calcola il risparmio di CO2 per il tour selezionato
function calcolaImpattoTour() {
  const indice = document.getElementById("select-tour-impatto").value;
  const tour = datiCalcolatore[indice];
  const co2Risparmiata = (tour.km * 0.21).toFixed(2);

  const boxRisultato = document.getElementById("risultato-calcolo");
  boxRisultato.style.display = "block";
  boxRisultato.innerHTML = `
    <strong>Risultato per ${tour.nome}:</strong><br>
    Percorrendo <strong>${tour.km} km</strong> in modalità <em>${tour.mezzo}</em>, eviti circa <strong>${co2Risparmiata} kg di CO₂</strong> rispetto a un mezzo turistico tradizionale.<br>
    <strong>Impatto sociale diretto:</strong> ${tour.azioneSociale}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  caricaStatistiche();
  document.getElementById("btn-calcola").addEventListener("click", calcolaImpattoTour);
  calcolaImpattoTour();
});
