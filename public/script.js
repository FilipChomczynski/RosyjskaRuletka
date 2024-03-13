let connect = io('ws://localhost:8080');
connect.on('connect', ()=>{
    console.log("Połączono", connect.id)
    window.localStorage.setItem("id", connect.id)
});

connect.on('result', (res)=>{
    if (res == "lost") {
    	console.log("zdechles");
    }
    if (res == "survive") {
    	console.log("zyjesz");
    }
});

connect.on('turn', (res)=>{
	if (window.localStorage.getItem("id") == res) {
		document.querySelector("#tura").innerHTML = "twoja tura";
	}
	else {
		document.querySelector("#tura").innerHTML = "tura przeciwnika";
	}
	document.querySelector("#tura").innerHTML += res;
})


document.querySelector("#trigger-button").addEventListener("click", ()=>{
	connect.emit("pull-trigger");
});

document.querySelector("#place-bullet").addEventListener("click", ()=>{
	connect.emit("place-bullet");
});
