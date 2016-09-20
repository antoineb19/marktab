import yaml
import sys

if(len(sys.argv) == 1):
	print "Must provide input yaml file"
else: 
	filename =  "./%s" % sys.argv[1]
	fin=open(filename,'r')
	song = yaml.load(fin)

	if(len(sys.argv) > 2):
		outputFileName = "./%s" % sys.argv[2]
		sys.stdout = open(outputFileName, 'w')

	#Header
	header = open("./header.html", 'r')
	print(header.read())
	header.close()

	#Content
	if song["title"]:
		print("\t\t<h1>{0}</h1>".format(song["title"]))
	if song["author"]:
		print("\t\t<h2>{0}</h2>".format(song["author"]))
	if song["year"]:
		print("\t\t<h3>{0}</h3>".format(song["year"]))
	for part in song["sequence"]:
		lyrics = part["lyrics"]
		chords = part["chords"]
		verses = lyrics.split("\n")
		print("\t\t<p>")
		for i in range(0,len(verses)-1):
			verse = verses[i]
			verseChords = chords[i]
			for chord in verseChords: 
				print("\t\t\t{0} ".format(chord.encode('utf-8')))
			print("\t\t\t</br>")
			if len(verse) != 0:
				print("\t\t\t{0}</br>".format(verse))
		print("\t\t</p>")
	
	#Footer
	footer = open("./footer.html", 'r')
	print(footer.read())
	footer.close()
