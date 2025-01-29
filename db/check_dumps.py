# This script simply removes dump files older than 7 days

import os
import time

DUMPS_FOLDER = os.path.join(os.getcwd(), "dumps")

DAYS_TO_KEEP = 7

now = time.time()
limit_time = now - (DAYS_TO_KEEP * 86400)

for filename in os.listdir(DUMPS_FOLDER):
    file_path = os.path.join(DUMPS_FOLDER, filename)

    if os.path.isfile(file_path):

        file_modified_time = os.path.getmtime(file_path)

        if file_modified_time < limit_time:
            print(f"Deleting {file_path}...")
            os.remove(file_path)

print("Cleaning done.")