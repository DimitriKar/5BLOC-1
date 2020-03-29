# Documentation Utilisateur

## Initialisation

Pour pouvoir définir la liste des candidats et la date de fin de l'élection. Il faut aller dans ./migrations/2_functing.js

```js
const Ballot = artifacts.require("Ballot.sol");
const SafeMath = artifacts.require("SafeMath.sol");

module.exports = function(deployer, _network, _accounts) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, Ballot);
  deployer.deploy(Ballot, ["Adrien", "Nhans"[, <NomCandidat>, ...]], <dateDeFinEnTimestamp>);
};
```



Note: Par défaut Ganache va prendre le premier compte comme maître du vote.



## Interface graphique

Ce reporter à la [doc ./5block/README.md](./5block/README.md) pour lancer le front.

### Vue par défaut

![Screenshot_2020-03-29 5block](.\images\Screenshot_2020-03-29 5block.png)

C'est la vue si l'utilisateur n'est pas connecté ou si il a déjà voté ou si le vote est fini.

### Vue si le votant n'a pas encore voté

![Screenshot_2020-03-29 5block(1)](.\images\Screenshot_2020-03-29 5block(1).png)

### Vue Délégation

Cette vue est accessible, si le votant n'a pas voté ou si il n'a pas délégué son vote.

 ![Screenshot_2020-03-29 5block(2)](.\images\Screenshot_2020-03-29 5block(2).png)

Le votant doit saisir l'adresse du votant auquel il veut déléguer son vote.

### Vue pour ajouter un votant

Cette vue n'est accessible que par le maître du vote

![Screenshot_2020-03-29 5block(3)](.\images\Screenshot_2020-03-29 5block(3).png)

Il doit rentrer l'adresse d'un votant pour l'ajouter aux corps électoral.

