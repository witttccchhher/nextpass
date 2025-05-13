from random import choice
from string import ascii_lowercase, ascii_uppercase, digits

def generate(length: int, special: bool, nums: bool, uppercase: bool) -> str:
    chars = ascii_lowercase
    if nums: chars += digits
    if uppercase: chars += ascii_uppercase
    if special: chars += "!@#$%^&*()-_=+[]{}|;:,.<>/?"

    return "".join(choice(chars) for _ in range(length))
