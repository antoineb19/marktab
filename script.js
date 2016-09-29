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

	verses.forEach(function(verse){
        	verse.forEach(function(chordItem){
               		var chordElement = chordItem.chord;
			chordElement.style.position = "absolute";
        	});
    	});

	translate();
	decal();
}

function translate(){
	verses.forEach(function(verse){
        	verse.forEach(function(chordItem){
            		var chordElement = chordItem.chord;
		        var placeElement = chordItem.place;
            		chordElement.innerHTML = translateFrench(chordElement.innerHTML);
        	});
    	});
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
    var c = true;
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
