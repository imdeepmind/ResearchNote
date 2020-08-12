from time import time
from db import Notes as NotesDB

from bson.objectid import ObjectId

class Notes:
  def __init__(self):
    self.__collection = NotesDB
  
  def create_note(self, email, title):
    return self.__collection.insert_one({
      'email': email, 
      'title': title,
      'created_at': int(time()),
      'updated_at': None
    })

  def update_note(self, email, id, title, content):
    return self.__collection.find_one_and_update({'email': email, '_id': ObjectId(id)}, {'$set': {
      'email': email,
      'title': title,
      'content': content,
      'updated_at': int(time())
    }})
  
  def delete_note(self, email, id):
    return self.__collection.find_one_and_delete({'email': email, '_id': ObjectId(id)})
  
  def get_specific_note(self, email, id):
    return self.__collection.find_one({'email': email, '_id': ObjectId(id)})
  
  def get_all_notes(self, email, last_id, page_size):
    if last_id is None:
      cursor = self.__collection.find({'email': email}).limit(int(page_size))
    else:
      cursor = self.__collection.find({'email': email, '_id': {'$gt': ObjectId(last_id)}}).limit(int(page_size))

    data = [x for x in cursor]

    return data

  def search_notes(self, email, key):
    query = {'email': email, '$text': { '$search': key }}
    project = {'score': { '$meta': "textScore" }}
    sort = [('score', { '$meta': "textScore" })]

    cursor = self.__collection.find(query, project).sort(sort).limit(100)

    return [x for x in cursor]
