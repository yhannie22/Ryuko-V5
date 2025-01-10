module.exports.config = {
  name: `claude`,
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
        const res = await axios.get(`https://heru-apiv2.ddnsfree.com/api/claude-3-haiku-20240307?query=${ask}`);
        const message = res.data.response;
        return reply(answer);
    } catch (err) {
        return reply(`can't fetch api key.`);
    }
}