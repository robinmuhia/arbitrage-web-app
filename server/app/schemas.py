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

class UserLayout(BaseModel):
    name:str
    role:str    

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token:str
    token_type:str
    user: UserOut


class TokenData(BaseModel):
    id : Optional[str] = None


class Current_Three_way_Bets(BaseModel):
    title: str
    betsite_win: str
    betsite_draw: str
    betsite_loss: str
    win: float
    draw: float
    loss: float
    id: int
    created_at: datetime
    
    
class Current_Two_way_Bets(BaseModel):
    title: str
    betsite_win: str
    betsite_loss: str
    win: float
    loss: float
    id: int
    created_at: datetime
    

class PastBets(BaseModel):
    owner_id: int
    profit: float
    created_at: datetime

    
class Dashboard(BaseModel):
    total_profit: float




