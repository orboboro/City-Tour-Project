// 1. Array con i 5 percorsi culturali a Napoli
const percorsiNapoli = [
  {
    id: "Tour-Marittimo",
    titolo: "Tour Marittimo",
    immagine: "../../assets/img/centro-storico.jpg",
    ruolo: "Guiderai un'escursione a impatto zero in kayak o SUP dalla Spiaggetta delle Monache alla Baia di Trentaremi, esplorando grotte marine e conducendo attività di citizen science.",
    competenze: "Studenti di biologia marina o scienze ambientali, acquaticità e dimestichezza con kayak o SUP.",
    impegno: "2,5 - 3 ore (30 min briefing, 1,5 ore pagaiata, 45 min snorkeling e monitoraggio)"
  },
  {
    id: "tour-bici",
    titolo: "Tour in Bici",
    immagine: "../../assets/img/quartieri-spagnoli.jpg",
    ruolo: "Condurrai un itinerario ciclo-naturalistico dalla Stazione di Bagnoli tra il Cratere degli Astroni, Monte Nuovo e il Lago d'Averno, spiegando il bradisismo e la storia vulcanica.",
    competenze: "Studenti di geologia o scienze naturali, abitudine ai sentieri sterrati in bici e approccio conviviale.",
    impegno: "3,5 - 4 ore (2 ore pedalata di 15-20 km + soste panoramiche e racconti)"
  },
  {
    id: "tour-famiglie",
    titolo: "Tour per Famiglie",
    immagine: "../../assets/img/napoli-esoterica.jpg",
    ruolo: "Accompagnerai famiglie lungo i 414 gradini della Pedamentina e nel Borgo del Petraio, trasformando la passeggiata in una fiaba urbana con giochi didattici e cacce al dettaglio.",
    competenze: "Studenti di pedagogia, architettura o beni culturali con attitudine all'animazione per bambini.",
    impegno: "2 ore (1 ora camminata lenta in discesa + 1 ora giochi didattici e merenda)"
  },
  {
    id: "tour-gastronomico",
    titolo: "Tour Gastronomico",
    immagine: "../../assets/img/lungomare-castelli.jpg",
    ruolo: "Guiderai uno slow walking tour da Porta San Gennaro tra i vicoli del Rione Sanità e dei Vergini, visitando panifici storici, orti urbani comunitari e botteghe antispreco.",
    competenze: "Studenti fuori sede o locali appassionati di cultura gastronomica, consumo consapevole ed economia circolare.",
    impegno: "3 ore (1,5 ore passeggiata nei vicoli + 1,5 ore in 4-5 tappe di assaggio)"
  },
  {
    id: "tour-culturale",
    titolo: "Tour Culturale",
    immagine: "../../assets/img/vomero-liberty.jpg",
    ruolo: "Svelerai i tesori gotici e medievali nascosti da Piazza Calenda tra Forcella e il Lavinaio (Donnaregina Vecchia, San Pietro ad Aram, Sant'Eligio) senza tecnicismi accademici.",
    competenze: "Studenti di storia dell'arte o conservazione dei beni culturali con ottime doti narrative.",
    impegno: "2,5 ore (1 ora spostamento a piedi + 1,5 ore visite interne a chiese e chiostri)"
  }
];

// 2. Funzione che genera le 5 card e le 5 checkbox nella pagina
function inizializzaPagina() {
  const grigliaTour = document.getElementById("griglia-tour");
  const contenitoreCheckbox = document.getElementById("checkbox-tour");

  percorsiNapoli.forEach((tour) => {
    // Creazione Card per la User Story 1
    const card = document.createElement("article");
    card.className = "card-tour";
    card.innerHTML = `
      <div>
        <img src="${tour.immagine}" alt="Immagine del tour ${tour.titolo}" class="foto-tour">
        <h3>${tour.titolo}</h3>
        <p>${tour.ruolo}</p>
        <div class="dettaglio-ruolo">
          <p><strong>Competenze utili:</strong> ${tour.competenze}</p>
          <p><strong>Impegno richiesto:</strong> ${tour.impegno}</p>
        </div>
      </div>
      <button type="button" class="btn-scegli" onclick="selezionaTour('${tour.id}')">
        Candidati per questo tour
      </button>
    `;
    grigliaTour.appendChild(card);

    // Creazione Checkbox per la User Story 2
    const labelCheckbox = document.createElement("label");
    labelCheckbox.className = "item-checkbox";
    labelCheckbox.innerHTML = `
      <input type="checkbox" name="tourScelti" value="${tour.titolo}" id="chk-${tour.id}">
      <span>${tour.titolo}</span>
    `;
    contenitoreCheckbox.appendChild(labelCheckbox);
  });
}

// 3. Funzione collegata al pulsante della card: seleziona la checkbox e scorre al form
function selezionaTour(idTour) {
  const checkbox = document.getElementById(`chk-${idTour}`);
  if (checkbox) {
    checkbox.checked = true;
  }
  document.getElementById("sezione-candidatura").scrollIntoView({
    behavior: "smooth"
  });
}

// 4. Gestione invio del form e validazione
document.getElementById("form-candidatura").addEventListener("submit", function (event) {
  event.preventDefault();

  const erroreTour = document.getElementById("errore-tour");
  const feedbackInvio = document.getElementById("feedback-invio");
  erroreTour.textContent = "";

  // Controllo che almeno un tour sia stato selezionato
  const checkboxesSelezionate = document.querySelectorAll('input[name="tourScelti"]:checked');
  if (checkboxesSelezionate.length === 0) {
    erroreTour.textContent = "Seleziona almeno un tour per poter inviare la candidatura.";
    return;
  }

  // Raccolta dei dati inseriti dallo studente
  const listaTour = Array.from(checkboxesSelezionate).map((cb) => cb.value);
  const candidatura = {
    nome: document.getElementById("nome").value.trim(),
    cognome: document.getElementById("cognome").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    studi: document.getElementById("studi").value.trim(),
    lingue: document.getElementById("lingue").value.trim(),
    esperienze: document.getElementById("esperienze").value.trim(),
    tourPreferiti: listaTour,
    dataInvio: new Date().toLocaleDateString("it-IT")
  };

  // Salvataggio nel localStorage (utile da mostrare al docente come simulazione di database)
  const candidatureSalvate = JSON.parse(localStorage.getItem("candidatureNapoli")) || [];
  candidatureSalvate.push(candidatura);
  localStorage.setItem("candidatureNapoli", JSON.stringify(candidatureSalvate));

  // Mostra messaggio di conferma
  feedbackInvio.className = "feedback-visibile";
  feedbackInvio.innerHTML = `
    <strong>Candidatura inviata con successo!</strong><br>
    Grazie <strong>${candidatura.nome} ${candidatura.cognome}</strong>, abbiamo registrato la tua richiesta per i seguenti percorsi: 
    <em>${listaTour.join(", ")}</em>. Ti contatteremo presto all'indirizzo ${candidatura.email}.
  `;

  // Svuota il modulo
  this.reset();
});

// Avvia la generazione dei contenuti appena la pagina è caricata
document.addEventListener("DOMContentLoaded", inizializzaPagina);
