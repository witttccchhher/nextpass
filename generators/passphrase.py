from random import choice

def generate(words: list[str], length: int, delimeter: str, capitalize: bool) -> str:
    return delimeter.join(choice(words).capitalize() if capitalize else choice(words) for _ in range(length))
