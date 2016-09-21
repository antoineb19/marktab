import yaml
import sys
import re

TOKEN_EMPTY = '___'
TOKEN_OPEN = '|'
TOKEN_CLOSE = '&'
TOKEN_CHORD = '$'
CHORD_PLACE_TEXT = '<span class="chord-place text-chord-place" id="place:%d:%s">'
CHORD_PLACE_EMPTY = '<span class="chord-place empty-chord-place" id="place:%d:%s">'
SPAN_CLOSE = '</span>'

def formatVerse(verse, v, cmax):

	result = verse.replace('<>', TOKEN_EMPTY).replace('<',TOKEN_OPEN).replace('>',TOKEN_CLOSE).replace(TOKEN_OPEN, CHORD_PLACE_TEXT % (v,'$')).replace(TOKEN_CLOSE,SPAN_CLOSE).replace(TOKEN_EMPTY, '%s %s %s' % (CHORD_PLACE_EMPTY % (v,TOKEN_CHORD), TOKEN_EMPTY, SPAN_CLOSE))
	
	for c in range (0,cmax+1):
		result = result.replace('$', '%d'%c,1)
	
	return result

if(len(sys.argv) == 1):
	print "Must provide input yaml file"
else: 
	filename =  "./%s" % sys.argv[1]
	fin=open(filename,'r')
	song = yaml.load(fin)
	
	#TODO : check file consistency

	if(len(sys.argv) > 2):
		outputFileName = "./%s" % sys.argv[2]
		sys.stdout = open(outputFileName, 'w')

	#Header
	header = open("./header.html", 'r')
	print(header.read())
	header.close()

	#Content
	if "title" in song:
		print("\t\t<h1>{0}</h1>".format(song["title"]))
	if "author" in song:
		print("\t\t<h2>{0}</h2>".format(song["author"]))
	if "year" in song:
		print("\t\t<h3>{0}</h3>".format(song["year"]))
	v=-1
	for part in song["sequence"]:
		lyrics = part["lyrics"]
		chords = part["chords"]
		verses = lyrics.split("\n")
		
		
		if "index" in part:
			print("\t\t<p>%s %d</br>" % (part["type"], part["index"]))
		else: 
			print("\t\t<p>%s</br>" % part["type"])		
			
		for i in range(0,len(verses)-1):
			v+=1
			verse = verses[i]
			verseChords = chords[i]
			c=-1
			for chord in verseChords: 
				c+=1
				print("\t\t\t<span class=\"chord\" id=\"chord:%d:%d\">%s</span> " % (v, c, chord.encode('utf-8')))
			print("\t\t\t</br>")
			if len(verse) != 0:
				print("\t\t\t{0}</br>".format(formatVerse(verse, v, c)))
		print("\t\t</p>")
	
	#Footer
	footer = open("./footer.html", 'r')
	print(footer.read())
	footer.close()


