// Contenu du site gooodeat — refonte fidèle de l'ancien site Framer.
// Règles de marque (Master Brand Doc v2.1) : tutoiement, inclusif, PAS de
// tirets cadratins, "ton assistant Floris" (jamais "notre IA"), teal = Floris
// uniquement. Approche qualitative, JAMAIS de calories/macros/grammes.

export const site = {
  nom: 'gooodeat',
  domaine: 'https://www.gooodeat.com',
  baseline: 'scanne tes repas',
  titre: 'gooodeat · scanne tes repas',
  description:
    "Analyse ton assiette en une photo. Découvre ce que tu manges vraiment, sans compter les calories, sans culpabilité. Essaie gratuitement !",
  ogImage: '/img/og.png',
  // Liens stores (vérifiés en ligne le 27/08/2026).
  stores: {
    ios: 'https://apps.apple.com/app/habitude-gooodeat/id6770682706',
    android: 'https://play.google.com/store/apps/details?id=com.gooodeat.app',
  },
  contact: {
    email: 'hello@gooodeat.com',
    instagram: 'https://www.instagram.com/gooodeat.app/',
    instagramHandle: '@gooodeat.app',
    linkedin: 'https://www.linkedin.com/company/gooodeat',
  },
};

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Télécharger', href: '/telecharger/' },
  { label: 'Prix', href: '/prix/' },
  { label: 'Contact', href: '/contact/' },
];

export const hero = {
  titre1: 'Ton alimentation,',
  titreHl: 'ton meilleur investissement.',
  lede:
    "Prends une photo de ton repas, ton assistant Floris identifie ce que tu manges et te donne un score qualitatif immédiat. Sans compter les calories et sans culpabilité.",
};

// Section "Vois ton assiette autrement"
export const vision = {
  titre: 'Vois ton assiette autrement',
  texte:
    "Découvre ce qu'il y a dans chaque bouchée. Une approche visuelle et qualitative sans calories ni macros. Juste de l'équilibre et du plaisir.",
};

// Comment ça marche (3 étapes)
export const etapes = {
  titre: 'Comment ça marche',
  items: [
    {
      num: '01',
      t: 'Scanne tes plats',
      d: "Approche ta caméra ou dicte le contenu du plat et l'app reconnaît instantanément ce que tu manges.",
    },
    {
      num: '02',
      t: 'Obtiens la composition',
      d: "Ton assistant Floris te donne une vision claire de ton assiette, famille par famille. Pas de grammes, juste de l'équilibre.",
    },
    {
      num: '03',
      t: 'Suis ton évolution',
      d: "Une triple courbe hebdomadaire unique pour visualiser comment ta semaine s'est passée, pas juste une journée.",
    },
  ],
};

// Des outils pensés pour toi (grille de features)
export const outils = {
  titre: 'Des outils pensés pour toi',
  sous: 'Scanne. Planifie. Progresse. Avec ton assistant Floris, manger mieux devient naturel.',
  items: [
    {
      t: 'Scanne ton repas en une photo',
      d: "Floris identifie ce que tu manges et te donne un score qualitatif immédiat. Pas de grammes, juste une vision claire.",
      img: '/img/assiette.png',
      alt: "Assiette d'omelette avec fromage et légumes analysée par gooodeat",
    },
    {
      t: 'Suis ton évolution',
      d: "Une triple courbe hebdomadaire pour visualiser tes apports équilibrés et tes dépenses plaisir sur la semaine.",
      img: '/img/suivi-progression.png',
      alt: 'Écran de suivi de progression hebdomadaire gooodeat',
    },
    {
      t: 'Planifie tes repas',
      d: "Des recettes adaptées en illimité et un planning intelligent pour cuisiner mieux, sans te prendre la tête.",
      img: '/img/planifier-repas.png',
      alt: 'Écran de planification de repas gooodeat',
    },
    {
      t: '30 végétaux par semaine',
      d: "Challenge diversité végétale : légumes, fruits, légumineuses, céréales complètes. Plus tu varies, mieux ton microbiote se porte.",
      img: '/img/30-vegetaux.png',
      alt: 'Challenge 30 végétaux par semaine gooodeat',
    },
  ],
};

