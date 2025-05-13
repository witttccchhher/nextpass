from random import choice
from string import digits

def generate(template: str) -> str:
    consonants = "bcdfghjklmnpqrstvwxyz"
    vowels = "aeiou"
    specials = "!@#$%^&*-_=+|;:,./?"

    password = ""
    for char in template:
        match char:
            case "C": password += choice(consonants).upper()
            case "c": password += choice(consonants)
            case "V": password += choice(vowels).upper()
            case "v": password += choice(vowels)
            case "9": password += choice(digits)
            case "!": password += choice(specials)
            case _: password += char

    return password
