from db import Users, Notes

class Export:
  def __init__(self):
    self.__users = Users
    self.__notes = Notes
  
  def export(self, email):
    # TODO: Need to do it in a proper way
    user = self.__users.find_one({'email': email}, {
      '_id': 0
    })

    cursor = self.__notes.find({'email': email}, {
      '_id': 0
    })

    return {
      'user': user,
      'notes': [x for x in cursor]
    }