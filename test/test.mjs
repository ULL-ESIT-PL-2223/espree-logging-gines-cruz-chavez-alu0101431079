import { transpile } from "../src/logging-espree.js";
import assert from 'assert';
import * as fs from "fs/promises";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import Tst from './test-description.mjs';

const Test = Tst.map(t => ({
  input: __dirname + '/data/' + t.input,
  output: __dirname + '/data/' + t.output,
  correctLogged: __dirname + '/data/' + t.correctLogged,
  correctOut: __dirname + '/data/' + t.correctOut,
})
)

function removeSpaces(s) {
  return s.replace(/\s/g, '');
}

for (let i = 0; i < Test.length; i++) {
  it(`transpile(${Tst[i].input}, ${Tst[i].output})`, async () => {
    // First transpile the input file to the output file.
    await transpile(Test[i].input, Test[i].output);
    // Compare the output file with the correct output file.
    const transpileOutput = await fs.readFile(Test[i].output, 'utf8');
    const correctTranspileOutput = await fs.readFile(Test[i].correctLogged, 'utf8');
    assert.equal(removeSpaces(transpileOutput), removeSpaces(correctTranspileOutput));
    // Compare the console.log output with the correct console.log output.
    let outputs = [];
    let oldLog = console.log;
    console.log = function (...args) {
      outputs.push(args.join(' '));
    }
    // Evaluate the output file.
    await import(Test[i].output);
    // Add a blank line at the end.
    outputs.push('');
    console.log = oldLog;
    const correctOut = await fs.readFile(Test[i].correctOut, 'utf8');
    assert.equal(outputs.join('\n'), correctOut);
  });
}


