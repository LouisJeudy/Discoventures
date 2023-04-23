# Documentation du projet

# Objectifs du projet

Discoventures est une application mobile pour tout sportif voulant se dépenser en explorant les horizons. L'objectif de cette application permet à chacun de générer un parcours alétoire depuis sa position. Le parcours généré est pensé pour que l'utilisateur visite des lieux culturels et patrimoniaux durant son activité. La fonctionnalité phare de cette application est l'activation automatique d'un audio guide lorsque l'utilisateur passe devant ces lieux importants. En liant son application de musiques en streaming, son activité pourra s'effectuer en écoutant ses playlists préférées.

# Cas d'usage

- S'inscrire

- Se connecter

- Lier son compte de musiques en streaming

- Générer un parcours

- Enregistrer le parcours

- Visualiser son profil

- Démarrer le parcours (activité)

- Terminer l'activité

- Enregistrer l'activité

- Rechercher les parcours publics

- [administrateur] Supprimer des utilisateurs

- [administrateur] Supprimer des parcours dangereux

# Scenarii d'usage

## S'inscrire

## Se connecter

## Lier son compte de musiques en streaming

## Générer un parcours

## Enregistrer le parcours

## Visualiser son profil

## Démarrer le parcours (activité)

## Terminer l'activité

## Enregistrer l'activité

## Rechercher les parcours publics

## [administrateur] Supprimer des utilisateurs

## [administrateur] Supprimer des parcours dangereux

# Modèle de données

Pour gérer la persistence de nos données, nous avons utiliser l'ORM Sequelize. Il permet d'avoir un système de gestion de données par modèle objet. Plusieurs entités ont été "designées".

## Sequelize

### Utilisateurs

Un utilisateur est caractérisé par son email, son mot de passe qui est encodé avec une clé de hachage, son pseudo, de l'information indiquant si celui-ci est administrateur. De plus, l'objectif est de garder en mémoire ses jetons d'accès aux applications de musiques qu'il couple.

### Parcours

A voir si on garde GPX ou codé.

### lieux

Cette entité est alimentée par une API externe répertoriant tous les lieux culturels et patrimoniaux autour de l'utilisateur. Pour un parcours données, cela permet de connaître tous ses lieux importants. Une information très utile pour activer l'audio guide et d'informer les autres utilisateurs.

### Activités

A voir si on garde GPX ou codé.

## API externes

### Lieux culturels/patrimoniaux

### Musiques streaming

### API guide touristique

Dicter avec logiciel + Lecture Wikipedia ??

# Documentation de l'API interne

Lien Swagger

# Choix techniques

- typescript

- mui

- font

## Webservices


## Gestion des rôles

A décrire

- Créateur d'un parcours
- Pratiquant du parcours

(Créateur et pratiquant => pareil)

- Administrateur

## Architecture de l'application

# Screencast

# Autres éléments
