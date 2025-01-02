console.clear();
const { spawn } = require("child_process");
const express = require("express");
const app = express();
const chalk = require('chalk');
const logger = require("./main/utility/logs.js");
const fs = require('fs-extra')
const path = require('path');
const port = 8090 || 9000 || 5555 || 5050 || 5000 || 3003 || 2000 || 1029 || 1010;

console.log(chalk.blue('LOADING MAIN SYSTEM'));
logger(`loading app on port ${chalk.blueBright(port)}`, "load");
app.use(express.json());
app.use(express.static('main/webpage'));


app.post('/login', (req, res) => {
  const { loginPassword } = req.body;
  
  fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('an error occurred.');
    }
    const config = JSON.parse(data);
    if (loginPassword === config.adminpass) {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      res.send({ token });
    } else {
      res.status(401).send('invalid admin password.');
    }
  });
});
app.get('/create', (req, res) => {
    const token = req.query.token; 
    
    if (token && token === localStorage.getItem('token')) { 
        res.sendFile(path.join(__dirname, 'main/webpage/create.html'));
    } 
    res.sendFile(path.join(__dirname, 'main/webpage/notfound.html'));
});
app.post('/create', (req, res) => {
    const fileName = req.body.fileName;
    const appState = req.body.appState;
    const filePath = './states/'+fileName + '.json'; 
    const fileContent = appState;
  if (!JSON.parse(fileContent)){
    var error = 'error creating appstate file, wrong format.'
            return res.status(500).send({ error});
  }
    fs.writeFile(filePath, fileContent, (err) => {
         data = "appstate file created successfully, restarting.."
        if (err) {
            console.error(`error : ${err}`);
            error = 'error creating appstate file, try again later.'
            return res.status(500).send({ error });
        }
        res.send({ data });
        startBot('restarting please wait');
    });
});
app.post("/configure", (req, res) => {
    const {content, type} = req.body;
    const filePath = 'config.json';
    async function updateConfigData(value, where) {
        var data;
        var error;
        const configData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        configData[where] = value;
        try {
            await fs.writeFileSync(filePath, JSON.stringify(configData, null, 2))
            data = `successfully changed the value of ${where}`;
            res.send({data});
        
        } catch (err) {
            error = `error editing ${where}`;
           return res.status(500).send({ error });
        }
    }
    async function addConfigData(value, where) {
        var data;
        var error;
            const configPath = './config.json'
            const config = require("./config.json");
            const here = config[where];
            if (here.includes(value)) {
                error = `${value} is already in ${where}`;
               return res.status(500).send({ error });
            }
            here.push(value);
            try {
                await fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
            
            data = `successfully added value of ${where}`;
            res.send({data}); 
            } catch (err) {
                error = `error adding value in ${where}`;
               return res.status(500).send({ error });
            }
            }
    async function edit(contentt, typee) {
        switch (typee) {
        case "Email":
            return await updateConfigData(contentt, 'email');
        case "Prefix":
            return await updateConfigData(contentt, 'prefix');
        case "Operator":
            return await addConfigData(contentt, 'operators');
        case "Admin":
            return await addConfigData(contentt, 'admins');
    }
    }
    edit(content, type);
});
app.listen(port, () => {
    logger(`loaded on port ${chalk.blueBright(port)}`);
});
function startBot(message) {
    (message) ? console.log(chalk.blue(message.toUpperCase())) : "";

  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "--no-warnings", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
  child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("restarting server");
            global.countRestart += 1;
            return;
        } else return;
    });

  child.on("error", function(error) {
    logger("an error occurred : " + JSON.stringify(error), "error");
  });
};
startBot();