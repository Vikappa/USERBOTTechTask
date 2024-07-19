// src/index.ts
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Funzione per leggere un file
function readFile(filePath: string): void {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Errore durante la lettura del file: ${err.message}`);
      return;
    }
    console.log(`Contenuto del file:\n${data}`);
  });
}

// Funzione per ottenere il percorso assoluto del file
function getAbsolutePath(relativePath: string): string {
  return path.resolve(__dirname, relativePath);
}

// Configura readline per ottenere l'input dell'utente
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Chiede all'utente di inserire il percorso del file
rl.question('Inserisci il percorso del file da leggere: ', (inputPath) => {
  const absoluteFilePath = getAbsolutePath(inputPath);
  readFile(absoluteFilePath);
  rl.close();
});
