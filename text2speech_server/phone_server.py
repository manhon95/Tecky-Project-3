from speech2test2speech import answer_question
from fastapi import FastAPI, Request, Response
import uvicorn

from twilio.twiml.voice_response import VoiceResponse

app = FastAPI()


# @app.get("/")
# async def greeting():
#     return "hello"

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
    print(input_recording_url)

    # text = answer_question(input_recording_url, 2)
    resp = VoiceResponse()
    if input_recording_url == None:
        resp.say("Error please call again")
    else:
        resp.play(input_recording_url)

    resp.hangup()

    return Response(content=str(resp), media_type="text/xml")


# -------------------------------- init server ------------------------------- #
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)
