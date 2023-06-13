# OpenWeatherMap Weather Application

## Overview

This application displays current weather, and 5 day / 3 hour forecast information, called from OpenWeatherMap APIs. 

## OpenWeather API Key Required

An API key is required in order for this application to successfully communicate with OpenWeatherMap APIs.

- Documentation for OpenWeatherMap APIs can be found at https://openweathermap.org/API
- This application uses the **Current Weather** and the **5 day / 3 hour Forecast** APIs.
  - Current Weather - https://openweathermap.org/current
  - 5 day / 3 hour Forecast - https://openweathermap.org/forecast5

### Place your API key within the **weather.js** file, on line **146**, within the parentheses of:

```js
const API_KEY = "" // insert your API key here
```