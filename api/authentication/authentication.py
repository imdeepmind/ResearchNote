import requests
import jwt

from db import db
from time import time

class Authentication:
  def __init__(self):
      self.collection = db["Users"]

  def __check_user(self, email):
    result = self.collection.count_documents({'email': email})

    if result > 0:
      return True

    return False
  
  def __delete_account(self, email):
    return self.collection.find_one_and_delete({'email': email})
  
  def __delete_all_notes(self, email):
    notes_collection = db["Notes"]

    return notes_collection.find_one_and_delete({'email': email})
  
  def __set_user(self, email, data):
    return self.collection.find_one_and_update({'email': email}, {'$set': data}, upsert=True).inserted_id

  def __sign_jwt(self, email, _id):
    return jwt.encode({'email': email, '_id': str(_id)}, os.getenv("JWT_SECRET")).decode("ascii")

  def google_login(self, access_token):
    # Sending a req to google server
    headers = {'Authorization': 'OAuth '+access_token}

    req = requests.get(
        'https://www.googleapis.com/oauth2/v1/userinfo', headers=headers)

    google_resp = loads(req.text)

    if "error" in google_resp:
        raise ValueError("Invalid access token")

    # Data from google server
    google_data = {
      'firstName': google_resp["given_name"],
      'lastName': google_resp["family_name"],
      'email': google_resp["email"],
      'dp': google_resp["picture"],
    }

    # Checking if user exists or not
    if self.__check_user(email):
      google_data["updated_at"] = int(time())
    else:
      google_data["created_at"] = int(time())

    # Saving or updating google data
    _id = self.__set_user(google_data["email"], google_data)

    # Generating JWT token
    token = self.__sign_jwt(email, _id)

    # Returning from the function
    return token
  
  def delete_account(self, email):
    self.__delete_account()
    self.__delete_all_notes()

    return True