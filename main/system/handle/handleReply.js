module.exports = function ({ api, models, Users, Threads, Currencies }) {
    return async function ({ event }) {
        if (!event.messageReply) return;
        const { handleReply, commands } = global.client
        const { messageID, threadID, messageReply } = event;
        const bots = require("../../../bots.json");
        const userId = await api.getCurrentUserID();
        const prefix = bots.find(item => item.uid === userId).prefix;
        const botname = bots.find(item => item.uid === userId).botname;
        if (handleReply.length !== 0) {
            const indexOfHandle = handleReply.findIndex(e => e.messageID == messageReply.messageID);
            if (indexOfHandle < 0) return;
            const indexOfMessage = handleReply[indexOfHandle];
            const handleNeedExec = commands.get(indexOfMessage.name);
            if (!handleNeedExec) return api.sendMessage(global.getText('handleReply', 'missingValue'), threadID, messageID);
            try {
                var getText2;
                if (handleNeedExec.languages && typeof handleNeedExec.languages == 'object') 
                	getText2 = (...value) => {
                    const reply = handleNeedExec.languages || {};
                    if (!reply.hasOwnProperty(global.config.language)) 
                    	return api.sendMessage(global.getText('handleCommand', 'notFoundLanguage', handleNeedExec.config.name), threadID, messengeID);
                    var lang = handleNeedExec.languages[global.config.language][value[0]] || '';
                    for (var i = value.length; i > -0x4 * 0x4db + 0x6d * 0x55 + -0x597 * 0x3; i--) {
                        const expReg = RegExp('%' + i, 'g');
                        lang = lang.replace(expReg, value[i]);
                    }
                    return lang;
                };
                else getText2 = () => {};
                const Obj = {};
                Obj.api = api
                Obj.event = event 
                Obj.models = models
                Obj.Users = Users
                Obj.Threads = Threads 
                Obj.Currencies = Currencies
                Obj.handleReply = indexOfMessage
                Obj.models = models
                Obj.getText = getText2
                Obj.prefix = prefix
                Obj.botname = botname
                handleNeedExec.handleReply(Obj);
                return;
            } catch (error) {
                return api.sendMessage(global.getText('handleReply', 'executeError', error), threadID, messageID);
            }
        }
    };
}