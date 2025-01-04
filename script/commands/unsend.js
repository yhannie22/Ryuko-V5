module.exports.config = {
    name: "unsend",
    version: "1.0.1",
    permission: 2,
    credits: "nazrul",
    description: "reply [unsend]",
    category: "system",
    prefix: true,
    premium: false,
    usages: "unsend admin only",
    cooldowns: 0
};

module.exports.languages = {
     "english": {
        "returnCant": "can't unsend message from other user.",
        "missingReply": "reply to the message you want to unsend."
    }
};

module.exports.handleReaction = function({ api, event }) {
    const { messageID, reaction } = event;
    if (reaction === '👎') {
        api.unsendMessage(messageID);
    }
};

module.exports.run = function({ api, event, getText }) {
    if (event.messageReply.senderID != api.getCurrentUserID()) {
        return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
    }
    if (event.type != "message_reply") {
        return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
    }
    return api.unsendMessage(event.messageReply.messageID);
};

global.client.handleReaction = global.client.handleReaction || [];
global.client.handleReaction.push({
    name: this.config.name,
    messageID: null
});