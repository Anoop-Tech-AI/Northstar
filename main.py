import requests
city= input("Enter the city name: ")
geo = requests.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    params={"name": city}
).json()
lat = geo["results"][0]["latitude"]
longitude = geo["results"][0]["longitude"]
name = geo["results"][0]["name"]
data = requests.get(
    "https://api.open-meteo.com/v1/forecast",
    params={
        "latitude": lat,
        "longitude": longitude,
        "current_weather": True
    }
).json()
temp=data["current_weather"]["temperature"]
wind=data["current_weather"]["windspeed"]
print(f"Current weather in {name}:")
print(f"Temperature: {temp}°C")
print(f"Wind Speed: {wind} km/h")