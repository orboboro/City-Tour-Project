/* =========================================
   1. I DATI: l'elenco delle recensioni
   Per aggiungerne una, copia un blocco { ... }
   e ricordati la virgola tra un blocco e l'altro.
   "foto" è un elenco di percorsi immagine: lascialo [] se non ci sono foto.
========================================= */

const recensioni = [
    {
        nome: "Giulia R.",
        tour: "Tour Gastronomico",
        voto: 5,
        testo: "Un'esperienza indimenticabile! La guida ci ha portati in friggitorie e pizzerie che da soli non avremmo mai trovato. Ogni assaggio era accompagnato da storie e curiosità sulla tradizione napoletana. Consigliatissimo a chi vuole mangiare davvero come un napoletano.",
        foto: ["assets/images/recensioni/giulia1.jpg", "assets/images/recensioni/giulia2.jpg"]
    },
    {
        nome: "Marco T.",
        tour: "Tour Marittimo",
        voto: 5,
        testo: "Giornata splendida lungo la costa. Il panorama sul Vesuvio dal mare è mozzafiato e l'equipaggio è stato gentilissimo e preparato. Ottima organizzazione dall'inizio alla fine.",
        foto: ["assets/images/recensioni/marco1.jpg"]
    },
    {
        nome: "Sophie L.",
        tour: "Tour Culturale",
        voto: 5,
        testo: "La nostra guida conosceva ogni angolo del centro storico. Abbiamo visitato chiese, cortili nascosti e botteghe artigiane, con spiegazioni chiare e appassionate. Il tour migliore del nostro viaggio in Italia.",
        foto: []
    },
    {
        nome: "Luca B.",
        tour: "Tour in Bici",
        voto: 4,
        testo: "Bel modo di scoprire la città, con tappe ben scelte. Unica pecca: qualche tratto di traffico intenso, ma la guida è stata sempre attenta alla sicurezza.",
        foto: ["assets/images/recensioni/luca1.jpg"]
    },
    {
        nome: "Famiglia Esposito",
        tour: "Tour per Famiglie",
        voto: 4,
        testo: "I nostri bambini si sono divertiti moltissimo grazie ai giochi e alle storie raccontate lungo il percorso. Il ritmo era adatto a tutti. Avremmo gradito qualche pausa in più.",
        foto: []
    },
    {
        nome: "Anna K.",
        tour: "Tour Gastronomico",
        voto: 2,
        testo: "Il cibo era buono ma il gruppo era troppo numeroso e si faceva fatica a sentire la guida. Alcune tappe erano molto affollate e abbiamo aspettato a lungo.",
        foto: []
    },
    {
        nome: "Paolo D.",
        tour: "Tour Marittimo",
        voto: 1,
        testo: "La partenza è stata ritardata di quasi un'ora a causa del meteo e non siamo stati avvisati in tempo. Mi aspettavo una comunicazione migliore.",
        foto: []
    },
    {
        nome: "Chiara M.",
        tour: "Tour in Bici",
        voto: 3,
        testo: "Esperienza nella media. Le biciclette erano in buono stato, ma il percorso mi è sembrato un po' ripetitivo.",
        foto: []
    }
];


/* =========================================
   2. FUNZIONI DI SUPPORTO
========================================= */

// Trasforma 4 in "★★★★☆" (sempre 5 simboli in totale)
function creaStelle(voto) {
    return "★".repeat(voto) + "☆".repeat(5 - voto);
}

// Crea il codice HTML di UNA recensione
function creaCard(recensione) {
    let htmlFoto = "";

    if (recensione.foto.length > 0) {
        htmlFoto = '<div class="review-photos">';
        recensione.foto.forEach(function (percorso) {
            htmlFoto += '<img src="' + percorso + '" alt="Foto di ' + recensione.nome + '">';
        });
        htmlFoto += "</div>";
    }

    return `
        <article class="review-card">
            <h3>${recensione.nome}</h3>
            <p class="review-tour">${recensione.tour}</p>
            <p class="review-stars">${creaStelle(recensione.voto)}</p>
            <p>${recensione.testo}</p>
            ${htmlFoto}
        </article>
    `;
}

// Mostra una lista di recensioni dentro un contenitore
function mostra(lista, contenitore) {
    if (lista.length === 0) {
        contenitore.innerHTML = "<p>Nessuna recensione trovata per questo filtro.</p>";
        return;
    }
    contenitore.innerHTML = lista.map(creaCard).join("");
}


/* =========================================
   3. LE 3 MIGLIORI
   Si ordinano per voto (dal più alto) e si prendono le prime 3.
   [...recensioni] fa una copia, così l'elenco originale non cambia.
========================================= */

const topBoard = document.getElementById("top-board");

const migliori3 = [...recensioni]
    .sort(function (a, b) { return b.voto - a.voto; })
    .slice(0, 3);

mostra(migliori3, topBoard);


/* =========================================
   4. FILTRI
========================================= */

const filteredBoard = document.getElementById("filtered-board");
const resultsCount = document.getElementById("results-count");
const filterButtons = document.querySelectorAll(".filter-btn");

// Restituisce solo le recensioni che rispettano il filtro scelto
function applicaFiltro(nomeFiltro) {
    if (nomeFiltro === "tutte") {
        return recensioni;
    }
    if (nomeFiltro === "migliori") {
        return recensioni.filter(function (r) { return r.voto >= 4; });
    }
    if (nomeFiltro === "peggiori") {
        return recensioni.filter(function (r) { return r.voto <= 2 && r.voto >= 1; });
    }
    if (nomeFiltro === "foto") {
        return recensioni.filter(function (r) { return r.foto.length > 0; });
    }
    // Se non è nessuno dei precedenti, è il nome di un tour
    return recensioni.filter(function (r) { return r.tour === nomeFiltro; });
}

function aggiornaBacheca(nomeFiltro) {
    const risultati = applicaFiltro(nomeFiltro);
    mostra(risultati, filteredBoard);
    resultsCount.textContent = "Recensioni trovate: " + risultati.length;
}

// Al clic su un pulsante: evidenzialo e aggiorna la bacheca
filterButtons.forEach(function (bottone) {
    bottone.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        bottone.classList.add("active");
        aggiornaBacheca(bottone.dataset.filter);
    });
});

// All'apertura della pagina mostra tutte le recensioni
aggiornaBacheca("tutte");


/* =========================================
   5. FORM
   Per ora il form NON salva i dati: mostra solo un messaggio.
   Per riceverli davvero serve un servizio esterno o un server.
========================================= */

const form = document.getElementById("review-form");
const messaggio = document.getElementById("form-message");

form.addEventListener("submit", function (evento) {
    evento.preventDefault();   // blocca il ricaricamento della pagina

    const nome = document.getElementById("nome").value;
    messaggio.textContent = "Grazie " + nome + "! La tua recensione è stata inviata.";
    form.reset();              // svuota i campi
});
