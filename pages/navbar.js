document.addEventListener("DOMContentLoaded", function () {
  const contenitoreNavbar = document.getElementById("navbar-comune");
  if (!contenitoreNavbar) return;

  // 1. Inserisce la navbar uguale per tutte le pagine secondarie
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
        <button type="button" id="btn-lingua" class="btn-lingua" onclick="cambiaLingua()">🇬🇧 EN</button>
      </div>
    </nav>
    <div id="google_translate_element" style="display:none;"></div>
  `;

  // 2. Evidenzia in automatico la pagina attiva con il riquadro bianco
  const paginaCorrente = window.location.pathname.split("/").pop();
  const tuttiILink = contenitoreNavbar.querySelectorAll(".nav-links a");

  tuttiILink.forEach((link) => {
    const hrefLink = link.getAttribute("href");
    if (hrefLink && hrefLink.includes(paginaCorrente) && paginaCorrente !== "") {
      link.classList.add("attivo");
    }
  });

  // 3. Carica in automatico lo script di traduzione di Google
  const scriptGoogle = document.createElement("script");
  scriptGoogle.src = "https://google.translate.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(scriptGoogle);
});

// Funzioni globali per il traduttore
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'it',
    includedLanguages: 'it,en',
    autoDisplay: false
  }, 'google_translate_element');
}

function cambiaLingua() {
  const selectGoogle = document.querySelector('.goog-te-combo');
  const btn = document.getElementById('btn-lingua');
  if (!selectGoogle) return;

  if (selectGoogle.value === 'en') {
    selectGoogle.value = 'it';
    btn.textContent = '🇬🇧 EN';
  } else {
    selectGoogle.value = 'en';
    btn.textContent = '🇮🇹 IT';
  }
  selectGoogle.dispatchEvent(new Event('change'));
}
