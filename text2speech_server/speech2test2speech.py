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
from urllib.request import urlopen
from google.cloud import texttospeech


def wav_to_flac(wav_path):
    try:
        flac_path = "%s.flac" % splitext(wav_path)[0]
        song = AudioSegment.from_file(wav_path)
        song.export(flac_path, format="flac")
    except Exception as e:
        print(e)


def answer_question(input_audio, company_question, fileName, audio_timelist):
    print("get question--- ", input_audio, "conmany--- ", company_question,
          "filename---  ", fileName, "audio--- ", audio_timelist)
    x = requests.get(
        f"http://3.104.136.222/users-questions?user-id={company_question}", headers={'Accept': 'application/json'})
    print(x.json())

    try:
        if not os.path.exists('recordings'):
            os.mkdir("recordings")
            os.mkdir("recordings/output")
            os.mkdir("recordings/speaker_voice")
        print("files_made")

        openai.api_key = f'{GPT_KEY}'

        audio_file = open(f"{input_audio}", "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print("speech to text: ", transcript.text)

        GPTresponse = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"請根據常見問題： {x.json()}. 回答以下問題： {transcript.text}, 如果問題是空白，回答: 唔好意思，我聽唔明你嘅問題。"}
                # {"role": "user", "content": f"base on these Q and A {x.json()}. Only give the answer for the following question: {transcript.text}, if the question is empty reply with: Sorry, I cannot provide an answer with out a question"}
            ]
        )

        print("chatGPT responds: ", GPTresponse.choices[0].message.content)

        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "googleAPI_key_project3.json"

        client = texttospeech.TextToSpeechClient()

        synthesis_input = texttospeech.SynthesisInput(
            text=response.choices[0].message.content)

        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US", name="yue-HK-Standard-B",
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        # Perform the text-to-speech request on the text input with the selected
        # voice parameters and audio file type
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        # The response's audio_content is binary.
        with open(f'recordings/{fileName}.mp3', "wb") as out:
            # Write the response to the output file.
            out.write(response.audio_content)
            print(f'Audio content written to file "{fileName}.mp3"')

        text = {"input": transcript.text,
                "output": GPTresponse.choices[0].message.content}
        return text

        # model_name = TTS.list_models()[7]

        # tts = TTS(model_name)

        # tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts",
        #           progress_bar=True, gpu=False)
        # tts.tts_to_file(f"{response.choices[0].message.content}", speaker_wav="recordings/speaker_voice/3.wav",
        #                 language="en", file_path=f"recordings/output/{fileName}.wav")
        # audio_timelist.append(
        #     {"path": f"recordings/{fileName}.wav", "timeStamp": time.time()})
        # print(audio_timelist)

        # text = {"input": transcript.text,
        #         "output": response.choices[0].message.content}
        # return text

        # text = {"input": transcript.text, "output": response.choices[0].message.content}
        # return text

    except Exception as e:
        print(e)


def answer_question_from_url(input_audio_url, company_question, fileName, audio_timelist):
    print("get question--- ", input_audio_url, "conmany--- ", company_question,
          "filename---  ", fileName, "audio--- ", audio_timelist)
    x = requests.get(
        f"http://3.104.136.222/users-questions?user-id={company_question}", headers={'Accept': 'application/json'})
    print(x.json())

    try:
        if not os.path.exists('recordings'):
            os.mkdir("recordings")
            os.mkdir("recordings/output")
            os.mkdir("recordings/speaker_voice")
        print("files_made")

        openai.api_key = f'{GPT_KEY}'
        audio_file = open("recordings/input.wav", "wb")
        audio_file.write(urlopen(input_audio_url).read())
        audio_file = open("recordings/input.wav", "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print("speech to text: ", transcript.text)

        GPTresponse = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"base on these Q and A {x.json()}. Only give the answer for the following question: {transcript.text}, if the question is empty reply with: Sorry, I cannot provide an answer with out a question"}
            ]
        )

        print("chatGPT responds: ", GPTresponse.choices[0].message.content)

        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "googleAPI_key_project3.json"

        client = texttospeech.TextToSpeechClient()

        synthesis_input = texttospeech.SynthesisInput(
            text=GPTresponse.choices[0].message.content)

        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US", name="yue-HK-Standard-B",
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        # Perform the text-to-speech request on the text input with the selected
        # voice parameters and audio file type
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        # The response's audio_content is binary.
        with open(f'recordings/{fileName}.mp3', "wb") as out:
            # Write the response to the output file.
            out.write(response.audio_content)
            print(f'Audio content written to file "{fileName}.mp3"')

        text = {"input": transcript.text,
                "output": GPTresponse.choices[0].message.content}
        return text

        # model_name = TTS.list_models()[7]

        # tts = TTS(model_name)

        # tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts",
        #           progress_bar=True, gpu=False)
        # tts.tts_to_file(f"{response.choices[0].message.content}", speaker_wav="recordings/speaker_voice/3.wav",
        #                 language="en", file_path=f"recordings/output/{fileName}.wav")
        # audio_timelist.append(
        #     {"path": f"recordings/{fileName}.wav", "timeStamp": time.time()})
        # print(audio_timelist)

        # text = {"input": transcript.text,
        #         "output": response.choices[0].message.content}
        # return text

        # text = {"input": transcript.text, "output": response.choices[0].message.content}
        # return text

    except Exception as e:
        print("exception ", e)
