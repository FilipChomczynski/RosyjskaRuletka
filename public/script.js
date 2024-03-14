let connect = io('ws://localhost:3000');

connect.on('connect', ()=>{
	window.localStorage.setItem("id", connect.id)
    console.log("Połączono", connect.id)
});

connect.on('result', (res)=>{
    if (res[0] == "lost") {
    	
		if (window.localStorage.getItem("id") == res[1]) {
			console.log("przegrales");
		} else {
			console.log("wygrales");
		}
    }
    if (res[0] == "survive") {
		if (window.localStorage.getItem("id") == res[1]) {
			console.log("zyjesz");
		}
    }
});

connect.on('turn', (res)=>{
	if (window.localStorage.getItem("id") === res) {
		document.querySelector("#tura").innerHTML = "twoja tura";
	}
	else if (window.localStorage.getItem("id") != res){
		document.querySelector("#tura").innerHTML = "tura przeciwnika";
	}
})


document.querySelector("#trigger-button").addEventListener("click", ()=>{
	connect.emit("pull-trigger");
});

document.querySelector("#place-bullet").addEventListener("click", ()=>{
	connect.emit("place-bullet");
});
