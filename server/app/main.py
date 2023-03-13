from fastapi import FastAPI
from . import models
from .database import engine
from fastapi.middleware.cors import CORSMiddleware
from .routes.authentication import auth
from typing import List
from .config import settings
from .routes.general import layout
from .routes import dashboard

models.Base.metadata.create_all(bind=engine)

app = FastAPI()    

origins = [f'{settings.domain}',
           f'{settings.domain2}']


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(layout.router)
app.include_router(dashboard.router)

print('Successful connection')

