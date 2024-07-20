import * as fs from 'fs';
import { WordScore } from '../wordscore';
import { fileExists, readFile, splitWordsAndSpaces , processFileContent, printResults } from '../index'; // importa i metodi da testare

describe('fileExists', () => {
  const testFilePath = './temp_test_file.txt';

  beforeEach(() => { //Prima di ogni test crea un file temporaneo da scrivere per testare i metodi
    fs.writeFileSync(testFilePath, 'Temporary file content');
  });

  afterEach(() => { //Dopo ogni test cancella il file temporaneo
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('Ritorna true se il file temporaneo esiste', () => {
    const result = fileExists(testFilePath);
    expect(result).toBe(true);
  });

  it('Ritorna false se il file temporaneo non esiste', () => {
    const nonExistentFilePath = './non_existent_file.txt';
    const result = fileExists(nonExistentFilePath);
    expect(result).toBe(false);
  });
});

describe('processFileContent', () => {
  const testFilePath = './temp_test_file.txt';
  const parola1 = "Ciao";
  const parola2 = "sono";
  const parola3 = "Vincenzo";
  const parola4 = "assumetemi";

  let stringFileContent = "";

  const numeroParola1 = Math.floor(Math.random() * 100 + 1);
  const numeroParola2 = Math.floor(Math.random() * 100 + 1);
  const numeroParola3 = Math.floor(Math.random() * 100 + 1);
  const numeroParola4 = Math.floor(Math.random() * 100 + 1);

  for (let index = 0; index < numeroParola1; index++) {
    stringFileContent += parola1 + " ";
  }

  for (let index = 0; index < numeroParola2; index++) {
    stringFileContent += parola2 + " ";
  }

  for (let index = 0; index < numeroParola3; index++) {
    stringFileContent += parola3 + " ";
  }

  for (let index = 0; index < numeroParola4; index++) {
    stringFileContent += parola4 + " ";
  }

  // Crea una stringa contenente parole e spazi casuali con valori casuali registrati per fare i confronti con i test

  it('Controlla se il metodo che conta parole, caratteri e spazi calcola i risultati aspettati', () => {
    const { nSpazi, nParole, nCaratteri, parolePiùUsate } = processFileContent(stringFileContent);

    expect(nSpazi).toBe(numeroParola1 + numeroParola2 + numeroParola3 + numeroParola4);
    expect(nCaratteri).toBe(stringFileContent.trim().replace(/\s+/g, '').length); // Rimuove gli spazi e conta il numero di caratteri
    expect(parolePiùUsate).toEqual(expect.arrayContaining([ 
      expect.objectContaining({ getWord: expect.any(Function), getScore: expect.any(Function) }) // Controlla se il metodo ritorna un array di oggetti WordScore
    ]));
  });
});

describe('splitWordsAndSpaces', () => {
  it('Controlla se separa spazi e parole correttamente', () => {
    const input = "Ciao mondo!";
    const expectedOutput = ["Ciao", " ", "mondo!"];
    const result = splitWordsAndSpaces(input);
    expect(result).toEqual(expectedOutput);
  });

  it('Controlla se i doppi spazi generano errori nella separazione di file e stringhe', () => {
    const input = "Vincenzo   ha molte    idee, valutate di     assumerlo!";
    const expectedOutput = ["Vincenzo", " ", "ha"," ", "molte", " ", "idee,", " ", "valutate", " ", "di", " ", "assumerlo!"];    const result = splitWordsAndSpaces(input);
    expect(result).toEqual(expectedOutput);
  });

  it('Se la stringa col contenuto del file è vuota dovrebe tornare un array vuoto', () => {
    const input = "";
    const expectedOutput: string[] = [];
    const result = splitWordsAndSpaces(input);
    expect(result).toEqual(expectedOutput);
  });

})

describe('printResults', () => {
    it('Controlla se il metodo stampa correttamente i risultati', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      const nSpazi = 5;
      const nParole = 10;
      const nCaratteri = 30;
      const parolePiùUsate = [
        new WordScore("Ciao", 15),
        new WordScore("sono", 12)
      ];

      printResults("Test Content", nSpazi, nParole, nCaratteri, parolePiùUsate);

      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Contenuto del file:\nTest Content'));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Numero spazi: ' + nSpazi));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Numero parole: ' + nParole));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Numero caratteri: ' + nCaratteri));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Parole più usate'));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Ciao: 15'));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('sono: 12'));

      consoleLogSpy.mockRestore();
    });
});