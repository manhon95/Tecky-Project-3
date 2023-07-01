from speech2test2speech import answer_question_from_url
from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
from env import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
from twilio.rest import Client

import threading

from twilio.twiml.voice_response import VoiceResponse

app = FastAPI()

app.mount("/getAudio", StaticFiles(directory="recordings/output"), name="getAudio")

# ------------------------------- Twilio client ------------------------------ #
account_sid = TWILIO_ACCOUNT_SID
auth_token = TWILIO_AUTH_TOKEN
client = Client(account_sid, auth_token)


@app.post("/")
async def answer_call():
    try:
        resp = VoiceResponse()

        resp.say("Hello. Please leave a message after the beep.")
        resp.record(action="/replay")
        resp.hangup()

        return Response(content=str(resp), media_type="text/xml")
    except Exception as e:
        print(e)


@app.post("/replay")
async def answer_call(request: Request):
    req = await request.form()
    input_recording_url = req['RecordingUrl']
    call_sid = req['CallSid']

    print(input_recording_url)
    print(call_sid)

    t = threading.Thread(target=process_response,
                         args=(call_sid, input_recording_url))
    t.start()

    print("Voice Response")
    resp = VoiceResponse()
    resp.pause(length=30)
    resp.hangup()

    return Response(content=str(resp), media_type="text/xml")


def process_response(call_sid, input_recording_url):
    try:
        print(input_recording_url)
        audio_timelist = []
        text = answer_question_from_url(input_recording_url, "2",
                                        "fileName", audio_timelist)
        resp = VoiceResponse()
        output_recording_url = "https://1a03-118-140-204-138.ngrok-free.app/getAudio/fileName.wav"

        if output_recording_url == None:
            resp.say("Error please call again")
        else:
            resp.play(output_recording_url)

        resp.hangup()

        call = client.calls(call_sid).update(twiml=str(resp))
        call.to
    except Exception as e:
        print("Error", e)


# -------------------------------- init server ------------------------------- #
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)
