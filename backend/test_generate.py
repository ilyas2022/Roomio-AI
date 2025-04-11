import replicate
import requests
import os
from dotenv import load_dotenv

load_dotenv()

replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

input = {
    "image": "https://replicate.delivery/pbxt/KhTNuTIKK1F1tvVl8e7mqOlhR3z3D0SAojAMN8BNftCvAubM/bedroom_3.jpg",
    "prompt": "Modern-style room With bookshelves and televisions and furniture and plant and electric lamps and chairs and occasional tables and coffee tables. With Simple, Clean Lines and Simplistic Furniture and Open and Natural Lighting and Natural Materials and Elements and Neutral Walls and Textures and Practicality and Functionality and Simple, Clean Lines and Simplistic Furniture. Cinematic photo, highly detailed, cinematic lighting, ultra-detailed, ultrarealistic, photorealism, 8k. Modern interior design style"
}

output_url = replicate.run(
    "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
    input=input
)

response = requests.get(output_url)
with open("output.png", "wb") as file:
    file.write(response.content)

print("✅ Imagen guardada como output.png")
