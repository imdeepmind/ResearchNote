from flask.json import JSONEncoder
from bson import json_util

class CustomJSONEncoder(JSONEncoder):
  def default(self, obj): return json_util.default(obj)