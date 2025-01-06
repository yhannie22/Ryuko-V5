const { join, resolve } = require('path');
const fs = require('fs-extra');
const chalk = require("chalk");
const path = require('path');
const log = require("../utility/logs.js");

module.exports.addUser = async (name, userID) => {
  const configPaths = require('../../bots.json');
  delete require.cache[require.resolve('../../bots.json')];
        const dataa = configPaths
  for (let i = 0; i < dataa.length; i++) {
          const ryuko = dataa[i].uid;
          const packs = [];
          packs.push(ryuko);
          if (packs.includes(userID)) {
           return;
          } 
        }
    const configFile = 'bots.json';
    const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    const configBots = config;
    configBots.push({    
      "name": name,
      "uid": userID,
      "botname": "ryuko",
      "prefix": "-",
      "admins": [],
      "time": 0
    });
  log(`loaded ${chalk.blueBright(`${name}'s`)} data in ${chalk.blueBright(`bots.json`)} file, restarting to save changes`, "load");
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  process.exit(1);
}
module.exports.createUser = async (res, name, userID, botName, botPrefix, botAdmin) => {
    delete require.cache[require.resolve('../../bots.json')];
  const configPaths = require('../../bots.json');
        const dataa = configPaths
  for (let i = 0; i < dataa.length; i++) {
          const ryuko = dataa[i].uid;
          const packs = [];
          packs.push(ryuko);
          if (packs.includes(userID)) {
           var data = `created appstate file, data is already loaded. restarting...`;
           res.send({ data });
           return process.exit(1);
          } 
        }
    const configFile = 'bots.json';
    const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    const configBots = config;
    let adminss = [];
    adminss.push(botAdmin);
    configBots.push({    
      "name": name,
      "uid": userID,
      "botname": botName || "ryuko",
      "prefix": botPrefix || "-",
      "admins": adminss || [],
      "time": 0
    });
    var data = "successfully created appstate and loaded data, restarting..."
  res.send({data});
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
  process.exit(1);
}

module.exports.rmStates = async (states) => {
  const fbstatesFolder = "states";
  const statesFile = join(`${fbstatesFolder}/${states}.json`)
  fs.unlinkSync(statesFile);
}
