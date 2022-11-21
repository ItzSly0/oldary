let serverIp = "oldary.ga";
getServerStatus("oldary.ga" , "card-server-status1", ".server-online1");
getServerStatus("oldary.ga" , "card-server-status2", ".server-online2");
getServerStatus("off" , "card-server-status3", ".server-online3");
getServerStatus("off" , "card-server-status4", ".server-online4");
getServerStatus("off" , "card-server-status5", ".server-online5");
document.getElementById("server-ip-highlight").textContent=serverIp;
function copyText() {
	var data = [new ClipboardItem({ "text/plain": new Blob([serverIp], { type: "text/plain" }) })];
	navigator.clipboard.write(data).then();
	document.getElementById("server-ip-highlight").textContent="IP copied!";
	setTimeout(function() { document.getElementById("server-ip-highlight").textContent=serverIp; }, 1000);
}
let links = document.getElementsByTagName("a");
Array.prototype.forEach.call(links, function(elem, index) {
    let elemAttr = elem.getAttribute("href");
    if (elemAttr && elemAttr.includes("#")) {
        elem.addEventListener("click", function(ev) {
            ev.preventDefault();
            document.getElementById(elemAttr.replace(/#/g, "")).scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
        });
    }
});
function serverOn(cardId){
	document.getElementById(cardId).className += " card-background-color-On";
}
function serverOff(cardId){
	document.getElementById(cardId).className += " card-background-color-Off";
}
function getServerStatus (serverIpStatus, cardServerId, cardServerClass){
	MinecraftAPI.getServerStatus(serverIpStatus, {
	        port: 25565 // optional, only if you need a custom port
	      }, function (err, status) {
	        if (err) {
	        	serverOff(cardServerId);
	        	return document.querySelector(cardServerClass).innerHTML = '<span class="server-icon-status"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M8.46 14.12a1 1 0 101.42 1.42l5.66-5.66a1 1 0 10-1.42-1.42l-5.66 5.66z"/><path fill="currentColor" fill-rule="evenodd" d="M6.34 17.66A8 8 0 1017.66 6.34 8 8 0 006.34 17.66zm9.9-1.42a6 6 0 11-8.48-8.48 6 6 0 018.48 8.48z" clip-rule="evenodd"/></svg></span>Offline!';
	        }
	        document.querySelector(cardServerClass).innerHTML = status.online ? serverOn(cardServerId) : serverOff(cardServerId);
	        document.querySelector(cardServerClass).innerHTML = status.online ? '<span class="server-icon-status"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M10.59 13.41L7.76 10.6 6.34 12l4.25 4.24 7.07-7.07-1.42-1.41-5.65 5.65z"/></svg></span>Online!' : '<span class="server-icon-status"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M8.46 14.12a1 1 0 101.42 1.42l5.66-5.66a1 1 0 10-1.42-1.42l-5.66 5.66z"/><path fill="currentColor" fill-rule="evenodd" d="M6.34 17.66A8 8 0 1017.66 6.34 8 8 0 006.34 17.66zm9.9-1.42a6 6 0 11-8.48-8.48 6 6 0 018.48 8.48z" clip-rule="evenodd"/></svg></span>Offline!';
	});
}