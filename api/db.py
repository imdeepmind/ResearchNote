from os import getenv
from pymongo import MongoClient

from utils import logger

try:
	print("Connecting with the db...")
	client = MongoClient(getenv("MONGO_URI"))
	db = client[getenv("MONGO_DB_NAME")]
	print("Connected with the db...")

	# All Collections
	Users = db["Users"]
	Notes = db["Notes"]

	Users.create_index('email', unique=True)
	Notes.create_index('email')

except Exception as ex:
	logger.exception(ex)
	print("Can not initialize a DB connection")
	exit()