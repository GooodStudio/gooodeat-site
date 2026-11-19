// Mesure d'audience de www.gooodeat.com (19/11/2026). Chargé par Base.astro.
//
// Pourquoi ce fichier : le script DataFast vivait dans Framer et s'est perdu à
// la bascule vers Astro le 29/08/2026 (0 visite remontée depuis). Il reprend le
// modèle validé sur annecharlotte.be (annecharlotte-site/public/js/consentement.js).
//
// DataFast tourne en mode « sans cookie » : chargé dès l'arrivée pour compter
// tout le monde, sans cookie et sans transfert à Google (identifiant haché côté
// serveur, sel renouvelé chaque jour ; seul un identifiant de session
// temporaire est gardé en sessionStorage). Base légale : intérêt légitime.
// Le réglage « Cookieless » du site DataFast doit rester activé : les deux
// vont ensemble.
//
// Pas de GA4 ni de bandeau : Gooodeat n'a pas de propriété GA4. Pour en ajouter
// une, reprendre le bandeau de consentement d'annecharlotte-site (GA4 ne se
// charge qu'après « D'accord », APD) et mettre la politique à jour.
(function () {
  'use strict';

  var DATAFAST_ID = 'dfid_TGOXFNK6a2tNiFn6E4VNx'; // site DataFast « www.gooodeat.com », créé le 24/06/2026 (historique Framer conservé)
  var DATAFAST_DOMAINE = 'www.gooodeat.com'; // = domaine enregistré dans DataFast
  var HOTES_MESURES = ['www.gooodeat.com', 'gooodeat.com'];

  var enProd = HOTES_MESURES.indexOf(location.hostname) !== -1;

  // Ménage des cookies hérités du site Framer (avant le 29/08/2026), qui
  // chargeait le script DataFast avec cookies (datafast_*, 365 jours).
  document.cookie.split(';').forEach(function (c) {
    var n = c.split('=')[0].trim();
    if (!/^datafast_/.test(n)) return;
    [location.hostname, '.' + location.hostname.replace(/^www\./, '')].forEach(function (d) {
      document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
    });
    document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  });

  // File d'attente : les objectifs envoyés avant la fin du chargement partent ensuite.
  window.datafast = window.datafast || function () { (window.datafast.q = window.datafast.q || []).push(arguments); };
  if (enProd) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://datafa.st/js/script.cookieless.js';
    s.setAttribute('data-website-id', DATAFAST_ID);
    s.setAttribute('data-domain', DATAFAST_DOMAINE);
    document.head.appendChild(s);
  }

  // Objectifs (clics utiles)
  function suivre(nom, params) {
    if (!enProd) return;
    try { window.datafast(nom, params || {}); } catch (e) {}
  }
  function emplacement(el) {
    if (el.closest('header')) return 'entete';
    if (el.closest('footer')) return 'pied';
    return 'page';
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a[href]');
    if (!el) return;
    var h = el.getAttribute('href') || '';
    if (/apps\.apple\.com\//i.test(h)) suivre('telechargement_clic', { store: 'ios', emplacement: emplacement(el) });
    else if (/play\.google\.com\//i.test(h)) suivre('telechargement_clic', { store: 'android', emplacement: emplacement(el) });
    else if (/^mailto:/i.test(h)) suivre('contact_email', { emplacement: emplacement(el) });
  }, true);
  document.addEventListener('submit', function (e) {
    if (e.target.closest && e.target.closest('.contact-form')) suivre('contact_formulaire', {});
  }, true);
  window.gooodSuivre = suivre;
})();
