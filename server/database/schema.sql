CREATE TABLE utilisateur (
  id INT PRIMARY KEY AUTO_INCREMENT,
  avatar VARCHAR(255),
  nom VARCHAR(255),
  prénom VARCHAR(255),
  téléphone VARCHAR(20),
  email VARCHAR(255),
  github VARCHAR(255),
  linkedin VARCHAR(255),
  description LONGTEXT,
  CV VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE catégorie_comp (
  id INT PRIMARY KEY AUTO_INCREMENT,
  catégorie VARCHAR(255)
);

CREATE TABLE compétence (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255),
  categorie_id INT,
  utilisateur_id INT,
  FOREIGN KEY (categorie_id) REFERENCES catégorie_comp(id),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

CREATE TABLE statut (
  id INT PRIMARY KEY AUTO_INCREMENT,
  statut VARCHAR(255)
);

CREATE TABLE catégorie_projet (
  id INT PRIMARY KEY AUTO_INCREMENT,
  catégorie VARCHAR(255)
);

CREATE TABLE projet (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date INT,
  nom VARCHAR(255),
  lien_github VARCHAR(255),
  lien_site VARCHAR(255),
  équipe LONGTEXT,
  techno_principales LONGTEXT,
  organisation LONGTEXT,
  description LONGTEXT,
  img_logo VARCHAR(255),
  img1 VARCHAR(255),
  img2 VARCHAR(255),
  img3 VARCHAR(255),
  img4 VARCHAR(255),
  catégorie_projet_id INT,
  statut_id INT,
  FOREIGN KEY (catégorie_projet_id) REFERENCES catégorie_projet(id),
  FOREIGN KEY (statut_id) REFERENCES statut(id)
);

CREATE TABLE compétence_projet (
  compétence_id INT,
  projet_id INT,
  FOREIGN KEY (compétence_id) REFERENCES compétence(id),
  FOREIGN KEY (projet_id) REFERENCES projet(id),
  PRIMARY KEY (compétence_id, projet_id)
);

CREATE TABLE message (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date VARCHAR(255),
  user_nom VARCHAR(255),
  user_prenom VARCHAR(255),
  user_mail VARCHAR(255),
  user_tel VARCHAR(20),
  message LONGTEXT,
  utilisateur_id INT,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

CREATE TABLE commentaire (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date VARCHAR(255),
  user_nom VARCHAR(255),
  user_prenom VARCHAR(255),
  commentaire LONGTEXT,
  projet_id INT,
  FOREIGN KEY (projet_id) REFERENCES projet(id)
);

CREATE TABLE accueil (
  id INT PRIMARY KEY AUTO_INCREMENT,
  welcome LONGTEXT,
  presentation LONGTEXT,
  img VARCHAR(255)
);

CREATE TABLE citation (
  id INT PRIMARY KEY AUTO_INCREMENT,
  citation LONGTEXT,
  auteur varchar(255)
);

INSERT INTO utilisateur (avatar, nom, prénom, téléphone, email, linkedin, github, description, CV, password)
VALUES ('http://localhost:3310/assets/images/lubin.jpeg','Chauvreau', 'Lubin', '06.72.14.43.08', 'lubin-chauvreau@laposte.net', 'https://www.linkedin.com/in/lubin-chauvreau-2235102b9/', 'https://github.com/lub04', "Après plusieurs saisons à dévaler les pistes enneigées et à gérer des magasins de location de ski, notamment en tant que responsable à Saint-Lary-Soulan, j'ai décidé de troquer mes skis et mon tablier pour un clavier et quelques lignes de code. Mon parcours professionnel varié m'a permis de toucher à plusieurs domaines : la vente, l'animation, la manutention, les travaux agricoles, et même la restauration. Mais c’est dans le développement web que j’ai finalement trouvé ma véritable passion.
En septembre dernier, j’ai terminé un bootcamp intensif de 5 mois en développement web Full Stack à la Wild Code School, où j’ai découvert et maîtrisé plusieurs technologies : JavaScript, React, Node.js, et Express.js. Ce fut une aventure intense qui m’a permis d’acquérir rapidement des compétences et de monter en puissance sur des projets concrets. Mon code n’est peut-être pas encore prêt à sauver le monde, mais il pourrait bien donner un coup de pouce à votre entreprise !
Aujourd'hui, je suis en quête d’une alternance à partir de novembre pour continuer de développer mes compétences, tout en apportant mes connaissances à une équipe dynamique. Apprendre rapidement, c’est un peu ma spécialité : que ce soit pour résoudre un bug de dernière minute ou pour gérer une équipe de vente dans une station de ski bondée, je m’adapte et je fonce.
Ce qui me motive dans le développement, c’est le plaisir de créer, de voir des idées prendre vie à travers des lignes de code, et de relever sans cesse de nouveaux défis. On peux donc dire que je suis quelqu’un de passionné par le code, capable de monter en compétences à une vitesse fulgurante et qui sait même garder son calme en situation de crise (croyez-moi, un client mécontent à la montagne, ça forge le caractère !).","http://localhost:3310/assets/CV/CV_Lubin Chauvreau_2024_Developpeur web Full Stack Junior-1.pdf", "Crazytek04!");

INSERT INTO catégorie_comp (catégorie) VALUES
('Frontend'),
('Backend'),
('Découvertes'),
('Outils'),
('Librairies');

-- Compétences Frontend
INSERT INTO compétence (nom, categorie_id, utilisateur_id) VALUES
('HTML', 1, 1),
('CSS', 1, 1),
('JS & DOM manipulation', 1, 1),
('React', 1, 1),
('Sass & Scss', 1, 1);

-- Compétences Backend
INSERT INTO compétence (nom, categorie_id, utilisateur_id) VALUES
('Node et expressJS', 2, 1),
('MySQL', 2, 1),
('CRUD', 2, 1),
('Authentification', 2, 1),
('Upload', 2, 1);

-- Compétences Découvertes
INSERT INTO compétence (nom, categorie_id, utilisateur_id) VALUES
('Unit testing avec Jest', 3, 1),
('CI/CD de GitHub', 3, 1),
('Déploiement Cloud', 3, 1),
('Docker', 3, 1),
('Typescript', 3, 1),
('3D avec Three.js', 3, 1),
('ORM avec Prisma', 3, 1);

-- Compétences Outils
INSERT INTO compétence (nom, categorie_id, utilisateur_id) VALUES
('Git et GitHub', 4, 1),
('Figma', 4, 1),
('VScode', 4, 1),
('Méthode Scrum et Agile', 4, 1),
('Méthode MERISE', 4, 1),
('DBdiagram', 4, 1);

-- Compétences Librairies
INSERT INTO compétence (nom, categorie_id, utilisateur_id) VALUES
('argon2 & jwt', 5, 1),
('Multer', 5, 1),
('Joi', 5, 1),
('Axios', 5, 1),
('CORS', 5, 1),
('cookie parser', 5, 1),
('react toastify', 5, 1),
('alice carroussel', 5, 1),
('react modal', 5, 1);

INSERT INTO statut (statut) VALUES
('En cours'),
('Terminé'),
('Experimental');

INSERT INTO catégorie_projet (catégorie) VALUES
('Projet de groupe'),
('Projet Perso'),
('Hackathon');

INSERT INTO accueil (welcome, presentation, img) VALUES
(
    'Bienvenue sur ce portfolio, conçu par mes soins, où vous découvrirez l’ensemble de mes projets. Vous aurez également l\'occasion d’en apprendre un peu plus sur moi et mon monde. Et si l’envie vous prend – que dis-je, quand l’envie vous prendra – vous y trouverez toutes les informations nécessaires pour me contacter.', 
    'Dans mon atelier, vous trouverez mes projets, qu\'ils soient en cours, terminés, ou encore à l\'état d\'expérimentation. Du projet personnel au hackathon, sans oublier les projets de groupe, j\'ai eu l\'occasion de travailler sur des applications concrètes qui m\'ont permis de plonger dans les défis du développement web. Côté backend, j\'ai intégré des fonctionnalités indispensables comme le CRUD, sécurisé les utilisateurs grâce à argon2 et JWT, et géré des uploads de fichiers avec Multer. Sur la partie frontend, je me suis amusé à manipuler le DOM comme un vrai magicien du code, à construire des interfaces fluides et réactives avec React, et à styliser le tout avec Sass et Scss pour un rendu élégant. Toujours curieux d’explorer de nouveaux horizons, j\'ai plongé dans des domaines variés, allant des tests unitaires avec Jest à la mise en place de pipelines de déploiement en CI/CD via GitHub. Mon atelier est en constante évolution, mes compétences s\'affinent jour après jour, que ce soit sur des outils incontournables comme Git, Figma, ou encore Docker, ou à travers l\'adoption de méthodologies solides comme Scrum et Agile. Alors, si vous souhaitez en savoir plus sur mes réalisations, discuter de technologies, ou même simplement échanger sur l’importance d’une bonne organisation, n\'hésitez pas à explorer mes projets.',
    'http://localhost:3310/assets/images/lubin.jpg'
);

INSERT INTO citation (citation, auteur) VALUES
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
