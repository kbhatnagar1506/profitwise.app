#!/usr/bin/python3
import sys
import os

# Add the project directory to the Python path
sys.path.insert(0, '/home/u222072011/domains/profitwise.app/public_html/')

from app import app as application

if __name__ == "__main__":
    application.run()
