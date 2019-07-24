class PackageProcess{
	constructor	(ws,Methods){
		this.ws = ws
		this.Methods = Methods
	}

	SendCommand(cmd){
		let uuid = genUUID();
		this.ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": cmd,
				"version": 1
			},
			"header": {
				"requestId": uuid,
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}
	SendNCommand(cmd){
		this.ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": cmd,
				"version": 1
			},
			"header": {
				"requestId": "00000000-0001-1000-ffff-000000000000",
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}
	SendText(msg){
		this.SendNCommand("say " + msg);
	}
	subscribe(ev){
		this.ws.send(JSON.stringify({
	"body": {
		"eventName": ev
	},
	"header": {
		"requestId": this.Methods.genUUID(),
		"messagePurpose": "subscribe",
		"version": 1,
		"messageType": "commandRequest"
	}}));
	}
}

module.exports=PackageProcess;