from TTS.api import TTS
import openai
import sounddevice as sd
import wavio as wv
import os
from env import GPT_KEY
import io
from google.cloud import speech
from google.oauth2 import service_account

def answer_question(input_audio):

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
        # client_file = "googleKey.json"
        # key = service_account.Credentials.from_service_account_file(client_file)
        # client = speech.SpeechClient(credentials=key)   

        # print(input_audio)
        # audio_file = input_audio
        # with io.open(audio_file, 'rb') as f:
        #     content = f.read()
        # audio = speech.RecognitionAudio(content=input_audio)
        

        # config = speech.RecognitionConfig(
        #     encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        #     sample_rate_hertz=44100,
        #     language_code="en-US",
        # )
        # print("1")

        # response = client.recognize(config=config, audio=audio)
        # print(response)

        # # Each result is for a consecutive portion of the audio. Iterate through
        # # them to get the transcripts for the entire audio file.
        # for result in response.results:
        #     transcriptText = result.alternatives[0].transcript
        #     print("3")
        #     print(result.alternatives[0].transcript)

        openai.api_key = f'{GPT_KEY}'
        
        audio_file = open(f"{input_audio}", "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print(transcript.text)

        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                    {"role": "user","content": f"{transcript.text}"}
            ]
        )

        print("chatGPT responds: ",response.choices[0].message.content)


        # f = open("speech.txt", "w+", encoding='utf-8-sig') 
        # f.write(response.choices[0].message)

        model_name = TTS.list_models()[7]

        tts = TTS(model_name)

        tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts", progress_bar=True, gpu=False)
        tts.tts_to_file(f"{response.choices[0].message.content}", speaker_wav="recordings\speaker_voice\halle.wav", language="en", file_path="recordings/output/output.wav")
        print("save")

        # text = {"input": transcriptText, "output": response.choices[0].message.content}
        # return text
    
        text = {"input": transcript.text, "output": response.choices[0].message.content}
        return text
    
    except e:
        print(e)

