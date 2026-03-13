import azure.functions as func
import logging
import json
import os
import re
from azure.communication.email import EmailClient

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@app.route(route="send-email", methods=["POST"])
def send_email(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        req_body = req.get_json()
    except ValueError:
        return func.HttpResponse("Invalid JSON", status_code=400)

    full_name = req_body.get('fullName')
    email = req_body.get('email')
    event_type = req_body.get('eventType')
    event_date = req_body.get('eventDate')
    vision = req_body.get('vision')

    # Basic Validation
    if not all([full_name, email, event_type, event_date, vision]):
        return func.HttpResponse(
            "Missing required fields: fullName, email, eventType, eventDate, vision",
            status_code=400
        )

    if not is_valid_email(email):
        return func.HttpResponse("Invalid email format", status_code=400)

    # Azure Communication Services Configuration
    connection_string = os.getenv("ACS_CONNECTION_STRING")
    sender_address = os.getenv("SENDER_ADDRESS")
    recipient_address = "azevents001@gmail.com"

    if not connection_string or not sender_address:
        logging.error("ACS_CONNECTION_STRING or SENDER_ADDRESS environment variables are not set.")
        return func.HttpResponse("Internal Server Error", status_code=500)

    try:
        email_client = EmailClient.from_connection_string(connection_string)

        message = {
            "content": {
                "subject": f"New Event Inquiry from {full_name}",
                "plainText": f"""
                New Event Inquiry Details:
                ---------------------------
                Full Name: {full_name}
                Email: {email}
                Event Type: {event_type}
                Event Date: {event_date}
                
                Client Vision:
                {vision}
                """,
                "html": f"""
                <html>
                    <body>
                        <h2 style="color: #C5A059;">New Event Inquiry</h2>
                        <p><strong>Full Name:</strong> {full_name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Event Type:</strong> {event_type}</p>
                        <p><strong>Event Date:</strong> {event_date}</p>
                        <br/>
                        <p><strong>Client Vision:</strong></p>
                        <p style="white-space: pre-wrap;">{vision}</p>
                    </body>
                </html>
                """
            },
            "recipients": {
                "to": [{"address": recipient_address}]
            },
            "senderAddress": sender_address
        }

        poller = email_client.begin_send(message)
        result = poller.result()
        
        logging.info(f"Email sent successfully. Message ID: {result['messageId']}")
        
        return func.HttpResponse(
            json.dumps({"message": "Inquiry sent successfully"}),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"Error sending email: {str(e)}")
        return func.HttpResponse(f"Failed to send inquiry: {str(e)}", status_code=500)
