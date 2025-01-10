module.exports.config = {
  name: `gemini`,
  version: "1.1.0",
  permission: 0,
  credits: "ryuko",
  description: "",
  prefix: false,
  premium: false,
  category: "without prefix",
  usage: ``,
  cooldowns: 3,
  dependency: {
    "axios": ""
  }
};
const axios = require('axios');
module.exports.run = async function ({api, event, args}) {
    const ask = args.join(" ");
    function message(data) {
        api.sendMesage(data, event.threadID)
    }
    function reply(data) {
        api.sendMesage(data, event.threadID, event.messageID)
    }
    if (!ask) {
        return reply(`please provide a message`);
    }
    try {
        const res = await axios.get(`http://sgp1.hmvhostings.com:25721/gemini?question=${ask}`);
        const message = res.data.answer;
        return reply(answer);
    } catch (err) {
        return reply(`can't fetch api key.`);
    }
}