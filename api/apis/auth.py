from flask import Blueprint, request, make_response

from utils import send_resp, logger
from authentication import Authentication

from validator import validate

auth_api = Blueprint('auth_api', __name__)
authentication = Authentication()

@auth_api.route("/", methods=["GET"])
def get_user():
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  try:
    result = authentication.get_user(email)

    if result:
      return make_response(send_resp(200, "", result), 200)
    else:
      return make_response(send_resp(404, "User not available"), 404)

  except Exception as ex:
    logger.exception(ex)
    return make_response(send_resp(500, "Something went wrong with the server"), 500)

@auth_api.route("/google", methods=["POST"])
def google_login():
  data = request.json

  is_invalid, errors, data = validate([{'type': 'access_token', 'name': 'access_token'}], data)

  if is_invalid:
    return make_response(send_resp(400, "Input validation failed", data={'errors': errors, 'data': data}), 400)

  try:
      result = authentication.google_login(data["access_token"])

      return make_response(send_resp(200, "Logged in", {"token": result}), 200)
  except ValueError as ex:
      return make_response(send_resp(400, str(ex)), 400)
  except Exception as ex:
      logger.exception(ex)
      return make_response(send_resp(500, "Something went wrong with the server"), 500)


@auth_api.route("/", methods=["DELETE"])
def delete_user():
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  try:
    result = authentication.delete_account(email)

    return make_response(send_resp(204, "Account deleted"), 204)
    
  except Exception as ex:
    logger.exception(ex)
    return make_response(send_resp(500, "Something went wrong with the server"), 500)