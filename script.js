document.addEventListener("DOMContentLoaded", function () {
  ////////////////////////////////////////////////
  ///////////////     Curseur     ///////////////
  ///////////////////////////////////////////////

  const cursor = document.getElementById("cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll(".curseur-hover").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovered");
    });
  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("clicked");
    setTimeout(() => {
      cursor.classList.remove("clicked");
    }, 300); // correspond à la durée de l'animation
  });

  //////////////////////////////////////////////////////////
  ///////////////     Barre d'icone Hero     ///////////////
  //////////////////////////////////////////////////////////

  const links = document.querySelectorAll(".barre-icone a");
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  // Met à jour les slides et l’état actif des icônes
  function showSlideByIndex(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");

    const activeSlideId = slides[index].id;

    links.forEach((link) => {
      const targetId = link.getAttribute("data-target");
      link.classList.toggle("active", targetId === activeSlideId);
    });
  }

  function getCurrentSlideIndex() {
    return [...slides].findIndex((slide) => slide.classList.contains("active"));
  }

  // Clic sur les icônes
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      if (!targetId) return;

      const targetIndex = [...slides].findIndex(
        (slide) => slide.id === targetId
      );
      if (targetIndex !== -1) {
        showSlideByIndex(targetIndex);
      }
    });
  });

  // Clic sur la flèche gauche
  prevBtn.addEventListener("click", () => {
    const currentIndex = getCurrentSlideIndex();
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlideByIndex(newIndex);
  });

  // Clic sur la flèche droite
  nextBtn.addEventListener("click", () => {
    const currentIndex = getCurrentSlideIndex();
    const newIndex = (currentIndex + 1) % slides.length;
    showSlideByIndex(newIndex);
  });

  /////////////////////////////////////////////////////////////////////////
  ///////////////     Redirection carré-projet dans le héro   ///////////////
  ///////////////////////////////////////////////////////////////////////////

  document.querySelectorAll(".carre-projet").forEach((carre) => {
    carre.addEventListener("click", () => {
      const cible = carre.dataset.cible;

      // Scroll vers la section des projets
      const sectionMulti = document.getElementById("projets");
      sectionMulti.scrollIntoView({ behavior: "smooth" });

      // Activer l'onglet correspondant
      document.querySelectorAll(".onglet").forEach((onglet) => {
        onglet.classList.remove("actif");
      });

      const ongletActif = document.querySelector(
        `.onglet[data-target="${cible}"]`
      );
      if (ongletActif) {
        ongletActif.classList.add("actif");
      }

      // Afficher le bon groupe de cartes
      document
        .querySelectorAll(".container-projets")
        .forEach((grp) => grp.classList.add("hidden"));

      const groupeVisible = document.getElementById(cible);
      if (groupeVisible) {
        groupeVisible.classList.remove("hidden");
      }
    });
  });

  //////////////////////////////////////////////////////////
  ///////////////     Visibilité groupes projet   ///////////////
  //////////////////////////////////////////////////////////

  const onglets = document.querySelectorAll(".onglet");
  const groupes = document.querySelectorAll(".container-projets");

  onglets.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Retirer la classe actif de tous les onglets
      onglets.forEach((b) => b.classList.remove("actif"));
      // Activer celui cliqué
      btn.classList.add("actif");

      const cible = btn.getAttribute("data-target");

      // Masquer tous les groupes
      groupes.forEach((groupe) => {
        groupe.classList.add("hidden");
      });

      // Afficher le bon groupe
      const groupeCible = document.getElementById(cible);
      if (groupeCible) {
        groupeCible.classList.remove("hidden");
      }
    });
  });

  //////////////////////////////////////////////////////////
  ///////////////     Pop-up Overlay Projets    ///////////////
  //////////////////////////////////////////////////////////

  const cartes = document.querySelectorAll(".carte-projet");
  const popup = document.getElementById("popup-overlay");
  const popupInnerContent = document.getElementById("popup-inner-content");
  const closeBtn = document.querySelector(".popup-close");

  // Contenu pour chaque projet
  const contenuProjets = {
    projet_web_1: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Centre d’appel Saint-Jérôme</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
          Création d’un site vitrine moderne et professionnel pour un centre d’appel. J’ai conçu l’ensemble du site à partir d’une page blanche dans Elementor : structure, hiérarchie des contenus, visuel, et maquette responsive. L’objectif était de mettre en avant les services et la fiabilité du centre, tout en assurant une navigation claire. Le contenu textuel a été intégré temporairement en Lorem Ipsum, dans l’attente du contenu SEO rédigé par l’auteur.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Avril, 2025</p>
          <p><span class="mini-titre">Rôle: </span>Intégrateur web & designer UI</p>
          <p><span class="mini-titre">Compétences: </span>Wordpress, Elementor pro, Html, Css, Javascript</p>
          <p><span class="mini-titre">URL: </span>Bientôt disponible !</p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <img class="image-popup" src="./medias/webp/centre-dappel-saint-jerome-accueil.webp" alt="Projet 1" />
    </div>
  `,
    projet_web_2: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Sign-Xpert</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
          Développement d’un site vitrine pour une entreprise spécialisée en signalisation routière. J’ai conçu une interface claire mettant en valeur les services techniques et les produits offerts. L’organisation des pages, le choix des visuels et l’intégration mobile ont été entièrement réalisés sur mesure dans Elementor. Le design visait à inspirer confiance et professionnalisme. J'ai aussi intégré une page 404 personnalisée pour l'entreprise.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Avril, 2025</p>
          <p><span class="mini-titre">Rôle: </span>Intégrateur web & designer UI</p>
          <p><span class="mini-titre">Compétences: </span>Wordpress, Elementor pro, Html, Css, Javascript</p>
          <p><span class="mini-titre">URL: </span><a href="https://sign-xpert.ca" target="_blank">https://sign-xpert.ca</a></p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <img class="image-popup" src="./medias/webp/sign-xpert-accueil.webp" alt="Projet 2" />
            <video
        loading="lazy"
        preload="none"
        class="video-projet"
        controls
        preload="none"
        poster="./medias/png/erreur-404-sign-xpert-thumbnail.png"
      >
        <source src="./medias/videos/mp4/erreur-404-sign-xpert.mp4" type="video/webm" />
      </video>
    </div>
  `,
    projet_web_3: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Signalisation Ahuntsic</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
          Création d’un site vitrine pour une entreprise spécialisée en signalisation routière. Le site a été entièrement conçu dans Elementor, à partir d’une page blanche. J’ai développé une interface visuelle claire et fonctionnelle, adaptée aux services offerts : location de panneaux, dispositifs électroniques et signalisation de chantiers. L’objectif était de présenter l’expertise de l’entreprise et d’assurer une navigation fluide sur tous les appareils. Le contenu textuel a été laissé en Lorem Ipsum en attendant l'intégration de textes optimisés pour le SEO.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Avril, 2025</p>
          <p><span class="mini-titre">Rôle: </span>Intégrateur web & designer UI</p>
          <p><span class="mini-titre">Compétences: </span>Wordpress, Elementor pro, Html, Css, Javascript</p>
          <p><span class="mini-titre">URL: </span>Bientôt disponible !</p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <img class="image-popup" src="./medias/webp/signalisation-ahuntsic-accueil.webp" alt="Projet 3" />
    </div>
  `,
    projet_web_4: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Taille de Haies Premium</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
          Création d’un site vitrine pour une entreprise d’entretien paysager spécialisée en taille de haies. Le design mise sur une approche visuelle forte, avec des éléments naturels et une ambiance haut de gamme. L’arborescence et la disposition des sections ont été pensées pour convertir les visiteurs en clients, tout en maintenant une navigation intuitive sur tous les appareils.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Mai, 2025</p>
          <p><span class="mini-titre">Rôle: </span>Intégrateur web & designer UI</p>
          <p><span class="mini-titre">Compétences: </span>Wordpress, Elementor pro, Html, Css, Javascript</p>
          <p><span class="mini-titre">URL: </span><a href="https://taillehaiejoliette.ca" target="_blank">https://taillehaiejoliette.ca</a></p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <img class="image-popup" src="./medias/webp/taille-de-haies-premium-accueil.webp" alt="Projet 4" />
    </div>
  `,
    projet_visuel_1: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Anonyme</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
          Anonyme est un projet de design graphique narratif réalisé dans le cadre d’un exercice scolaire. L’objectif était de concevoir les différentes planches d’un générique d’ouverture pour un film fictif. J’ai imaginé une direction artistique sombre et intrigante, en accord avec l’univers du film, puis j’ai réalisé chaque planche dans Photoshop, en jouant sur les contrastes, les textures et la composition visuelle pour créer une ambiance cinématographique forte et cohérente.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Février, 2023</p>
          <p><span class="mini-titre">Rôle: </span>- Synopsis, Design et montage des planches</p>
          <p><span class="mini-titre">Compétences: </span>Photoshop</p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <img class="image-popup" src="./medias/webp/anonyme-artboard-01.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-02.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-03.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-04.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-05.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-06.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-07.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-08.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-09.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-10.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-11.webp" alt="Design graphique1" />
      <img class="image-popup" src="./medias/webp/anonyme-artboard-12.webp" alt="Design graphique1" />
    </div>
  `,
    projet_visuel_2: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Deuil</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
          Ce générique a été réalisé dans le cadre d’un projet en équipe, où chaque membre devait produire sa propre version du générique en animation 2D vectorielle de notre projet. Bien que les crédits mentionnent l’ensemble de l’équipe, cette version a été entièrement conçue et animée par moi.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Novembre, 2023</p>
          <p><span class="mini-titre">Rôle: </span>- Synopsis, Design et montage des planches</p>
          <p><span class="mini-titre">Compétences: </span>Adobe Illustrator, Adobe After Effects</p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <video
        loading="lazy"
        preload="none"
        class="video-projet"
        controls
        preload="none"
        poster="./medias/png/deuil-thumbnail.png"
      >
        <source src="./medias/videos/webm/deuil-generique.webm" type="video/webm" />
      </video>
    </div>
  `,
    projet_visuel_3: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Le labyrinthe</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
          Ce projet de scrollytelling immersif met en scène une courte histoire originale que j’ai entièrement composée. Chaque scène a été illustrée à l’aide de vecteurs réalisés dans Illustrator, me permettant de garder un style graphique épuré et cohérent. L’animation et le défilement synchronisé du récit ont été conçus avec GSAP, afin d’offrir une narration fluide et engageante au fil du scroll. Ce projet m’a permis de combiner mes compétences en illustration vectorielle et en animation web interactive pour créer une expérience utilisateur captivante.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Avril, 2024</p>
          <p><span class="mini-titre">Rôle: </span>Conception vectorielle, programmation</p>
          <p><span class="mini-titre">Compétences: </span>Html, Css, Javascript, GSAP, Adobe Illustrator</p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <video
        loading="lazy"
        preload="none"
        class="video-projet"
        controls
        preload="none"
        poster="./medias/png/le-labyrinthe-thumbnail.png"
      >
        <source src="./medias/videos/mp4/scrollytelling_le_labyrinthe.mp4" type="video/mp4" />
      </video>
    </div>
  `,
    projet_video_1: `
<div class="container-popup-text">
  <h3 class="popup-titre">No Way Out</h3>
  <span class="ligne-verte-popup"></span>
  <div class="popup-infos">
    <p class="info-text">
      Court-métrage de suspense/horreur d’une durée de 90 secondes. Le film raconte l’histoire d’un homme arrivant de nuit dans une ruelle inquiétante avant d’être poursuivi par une silhouette sombre. L’univers visuel est volontairement sombre et pluvieux, renforcé par une colorisation froide et un design sonore immersif qui accentuent la tension dramatique.
      <br><br>
      Ce projet explore l’utilisation de séquences générées par IA comme matière brute, réinterprétée et sublimée par un travail de montage, d’étalonnage et de sound design. L’objectif était de transformer des images générées en une véritable expérience cinématographique courte, avec un rythme maîtrisé et une ambiance pesante.
    </p>
    <div class="info-projet">
      <p><span class="mini-titre">Date: </span>2025</p>
      <p><span class="mini-titre">Rôle: </span>Directeur narratif, montage vidéo, étalonnage, direction créative, design sonore</p>
      <p><span class="mini-titre">Compétences: </span>Premiere Pro, étalonnage colorimétrique, sound design, montage narratif, storytelling visuel, intégration d’éléments IA</p>
                <p><span class="mini-titre">URL: </span><a href="https://youtu.be/-tucYegr4hI?si=8BgKIo506CoRjDSg" target="_blank">https://www.youtube.com/video</a></p>
    </div>
  </div>
</div>
  `,
    projet_video_2: `
<div class="container-popup-text">
  <h3 class="popup-titre">Hell's Kitchen Shorts</h3>
  <span class="ligne-verte-popup"></span>
  <div class="popup-infos">
    <p class="info-text">
      Cette playlist regroupe une série de montages humoristiques réalisés à partir de l’émission <em>Hell’s Kitchen</em>. 
      J’y propose des edits dynamiques et rythmés, pensés pour un format court optimisé pour YouTube Shorts. 
      Chaque vidéo met en valeur le timing humoristique, le choix précis des extraits et un montage rapide qui capte 
      immédiatement l’attention. Cette playlist reflète mon approche créative du montage court et viral.
    </p>
    <div class="info-projet">
      <p><span class="mini-titre">Date: </span>2025</p>
      <p><span class="mini-titre">Rôle: </span>Montage vidéo, direction créative</p>
      <p><span class="mini-titre">Compétences: </span>Premiere Pro, montage court, storytelling visuel, rythme humoristique</p>
                <p><span class="mini-titre">URL: </span><a href="https://www.youtube.com/playlist?list=PLa0h2_MqrRxcvs3CiFtiYduF64iUL0_QT" target="_blank">https://www.youtube.com/playlist</a></p>
    </div>
  </div>
</div>
  `,
    projet_video_3: `
<div class="container-popup-text">
  <h3 class="popup-titre">Projets freelance</h3>
  <span class="ligne-verte-popup"></span>
  <div class="popup-infos">
  <div class="info-text-container">
    <p class="info-text">
      Voici un aperçu de mes réalisations en tant que monteur vidéo freelance pour LetMeTalk. J’ai travaillé sur plus de 100 vidéos, allant de clips courts de 15 secondes à des contenus de 2 minutes, en prenant en charge l’intégralité du montage: 
    </p>
    <ul class="custom-list">
      <li><p>Visionnage et tri des séquences brutes</p></li>
      <li><p>Sélection et intégration de B-rolls</p></li>
      <li><p>Création et intégration d’effets visuels (FX) et de transitions</p></li>
      <li><p>Intégration de SFX et de musique</p></li>
      <li><p>Ajout de sous-titres dynamiques</p></li>
      <li><p>Ajustement du rythme narratif pour maximiser l’engagement</p></li>
      <li><p>Correction colorimétrique</p></li>
      <li><p>Équilibrage sonore</p></li>
    </ul>
    </div>
    <br><br>
    
    <div class="info-projet">
      <p><span class="mini-titre">Date: </span>2025 - 2026</p>
      <p><span class="mini-titre">Rôle: </span>Monteur vidéo</p>
      <p><span class="mini-titre">Clients: </span>O’Derma, Idéal TFC, MV Saguenay, Coach Gab, Duraclim</p>
      <p><span class="mini-titre">Via: </span>LetMeTalk (freelance / pigiste)</p>
    </div>
  </div>
</div>

<div class="popup-videos">

  <!-- Client 1 -->

  <div class="client-section">
    <div class="client-avec-ligne">
      <h4 class="client-title">Coach Gab</h4>
      <span class="ligne-verte-client"></span>
    </div>
    <div class="videos-row">
      <iframe src="https://www.instagram.com/reel/DS5uqxdjVuA/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
      <iframe src="https://www.instagram.com/reel/DSqOFhUgGCe/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
      <iframe src="https://www.instagram.com/reel/DTORQHIjNLB/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
    </div>
  </div>



  <!-- Client 2 -->



  <!-- Client 3 -->

  <div class="client-section">
    <div class="client-avec-ligne">
      <h4 class="client-title">MV Saguenay</h4>
      <span class="ligne-verte-client"></span>
    </div>
    <div class="videos-row">
      <iframe src="https://www.instagram.com/reel/DSlKNwijHhL/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
      <iframe src="https://www.instagram.com/reel/DSqOEhFDK0N/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
      <iframe src="https://www.instagram.com/reel/DSdWIM5ErH1/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
    </div>
  </div>

  <!-- Client 4 -->

  <div class="client-section">
      <div class="client-avec-ligne">
        <h4 class="client-title">Idéal TFC</h4>
        <span class="ligne-verte-client"></span>
      </div>
    <div class="videos-row">
      <iframe src="https://www.instagram.com/reel/DS8PsXOjTuA/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
      <iframe src="https://www.instagram.com/reel/DSvXpo4k2zc/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
      <iframe src="https://www.instagram.com/reel/DTJHi_1jD43/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
    </div>
  </div>

  <!-- Client 5 -->

  <div class="client-section">
      <div class="client-avec-ligne">
        <h4 class="client-title">O’Derma</h4>
        <span class="ligne-verte-client"></span>
      </div>
    <div class="videos-row">
      <iframe src="https://www.instagram.com/reel/DRvE6OpicID/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
      <iframe src="https://www.instagram.com/reel/DRVP1FvE49d/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
      <iframe src="https://www.instagram.com/reel/DSTC7ttDQXp/embed" scrolling="no"> loading="lazy" allowfullscreen></iframe>
    </div>
  </div>

</div>

  `,
    projet_autre_1: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Onirisme</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
          Onirisme est un projet d’animation 3D expérimentale. Nous avons conçu un univers visuel abstrait et poétique, où les formes, les textures et les mouvements cherchent à évoquer une sensation de rêve éveillé. J’ai contribué à la modélisation 3D, à l’animation ainsi qu’à la direction artistique, en explorant des approches non conventionnelles avec Autodesk Maya pour donner vie à une narration visuelle libre et sensorielle.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Mars, 2024</p>
          <p><span class="mini-titre">Rôle: </span>- Modélisation 3D et animation</p>
          <p><span class="mini-titre">Compétences: </span>Autodesk Maya</p>
          <p><span class="mini-titre">En collaboration: </span>Ikrame Rata</p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <video
        loading="lazy"
        preload="none"
        class="video-projet"
        controls
        preload="none"
        poster="./medias/png/onirisme-thumbnail.png"
      >
        <source src="./medias/videos/mp4/onirisme-animation-3d.mp4" type="video/mp4" />
      </video>
    </div>
  `,
    projet_autre_2: `
    <div class="container-popup-text">
      <h3 class="popup-titre">Prismatica</h3>
      <span class="ligne-verte-popup"></span>
      <div class="popup-infos">
        <p class="info-text">
         (Projet intégrateur de fin de programme technique) Notre installation interactive, Prismatica, repose sur la chromesthésie, une forme de synesthésie où les sons sont perçus en fonction des couleurs. Grâce à une caméra connectée à TouchDesigner, nous analysons en temps réel un tableau blanc sur lequel l’utilisateur dessine avec des marqueurs colorés. Chaque couleur utilisée génère une mélodie spécifique, basée sur le cercle chromatique de Newton, transformant l’acte de dessiner en une expérience multisensorielle où le son et l’image fusionnent.
        </p>
        <div class="info-projet">
          <p><span class="mini-titre">Date: </span>Mars, 2025</p>
          <p><span class="mini-titre">Rôle: </span>- Programmation du sytème d'analyse, création audio et visuels</p>
          <p><span class="mini-titre">Compétences: </span>Touchdesigner, Reaper, Plugdata</p>
          <p><span class="mini-titre">En collaboration: </span>Ikrame Rata, Jérémy Duverseau</p>
          <p><span class="mini-titre">URL: </span><a href="https://pootpookies.github.io/Prismatica/#/">https://pootpookies.github.io/Prismatica/#/</a></p>
        </div>
      </div>
    </div>
    <div class="container-popup-images">
      <video
        loading="lazy"
        preload="none"
        class="video-projet"
        controls
        preload="none"
        poster="./medias/png/prismatica-thumbnail.png"
      >
        <source src="./medias/videos/mp4/bande-annonce-prismatica.mp4" type="video/mp4" />
      </video>
    </div>
  `,
  };

  // Ouvre le popup avec le bon contenu
  cartes.forEach((carte) => {
    carte.addEventListener("click", () => {
      const projetId = carte.dataset.projet;
      popupInnerContent.innerHTML =
        contenuProjets[projetId] || "<p>Projet introuvable</p>";
      popup.classList.remove("hidden");
      document.body.style.overflow = "hidden"; // empêcher de scroller derrière
    });
  });

  // Fermer le popup
  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  // Sélectionne l'overlay
  const popupOverlay = document.querySelector(".popup-overlay");

  // Fermer le popup si on clique en dehors du contenu
  popupOverlay.addEventListener("click", function (e) {
    if (!popupInnerContent.contains(e.target)) {
      popupOverlay.classList.add("hidden"); // ou ta fonction de fermeture
    }
    document.body.style.overflow = "auto";
  });
});
