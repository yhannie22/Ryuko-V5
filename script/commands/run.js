module.exports.config = {
	name: "run",
	version: "1.0.2",
	permission: 3,
  prefix: false,
  premium: false,
	credits: "Mirai Team",
	description: "running shell",
	category: "system",
	usages: "[Script]",
	cooldowns: 5,
	dependencies: {
	  "eval": ""
	}
};


module.exports.run = async function ({ api, args, event, getText}) {
  const {removeHomeDir} = global.utils;
	function output(msg) {
		if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
			msg = msg.toString();
		else if (msg instanceof Map) {
			let text = `Map(${msg.size}) `;
			text += JSON.stringify(mapToObj(msg), null, 2);
			msg = text;
		}
		else if (typeof msg == "object")
			msg = JSON.stringify(msg, null, 2);
		else if (typeof msg == "undefined")
			msg = "undefined";

		api.sendMessage(msg, event.threadID, event.messageID);
	}
	function out(msg) {
		output(msg);
	}
	function mapToObj(map) {
		const obj = {};
		map.forEach(function (v, k) {
			obj[k] = v;
		});
		return obj;
	}
	const cmd = `(async () => {
		try {
			${args.join(" ")}
		}
		catch(err) {
			console.log("run command" + err);
			api.sendMessage(
				"having some unexpected error\\n" +
				(err.stack ?
					removeHomeDir(err.stack) :
					removeHomeDir(JSON.stringify(err, null, 2) || ""), event.threadID, event.messageID)
			);
		}
	})()`;
	eval(cmd);
}