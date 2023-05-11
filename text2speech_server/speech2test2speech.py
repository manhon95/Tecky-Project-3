from TTS.api import TTS
import openai
import sounddevice as sd
import wavio as wv


freq = 44100
duration = 5 # in seconds
num = 1
print('Recording')

# while True:
filename = f"clip{num}"

# Start recorder with the given values of duration and sample frequency
# PTL Note: I had to change the channels value in the original code to fix a bug
recording = sd.rec(int(duration * freq), samplerate=freq, channels=1)

# Record audio for the given number of seconds
sd.wait()
print("here")

# Convert the NumPy array to audio file
wv.write(f"recordings/{filename}.wav", recording, freq, sampwidth=2)
print("2")

openai.api_key = "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"
print("3")
# openai.api_key = os.getenv("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")

audio_file= open("recordings/clip1.wav", "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)

print("recording: ",transcript.text)
print()

response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
             {"role": "user", "content": f"{transcript.text}"}
    ]
)

print("chatGTP responds: ",response.choices[0].message.content)


# f = open("speech.txt", "w+", encoding='utf-8-sig') 
# f.write(response.choices[0].message)


# List available 🐸TTS models and choose the first one
model_name = TTS.list_models()[7]

tts = TTS(model_name)


# Text to speech to a file
# tts.tts_to_file(text="You can then enjoy the server here More details about the docker images ", file_path="output.wav")

# tts = TTS(model_name="voice_conversion_models/multilingual/vctk/freevc24", progress_bar=False, gpu=True)
# tts.voice_conversion_to_file(source_wav="my/source.wav", target_wav="my/target.wav", file_path="output.wav")

tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts", progress_bar=True, gpu=False)
tts.tts_to_file(f"{response.choices[0].message.content}", speaker_wav="recordings\speaker_voice\halle.wav", language="en", file_path="recordings/output/output.wav")