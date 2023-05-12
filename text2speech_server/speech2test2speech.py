from TTS.api import TTS
import openai
import sounddevice as sd
import wavio as wv
import os
from env import GPT_KEY

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

        # ------------------- Convert the NumPy array to audio file ------------------ #
        # wv.write(f"recordings/{filename}.wav", recording, freq, sampwidth=2)
        
        openai.api_key = f'{GPT_KEY}'
        
        audio_file = open(f"{input_audio}", "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)

        print("recording: ",transcript.text)

        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                    {"role": "user", "content": f"{transcript.text}"}
            ]
        )

        print("chatGTP responds: ",response.choices[0].message.content)


        # f = open("speech.txt", "w+", encoding='utf-8-sig') 
        # f.write(response.choices[0].message)

        model_name = TTS.list_models()[7]

        tts = TTS(model_name)

        tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts", progress_bar=True, gpu=False)
        tts.tts_to_file(f"{response.choices[0].message.content}", speaker_wav="recordings\speaker_voice\halle.wav", language="en", file_path="recordings/output/output.wav")
        print("save")
    except e:
        print(e)
    