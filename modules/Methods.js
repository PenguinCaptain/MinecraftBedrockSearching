class Methods{
	static genUUID(){
		var ac = "0123456789abcdef";
		　　var id="";
		　　function flen(len){for (let i = 0; i < len; i++) {
			　　　　id += ac.charAt(Math.floor(Math.random() * ac.length));
			　　}}
		flen(8);id+="-";flen(4);id+="-";flen(4);id+="-";flen(4);id+="-";flen(12);
		　　return id;
	}

	static getHost(){
		return require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[0]][1].address;
	}
}

module.exports=Methods;