const chalk = require('chalk');
const { readdirSync, readFileSync, writeFileSync } = require("fs-extra");
const configLog = JSON.parse(readFileSync('./main/utility/config.json'));

module.exports = async (log, type) => {
  switch (type) {
    case "load": 
      console.log(`${chalk.blue(configLog.load)} - ${log}`);
      break;
    case "err":
      console.log(`${chalk.red(configLog.error)} - ${log}`);
      break;
    case "warn":
      console.log(`${chalk.yellow(configLog.warn)} - ${log}`);
      break;
    case "login":
      console.log(`${chalk.blue(configLog.login)} - ${log}`);
      break;
    case "cmd":
      console.log(`${chalk.blue(configLog.cmd)} - ${log}`);
      break;
    case "evnts":
      console.log(`${chalk.blue(configLog.evnts)} - ${log}`);
      break;
    default:
    console.log(`${chalk.blue(configLog.load)} - ${log}`);
    break;
  }
}

module.exports.commands = async (log) => {
  console.log(`${chalk.blue(configLog.cmd)} - ${log}`)
}

module.exports.events = async (log) => {
  console.log(`${chalk.blue(configLog.evnts)} - ${log}`)
}

module.exports.login = async (log) => {
  console.log(`${chalk.blue(configLog.login)} - ${log}`)
}