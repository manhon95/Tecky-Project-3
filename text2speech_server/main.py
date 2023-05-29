from fastapi import Depends, FastAPI, APIRouter, HTTPException, status, File, UploadFile, Request, Response, Form
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from  datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError
import uvicorn
import python_jwt as jwt
import jwcrypto.jwk as jwk
from speech2test2speech import answer_question
import soundfile as sf
import re
import os
from typing import Annotated
from uuid import UUID, uuid4
from starlette.middleware.sessions import SessionMiddleware
import time
import threading
from speech2test2speech import *

audio_timelist = []

SECRET_KEY =  jwk.JWK.generate(kty='RSA', size=2048)
ALGORITHM = "PS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


db = {
    "apple": {
        "username": "apple",
        "email": "a@gmail.com",
        "password": "$2b$12$wqp0N4Y/3Jqfyuq5W/ksEePP.gAdegpKWDHM8auCBSAnloVN1FFEm",
        "disable": False
    }
}

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str or None = None

class User(BaseModel):
    userName: str
    company: str
    email: str
    password: str
    confirmPassword: str

class UserInDB(BaseModel):
    username: str
    email: str
    password: str
    disable: bool
    
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")



# ---------------------------------------------------------------------------- #
#                                  Create App                                  #
# ---------------------------------------------------------------------------- #

app = FastAPI(debug=True)

app.add_middleware(SessionMiddleware, secret_key="some-random-string")


# ---------------------------- web page templates ---------------------------- #
app.mount("/getAudio", StaticFiles(directory="recordings/output"), name="getAudio")
app.mount("/login", StaticFiles(directory="templates"), name="login")
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str):
    if username in db:
        user_data = db[username]
        print(user_data)
        return UserInDB(**user_data)
    
    
def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)    
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    
    return user

def create_access_token(data: dict, expires_delta: timedelta or None = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes = 15)

    to_encode.update({"exp":expire})
    print(to_encode)
    encode_jwt = jwt.generate_jwt(to_encode, SECRET_KEY, ALGORITHM, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return encode_jwt

# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"www_Authenticate": "Bearer"})

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithm=[ALGORITHM])
#         username:str = payload.get("sub")
#         if username is None:
#             raise credential_exception
        
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credential_exception
    
#     user = get_user(db, username=token_data.username)
#     if user is None:
#         raise credential_exception
#     return user

# async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
#     if current_user.disable:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user

# dir_path_input = "recordings"
# dir_path_output = "recordings/output"
# audio_files_input = []
# audio_files_output = []

# def clear_audio_on_start():
#     for path in os.listdir(dir_path_input):
#         if os.path.isfile(os.path.join(dir_path_input, path)):
#             audio_files_input.append(path)

#     for path in os.listdir(dir_path_output):
#         if os.path.isfile(os.path.join(dir_path_output, path)):
#             audio_files_output.append(path)
#     print(audio_files_output)

# def setInterval(func,time):
#     e = threading.Event()
#     while not e.wait(time):
#         func()


# def audio_remove_timer():
    
#     print(audio_timelist)

# # using
# setInterval(audio_remove_timer,5)


# ---------------------------------------------------------------------------- #
#                                    routes                                    #
# ---------------------------------------------------------------------------- #
@app.middleware("http")
async def some_middleware(request: Request, call_next):
    response = await call_next(request)
    session = request.cookies.get('session')
    if session:
        response.set_cookie(key='session', value=request.cookies.get('session'), httponly=True)
    return response


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password", headers={"www_Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}



@app.get("/homepage", response_class=HTMLResponse)
async def read_item(request: Request):
    request.session["my_var"] = "1234"
    print(request.cookies.get('session'))
    print("timestamp: ",time.time())
    return templates.TemplateResponse("homepage.html", {"request": request})

@app.post("/login")
async def login(request: Request):
    return 


@app.post("/register")
async def register(user: User):
    print(user)
    checkStatus = True
    userName = user.userName
    company = user.company
    email = user.email
    password = user.password
    confirmPassword = user.confirmPassword
    emailFormat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    report = {}
    

  # ------------- check password and email formate when registering ------------ #
    if len(password) < 8:
        report["passwordLength-password"] = "Password must be 8 or more character*"
        checkStatus = False
    else:
        report["passwordLength-password"] = ""
        
    

    if password != confirmPassword:
        report["pwCheck-password"] = "Confirm password is different*"
        checkStatus = False
    else:
        report["pwCheck-password"] = ""
    

    if password == confirmPassword and len(password) > 7:
        report["password"] = True
    else:
        report["password"] = False
        checkStatus = False
    

    if re.match(emailFormat, email):
        report["Format-email"] = ""
        report["email"] = True
    else:
        report["Format-email"] = "invalid Email*"
        checkStatus = False
        report["email"] = False
    
    report["duplicate-email"] = ""
   
    if checkStatus == True:
        report["success"] = "success"
    return report

# text = {}
# def sleep():
#     time.sleep(8.4)
#     text = {"input": "here", "output": "output"}
#     return text

@app.post("/uploadFile")
async def upload_file(request: Request, company_question: str = Form(), file: UploadFile = File()):
    try:
        cookies_value = request.cookies.get('session')
        fileName = cookies_value[32:59]

        if not file:
            return {"message": "not file sent"}
        
        file_location = f"recordings/{fileName}.wav"

        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        text = answer_question(file_location, company_question, fileName,audio_timelist)


        response = {"message": f"getAudio/{fileName}.wav", "inputMessage": text["input"],"outputMessage": text["output"]}
        # response = {"message": f"getAudio/uAlKLLA98hPw6kgVpjb-B7-xJVM.wav", "inputMessage": text["input"],"outputMessage": text["output"]}
        return response
    
    
    except Exception as e:
        print(e)
        return { "status" : False }
    
# -------------------------------- init server ------------------------------- #
if __name__ == "__main__":
    try:
        # clear_audio_on_start()
        uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)   
    except Exception as e:
        print(e)
