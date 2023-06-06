from speech2test2speech import answer_question
from fastapi import FastAPI
import uvicorn

from twilio.twiml.voice_response import VoiceResponse

app = FastAPI()


@app.post("/")
async def answer_call():
    resp = VoiceResponse()

    resp.say("Hello. Please leave a message after the beep.")
    resp.record(action="/replay")
    resp.hangup()

    return str(resp)


@app.post("/replay")
async def answer_call(request: Request):
    input_recording_url = request.body.RecordingUrl

    text = answer_question(input_recording_url, 2)
    resp = VoiceResponse()
    if not output_recording_url:
        resp.say("Error please call again")
    else:
        resp.play(output_recording_url)

    resp.hangup()

    return str(resp)


# -------------------------------- init server ------------------------------- #
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)
