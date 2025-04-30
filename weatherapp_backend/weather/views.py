from django.http import JsonResponse
from django.conf import settings
import requests

def get_weather(request):
    city = request.GET.get('city')
    if not city:
        return JsonResponse({'error': 'City not provided'}, status=400)

    api_key = settings.OPENWEATHER_API_KEY
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'

    try:
        response = requests.get(url)
        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({
                'error': 'city not found',
                'status_code': response.status_code,
                'details': response.json()
            }, status=response.status_code)
    except requests.RequestException:
        return JsonResponse({'error': 'Failed to fetch weather data'}, status=500)

        

