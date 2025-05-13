from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from json import loads

from src import random, readable, passphrase, template

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: указать домен фронта
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/generate/random")
def randomApi(length: int = Query(16), special: bool = Query(True), nums: bool = Query(True), uppercase: bool = Query(True)) -> dict[str, str]:
    password = random.generate(length, special, nums, uppercase)
    return {"method": "random", "password": password}

@app.get("/generate/readable")
def readableApi(length: int = Query(8), nums: int = Query(2)) -> dict[str, str]:
    password = readable.generate(length, nums)
    return {"method": "random", "readable": password}

@app.get("/generate/passphrase")
def passphraseApi(length: int = Query(4), delimeter: str = Query("-"), capitalize: bool = Query(True)) -> dict[str, str]:
    with open("assets/words.json", "rt") as wordsFile:
        words = loads(wordsFile.read())

    password = passphrase.generate(words, length, delimeter, capitalize)
    return {"method": "passphrase", "password": password}

@app.get("/generate/template")
def templateApi(tmpl: str = Query("Cvcvcv99!")) -> dict[str, str]:
    password = template.generate(tmpl)
    return {"method": "template", "password": password}
