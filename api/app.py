import settings

from os import getenv

from flask import Flask, request, make_response
from flask_cors import CORS
from time import strftime
from bson import json_util
from flask.json import JSONEncoder
from werkzeug.exceptions import HTTPException

from utils import logger, send_resp, CustomJSONEncoder

from apis import Authentication, Notes, Export

app = Flask(__name__)
CORS(app)

app.json_encoder = CustomJSONEncoder

app.config['ENV'] = getenv("PYTHON_ENV")
app.config['DEBUG'] = getenv("FLASK_DEBUG")
app.config['TESTING'] = getenv("FLASK_TESTING")

app.register_blueprint(Authentication, url_prefix="/research-notes/api/v1/auth")
app.register_blueprint(Notes, url_prefix="/research-notes/api/v1/notes")
app.register_blueprint(Export, url_prefix="/research-notes/api/v1/export")

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
def handle_error(e):
  code = 500
  logger.exception(e)
  if isinstance(e, HTTPException):
    code = e.code
  return make_response(send_resp(code, str(e)), code)