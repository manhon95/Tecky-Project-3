from fastapi import Depends, FastAPI, APIRouter, HTTPException, status, File, UploadFile
from fastapi.responses import FileResponse, HTMLResponse
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
    email: str
    password: str

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

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"www_Authenticate": "Bearer"})

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithm=[ALGORITHM])
        username:str = payload.get("sub")
        if username is None:
            raise credential_exception
        
        token_data = TokenData(username=username)
    except JWTError:
        raise credential_exception
    
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credential_exception
    
    return user

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    if current_user.disable:
        raise HTTPException(status_code=400, detail="Inactive user")

    return current_user

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password", headers={"www_Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.get("/users/me/items")
async def read_own_items(current_user:User = Depends(get_current_active_user)):
    return [{"item_id": 1, "owner": current_user}]

@app.get()

@app.post("/uploadFile/", response_class=FileResponse)
async def upload_file(file: UploadFile = File(...)):
    if not file:
        return {"message": "not file sent"}
    audioBack = "recordings\speaker_voice\halle.wav"
    return audioBack
# ----------------------------------- route ---------------------------------- #



# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],    
# )

# @app.post('/login/')
# async def root(user: User):
#     response = requests.get('https://api.chatengine.io/users/me/', 
#         headers={ 
#             "Project-ID": PROJECT_ID,
#             "User-Name": user.username,
#             "User-Secret": user.secret
#         }
#     )
#     return response.json()

# @app.post('/signup/')
# async def root(user: User):
#     response = requests.post('https://api.chatengine.io/users/', 
#         data={
#             "username": user.username,
#             "secret": user.secret,
#             "email": user.email,
#             "first_name": user.first_name,
#             "last_name": user.last_name,
#         },
#         headers={ "Private-Key": PRIVATE_KEY }
#     )
#     return response.json()
@app.get('/')
async def home():
    return "home"

# app.include_router(router) 

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)