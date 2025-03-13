CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  avatar VARCHAR(255),
  last_name VARCHAR(255),
  first_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  github VARCHAR(255),
  linkedin VARCHAR(255),
  description LONGTEXT,
  resume VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE skill_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(255) UNIQUE
);

CREATE TABLE skill (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE,
  category_id INT,
  user_id INT,
  FOREIGN KEY (category_id) REFERENCES skill_category(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE status (
  id INT PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(255)
);

CREATE TABLE project_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(255)
);

CREATE TABLE project (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  name VARCHAR(255),
  github_link VARCHAR(255),
  website_link VARCHAR(255),
  team LONGTEXT,
  main_technologies LONGTEXT,
  organization LONGTEXT,
  description LONGTEXT,
  project_category_id INT,
  status_id INT,
  FOREIGN KEY (project_category_id) REFERENCES project_category(id),
  FOREIGN KEY (status_id) REFERENCES status(id)
);

CREATE TABLE picture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    url VARCHAR(255) NOT NULL,
    type ENUM('logo','main', 'screenshot') NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);
CREATE TABLE project_skill (
  skill_id INT,
  project_id INT,
  FOREIGN KEY (skill_id) REFERENCES skill(id),
  FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
  PRIMARY KEY (skill_id, project_id)
);

CREATE TABLE message (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  user_last_name VARCHAR(255),
  user_first_name VARCHAR(255),
  user_email VARCHAR(255),
  message LONGTEXT,
  is_read BOOL DEFAULT false,
  user_id INT Default 1,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE comment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_last_name VARCHAR(255),
  user_first_name VARCHAR(255),
  comment LONGTEXT,
  project_id INT,
  FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE homepage (
  id INT PRIMARY KEY AUTO_INCREMENT,
  welcome LONGTEXT,
  presentation LONGTEXT,
  img VARCHAR(255)
);

CREATE TABLE quote (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quote LONGTEXT,
  author VARCHAR(255)
);

-- Insert data into user
INSERT INTO user (avatar, last_name, first_name, phone, email, linkedin, github, description, resume, password)
VALUES ('assets/images/lubin.jpg','Chauvreau', 'Lubin', '06.72.14.43.08', 'lubin-chauvreau@laposte.net', 'https://www.linkedin.com/in/lubin-chauvreau-2235102b9/', 'https://github.com/lub04', "Après plusieurs saisons à dévaler les pistes enneigées et à gérer des magasins de location de ski, j'ai décidé de troquer mes skis et mon tablier pour un clavier et quelques lignes de code.

Mon parcours professionnel varié m'a permis de toucher à plusieurs domaines : la vente, l'animation, la manutention, les travaux agricoles, et même la restauration. Mais c’est dans le développement web que j’ai finalement trouvé ma véritable passion.

En septembre dernier, j’ai terminé un bootcamp intensif de 5 mois en développement web Full Stack à la Wild Code School, où j’ai découvert et maîtrisé plusieurs technologies : JavaScript, React, Node.js, et Express.js. Ce fut une aventure intense qui m’a permis d’acquérir rapidement des compétences et de monter en puissance sur des projets concrets. Mon code n’est peut-être pas encore prêt à sauver le monde, mais il pourrait bien donner un coup de pouce à votre entreprise !

Apprendre rapidement, c’est un peu ma spécialité : que ce soit pour résoudre un bug de dernière minute ou pour gérer une équipe de vente dans une station de ski bondée, je m’adapte et je fonce.

Ce qui me motive dans le développement, c’est le plaisir de créer, de voir des idées prendre vie à travers des lignes de code, et de relever sans cesse de nouveaux défis.",
"assets/CV/CV_Lubin Chauvreau_2024_Developpeur web Full Stack Junior-1.pdf", "$argon2id$v=19$m=19456,t=2,p=1$VTmX1NmE/nPYM3ONafat6g$jnWLgvLNrQIyY/YdMw9OTmpeUjmT7tgDjsbe784WJpA");

-- Insert data into skill_category
INSERT INTO skill_category (category) VALUES
('Frontend'),
('Backend'),
('Découvertes'),
('Outils'),
('Librairies');

-- Insert frontend skills
INSERT INTO skill (name, category_id, user_id) VALUES
('HTML', 1, 1),
('CSS', 1, 1),
('JS & DOM manipulation', 1, 1),
('React', 1, 1),
('Sass & Scss', 1, 1);

-- Insert backend skills
INSERT INTO skill (name, category_id, user_id) VALUES
('Node et expressJS', 2, 1),
('MySQL', 2, 1),
('CRUD', 2, 1),
('Authentification', 2, 1),
('Upload', 2, 1);

-- Insert discovered skills
INSERT INTO skill (name, category_id, user_id) VALUES
('Unit testing avec Jest', 3, 1),
('CI/CD de GitHub', 3, 1),
('Déploiement Cloud', 3, 1),
('Docker', 3, 1),
('Typescript', 3, 1),
('3D avec Three.js', 3, 1),
('ORM avec Prisma', 3, 1);

-- Insert tool skills
INSERT INTO skill (name, category_id, user_id) VALUES
('Git et GitHub', 4, 1),
('Figma', 4, 1),
('VScode', 4, 1),
('Méthode Scrum et Agile', 4, 1),
('Méthode MERISE', 4, 1),
('DBdiagram', 4, 1);

-- Insert library skills
INSERT INTO skill (name, category_id, user_id) VALUES
('argon2 & jwt', 5, 1),
('Multer', 5, 1),
('Joi', 5, 1),
('Axios', 5, 1),
('CORS', 5, 1),
('cookie parser', 5, 1),
('react toastify', 5, 1),
('alice carroussel', 5, 1),
('react rooter dom', 5, 1),
('react modal', 5, 1);

-- Insert data into status
INSERT INTO status (status) VALUES
('En cours de développement'),
('Terminé'),
('Expérimental');

-- Insert data into project_category
INSERT INTO project_category (category) VALUES
('Projet de groupe'),
('Projet Perso'),
('Hackathon');

-- Insert data into homepage
INSERT INTO homepage (welcome, presentation, img) VALUES
(
    'Bienvenue sur ce portfolio, conçu par mes soins, où vous découvrirez l’ensemble de mes projets. Vous aurez également l\'occasion d’en apprendre un peu plus sur moi et mon monde. Et si l’envie vous prend – que dis-je, quand l’envie vous prendra – vous y trouverez toutes les informations nécessaires pour me contacter.', 
    'Dans mon atelier, vous trouverez mes projets, qu\'ils soient en cours, terminés, ou encore à l\'état d\'expérimentation. Du projet personnel au hackathon, sans oublier les projets de groupe, j\'ai eu l\'occasion de travailler sur des applications concrètes qui m\'ont permis de plonger dans les défis du développement web.\n
    Côté backend, j\'ai intégré des fonctionnalités indispensables comme le CRUD, sécurisé les utilisateurs grâce à argon2 et JWT, et géré des uploads de fichiers avec Multer.\n Sur la partie frontend, je me suis amusé à manipuler le DOM comme un vrai magicien du code, à construire des interfaces fluides et réactives avec React, et à styliser le tout avec Sass et Scss pour un rendu élégant.\n
    Toujours curieux d’explorer de nouveaux horizons, j\'ai plongé dans des domaines variés, allant des tests unitaires avec Jest à la mise en place de pipelines de déploiement en CI/CD via GitHub. Mon atelier est en constante évolution, mes compétences s\'affinent jour après jour, que ce soit sur des outils incontournables comme Git, Figma, ou encore Docker, ou à travers l\'adoption de méthodologies solides comme Scrum et Agile.\n
    Alors, si vous souhaitez en savoir plus sur mes réalisations, discuter de technologies, ou même simplement échanger sur l’importance d’une bonne organisation, n\'hésitez pas à explorer mes projets et à me contacter.',
    'assets/images/lubin.jpg'
);

-- Insert data into quote
INSERT INTO quote (quote, author) VALUES
('"Parlez peu. Montrez-moi le code."', 'Linus Torvalds'),
('"La meilleure façon de prédire l’avenir est de l’inventer."', 'Alan Kay'),
('"La simplicité est la sophistication suprême."', 'Leonard de Vinci'),
('"Tout problème a une solution, mais écrire le bon code prend du temps."', 'Anonyme'),
('"Code est comme l\'humour. Quand il faut l\'expliquer, c\'est mauvais."', 'Cory House'),
('"L’expérience est le nom que chacun donne à ses erreurs."', 'Oscar Wilde'),
('"La programmation, c\'est résoudre des problèmes par le code."', 'Anonyme'),
('"La seule façon d\'apprendre un nouveau langage est d\'écrire du code."', 'Dennis Ritchie'),
('"Écrire du code, c\'est comme écrire une histoire ; chaque ligne compte."', 'Anonyme'),
('"Un bon développeur sait que le code est vivant et doit évoluer."', 'Anonyme'),
('"Les utilisateurs ne veulent pas des fonctionnalités, ils veulent des solutions."', 'Anonyme'),
('"Ne vous inquiétez pas des bugs, vous apprendrez d\'eux pour progresser."', 'Anonyme'),
('"Le vrai signe de l\'intelligence est la capacité à apprendre."', 'Albert Einstein'),
('"Le code que vous écrivez aujourd\'hui doit être maintenu demain."', 'Anonyme'),
('"Un bon code est celui que vous n\'avez pas besoin d\'expliquer."', 'Anonyme');

-- Insert project "Externatic"
INSERT INTO project (name, github_link, website_link, team, main_technologies, organization, description, project_category_id, status_id)
VALUES (
  'Externatic',
  'https://github.com/WildCodeSchool-2024-02/JS-RMT-Julien-Externatic-P3',
  'https://extrernatic.remote-fr-3.wilders.dev/',
  'Bastien Domer, Oresti Hoxhallari, Dylan Robinaud, Bertrand Larroche, Imanol Delporte, Lubin Chauvreau',
  'React, NodeJS, ExpressJS, MySQL',
  "Pour l'organisation de ce projet, nous avons adopté les méthodologies Scrum et Agile, afin de structurer efficacement notre travail en équipe. Chaque membre de l’équipe avait un rôle bien défini pour assurer le bon déroulement du projet.\n
  Dylan Robinaud a pris le rôle de Product Owner, responsable de définir les fonctionnalités du produit et de prioriser les tâches.
  Imanol Delporte a assuré la fonction de Scrum Master, garantissant que les pratiques Scrum étaient respectées, facilitant la communication au sein de l'équipe et veillant à la résolution des obstacles.
  Le reste de l’équipe, composée de développeurs et reviewers s'est concentrée sur le développement et la révision du code pour garantir la qualité et la cohérence des livrables.\n
  Nous avons également réalisé une maquette poussée du site sur Figma, définissant clairement l'interface utilisateur et l'apparence générale du projet.
  En parallèle, nous avons conçu un parcours utilisateur complet, toujours sur Figma, pour illustrer le cheminement des utilisateurs à travers les différentes fonctionnalités et pages de l’application.
  Pour structurer le projet, nous avons mis en place un backlog détaillé, incluant des user stories pour chaque fonctionnalité à développer.
  Ces user stories incluaient une description des attentes, les critères d’acceptation, et une priorisation afin d’organiser efficacement les sprints.\n
  En ce qui concerne la modélisation de la base de données, nous avons utilisé DB Diagram pour concevoir une base de données relationnelle comprenant plus de 15 tables.
  Nous avons suivi les principes de la méthode Merise pour organiser les différentes entités et leurs relations, garantissant ainsi une structure de données solide et évolutive.
  Enfin, pour assurer le suivi et la coordination de notre travail, nous avons utilisé Google Sheets comme support principal.
  Ce document nous a permis de maintenir une vision claire et partagée de l’avancement du projet, en suivant les différentes tâches, leur statut, et les deadlines associées.",
    "Le site que nous avons développé pour ce cabinet de recrutement propose une gestion à plusieurs niveaux d'utilisateurs, chacun ayant accès à des fonctionnalités spécifiques selon son statut.\n
    Visiteur non connecté : L'utilisateur non connecté a un accès limité. Il peut consulter les offres d'emploi publiées ainsi que les détails des offres, mais il ne peut pas postuler ni interagir davantage avec le site. Ce niveau permet aux visiteurs d’explorer les opportunités disponibles sans besoin de créer un compte.\n
    Candidat connecté : Une fois inscrit et connecté, le candidat bénéficie de fonctionnalités supplémentaires. Il a accès aux offres d'emploi, mais aussi à son profil personnel, qu’il peut modifier à tout moment. Le candidat peut gérer ses candidatures et suivre les offres mises en favoris pour postuler plus tard. Lorsqu'il souhaite postuler à une offre, les informations requises sont automatiquement récupérées depuis son profil, simplifiant ainsi le processus. Pour ce faire, son profil doit être complet et à jour.\n
    Consultant : Le consultant joue un rôle central dans la gestion des offres et des candidatures. Il dispose d’un backoffice dédié, depuis lequel il peut ajouter de nouvelles offres d’emploi et gérer les candidatures reçues pour ses offres. En plus de cela, il a accès à une liste d'entreprises affiliées à son portefeuille, ainsi qu'à une base de candidats, qu’il peut contacter directement pour leur proposer des opportunités. Le consultant a aussi accès à divers outils de gestion pour les éléments à sa disposition (offres, entreprises, candidats).\n
    Administrateur : Le rôle de l’administrateur est le plus complet. L’administrateur a la responsabilité de gérer les consultants (ajouter, modifier ou supprimer un consultant) ainsi que les entreprises partenaires du site. Il est le seul utilisateur à avoir un accès complet à l'intégralité du site, incluant les fonctionnalités de gestion avancée des utilisateurs, entreprises et offres d’emploi.",
1,
2);

INSERT INTO project (name, github_link, website_link, team, main_technologies, organization, description, project_category_id, status_id)
VALUES (
  'Galactic Fight',
  'https://github.com/lub04/Galactic-Fight',
  'https://galactic-fight.netlify.app/',
  'Dylan Robinaud, Bastien Domer, Imanol Delporte, Lubin Chauvreau',
  'React, NodeJS, ExpressJS, MySQL',
  "Ce projet a été réalisé dans le cadre d’un hackathon de deux jours, avec pour thématique Star Wars et l’amour intergalactique. Le temps imparti étant limité, nous avons dû nous concentrer sur l'essentiel et optimiser notre organisation.\n
Bien que nous n'ayons pas eu de rôles formellement définis comme Scrum Master ou Product Owner, l’équipe a collaboré de manière fluide et collaborative. Nous avons tout de même établi un backlog pour définir les fonctionnalités principales à développer, et nous avons utilisé Google Sheet pour suivre l'avancement du projet en temps réel.\n
Nous n’avons pas eu le temps de réaliser une maquette, mais grâce aux banques de données disponibles sur GitHub, nous avons pu nous concentrer sur le développement de l'application. Nous avons également pris le temps de modéliser une petite base de données avec DB Diagram, afin de structurer les informations nécessaires à la gestion du jeu et des utilisateurs.",
  "Galactic Fight est un jeu de cartes de duel inspiré de l’univers Star Wars, où les joueurs doivent suivre une trame narrative captivante pour atteindre leur objectif ultime : libérer la princesse Leia, prisonnière sur l'Étoile de la Mort, et l'épouser. Un tutoriel intégré est disponible pour expliquer les règles du jeu et la logique des combats, ainsi que l’histoire qui accompagne chaque étape de l’aventure.\n
L’utilisateur commence par créer son personnage, en choisissant un nom et un avatar. Chaque personnage possède des statistiques de défense et d'attaque ainsi qu’un nombre prédéfini de points de vie (PV). Le joueur devra participer à des duels contre des adversaires plus ou moins puissants sur différentes planètes (niveaux).\n
À chaque victoire, le joueur peut augmenter l’une de ses statistiques (attaque ou défense) de 5 points, renforçant ainsi son personnage pour les combats futurs. La gestion stratégique de ces points est essentielle pour progresser sans être bloqué dans les niveaux plus difficiles.
Le jeu est composé de 3 combats par planète, et après chaque deuxième combat, une nouvelle planète est débloquée jusqu’à atteindre la redoutable Étoile de la Mort.\n
Pour finir l’aventure, l’utilisateur devra choisir entre un duel final contre Leia ou Dark Vador... Et soyons honnêtes, que vous finissiez par épouser l’un ou l’autre, les réunions de famille risquent d'être assez spatiales !",
  3,
  2
);
INSERT INTO project (name, github_link, website_link, team, main_technologies, organization, description, project_category_id, status_id)
VALUES (
    'Film Paradise',
    'https://github.com/lub04/Film-Paradise',
    'https://filmparadise.netlify.app/',
    'Vanessa Girondin, Johnny Domingues, Ann-Dominique Thuillier, Lubin Chauvreau',
    'React, NodeJS, ExpressJS, MySQL',
    "Dans le cadre du projet Film Paradise, nous avons adopté les méthodologies Scrum et Agile pour optimiser notre processus de développement.\n Lubin Chauvreau a exercé les fonctions de Scrum Master, tandis que Johnny Domingues a occupé le poste de Product Owner. Les autres membres de l'équipe ont contribué en tant que développeurs.\n
    Nous avons élaboré un backlog via Google Sheets, qui a également servi d’outil principal pour notre gestion de projet. Par ailleurs, nous avons conçu une maquette sur Figma pour nous permettre de visualiser notre concept avant de commencer le développement.\n
    Étant donné qu'il s'agissait de notre premier projet en React et que c'était également notre première expérience avec le développement backend, nous n'avons pas réalisé de modélisation de base de données.",
    "Film Paradise est une plateforme de e-commerce dédiée aux films numériques, offrant aux utilisateurs une expérience de navigation fluide et intuitive.\n
    Les utilisateurs peuvent explorer une liste complète de films, filtrables par catégories ou via une barre de recherche dédiée.\n Chaque film dispose d'une page de détail, où les utilisateurs peuvent consulter des informations supplémentaires et choisir de l'ajouter à leurs favoris pour un achat ultérieur ou directement au panier. La page panier présente une récapitulation des films sélectionnés, affichant les prix individuels ainsi que le montant total de la commande. De plus, un formulaire de commande est disponible sur cette page pour faciliter le processus d'achat.\n
    Le site est doté d'une navigation claire dans le header, permettant aux utilisateurs de se déplacer aisément entre les différentes pages, tout en affichant le nombre d'éléments présents dans le panier et dans les favoris. En bas de page, un formulaire de contact est à disposition pour permettre aux utilisateurs de nous joindre facilement.",
    1,
    2
);

INSERT INTO project_skill (project_id, skill_id) VALUES 
(1, 1),
(1, 2),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 12),
(1, 14),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29),
(1, 30),
(1, 31),
(1, 33),
(2, 1),
(2, 2),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 13),
(2, 18),
(2, 20),
(2, 27),
(2, 28),
(2, 32),
(3, 1),
(3, 2),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 13),
(3, 18),
(3, 19),
(3, 20),
(3, 21),
(3, 27),
(3, 32);

