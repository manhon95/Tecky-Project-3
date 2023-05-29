from TTS.api import TTS
import requests
import openai
import os
from env import GPT_KEY
from google.cloud import speech
from google.oauth2 import service_account
from os.path import splitext
from pydub import AudioSegment
import time

def wav_to_flac(wav_path):
    try:
        flac_path = "%s.flac" % splitext(wav_path)[0]
        song = AudioSegment.from_file(wav_path)
        song.export(flac_path, format = "flac")
    except Exception as e:
        print(e)

def answer_question(input_audio, company_question, fileName, audio_timelist):
    print("get question--- ", input_audio, "conmany--- ", company_question,"filename---  ", fileName,"audio--- ", audio_timelist)
    x = requests.get(f"https://www.manhon95.online/users-questions?user-id={company_question}", headers={'Accept': 'application/json'})
    # print(f"audio input: {input_audio}")

    try:
        if not os.path.exists('recordings'):
            os.mkdir("recordings")
            os.mkdir("recordings/output")
            os.mkdir("recordings/speaker_voice")
        print("files_made")

        openai.api_key = f'{GPT_KEY}'
        
        audio_file = open(f"{input_audio}", "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print("speech to text: ",transcript.text)
        
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                    {"role": "user","content": f"base on these Q and A {x.json()}. Only give the answer for the following question: {transcript.text}, if the question is empty reply with: Sorry, I cannot provide an answer with out a question"}
            ]
        )

        print("chatGPT responds: ",response.choices[0].message.content)

        model_name = TTS.list_models()[7]

        tts = TTS(model_name)

        tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts", progress_bar=True, gpu=False)
        tts.tts_to_file(f"{response.choices[0].message.content}", speaker_wav="recordings/speaker_voice/3.wav", language="en", file_path=f"recordings/output/{fileName}.wav")
        audio_timelist.append({"path": f"recordings/{fileName}.wav", "timeStamp": time.time() })
        print(audio_timelist)

        text = {"input": transcript.text, "output": response.choices[0].message.content}
        return text
    
        # text = {"input": transcript.text, "output": response.choices[0].message.content}
        # return text


    
    except Exception as e:
        print(e)

