# Projet LIDE

Ce serveur de WebSocket permet de faire le lien entre le terminal front-end xterm et les conteneurs de compilation/execution de code.

Il permet de rediriger le stdin et le stdout du conteneur vers le navigateur de l'utilisateur, afin qu'il puisse intéragir avec son programme, et recevoir les sorties.

Chaque connexion ws au serveur, permet d'ouvrir un autre ws vers le conteneur (qui n'authorise que les connexions depuis ce serveur-ci ), et les branche entre-eux. Ceci afin de sécuriser l'accès à notre API Docker.
