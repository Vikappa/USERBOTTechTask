import * as fs from 'fs'; // gestione dei file
import * as path from 'path'; // gestione dei percorsi di file
import * as readline from 'readline'; // per l'input dell'utente.
import { WordScore } from './wordscore';

const defaultFilePath: string = '../textfile.txt'; // path file contenuto nella repo

const wordRegex: RegExp = /[^\s]+/g;
const spaceRegex: RegExp = /\s+/g;
const REGEX = /\S+|\s+/g;


// Leggi e lancia il metodo di stampa di elaborazione del contenuto e stampa i risultati
const readFile = (filePath: string): void => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Errore durante la lettura del file: ${err.message}`);
      return;
    }
    
    const { nSpazi, nParole, nCaratteri, parolePiùUsate } = processFileContent(data);
    printResults(data, nSpazi, nParole, nCaratteri, parolePiùUsate);
  });
}

// Metodo che usa le regex per filtrare il contenuto del file e trasforma gli spazi lunghi in spazi di un solo carattere
const splitWordsAndSpaces = (data: string): string[] => {

  return (data.match(REGEX) || []).map(part => {
    if (/\s+/.test(part)) {
      return ' '
    }
    return part
  })
}

// Calcola i risultati richiesti nella consegna
const processFileContent = (data: string): { nSpazi: number, nParole: number, nCaratteri: number, parolePiùUsate: WordScore[] } => {
  const wordsAndSpaces = splitWordsAndSpaces(data) // Ritorna un array di elementi filtrati, ogni elemento è una parola o uno spazio

  let nSpazi: number = 0;
  let nParole: number = 0;
  let nCaratteri: number = 0;
  let parolePiùUsate: WordScore[] = [];

  for (const fileWordAndSpace of wordsAndSpaces) {
    if (fileWordAndSpace.trim() === '') {
      nSpazi++;
    } else {
      const trimmedWord = fileWordAndSpace.trim();
      const existing = parolePiùUsate.find((parolaConteggiata) => parolaConteggiata.getWord() === trimmedWord);

      if (existing) {
        existing.increaseScore();
      } else {
        parolePiùUsate.push(new WordScore(trimmedWord, 1));
      }
      nParole++;
      nCaratteri += fileWordAndSpace.length;
    }
  }

  parolePiùUsate.sort((a, b) => b.getScore() - a.getScore());

  return { nSpazi, nParole, nCaratteri, parolePiùUsate };
}

// console.log() dei risultati
const printResults = (data: string, nSpazi: number, nParole: number, nCaratteri: number, parolePiùUsate: WordScore[]): void => {
  console.log(`Contenuto del file:\n${data}`);
  console.log("----------------------------Risultati conteggi-------------------------");
  console.log("Numero spazi: " + nSpazi);
  console.log("Numero parole: " + nParole);
  console.log("Numero caratteri: " + nCaratteri);
  console.log("Parole più usate");

  parolePiùUsate.forEach((parolaConteggiata) => {
    if (parolaConteggiata.getScore() > 10) {
      console.log(`${parolaConteggiata.getWord()}: ${parolaConteggiata.getScore()}`);
    }
  });
}

// Funzione per ottenere il percorso assoluto del file
const getAbsolutePath = (relativePath: string): string => {
  return path.resolve(__dirname, relativePath);
}

// Funzione per verificare se il file esiste
const fileExists = (filePath: string) : boolean => {
  return fs.existsSync(filePath);
}

// Configura readline per ottenere l'input dell'utente
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Inizio esecuzione readliner, chiede all'utente di fornire un percorso di file e lancia i metodi scritti in precedenza
rl.question('Inserisci il percorso del file: (o premi invio per usare il file di default)', (inputFilePath: string) => {
  let filePathToUse: string;
  
  // Usa il percorso di default se l'input è vuoto
  if (!inputFilePath.trim()) {
    filePathToUse = getAbsolutePath(defaultFilePath);
  } else {
    // Ottieni il percorso assoluto del file fornito dall'utente
    const absoluteInputFilePath = getAbsolutePath(inputFilePath);

    // Verifica se il file esiste
    if (fileExists(absoluteInputFilePath)) {
      filePathToUse = absoluteInputFilePath;
    } else {
      console.log(`Il file specificato non esiste. Utilizzo il percorso di file predefinito: ${defaultFilePath}`);
      filePathToUse = getAbsolutePath(defaultFilePath);
    }
  }

  console.log(`Nessun file valido specificato, uso il file contenuto nella repo`);
  
  // Lancia il metodo che legge i file e a sua volta lancia elaborazione e stampa
  readFile(filePathToUse);

  // Chiudi l'interfaccia readline
  rl.close();
})

export { readFile, getAbsolutePath, fileExists, splitWordsAndSpaces, processFileContent, printResults};