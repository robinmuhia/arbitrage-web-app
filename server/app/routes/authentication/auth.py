from fastapi import APIRouter,Depends,status,HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ... import database, oauth2,schemas,models,utils
from ...database import get_db


router = APIRouter(tags=['Authentication'])

@router.get("/register")
async def get_register():
    return {"message":"Registration page"}

@router.get("/")
async def login():
    return {"message":"Login page"}

@router.post("/auth/register", status_code=status.HTTP_201_CREATED,response_model=schemas.UserOut)
def create_user(user:schemas.UserCreate,db:Session = Depends(get_db)):
    user_exists = db.query(models.User).filter(models.User.email == user.email).first()
    if user_exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f'Email {user.email} is already in use')


    hashed_password = utils.hash(user.password)
    user.password = hashed_password
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {'message':"User successfully created"}


@router.post('/auth/login',status_code=status.HTTP_200_OK,response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(),db:Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Invalid credentials")

    if not utils.verify(user_credentials.password,user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                    detail="Invalid credentials")
    
    access_token = oauth2.create_access_token(data={"user_id":user.id})

    return {"access_token":access_token, "token_type":"bearer","user":user}

    

