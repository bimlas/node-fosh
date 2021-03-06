const readline = require('readline');

function iterationSeparator(title) {
  console.log(`\n__ ${title} ${'_'.repeat(process.stdout.columns - title.length - 5)}`);
}

function loopSeparator() {
  console.log(`\n${'='.repeat(process.stdout.columns - 1)}`);
}

function rawMessage(message) {
  console.log(message);
}

function warningMessage(message) {
  console.warn('fosh: WARNING:', message);
}

function errorMessage(message) {
  console.error('fosh: ERROR:', message);
}

function repl(commandName, callback) {
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `fosh: ${commandName} > `,
  });

  input.prompt();
  input.on('line', (line) => {
    try {
      callback(line);
    } catch (e) {
      errorMessage('There was an error while processing the command');
    }
    input.prompt();
  });
}

module.exports.repl = repl;
module.exports.iterationSeparator = iterationSeparator;
module.exports.loopSeparator = loopSeparator;
module.exports.rawMessage = rawMessage;
module.exports.warningMessage = warningMessage;
module.exports.errorMessage = errorMessage;

/* eslint no-console: off */
