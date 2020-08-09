from time import time
from db import Notes

class Notes:
  def __init__(self):
    self.__collection = Notes
  
  def create_note(self, email, title):
    return self.__collection.insert_one({
      'email': email, 
      'title': title,
      'created_at': int(time()),
      'updated_at': None
    })

  def update_note(self, email, id, title, content):
    return self.__collection.find_one_and_update({'email': email, '_id': id}, {'$set': {
      'email': email,
      'title': title,
      'content': content,
      'updated_at': int(time())
    }})
  
  def delete_note(self, email, id):
    return self.__collection.find_one_and_delete({'email': email, '_id': id})
  
  def get_specific_note(self, email, id):
    return self.__collection.find_one({'email': email, '_id': id})
  
  def get_all_notes(self, email, last_id, page_size):
    if last_id is None:
      cursor = self.__collection.find({'email': email}).limit(page_size)
    else:
      cursor = self.__collection.find({'email': email, '_id': {'$gt': last_id}}).limit(page_size)

    data = [x for x in cursor]

    return data
  
