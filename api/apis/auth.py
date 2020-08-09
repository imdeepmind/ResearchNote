from flask import Blueprint, request, make_response

from utils import send_resp, logger
from authentication import Authentication

auth_api = Blueprint('auth_api', __name__)

@auth_api.route("/google", methods=["POST"])
def google_login():
  data = request.json

  if "access_token" not in data:
    errors.append({
      'field': 'access_token',
      'error': 'Please provide a valid google token'
    })

  try:
      result = authentication.google_login(data["access_token"])

      return make_response(send_resp(200, "Logged in", result), 200)
  except ValueError as ex:
      return make_response(send_resp(400, str(ex)), 400)
  except Exception as ex:
      logger.exception(ex)
      return make_response(send_resp(500, "Something went wrong with the server"), 500)
