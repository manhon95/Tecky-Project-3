from TTS.api import TTS
import requests
import openai
import sounddevice as sd
import wavio as wv
import os
from env import GPT_KEY
import io
from google.cloud import speech
from google.oauth2 import service_account

from os.path import splitext
from pydub import AudioSegment

def wav_to_flac(wav_path):
    try:
        flac_path = "%s.flac" % splitext(wav_path)[0]
        song = AudioSegment.from_file(wav_path)
        song.export(flac_path, format = "flac")
    except Exception as e:
        print(e)


def answer_question(input_audio, company_question):
    print("get question:", company_question)
    x = requests.get(f"http://localhost:3000/users-questions?user-id={company_question}", headers={'Accept': 'application/json'})
    print(f"Response: {x.json()}")

    try:
     
        # freq = 44100
        # duration = 5 # in seconds
        num = 1
        # print('Recording')

        if not os.path.exists('recordings'):
            os.mkdir("recordings")
            os.mkdir("recordings/output")
            os.mkdir("recordings/speaker_voice")
        print("files_made")
        # while True:
        filename = f"clip{num}"


        # recording = sd.rec(int(duration * freq), samplerate=freq, channels=1)
        # Record audio for the given number of seconds
        # sd.wait()
        # wv.write(f"recordings/{filename}.wav", recording, freq, sampwidth=2)

        # wav_to_flac(input_audio)

        # client_file = "googleKey.json"
        # key = service_account.Credentials.from_service_account_file(client_file)
        # client = speech.SpeechClient(credentials=key)   
        # # print("input_audio", input_audio)
        # audio_file = "recordings/clip1.flac"

        # content = None
        # with io.open(audio_file, 'rb') as f:
        #     content = f.read()
        # audio = speech.RecognitionAudio(content=content)
        # config = speech.RecognitionConfig(
        #     # encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        #     # sample_rate_hertz=48000,
        #     # language_code="en-US",

        #     encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
        #     sample_rate_hertz=48000,
        #     language_code="en-US",
        # )

        # response = client.recognize(config=config, audio=audio)
        # print("responser", response)

        # Each result is for a consecutive portion of the audio. Iterate through
        # them to get the transcripts for the entire audio file.
        # for data in response.results:
        #     transcriptText = data.alternatives[0].transcript
            # print(data.alternatives[0].transcript)

        openai.api_key = f'{GPT_KEY}'
        
        audio_file = open(f"{input_audio}", "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print(transcript.text)
        
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                    {"role": "user","content": f"base on these Q and A {x.json()}, only give the answer for the following question: {transcript.text}"}
            ]
        )

        print("chatGPT responds: ",response.choices[0].message.content)


        # f = open("speech.txt", "w+", encoding='utf-8-sig') 
        # f.write(response.choices[0].message)

        model_name = TTS.list_models()[7]

        tts = TTS(model_name)

        tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts", progress_bar=True, gpu=False)
        tts.tts_to_file(f"{response.choices[0].message.content}", speaker_wav="recordings/speaker_voice/3.wav", language="en", file_path="recordings/output/output.wav")
        print("save")

        text = {"message": "getAudio/output.wav","input": transcript.text, "output": response.choices[0].message.content}
        return text
    
        # text = {"input": transcript.text, "output": response.choices[0].message.content}
        # return text
    
    except Exception as e:
        print(e)

