from fastapi import APIRouter,Depends,status,HTTPException,Response
from sqlalchemy.orm import Session
from .. import oauth2
from ..database import get_db
from .. import models
from .. import schemas


router = APIRouter(tags=['Dashboard'])


@router.get("/dashboard/{id}", status_code=status.HTTP_200_OK,response_model=schemas.Dashboard)
def get_user_layout(id:int,db:Session = Depends(get_db),current_user:int = Depends(oauth2.get_current_user)):
    if current_user.id != id:
                    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail=f'Not authorized to perform requested action')
    bet_stats = db.query(models.Past_bets).filter(models.Past_bets.owner_id == id).first()
    
    if bet_stats == None:
        return {"total_profit":0}
        
    return {"total_profit":bet_stats}