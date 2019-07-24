const Methods = require("./modules/Methods");
const ID=new (require("./modules/id"))();
const PackageProcess = require("./modules/PkgProc.js")
const Websocket = require('ws');
const wss = new Websocket.Server({ port: 19312 });
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


function getResults(keyword,PkgProc){
		(async () => {
  		const browser = await puppeteer.launch();
  		const page = await browser.newPage();
  		await page.goto('https://www.baidu.com/s?wd=1' + keyword);
  		const content = await page.content();

  		const $ = cheerio.load(content, { decodeEntities: false });
  		$('.result.c-container').each((index, el) => {
    		 console.log($(el).find('h3 a').text());
    		 PkgProc.SendText($(el).find('h3 a').text());

    	});

  		await browser.close();
		})();	
}

class MCSearch{
	PrintInfo(){
		console.log("MCSearch");
		console.log("By Penguin_Captain");
	}
	contructor(){
		this.PrintInfo();
		try{
			console.log("Server Opened on %s:19312",Methods.getHost());
		} catch (e) {

		}

	}
	async onMessage(message,PkgProc){
		if (message == "") return;
		let packet;
		try{
			packet=JSON.parse(message);
		} catch(error){
			console.log("Error! Parse packet %s",error);
			try{PkgProc.sendText("Bad Packet!");PkgProc.SendNCommand("closewebsocket");ws.terminate();}catch(undefined){try{ws.terminate();}catch(undefined){}}
		}
		if(packet.body.eventName == "PlayerMessage" && packet.body.properties.Sender != "外部"){
			var incomingmsg = packet.body.properties.Message
			var incstring = packet.body.properties.Sender.length + 3;
			if (incomingmsg.substring(0,1) == "[") {
				incomingmsg = incomingmsg.substring(incstring);
			}
			if (incomingmsg.substring(0,5) == "baidu"){
				let keyword = incomingmsg.substring(6);
				getResults(keyword,PkgProc);
			}else{
				console.log("Error! Check your Syntax");
				console.log(incomingmsg);
			}
		}
	}

	onConnection(ws,req){
		let wsi=ID.getid(ws);
		const PkgProc = new PackageProcess(ws,Methods);
		console.log("A new client connected,ID: %d,IP: %s",wsi.id,req.connection.remoteAddress);
		PkgProc.subscribe("PlayerMessage");
		PkgProc.SendText("MCSearch Connected.");
		ws.on("message",(message)=>{
			this.onMessage(message,PkgProc);
		});
	}
}
wss.on("connection",onConnection)
const mcsearch = new MCSearch();
mcsearch.contructor();
function onConnection(ws,req){
	mcsearch.onConnection(ws,req);
} 


