from flask import jsonify

def send_resp(code, message, data=None):
  return jsonify({
    'statusCode': code,
    'message': message,
    'data': data
  })
