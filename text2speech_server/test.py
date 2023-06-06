import openai
from env import GPT_KEY

openai.api_key = f'{GPT_KEY}'
        
audio_file = open(f"recordings/voices/freeman/2.wav", "rb")
transcript = openai.Audio.transcribe("whisper-1", audio_file)
print("speech to text: ",transcript.text)
