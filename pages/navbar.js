document.addEventListener("DOMContentLoaded", function () {
  const contenitoreNavbar = document.getElementById("navbar-comune");

  // 1. Se siamo in una pagina secondaria, inietta la navbar comune
  if (contenitoreNavbar) {
    contenitoreNavbar.innerHTML = `
      <nav class="navbar-hero">
        <a href="../../index.html" class="logo">
          <img src="../../assets/icons/logo_con_sfondo.svg" alt="Logo Sentieri Partenopei">
        </a>
        <div class="nav-links">
          <a href="../../index.html">Homepage</a>
          <a href="#">I nostri tour</a>
          <a href="../about_us/about-us.html">Chi siamo</a>
          <a href="#">I nostri valori</a>
          <a href="#">Turismo etico</a>
          <a href="../lavora_con_noi/lavora-con-noi.html">Lavora con noi</a>
          <button type="button" id="btn-lingua" class="btn-lingua">EN</button>
        </div>
      </nav>
    `;

    // Evidenzia la pagina attiva
    const paginaCorrente = window.location.pathname.split("/").pop();
    contenitoreNavbar.querySelectorAll(".nav-links a").forEach((link) => {
      const hrefLink = link.getAttribute("href");
      if (hrefLink && hrefLink.includes(paginaCorrente) && paginaCorrente !== "") {
        link.classList.add("attivo");
      }
    });
  }

  // 2. Attiva il pulsante traduzione (funziona sia nella Home che nelle pagine secondarie)
  const btnLingua = document.getElementById("btn-lingua");
  if (btnLingua) {
    let linguaAttuale = localStorage.getItem("linguaSentieri") || "it";

    if (linguaAttuale === "en") {
      traduciPagina("en");
      btnLingua.textContent = "IT";
    }

    btnLingua.addEventListener("click", function () {
      linguaAttuale = linguaAttuale === "it" ? "en" : "it";
      localStorage.setItem("linguaSentieri", linguaAttuale);
      btnLingua.textContent = linguaAttuale === "it" ? "EN" : "IT";
      traduciPagina(linguaAttuale);
    });
  }
});

