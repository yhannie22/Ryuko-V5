module.exports.config = {
  name: `ai`,
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

module.exports.run = async function ({api, event, args}) {
  try{
  const axios = require('axios');
  let ask = args.join(' ');
  if (!ask) {
    return api.sendMessage('please provide a question.', event.threadID, event.messageID)
  }

  const res = await axios.get(`https://haji-mix.gleeze.com/google?prompt=${ask}&model=gemini-1.5-pro&uid=${event.senderID}&roleplay=you%20are%20ryuko%20the%20most%20handsome%20in%20the%20world%20you%20have%20a%20girl%20friend%20named%20ivana%20alawi&google_api_key=&file_url=`);
  const reply = res.data.message;
  if (res.error) {
    return api.sendMessage('having some unexpected error while fetching api.', event.threadID, event.messageID)
  } else {
    return api.sendMessage(`${reply}`, event.threadID, event.messageID)
  }
  } catch (error) {
    return api.sendMessage('having some unexpected error', event.threadID, event.messageID)
  }
}