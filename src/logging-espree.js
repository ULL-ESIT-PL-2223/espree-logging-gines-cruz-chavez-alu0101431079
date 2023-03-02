import * as escodegen from 'escodegen';
import * as espree from 'espree';
import * as estraverse from 'estraverse';
import * as fs from 'fs/promises';

/**
 * @desc Given an input file, transpile it and write the output to the output file.
 * @param {string} inputFile Path to the input file.
 * @param {string} outputFile Path to the output file.
 */
export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf8');
  const output = addLogging(input);
  if (outputFile === undefined) {
    console.log(output);
    return;
  }
  await fs.writeFile(outputFile, output);
}

/**
 * @desc Given a string of JavaScript code, return a string of JavaScript code
 * that logs the name of each function and its parameters before the
 * function is called.
 * @param {string} code JavaScript code.
 * @returns {string} JavaScript code with logging.
 */
export function addLogging(code) {
  const ast = espree.parse(code, { ecmaVersion: 6, loc: true });
  estraverse.traverse(ast, {
    enter: function(node, parent) {
      if (node.type === 'FunctionDeclaration' ||
          node.type === 'FunctionExpression' ||
          node.type === 'ArrowFunctionExpression') {
        addBeforeCode(node);
      }
    }
  });
  return escodegen.generate(ast);
}

/**
 * @desc Given a function node, add a console.log statement before the
 * function that logs the name of the function and its parameters.
 * @param {object} node A function node.
 */
function addBeforeCode(node) {
  const name = node.id ? node.id.name : '<anonymous function>';
  const params = node.params.map(param => '${' +param.name + '}').join(', ');
  const beforeCode = 'console.log(\`Entering ' + name + '(' + params + ') at line ' + node.loc.start.line + '\`);';
  const beforeNodes = espree.parse(beforeCode, { ecmaVersion: 6 }).body;
  node.body.body = beforeNodes.concat(node.body.body);
}