INSERT INTO picture (project_id, url, type) VALUES

((SELECT id FROM project WHERE name = 'Externatic'), 'assets/images/ExternaticLogoNoir.png', 'logo'),
((SELECT id FROM project WHERE name = 'Externatic'), 'assets/images/ExternaticAccueil.png', 'main'),
((SELECT id FROM project WHERE name = 'Externatic'), 'assets/images/ExternaticOffres.png', 'screenshot'),
((SELECT id FROM project WHERE name = 'Externatic'), 'assets/images/ExternaticProfil.png', 'screenshot'),
((SELECT id FROM project WHERE name = 'Externatic'), 'assets/images/ExternaticBackoffice.png', 'screenshot'),

((SELECT id FROM project WHERE name = 'Galactic Fight'), 'assets/images/GalacticFightLogo.png', 'logo'),
((SELECT id FROM project WHERE name = 'Galactic Fight'), 'assets/images/GalacticFightAvatar.png', 'main'),
((SELECT id FROM project WHERE name = 'Galactic Fight'), 'assets/images/GalacticFightLevels.png', 'screenshot'),
((SELECT id FROM project WHERE name = 'Galactic Fight'), 'assets/images/GalacticFightPlanet.png', 'screenshot'),
((SELECT id FROM project WHERE name = 'Galactic Fight'), 'assets/images/GalacticFightLoseFight.png', 'screenshot'),

((SELECT id FROM project WHERE name = 'Film Paradise'), 'assets/images/FilmParadiseLogo.png', 'logo'),
((SELECT id FROM project WHERE name = 'Film Paradise'), 'assets/images/FilmParadiseAllMovies.png', 'main'),
((SELECT id FROM project WHERE name = 'Film Paradise'), 'assets/images/FilmParadiseMovieDetail.png', 'screenshot'),
((SELECT id FROM project WHERE name = 'Film Paradise'), 'assets/images/FilmParadiseFavories.png', 'screenshot'),
((SELECT id FROM project WHERE name = 'Film Paradise'), 'assets/images/FilmParadiseCart.png', 'screenshot');