module.exports.config = {
  name: `claude`,
  version: "1.1.0",
  permission: 0,
  credits: "ryuko",
  description: "",
  prefix: false,
  premium: true,
  category: "without prefix",
  usage: `claude (question)`,
  cooldowns: 3,
  dependency: {
    "axios": ""
  }
};
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
module.exports.run = async function({api, event, args}) {
  const message = args.join(" ");
  if (!message) {
    return api.sendMessage('please provide a question');
  }
let data = JSON.stringify({
  "type": "chat",
  "messagesHistory": [
    {
      "id": uuidv4(),
      "from": event.senderID,
      "content": message
    }
  ]
});
let config = {
  method: 'POST',
  url: 'https://claude.talkai.info/chat/send/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/event-stream',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Content-Type': 'application/json',
    'sec-ch-ua-platform': '"Android"',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'dnt': '1',
    'sec-ch-ua-mobile': '?1',
    'origin': 'https://claude.talkai.info',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://claude.talkai.info/chat/',
    'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
    'priority': 'u=1, i',
  },
  data: data
};

axios.request(config)
  .then(response => {
    const cleanedData = response.data.split('\n')
      .filter(line => line.startsWith('data:'))
      .map(line => line.replace('data: ', '').trim())
      .join(' ');

    api.sendMessage(cleanedData, event.threadID, event.messageID);
  })
  .catch(error => api.sendMessage('something went wrong, please try again later.', event.threadID, event.messageID));
}
