from .database import Base
from sqlalchemy import Column,Integer,String,Boolean,ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'

    email = Column(String,nullable=False,unique=True)
    password = Column(String,nullable=False)
    name = Column(String,nullable=False)
    id = Column(Integer,primary_key = True, nullable = False)
    country = Column(String,nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default = text('now()'))
    paid = Column(Boolean,server_default= 'True',nullable=False)
    role = Column(String,server_default="client",nullable = False)
    mode = Column(String,server_default="light",nullable=False)
    verified= Column(Boolean,server_default= 'False',nullable=False)
    acceptTerms=Column(Boolean,nullable=False,server_default= 'True')

    
class Current_Bets(Base):
    __tablename__ = 'Current bets'

    id = Column(Integer,primary_key = True, nullable = False)
    title = Column(String,nullable = False)
    betsite_win = Column(String,nullable = False)
    betsite_draw = Column(String,nullable = False)
    betsite_loss = Column(String,nullable = False)
    win = Column(Integer,nullable = False)
    draw = Column(Integer,nullable = False)
    loss = Column(Integer,nullable = False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default = text('now()'))
    


class Past_bets(Base):
    __tablename__ = "Past bets"

    id = Column(Integer,primary_key= True,nullable=False)
    owner_id = Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable = False)
    profit = Column(Integer,nullable = False)
    country = Column(String,nullable = False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default = text('now()'))
        
    owner = relationship("User")
    

class Weekly_bets(Base):
    __tablename__ = "Weekly profit"
    
    id = Column(Integer,primary_key= True,nullable=False)
    owner_id = Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable = False)
    profit = Column(Integer,nullable = False)
    week= Column(Integer,nullable=False)
    

class Monthly_bets(Base):
    __tablename__ = "Monthly profit"
    
    id = Column(Integer,primary_key= True,nullable=False)
    owner_id = Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable = False)
    profit = Column(Integer,nullable = False)
    month = Column(String,nullable=False)