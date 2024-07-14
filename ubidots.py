import time
import requests
import random
from datetime import datetime

TOKEN = "BBUS-8HLdoXmIzsPcMMs9I4f2t8F9uLpZpZ" 
DEVICE_LABEL = "Salle1"
VARIABLE_LABEL_1 = "temperature" 
VARIABLE_LABEL_2 = "bruit" 
VARIABLE_LABEL_3 = "eclairage" 


def build_payload(variable_1, variable_2, variable_3):
    # Creates three random values for sending data
    value_1 = random.randint(-10, 50)
    value_2 = random.randint(0, 85)
    value_3 = random.randint(0, 1023)

    payload = {
        variable_1: value_1,
        variable_2: value_2,
        variable_3: value_3,
        "timestamp": datetime.now().isoformat()
    }

    return payload


def post_request(payload):
    # Creates the headers for the HTTP requests
    url = "https://industrial.api.ubidots.com"
    url = "{}/api/v1.6/devices/{}".format(url, DEVICE_LABEL)
    headers = {"X-Auth-Token": TOKEN, "Content-Type": "application/json"}

    # Makes the HTTP requests
    status = 400
    attempts = 0
    while status >= 400 and attempts <= 5:
        req = requests.post(url=url, headers=headers, json=payload)
        status = req.status_code
        attempts += 1
        time.sleep(1)

    # Processes results
    print(req.status_code, req.json())
    if status >= 400:
        print("[ERROR] Could not send data after 5 attempts, please check your token credentials and internet connection")
        return False

    print("[INFO] Request made properly, your device is updated")
    return True


def main():
    payload = build_payload(VARIABLE_LABEL_1, VARIABLE_LABEL_2, VARIABLE_LABEL_3)
    print("[INFO] Attempting to send data")
    post_request(payload)
    print("[INFO] Finished")


if __name__ == '__main__':
    while True:
        main()
        time.sleep(1)
