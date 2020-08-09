from os import getenv
import logging

# Setting a logger
logger = logging.getLogger(__name__)

# Setting the log level
if getenv("PYTHON_ENV") == "development":
    logger.setLevel(logging.DEBUG)
else:
    logger.setLevel(logging.WARNING)

# Setting the log message format
formatter = logging.Formatter(
    "%(levelname)s : %(asctime)s : %(filename)s : %(message)s")

# Setting file handler for the log
file_handler = logging.FileHandler(getenv("LOG_FILE"))

if getenv("PYTHON_ENV") == "development":
    file_handler.setLevel(logging.DEBUG)
else:
    file_handler.setLevel(logging.WARNING)

file_handler.setFormatter(formatter)

# Setting stream handler for the log
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)

# Adding the two handlers for the logger
logger.addHandler(file_handler)
logger.addHandler(stream_handler)