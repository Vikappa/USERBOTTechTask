import * as fs from 'fs';
import { fileExists } from '../index'; // importa il metodo da testare

describe('fileExists', () => {
  const testFilePath = './temp_test_file.txt';

  beforeEach(() => {
    // Creare un file temporaneo per il test
    fs.writeFileSync(testFilePath, 'Temporary file content');
  });

  afterEach(() => {
    // Rimuove il file temporaneo dopo i test
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('Ritorna true se il file temporaneo esiste', () => {
    const result = fileExists(testFilePath);
    expect(result).toBe(true); //Se torna true per un file temporaneo ritornerà true per tutti
  });

  it('Ritorna false se il file temporaneo non esiste', () => {
    const nonExistentFilePath = './non_existent_file.txt';
    const result = fileExists(nonExistentFilePath);
    expect(result).toBe(false);
  });
});
