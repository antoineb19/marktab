var verses = [];

function chordId(v,c){
    return "chord:" + v + ":" + c;
}

function placeId(v,c){
    return "place:" + v + ":" + c;
}

function bodyOnloadHandler(e) {
    var verseIndex = 0;
    var element = document.getElementById(chordId(0,0));
    while(element != null){
        var verse = [];

        var chordIndex = 0;
		while(element != null){
			var placeElement = document.getElementById(placeId(verseIndex, chordIndex));
			verse.push({place: placeElement, chord: element});
			chordIndex++;
			element = document.getElementById(chordId(verseIndex, chordIndex));
		}
		verses.push(verse);
		verseIndex++;
		element = document.getElementById(chordId(verseIndex, 0));
    	}

	var h4List = document.querySelectorAll("h4");
	for (var i = 0; i < h4List.length; ++i) {
		translateSectionTitle(h4List[i])
	}

	var index = 0;
	verses.forEach(function(verse){
		var chordDiv = document.getElementById("chords:" + index);
        	verse.forEach(function(chordItem){
			chordItem.chord.style.position = "absolute";
            		var chordElement = chordItem.chord;
			chordElement.onclick = (function(chord){
				return function(e){
					showChord(chordElement, chordDiv, chord);
				};
			})(chordElement.innerHTML);
			chordElement.innerHTML = translateFrench(chordElement.innerHTML);	
        	});
		index++;
    	});
	decal();
}

function decal(){
	verses.forEach(function(verse){
		var prev = 0;
		for(var i = 1 ; i < verse.length ; i++){
			chordItem = verse[i];
           		var chordElement = chordItem.chord;
		        var placeElement = chordItem.place;
			chordElement.style.marginLeft="";
			placeElement.style.marginLeft="";
			previousChord = verse[i-1].chord;
		        chordElement.style.left = (placeElement.offsetLeft + placeElement.offsetWidth/2 - chordElement.offsetWidth/2) + "px";
			left = chordItem.chord.offsetLeft;
			right = previousChord.offsetLeft + previousChord.offsetWidth
			if(left < right){
				var dec = right-left + 10;
				chordItem.chord.style.marginLeft = dec + "px";
				chordItem.place.style.marginLeft = (chordItem.chord.offsetLeft + chordItem.chord.offsetWidth/2 - chordItem.place.offsetWidth/2 - chordItem.place.offsetLeft) + "px";
			}
		}
	});
}

window.onresize = function(event) {
	decal();
};

const TRANSLATE = {
	A: "La",
	B: "Si",
	C: "Do",
	D: "Ré",
	E: "Mi",
	F: "Fa",
	G: "Sol"
};

function translateFrench(chord){
	for(key in TRANSLATE){
		if(chord.indexOf(key) != -1){
			return chord.replace(key, TRANSLATE[key]);
		}
	}
}

function translateSectionTitle(element){
	element.innerHTML = element.innerHTML
		.replace("verse", "Couplet")
		.replace("chorus", "Refrain")
		.replace("coda", "Coda")
		.replace("intro", "Intro")
		.replace("bridge", "Pont");
}

var child;
function flush(){
	if(child){
		console.log(child.parentElement);
		child.parentElement.removeChild(child);
	}
}

function showChord(chordElement, parentElement, chord){
	console.log(chordElement);

	flush();
	
	var div = document.createElement('div');
	child = div;
	div.style.position = "relative";
	div.style.left = chordElement.offsetLeft - parentElement.offsetLeft + chordElement.offsetWidth + 10 + "px";
	div.style.top = 0 - 150 + "px";
	div.style.height = '150px';
	div.style.width = '150px';
	div.style.zIndex = 10;
	div.style.backgroundColor = 'white';
	div.style.borderWidth = "2px";
	div.style.borderStyle = 'solid';
	parentElement.appendChild(div);
	jtab.render(div,chord);
	div.onclick = flush;
}
