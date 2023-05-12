import openai
import 

openai.api_key = 


audio_file = open(f"recordings/clip11.wav", "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)

print("recording: ",transcript.text)