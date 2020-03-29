# Documentation technique

## Besoin pour le projet

Listes des technologies nécessaires:

- [Ganache](https://www.trufflesuite.com/ganache)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Node](https://nodejs.org/en/)

## Installation du projet

Pour installer le projet, il faut soit le récupérer sur [github](https://github.com/Esquimor/5BLOC) ou en décompressant le zip.

## Lancement de la blockchain

 Pour lancer la blockchain, on doit créer un projet sur ganache. En cliquant sur "New Workspace"

![Ganache_Start](.\images\Ganache_Start.PNG)

Puis on ajoute le projet, en cliquant sur "Add project".

![Ganache_Workspace](.\images\Ganache_Workspace.PNG)

Pour ce projet, on va utiliser le port 8545

![Ganache_Server](.\images\Ganache_Server.PNG)

Ganache est maintenant prêt. On peut cliquer sur "Save workspace".



Ensuite il faut lancer Truffle. Note: Il faut définir la liste des candidats et la fin de l'élection avant de lancer cette commande. [Voir documentation utilisateur](./Technique.md).

```bash
truffle compile
truffle migrate --network ganache
```



On va pouvoir récupérer l'adresse du contrat.

![Ganache_Contract](.\images\Ganache_Contract.PNG)

 Cette adresse doit être mis dans ./5block/.env

```
VUE_APP_CONTRAT=<AdresseDuContrat>
```

Pour le lancement du front. Voir le [README](./5block/README.md) de ./5block

