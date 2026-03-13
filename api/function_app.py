import azure.functions as func
import os
import json
from azure.communication.email import EmailClient

app = func.FunctionApp()

@app.route(route="send-email", auth_level=func.AuthLevel.ANONYMOUS)
def send_email(req: func.HttpRequest) -> func.HttpResponse:
    try:
        # 1. Get the form data from Angular
        req_body = req.get_json()
        
        # 2. Get secrets from Azure Environment Variables
        connection_string = os.getenv("ACS_CONNECTION_STRING")
        sender_address = os.getenv("SENDER_ADDRESS")
        
        if not connection_string or not sender_address:
            return func.HttpResponse("Configuration missing", status_code=500)

        # 3. Initialize Client
        client = EmailClient.from_connection_string(connection_string)

        # 4. Construct the Email
        message = {
            "senderAddress": sender_address,
            "content": {
                "subject": f"New Event Inquiry from {req_body.get('fullName', 'Client')}",
                "plainText": f"Event: {req_body.get('eventType')}\nDate: {req_body.get('eventDate')}\nVision: {req_body.get('vision')}",
                "html": f"<html><body><h2>New Inquiry</h2><p><b>Name:</b> {req_body.get('fullName')}</p><p><b>Type:</b> {req_body.get('eventType')}</p></body></html>"
            },
            "recipients": {
                "to": [{"address": "azevents001@gmail.com"}]
            }
        }

        # 5. Send and return immediate success
        client.begin_send(message)
        
        return func.HttpResponse(
            json.dumps({"message": "Inquiry received successfully"}),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as e:
        # This will now show the actual error in your browser console
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            status_code=500,
            mimetype="application/json"
        )
