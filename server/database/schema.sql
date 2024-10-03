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
  citation LONGTEXT
);

