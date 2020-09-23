# Projet LIDE

Le but de ce projet est de créer un environement de développement en ligne dédié aux étudiants de licence.
Cette application leur permettra d’éviter le téléchargement de tous les éditeurs de code (complexes) nécessaires dans le cadre des `Cours`, `TP` et `Projets`.

## Technologies

  TODO
  
## Architecture

  TODO
  
## Prérequis

### Installer Docker
- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Configurer l'application
Vous pouvez modifier le fichier `.env` afin de changer les variables de configuration. Des les valeurs par défaut sont déjà présentes.

## Lancer l'application
Lancez l'application en appelant le script `start_lide.sh` pour générer les images et déployer les services. Le script lance également une écriture des logs du serveur back-end dans `lide-back/logs/logs.log`.

## Stopper l'application
Pour couper les services, executez la commande suivante : `docker-compose stop`. Les données de la base persistent dans `/var/lib/docker/volumes/LIDE-APP_database`

 ...
