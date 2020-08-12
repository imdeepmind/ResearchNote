from flask import Blueprint, request, make_response

from utils import send_resp, logger
from notes import Notes
from authentication import Authentication

notes_api = Blueprint('notes_api', __name__)
notes = Notes()
authentication = Authentication()

@notes_api.route("/<id>", methods=["GET"])
def get_note(id):
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  try:
    result = notes.get_specific_note(email, id)

    if result:
      return make_response(send_resp(200, "", result), 200)
    else:
      return make_response(send_resp(404, "Note not available"), 404)

  except Exception as ex:
    logger.exception(ex)
    return make_response(send_resp(500, "Something went wrong with the server"), 500)

@notes_api.route("/<limit>/", defaults={'last_id': None}, methods=["GET"])
@notes_api.route("/<limit>/<last_id>", methods=["GET"])
def get_notes(last_id, limit):
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  try:
    result = notes.get_all_notes(email, last_id, limit)

    if result:
      return make_response(send_resp(200, "", result), 200)
    else:
      return make_response(send_resp(404, "Notes not available"), 404)

  except Exception as ex:
    logger.exception(ex)
    return make_response(send_resp(500, "Something went wrong with the server"), 500)

@notes_api.route("/", methods=["POST"])
def create_note():
  data = request.json
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  errors = []

  if "title" not in data:
    errors.append({
      'field': 'title',
      'error': 'Please provide a valid title'
    })
  
  if len(errors) > 0:
    return make_response(send_resp(400, "Input validation failed", data={'errors': errors}), 400)

  try:
      result = notes.create_note(email,data["title"])

      return make_response(send_resp(200, "New note added in"), 200)
  except ValueError as ex:
      return make_response(send_resp(400, str(ex)), 400)
  except Exception as ex:
      logger.exception(ex)
      return make_response(send_resp(500, "Something went wrong with the server"), 500)

@notes_api.route("/<id>", methods=["PUT"])
def update_note(id):
  data = request.json
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  errors = []

  if "title" not in data:
    errors.append({
      'field': 'title',
      'error': 'Please provide a valid title'
    })
  
  if "content" not in data:
    errors.append({
      'field': 'content',
      'error': 'Please provide a valid content'
    })
  
  if len(errors) > 0:
    return make_response(send_resp(400, "Input validation failed", data={'errors': errors}), 400)

  try:
      result = notes.update_note(email, id, data["title"], data["content"])

      return make_response(send_resp(200, "Logged in", result), 200)
  except ValueError as ex:
      return make_response(send_resp(400, str(ex)), 400)
  except Exception as ex:
      logger.exception(ex)
      return make_response(send_resp(500, "Something went wrong with the server"), 500)

@notes_api.route("/<id>", methods=["DELETE"])
def delete_note(id):
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  try:
    result = notes.delete_note(email, id)

    return make_response(send_resp(204, "Note deleted"), 204)
    
  except Exception as ex:
    logger.exception(ex)
    return make_response(send_resp(500, "Something went wrong with the server"), 500)
  
@notes_api.route("/search/<key>", methods=["GET"])
def search(key):
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  try:
    result = notes.search_notes(email, key)

    return make_response(send_resp(200, "Here is the search results", data=result), 200)
    
  except Exception as ex:
    logger.exception(ex)
    return make_response(send_resp(500, "Something went wrong with the server"), 500)