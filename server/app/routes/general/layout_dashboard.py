from fastapi import APIRouter,Depends,status,HTTPException,Response
from sqlalchemy.orm import Session
from ... import oauth2
from ...database import get_db
from ... import models
from ... import schemas


router = APIRouter(tags=['General'])


@router.get("/general/user/{id}", status_code=status.HTTP_200_OK,response_model=schemas.UserLayout)
def get_user_layout(id:int,db:Session = Depends(get_db),current_user:int = Depends(oauth2.get_current_user)):
    if current_user.id != id:
                    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail=f'Not authorized to perform requested action')        
    else:
        authenticated_user = db.query(models.User).filter(models.User.id == id).first()        
        
    return authenticated_user

@router.get("/general/dashboard", status_code=status.HTTP_200_OK)
def get_user_layout(id:int,db:Session = Depends(get_db),current_user:int = Depends(oauth2.get_current_user)):
    if current_user.id != id:
                    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail=f'Not authorized to perform requested action')
        
    return Response(status_code=status.HTTP_200_OK)