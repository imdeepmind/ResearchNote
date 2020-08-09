from os import getenv

from flask import Flask, request, make_response
from flask_cors import CORS
from time import strftime
from bson import json_util
from flask.json import JSONEncoder

from utils import logger, send_resp, CustomJSONEncoder

from apis import Authentication, Notes

app = Flask(__name__)
CORS(app)

app.json_encoder = CustomJSONEncoder

app.config['ENV'] = getenv("PYTHON_ENV")
app.config['DEBUG'] = getenv("FLASK_DEBUG")
app.config['TESTING'] = getenv("FLASK_TESTING")

app.register_blueprint(Authentication, url_prefix="/api/v1/auth")
app.register_blueprint(Notes, url_prefix="/api/v1/notes")

@app.after_request
def after_request(response):
  if response.status_code != 500:
    ts = strftime('[%Y-%b-%d %H:%M]')
    logger.info('%s %s %s %s %s %s',
                ts,
                request.remote_addr,
                request.method,
                request.scheme,
                request.full_path,
                response.status)
  return response

@app.errorhandler(Exception) 
def handle_error(error):
  logger.exception(error)
  return make_response(send_resp(500, "Something went wrong with the server"), 500)