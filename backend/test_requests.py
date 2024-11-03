import requests

BASE_URL = "http://127.0.0.1:5000"

def test_signup(email, password):
    response = requests.post(f"{BASE_URL}/auth/signup", json={"email": email, "password": password})
    print("Status Code:", response.status_code)
    print("Raw Response:", response.text) 
    try:
        response_data = response.json()
        if response.status_code == 201:
            print("Signup Successful:", response_data)
        else:
            print("Signup Failed:", response_data)
    except requests.exceptions.JSONDecodeError:
        print("Response is not JSON format")
        print("Raw Response:", response.text)

def test_login(email, password):
    url = f"{BASE_URL}/auth/login"
    payload = {"email": email, "password": password}
    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Raw Response:", response.text)
    if response.status_code == 200:
        token = response.json()["access_token"]
        print("Login Success, Token:", token)
        return token
    else:
        print("Login Failed:", response.json())
        return None

def test_protected_route(token):
    url = f"{BASE_URL}/api/lists"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    print("Status Code:", response.status_code)
    print("Response:", response.json())


def test_create_task(token, list_id, task_name, due_date=None, priority=None, status="To-Do"):
    url = f"{BASE_URL}/api/lists/{list_id}/tasks"
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "name": task_name,
        "dueDate": due_date, 
        "priority": priority,
        "status": status
    }
    response = requests.post(url, json=payload, headers=headers)
    
    # Print the response details
    print("Status Code:", response.status_code)
    try:
        response_data = response.json()
        if response.status_code == 201:
            print("Task Created Successfully:", response_data)
        else:
            print("Task Creation Failed:", response_data)
    except requests.exceptions.JSONDecodeError:
        print("Response is not in JSON format")
        print("Raw Response:", response.text)

# Testing
email = "test@example.com"
password = "password123"
test_signup(email, password)
token = test_login(email, password)
if token:
    test_protected_route(token)
    list_id = 2 
    task_name = "Sample Task"
    due_date = "2024-11-02T10:00:00" 
    priority = "high"
    test_create_task(token, list_id, task_name, due_date, priority)
