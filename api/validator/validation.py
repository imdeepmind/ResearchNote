import re

def is_title(title):
  return True if re.match(r"^[A-Za-z0-9_-]+$", title) else False

def is_note_type(note_type):
  return note_type in("main_note", "sub_note")

def is_access_token(access_token):
  return True if access_token else False

def validate(schema, data):
  errors = {}
  filtered_data = {}

  def add_error(type, message):
    errors[name] = {
      'type': type,
      'error': True,
      'message': message
    }
  for scheme in schema:
    name = scheme['name']
    if scheme["type"] == 'title':
      result = is_title(data[name])

      if not result:
        add_error(scheme["type"], "Please provide a valid title")
      else:
        filtered_data[name] = data[name]

    elif scheme["type"] == 'note_type':
      result = is_note_type(data[name])

      if not result:
        add_error(scheme["type"], "Please provide a valid note type")
      else:
        filtered_data[name] = data[name]
    
    elif scheme["type"] == 'access_token':
      result = is_access_token(data[name])

      if not result:
        add_error(scheme["type"], "Please provide a valid access token")
      else:
        filtered_data[name] = data[name]

  if errors:
    return True, errors, filtered_data
  
  return False, {}, filtered_data