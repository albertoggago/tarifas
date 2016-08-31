#!/usr/bin/env python

import json
import pprint
from pymongo import MongoClient


def main():
	client = MongoClient("localhost:27017")
	client.drop_database("tarifas")
	client.db = client["tarifas"]
	filepath = '../data/precios.v00.07.json'
	file_a = open(filepath, 'r')
	data = file_a.read()
	objeto = json.loads(data)
	#pprint.pprint(objeto.keys())
	config = {}
	for elemento in objeto.keys():
		if elemento == "tabla":
			for elemento_lista in objeto[elemento]:
				#pprint.pprint(elemento_lista["nombre"])
				elemento_lista["_id"] = elemento_lista["compania"] + " " +elemento_lista["nombre"]
				#pprint.pprint(elemento_lista)
				elemento_lista.pop("$$hashKey", None)
				try:
					client.db.tarifas.insert_one(elemento_lista)
				except:
					print "error al insertar "+elemento_lista
				#pprint.pprint(elemento_lista["_id"])
				#pprint.pprint(elemento_lista)
		else: 
			config[elemento] = objeto.get(elemento,"")
	#pprint.pprint("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
	#pprint.pprint(config.keys())
	try:
		client.db.config.insert_one(config)
	except:
		print "error al insertar "+config
	#pprint.pprint(config)


	print "fin"


if __name__ == "__main__":
	main()