// Cuisine avec Floris
export const cuisine = {
  titre: 'Cuisine avec ton assistant Floris',
  texte:
    "Dis à Floris ce dont tu as envie, et regarde-le te proposer des idées de repas adaptées à ton équilibre.",
  bulle: "Prépare-moi quelque chose d'équilibré avec ce qu'il me reste dans le frigo",
  reflexion: 'Floris réfléchit',
};

// Nos offres (pricing)
export const offres = {
  titre: 'Nos offres',
  sous: 'Commence gratuitement, passe Premium quand tu veux. Sans pression, sans engagement.',
  plans: [
    {
      nom: 'Gratuit',
      prix: '0€',
      periode: '/mois',
      accroche: 'Pour débuter à ton rythme',
      cta: 'Télécharge maintenant',
      surligne: false,
      inclus: [
        '10 scans de plat',
        '5 recettes',
        'Historique 7 jours',
        'Équilibre de ton alimentation au quotidien',
        'Suivi de ton évolution',
      ],
    },
    {
      nom: 'Premium',
      prix: '49€',
      periode: '/an',
      accroche: 'Le meilleur investissement pour une bonne alimentation et ta santé',
      cta: 'Télécharge maintenant',
      surligne: true,
      inclus: [
        'Scans en illimité',
        'Recettes personnalisées à l\'infini',
        'Historique complet',
        'Menu & Batchcooking',
        'Statistiques intelligentes',
      ],
    },
    {
      nom: 'À vie',
      prix: '99€',
      prixBarre: '149€',
      periode: '/pers.',
      accroche: 'Offre de lancement',
      cta: 'Télécharge maintenant',
      surligne: false,
      inclus: [
        'Scans en illimité',
        'Recettes personnalisées à l\'infini',
        'Historique complet',
        'Menu & Batchcooking',
        'Statistiques intelligentes',
      ],
    },
  ],
};

export const faq = [
  {
    q: 'Comment fonctionne le score de mon repas ?',
    r: "Ton assistant Floris analyse ta photo et te donne une proportion qualitative basée sur l'équilibre de ton assiette. Pas de calories, pas de macros, pas d'injonctions : juste une vision claire et visuelle. On parle donc de la part des légumes, des protéines, des céréales complètes, des fruits et des oléagineux.",
  },
  {
    q: "gooodeat, c'est différent des autres applis de nutrition ?",
    r: "Oui. On ne compte pas les calories, on ne te juge pas. L'approche est qualitative, basée sur la science et ludique, inspirée du modèle compte en banque : chaque repas équilibré est un apport, chaque repas plaisir est un retrait nécessaire. L'objectif, c'est l'équilibre sur la durée. Ici, fini la culpabilité et les injonctions.",
  },
  {
    q: "C'est quoi le défi 30 végétaux ?",
    r: "Diversifie tes végétaux sur 7 jours : légumes, fruits, légumineuses, céréales complètes... Plus tu varies, mieux ton microbiote se porte. Si tu atteins 30 végétaux uniques dans la semaine, tu décroches un bonus microbiote pour gagner plus de fibres !",
  },
  {
    q: "L'app est-elle gratuite ?",
    r: "Oui ! Tu peux commencer gratuitement avec 10 scans par mois, 5 recettes et 1 semaine d'historique. Le Premium à vie est disponible à 99€ au lieu de 149€.",
  },
  {
    q: 'Floris, c\'est qui exactement ?',
    r: "Floris, c'est ton compagnon bienveillant dans l'app. Il analyse tes repas, te donne des encouragements adaptés à ta réalité, et ne te juge jamais. Ni régime, ni perfection : juste ton rythme.",
  },
];

// Liens footer
export const footer = {
  liens: [
    { label: 'Accueil', href: '/' },
    { label: 'Télécharger', href: '/telecharger/' },
    { label: 'Prix', href: '/prix/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Mentions légales', href: '/mentions-legales/' },
    { label: 'Politique de confidentialité', href: '/politique-de-confidentialite/' },
  ],
};
