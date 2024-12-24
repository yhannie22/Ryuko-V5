const { join, resolve } = require('path');
const fs = require('fs-extra');
const chalk = require("chalk");
const path = require('path');
const log = require("../utility/logs.js");

module.exports.addUser = async (name, userID) => {
  const configPaths = require('../../config.json');
        const dataa = configPaths.bots
  for (let i = 0; i < dataa.length; i++) {
          const ryuko = dataa[i].uid;
          const packs = [];
          packs.push(ryuko);
          if (packs.includes(userID)) {
           return;
          } 
        }
    const configFile = 'config.json';
    const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    const configBots = config.bots;
    configBots.push({
      "name": name,
      "uid": userID
    });
  log(`loaded ${chalk.blueBright(`${name}'s`)} data in ${chalk.blueBright(`config`)} file`, "load");
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

module.exports.rmStates = async (states) => {
  const fbstatesFolder = "states";
  const statesFile = path.join(fbstatesFolder, `${states}.json`)
  try {
      await fs.unlinkSync(statesFile);
      log.login(`removed ${chalk.red(`${states}.json`)} file : can't read`)
    } catch (error) {
      console.log(error);
  }
  
}

module.exports.rmUsers = async (userid) => {
  const configFile = 'config.json';
  const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
  const index = config.bots.findIndex(item => item.uid === userid);
  if (index !== -1) config.splice(index, 1);
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

}
