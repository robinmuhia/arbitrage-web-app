from pydantic import BaseModel,EmailStr
from datetime import datetime
from typing import Optional,Any


class UserCreate(BaseModel):
    email:EmailStr
    password:str
    country:str
    name:str
    acceptTerms:bool


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    

class UserOut(BaseModel):
    id:int
    name:str
    paid:bool
    mode:str
    role:str    

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token:str
    token_type:str
    user: UserOut


class TokenData(BaseModel):
    id : Optional[str] = None


class CurrentBets(BaseModel):
    title: str
    betsite_win: str
    betsite_draw: str
    betsite_loss: str
    win: float
    draw: float
    loss: float
    id: int
    created_at: datetime
    

class PastBets(BaseModel):
    id: int
    owner_id: int
    profit: float
    country: str
    created_at: datetime
    

class WeeklyBets(BaseModel):
    id: int
    owner_id: int
    profit: float
    week: str
        

class MonthlyBets(BaseModel):
    id: int
    owner_id: int
    profit: float
    week: str

