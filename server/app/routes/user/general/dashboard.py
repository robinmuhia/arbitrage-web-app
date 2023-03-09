from fastapi import APIRouter,Depends,status,HTTPException,Response
from sqlalchemy.orm import Session
from .... import oauth2
from ....database import get_db
from .... import models


router = APIRouter(tags=['General'])


@router.get("/general/dashboard", status_code=status.HTTP_200_OK)
def get_user_layout(id:int,db:Session = Depends(get_db),current_user:int = Depends(oauth2.get_current_user)):
    authenticated_user = db.query(models.User).filter(current_user.id == id).first()
    if authenticated_user == None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f'Not authorized to perform requested action')
        
    return Response(status_code=status.HTTP_200_OK)