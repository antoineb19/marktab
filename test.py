#!/usr/bin/env python
# -*- coding: utf-8 -*-

from lxml import etree

tree = etree.parse("./songs/sympathy.xml")

for lyrics in tree.xpath("/song/parts/part/s"):
    print(lyrics.text)
