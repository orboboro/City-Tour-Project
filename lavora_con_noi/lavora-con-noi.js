// 1. Array con i 5 percorsi culturali di default a Napoli
const percorsiNapoli = [
  {
    id: "centro-storico",
    titolo: "Decumani e Centro Storico",
    ruolo: "Guiderai i visitatori tra Spaccanapoli, San Gregorio Armeno e le chiese barocche, raccontando leggende e storia millenaria.",
    competenze: "Passione per storia dell'arte, buona dialettica, gestione gruppi.",
    impegno: "Sabato mattina (3 ore)"
  },
  {
    id: "quartieri-spagnoli",
    titolo: "Street Art ai Quartieri Spagnoli",
    ruolo: "Accompagnerai il gruppo alla scoperta dei murales contemporanei, dei vicoli storici e della cultura pop napoletana.",
    competenze: "Cultura contemporanea, dinamismo, inglese base.",
    impegno: "Venerdì pomeriggio (2.5 ore)"
  },
  {
    id: "napoli-esoterica",
    titolo: "Napoli Esoterica e Misteri",
    ruolo: "Un percorso serale incentrato su miti, fantasmi, alchimia e storie nascoste tra Piazza San Domenico e il Rione Sanità.",
    competenze: "Ottime doti di storytelling e coinvolgimento emotivo.",
    impegno: "Sabato sera (2 ore)"
  },
  {
    id: "lungomare-castelli",
    titolo: "Lungomare e i Castelli sul Mare",
    ruolo: "Passeggiata panoramica da Castel Nuovo a Castel dell'Ovo per spiegare l'evoluzione marittima e reale della città.",
    competenze: "Conoscenze storiche, resistenza fisica per percorsi a piedi.",
    impegno: "Domenica mattina (3 ore)"
  },
  {
    id: "vomero-liberty",
    titolo: "Vomero Liberty e Castel Sant'Elmo",
    ruolo: "Tour architettonico tra le ville in stile Liberty, le scale monumentali (Pedamentina) e la vista panoramica sulla città.",
    competenze: "Interesse per architettura e urbanistica, inglese intermedio.",
    impegno: "Domenica pomeriggio (2.5 ore)"
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
