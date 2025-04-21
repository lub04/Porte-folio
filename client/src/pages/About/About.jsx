import "./About.css";

function About() {
  return (
    <>
      <h2>À Propos de ce portfolio :</h2>
      <section className="page-display box about-portfolio">
        <article className="about-portfolio-description-article">
          <h3>Vue d'ensemble</h3>
          <p>
            Ce portfolio a été pensé comme un véritable site vitrine permettant
            de présenter mes projets, mes compétences et mon parcours de manière
            claire, interactive et personnalisable. Dès le départ, j’ai souhaité
            concevoir une interface dynamique et évolutive. Pour cela, j’ai
            utilisé React côté front-end, afin de proposer une navigation fluide
            et une expérience utilisateur agréable.
          </p>
          <p>
            Le site est entièrement connecté à une API REST que j’ai développée,
            intégrant toutes les opérations CRUD (Create, Read, Update, Delete)
            en utilisant Express.js, ce qui me permet de modifier les contenus
            directement via une interface d’administration, sans avoir à toucher
            au code.
          </p>
          <p>
            Avant le développement, j’ai réalisé le maquettage complet sur
            Figma, afin de structurer visuellement l’ensemble du site et de
            garantir une cohérence graphique sur chaque page. Côté base de
            données, j’ai utilisé dbdiagram.io pour modéliser la structure,
            organiser les données efficacement et anticiper les relations entre
            les différentes entités.
          </p>
          <p>
            Ce projet m’a permis de progresser sur de nombreux aspects
            techniques :
          </p>
          <ul>
            <li>
              La mise en œuvre de fonctionnalités CSS avancées pour améliorer
              l’expérience utilisateur
            </li>
            <li>Une gestion optimisée des requêtes en base de données,</li>
            <li>L’intégration de modales interactives et dynamiques</li>
            <li>
              L’exploration de nouvelles librairies pour enrichir l’interface
            </li>
            <li>
              Un vrai travail de fond sur l’authentification sécurisée (tokens,
              hash, middleware) et l’upload de fichiers via des formulaires
              gérés côté front et back.
            </li>
          </ul>
        </article>
        <article className="about-skills">
          <h3>Compétences utilisées :</h3>
          <p>Front : HTML, CSS, SaSS, SCSS, React.js, Javascript</p>
          <p>
            Librairies front : axios, prop-types, react-modal, react-router-dom,
            react-toastify, swiper{" "}
          </p>
          <p>Back : Node.js, Express.js, MySQL</p>
          <p>
            Librairies back : argon2, cookie-parser, cors, dotenv, express, joi,
            jsonwebtoken, multer, mysql2{" "}
          </p>
          <p>Outils: Figma, dbdiagram.io, VScode, déploiement cloud</p>
        </article>
      </section>
    </>
  );
}

export default About;
