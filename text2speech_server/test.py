from google.cloud import texttospeech
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="googleAPI_key_project3.json"
            
client = texttospeech.TextToSpeechClient()

synthesis_input = texttospeech.SynthesisInput(text="全天候為你送上最快最新的香港新聞")

voice = texttospeech.VoiceSelectionParams(
    language_code="en-US", name= "yue-HK-Standard-B",
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
with open(f'recordings/123.mp3', "wb") as out:
    out.write(response.audio_content)
    print(f'Audio content written to file "123.mp3"')
