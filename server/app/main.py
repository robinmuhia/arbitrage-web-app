from fastapi import FastAPI
from . import models
from .database import engine
from fastapi.middleware.cors import CORSMiddleware
from .routes.authentication import auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()    

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins = [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# app.include_router(post.router)
# app.include_router(user.router)
app.include_router(auth.router)
# app.include_router(vote.router)


print('Successful connection')

