<p align="center" style="margin-top: 25px;">
  <img src="./src/media/logo-userbot.png" width="300">
</p>

<h1 align="center">UserBot Tech Task</h1>

<p align="center">
  <a href="https://imgshields.io"><img src="https://img.shields.io/badge/Ambiente%20e%20gestione%20dipendenze-Node.js-green?logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="https://imgshields.io"><img src="https://img.shields.io/badge/Linguaggio-TypeScript-blue?logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://imgshields.io"><img src="https://img.shields.io/badge/Testing-jest-red?logo=jest&logoColor=white" alt="Jest"></a>
</p>

## 📜 Descrizione

Questo progetto è un'applicazione **Node.js** realizzato come tech task per la candidatura in UserBot. Sviluppata con **TypeScript**, legge un file di testo, elabora il contenuto e stampa alcuni risultati statistici. L'applicazione utilizza delle **regex** per contare parole, spazi e caratteri, e per trovare le parole più usate nel testo.

## 🌟 Funzionalità

- **Conteggio parole, spazi e caratteri**: Elabora il contenuto del file di testo e conta il numero di parole, spazi e caratteri. Elenca le parole usate almeno 10 volte in ordine decrescente.
- **Gestione dei file**: Consente di specificare un percorso di file personalizzato o utilizzare un file predefinito.

## 📦 Dipendenze

- ![Node.js](https://img.shields.io/badge/node-v16.13.0-green?logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-4.4.4-blue?logo=typescript&logoColor=white)
- ![Jest](https://img.shields.io/badge/testing-jest-red?logo=jest&logoColor=white)

## 📝 Spiegazione

<p>
Il metodo chiede un input all'utente grazie a un'istanza di <code>readline</code> che scrive in console e abilita la lettura dell'input dell'utente. Se non viene digitato un indirizzo valido o il file indicato non esiste, il metodo usa un metodo di fallback che legge un file contenuto di default nella repo.
</p>

<p>
Una volta letto il file, l'input viene trasformato in stringa ed elaborato dal metodo <code>processFileContent</code> che ritorna diversi valori. Questi vengono inseriti come parametri del metodo <code>printResults</code> e visualizzati in console.
</p>

## 📂 package.json

<p>
Il file <code>package.json</code> contiene 4 diversi script per l'applicazione:
</p>

- **dev**: usando <code>nodemon</code> verifica che il file <code>src</code> sia stato modificato e in caso compila di nuovo l'output nella cartella <code>dist</code>, poi esegue i test e lancia il programma.
- **build**: solo compilazione.
- **test**: solo testing.
- **run-only**: esegue solo il file <code>index</code> in <code>/dist</code>.

## 🧪 UnitTest

<p>
Usando <strong>Jest</strong> ho implementato dei test automatici che verificano:
</p>

- Se il metodo per verificare se il file esiste funziona correttamente.
- Se il metodo <code>splitWordsAndSpaces</code> usato da <code>processFileContent</code> sia corretto.
- Se il metodo <code>processFileContent</code> esegua i calcoli corretti.
- Se le stampe di output siano quelle aspettate.
