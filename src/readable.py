from random import choice
from string import digits

def generate(length: int, nums: int) -> str:
    consonants = "bcdfghjklmnpqrstvwxyz"
    vowels = "aeiou"

    password = ""
    for _ in range(length // 2):
        password += choice(consonants)
        password += choice(vowels)
    if nums:
        for _ in range(nums):
            password += choice(digits)

    return password.capitalize()