// 3. Dizionario IT -> EN (Home Page + About Us + Lavora con noi)
const mappaTraduzioni = {
  // Navbar e Footer comuni
  "I nostri tour": "Our Tours",
  "Chi siamo": "About Us",
  "I nostri valori": "Our Values",
  "Turismo etico": "Ethical Tourism",
  "Lavora con noi": "Work With Us",
  "Un modo diverso di scoprire Napoli.": "A different way to discover Naples.",
  "Il progetto è gratuito. Le donazioni alle guide sono gradite.": "The project is free. Donations to our guides are appreciated.",
  "© 2026 Sentieri Partenopei - Tutti i diritti riservati.": "© 2026 Sentieri Partenopei - All rights reserved.",

  // Home Page (index.html)
  "Napoli non si visita. Si vive.": "Naples is not just visited. It is lived.",
  "Scopri la città attraverso esperienze autentiche, sostenibili e a contatto con le persone che la abitano.": "Discover the city through authentic, sustainable experiences in contact with the people who live there.",
  "Scopri i nostri tour": "Discover our tours",
  "Siamo una comunità di giovani e studenti dell'Università Federico II di Napoli, uniti dalla volontà di promuovere un modo diverso di vivere e scoprire la città.": "We are a community of young people and students from the Federico II University of Naples, united by the desire to promote a different way of living and discovering the city.",
  "Attraverso tour ed esperienze culturali vogliamo creare un legame tra visitatori, territorio e comunità locale, valorizzando le tradizioni e l'identità napoletana.": "Through tours and cultural experiences, we aim to create a bond between visitors, the territory, and the local community, enhancing Neapolitan traditions and identity.",
  "Il nostro modo di fare turismo": "Our way of doing tourism",
  "Sostenibilità ambientale": "Environmental sustainability",
  "Promuoviamo spostamenti a basso impatto ambientale e valorizziamo le produzioni locali e le esperienze gastronomiche sostenibili.": "We promote low-impact mobility and enhance local productions and sustainable food experiences.",
  "Responsabilità sociale": "Social responsibility",
  "Vogliamo un turismo attento alle persone, alle tradizioni e alle esigenze di chi vive quotidianamente la città.": "We want tourism that is attentive to people, traditions, and the needs of those who live in the city every day.",
  "Accessibilità": "Accessibility",
  "Crediamo che il turismo sostenibile debba essere accessibile a tutti, senza diventare un'esperienza costosa o riservata a pochi.": "We believe that sustainable tourism should be accessible to everyone, without becoming an expensive experience reserved for a few.",
  "Scopri Napoli con noi": "Discover Naples with us",
  "Non semplici visite turistiche, ma occasioni per conoscere la storia, la cultura e le persone che rendono unica Napoli.": "Not simple sightseeing tours, but opportunities to learn about the history, culture, and people that make Naples unique.",
  "← Tutti i tour": "← All tours",
  "Storia e tradizioni": "History and traditions",
  "Immergiti nella storia e nelle tradizioni del patrimonio culturale napoletano.": "Immerse yourself in the history and traditions of Neapolitan cultural heritage.",
  "Napoli e i suoi sapori": "Naples and its flavors",
  "Scopri la cultura gastronomica locale e le produzioni del territorio.": "Discover the local gastronomic culture and regional products.",
  "Alla scoperta della città": "Discovering the city",
  "Esplora Napoli attraverso percorsi e modalità di spostamento sostenibili.": "Explore Naples through sustainable routes and modes of transport.",
  "Contattaci per saperne di più": "Contact us to learn more",
  "Viaggia responsabilmente": "Travel responsibly",
  "Crediamo che visitare una città significhi anche rispettare chi la abita. Ecco perché vogliamo promuovere un turismo più consapevole.": "We believe that visiting a city also means respecting those who live there. That is why we want to promote more conscious tourism.",
  "Scopri i nostri consigli": "Discover our tips",
  "Entra a far parte della nostra comunità": "Join our community",
  "Sei giovane, curioso e vuoi contribuire a un modo diverso di vivere il turismo? Unisciti a noi e diventa parte del cambiamento.": "Are you young, curious, and want to contribute to a different way of experiencing tourism? Join us and become part of the change.",
  "Collabora con noi": "Collaborate with us",

  // Pagina About Us
  "Chi siamo e la nostra Vision": "About Us & Our Vision",
  "Una comunità studentesca dell'Università Federico II che promuove un turismo lento, etico e sostenibile a Napoli.": "A student community from Federico II University promoting slow, ethical, and sustainable tourism in Naples.",
  "La nostra identità": "Our Identity",
  "I 3 pilastri della nostra filosofia": "The 3 Pillars of Our Philosophy",
  "Il nostro intento a lungo termine è trasformare il modo di visitare Napoli agendo su tre fronti concreti.": "Our long-term goal is to transform how people visit Naples by acting on three concrete fronts.",
  "1. Fronte Ecologico": "1. Ecological Front",
  "2. Fronte Sociale": "2. Social Front",
  "3. Fronte dell'Accessibilità": "3. Accessibility Front",
  "Il nostro impatto socio-ambientale in numeri": "Our Socio-Environmental Impact in Numbers",
  "Dati verificati e aggiornati sull'attività dei nostri percorsi e sui benefici generati per la città di Napoli.": "Verified and updated data on our routes' activity and the benefits generated for the city of Naples.",
  "Calcola il tuo risparmio di CO₂ partecipando a un tour": "Calculate Your CO₂ Savings by Joining a Tour",
  "Calcola impatto": "Calculate Impact",

  // Pagina Lavora con noi
  "Diventa guida dei nostri percorsi a Napoli": "Become a Guide for Our Routes in Naples",
  "I nostri 5 percorsi: scopri il tuo ruolo": "Our 5 Routes: Discover Your Role",
  "Candidatura spontanea": "Spontaneous Application",
  "1. Dati anagrafici e di studio": "1. Personal & Study Details",
  "2. Preferenza dei tour *": "2. Tour Preferences *",
  "3. Esperienze pregresse e motivazione": "3. Previous Experience & Motivation",
  "Invia la tua candidatura": "Submit Your Application",
  "Candidati per questo tour": "Apply for this tour",
  "Tour Marittimo": "Maritime Tour",
  "Tour in Bici": "Bike Tour",
  "Tour per Famiglie": "Family Tour",
  "Tour Gastronomico": "Food Tour",
  "Tour Culturale": "Cultural Tour"
};

function traduciPagina(lingua) {
  const dizionarioAttivo = lingua === "en"
    ? mappaTraduzioni
    : Object.fromEntries(Object.entries(mappaTraduzioni).map(([it, en]) => [en, it]));

  const elementiTesto = document.querySelectorAll("a, h1, h2, h3, p, button, label, span");
  elementiTesto.forEach((el) => {
    if (el.children.length === 0) {
      // Normalizza gli spazi e gli a capo dell'HTML per far combaciare i paragrafi su più righe
      const testoPulito = el.textContent.replace(/\s+/g, " ").trim();
      if (dizionarioAttivo[testoPulito]) {
        el.textContent = dizionarioAttivo[testoPulito];
      }
    }
  });
}
