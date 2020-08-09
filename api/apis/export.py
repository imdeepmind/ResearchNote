from flask import Blueprint, request, make_response

from utils import send_resp, logger
from authentication import Authentication
from export import Export

export_api = Blueprint('export_api', __name__)
authentication = Authentication()
export = Export()

@export_api.route("/", methods=["GET"])
def get_all_data():
  token = request.headers.get("Authorization")

  valid, token_data = authentication.check_token(token)

  if not valid:
    return make_response(send_resp(401, "Invalid authorization token"), 401)
  
  email = token_data["email"]

  try:
    result = export.export(email)
  
    return make_response(send_resp(200, "", result), 200)
  except Exception as ex:
    logger.exception(ex)
    return make_response(send_resp(500, "Something went wrong with the server"), 500)
