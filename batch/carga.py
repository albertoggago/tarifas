#!/usr/bin/env python

import json
import pprint
from pymongo import MongoClient

client = MongoClient("localhost:27017")
client.db = client["tarifas"]

def main():
	filepath = '../data/precios.v00.07.json'
	file_a = open(filepath, 'r')
	data = file_a.read()
	objeto = json.loads(data)
	#pprint.pprint(objeto.keys())
	config = {}
	for elemento in objeto.keys():
		if elemento == "tabla":
			for elemento_lista in objeto[elemento]:
				pprint.pprint(elemento_lista["nombre"])
				pprint.pprint(elemento_lista["compania"])
				elemento_lista["_id"] = elemento_lista["compania"] + " " +elemento_lista["nombre"]
				pprint.pprint(elemento_lista["_id"])
				#pprint.pprint(elemento_lista)
		else: 
			config[elemento] = objeto.get(elemento,"")
	pprint.pprint("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
	pprint.pprint(config.keys())
	pprint.pprint(config)


	print "fin"


if __name__ == "__main__":
	main()