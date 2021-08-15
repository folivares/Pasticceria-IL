# Pasticceria IL

Pasticceria IL è una web-application sviluppata con SpringBoot e Angular.

## Progetto

La pasticceria vende dolci che hanno un nome ed un prezzo. Ogni dolce è composto da una lista di ingredienti. Opzionale: indicare di ogni ingrediente quantità e unità di misura. Opzionale: La gestione della pasticceria è in mano a Luana e Maria che vogliono avere il proprio account per poter accedere all'area di backoffice tramite email e password.
\
Nell’area di backoffice si possono gestire (CRUD) i dolci e metterli in vendita con una certa disponibilità (esempio: 3 torte paradiso in vendita). I dolci in vendita invecchiano ed in base al tempo trascorso dalla loro messa in vendita hanno prezzi diversi: primo giorno prezzo pieno, secondo giorno costano l’80%, il terzo giorno il 20%. Il quarto giorno non sono commestibili e devono essere ritirati dalla vendita.
\
\
Realizzare una pagina vetrina dove tutti possono vedere la lista di dolci disponibili e il prezzo relativo.
\
\
Opzionale: andando nella pagina del dettaglio del dolce (o tramite overlayer), si scoprono gli ingredienti indicati dalla ricetta.

## Tecnologie
### Backend
* Java 11
* SpringBoot 2.5
* MySQL 5

### Frontend
* Angular 12
* TypeScript 4

## Utilizzo
### Prerequisiti
Prerequisiti per test in **ambiente locale**:
* Istanza MySQL
* Java runtime (11)
* Web Server

All'interno della cartella `target` sono presenti i file statici relativi al frontend, il backend compilato sotto forma di jar e le query da lanciare per inizializzare il database.

### Database
Nella sottocartella `sql` di `target` sono presente due file:
* 01-test_il
* 02-dump-utenti

Il primo file contiene la definizione del database e delle tabelle. Il nome del db che verrà creato sarà **test_il**.
\
Il secondo, invece, permette di popolare la tabella _utente_.

### Backend
La cartella `target` contiene il file jar `pasticceria-il-0.0.1-SNAPSHOT.jar`. Per avviare il servizio di backend è sufficiente lanciare il comando

```bash
java -jar pasticceria-il-0.0.1-SNAPSHOT.jar
```
Il jar può ricevere i seguenti parametri **_(opzionali)_**:
* API_PORT: porta servizio backend. Default _8080_
* MYSQL_HOST: default _localhost_
* MYSQL_PORT: default _3306_
* MYSQL_USER: default _test-il_
* MYSQL_PASSWORD: default _test-il2021_

Ad esempio, per modificare l'utente di MySQL lanciare il seguente comando
```bash
java -DMYSQL_USER=altroutente -jar pasticceria-il-0.0.1-SNAPSHOT.jar
```
### Frontend
All'interno della cartella `target` è presente l'archivio `fe-static`.
\
Per rendere disponibile il frontend è necessario estrarre i file dall'archivio e copiarli all'interno del proprio Web Server (ad es. Apache HTTP).
\
Il frontend punta al backend tramite l'indirizzo *http://localhost:8080*. Per modificare tale puntamento è necessario ricompilare i sorgenti del progetto di *frontend*.

### Demo ambiente locale
Completati gli step precendenti, la web-app sarà raggiungibile all'indirizzo del proprio Web Server.
\
La web-app è composta da un sezione _pubblica_ e da una _privata_. La route principale è impostata sulla parte pubblica, ovvero la **vetrina** della pasticceria. Essa è composta da una lista di dolci (messi in vendita dagli amministratori) con relative informazioni quali nome, prezzo (e sconto) e quantità disponibile. Per ogni dolce è possibile visionare gli ingredienti che lo compongono.
\
La parte privata, invece, si raggiunge tramite **login**. Una volta effettuato l'accesso, si presenta l'area di **backoffice** dove l'amministratore può gestire i _dolci_ (CRUD e messa in vendita) e gli _ingredienti_ (CRUD).
\
Di seguito le credenziali per accedere all'area privata:
* username: luana@pasticceriail.it password: 12345678
* username: maria@pasticceriail.it password: 87654321

## Demo online
All'indirizzo https://pasticceriail.cytchen.it/ è disponibile la demo pubblica. 
\
Il deploy della soluzione software è stato effettuato su una VPS con OS Ubuntu 20.04.
\
\
[Clicca qui per la demo](https://pasticceriail.cytchen.it/)