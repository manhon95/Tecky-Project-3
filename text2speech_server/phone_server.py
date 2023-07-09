from speech2test2speech import answer_question_from_url
from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

import os
from env import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
from twilio.rest import Client

import threading

from twilio.twiml.voice_response import VoiceResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/getAudio", StaticFiles(directory="recordings"), name="getAudio")

# ------------------------------- Twilio client ------------------------------ #
account_sid = TWILIO_ACCOUNT_SID
auth_token = TWILIO_AUTH_TOKEN
client = Client(account_sid, auth_token)


@app.post("/")
async def answer_call():
    try:
        resp = VoiceResponse()

        resp.say("你好，請喺嗶一聲之後留低你嘅問題。", language='yue-HK', voice='Google.yue-HK-Standard-A')
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
    resp.play("http://com.twilio.sounds.music.s3.amazonaws.com/Mellotroniac_-_Flight_Of_Young_Hearts_Flute.mp3")
    # resp.pause(length=60)
    resp.hangup()

    return Response(content=str(resp), media_type="text/xml")


def process_response(call_sid, input_recording_url):
    try:
        print(input_recording_url)
        audio_timelist = []
        text = answer_question_from_url(input_recording_url, "2",
                                        "fileName", audio_timelist)
        resp = VoiceResponse()
        output_recording_url = "http://13.55.35.193/getAudio/fileName.mp3"

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
