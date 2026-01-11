"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Search,
  AlertTriangle,
  Fish,
  RefreshCw,
  Sunrise,
  Sunset,
} from "lucide-react"

// Mock weather data - in production, you would fetch from a weather API
const mockWeatherData = {
  location: "Chennai, Tamil Nadu",
  temperature: 28,
  feelsLike: 32,
  humidity: 75,
  windSpeed: 12,
  windDirection: "NE",
  pressure: 1012,
  visibility: 10,
  uvIndex: 7,
  condition: "Partly Cloudy",
  sunrise: "06:15",
  sunset: "18:30",
  forecast: [
    { day: "Today", high: 32, low: 25, condition: "Partly Cloudy", rain: 20 },
    { day: "Tomorrow", high: 31, low: 24, condition: "Sunny", rain: 5 },
    { day: "Wednesday", high: 30, low: 24, condition: "Cloudy", rain: 40 },
    { day: "Thursday", high: 29, low: 23, condition: "Rain", rain: 80 },
    { day: "Friday", high: 28, low: 23, condition: "Rain", rain: 70 },
    { day: "Saturday", high: 30, low: 24, condition: "Partly Cloudy", rain: 30 },
    { day: "Sunday", high: 31, low: 25, condition: "Sunny", rain: 10 },
  ],
}

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="w-8 h-8 text-amber-500" />
    case "rain":
      return <CloudRain className="w-8 h-8 text-blue-500" />
    case "cloudy":
      return <Cloud className="w-8 h-8 text-gray-500" />
    default:
      return <Cloud className="w-8 h-8 text-gray-400" />
  }
}

export default function WeatherPage() {
  const [weather, setWeather] = useState(mockWeatherData)
  const [searchLocation, setSearchLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleSearch = () => {
    if (!searchLocation) return
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setWeather({ ...mockWeatherData, location: searchLocation })
      setLoading(false)
      setLastUpdated(new Date())
    }, 1000)
  }

  const refreshWeather = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLastUpdated(new Date())
    }, 1000)
  }

  const getFarmingAdvice = () => {
    const advice = []

    if (weather.temperature > 30) {
      advice.push({
        type: "warning",
        title: "High Temperature Alert",
        message: "Ensure adequate aeration. Monitor dissolved oxygen levels closely. Reduce feeding during peak heat.",
      })
    }

    if (weather.humidity > 80) {
      advice.push({
        type: "info",
        title: "High Humidity",
        message: "Disease risk may increase. Monitor fish for signs of stress. Keep feed storage dry.",
      })
    }

    if (weather.forecast.some((d) => d.rain > 70)) {
      advice.push({
        type: "alert",
        title: "Heavy Rain Expected",
        message:
          "Prepare for potential flooding. Check embankments. Have emergency overflow ready. Reduce feeding before rain.",
      })
    }

    if (weather.temperature < 20) {
      advice.push({
        type: "warning",
        title: "Low Temperature",
        message: "Reduce feeding as fish metabolism slows. Watch for fungal infections. Avoid handling fish.",
      })
    }

    if (advice.length === 0) {
      advice.push({
        type: "success",
        title: "Favorable Conditions",
        message: "Weather conditions are good for fish farming. Maintain regular feeding and monitoring schedules.",
      })
    }

    return advice
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Cloud className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Weather Report</h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            Real-time weather updates with farming recommendations to help you make informed decisions for your
            aquaculture operations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Enter your location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="mr-2 w-4 h-4" />
            Search
          </Button>
          <Button variant="outline" onClick={refreshWeather} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{weather.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-6xl font-bold mb-2">{weather.temperature}°C</div>
                    <div className="text-white/80">Feels like {weather.feelsLike}°C</div>
                    <div className="text-lg mt-2">{weather.condition}</div>
                  </div>
                  <div className="text-right">
                    {getWeatherIcon(weather.condition)}
                    <div className="mt-4 text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <Sunrise className="w-4 h-4" />
                        {weather.sunrise}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Sunset className="w-4 h-4" />
                        {weather.sunset}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Droplets className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{weather.humidity}%</div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Wind className="w-6 h-6 mx-auto text-teal-500 mb-2" />
                    <div className="text-2xl font-bold">{weather.windSpeed}</div>
                    <div className="text-sm text-muted-foreground">Wind (km/h)</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Gauge className="w-6 h-6 mx-auto text-purple-500 mb-2" />
                    <div className="text-2xl font-bold">{weather.pressure}</div>
                    <div className="text-sm text-muted-foreground">Pressure (hPa)</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Eye className="w-6 h-6 mx-auto text-gray-500 mb-2" />
                    <div className="text-2xl font-bold">{weather.visibility}</div>
                    <div className="text-sm text-muted-foreground">Visibility (km)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weather.forecast.map((day, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg ${index === 0 ? "bg-primary/10 border border-primary" : "bg-muted"}`}
                    >
                      <div className="text-sm font-medium mb-2">{day.day}</div>
                      <div className="flex justify-center mb-2">{getWeatherIcon(day.condition)}</div>
                      <div className="text-lg font-bold">{day.high}°</div>
                      <div className="text-sm text-muted-foreground">{day.low}°</div>
                      <div className="text-xs text-blue-500 mt-1 flex items-center justify-center gap-1">
                        <Droplets className="w-3 h-3" />
                        {day.rain}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fish className="w-5 h-5 text-primary" />
                  Farming Advice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getFarmingAdvice().map((advice, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      advice.type === "warning"
                        ? "bg-amber-50 border border-amber-200"
                        : advice.type === "alert"
                          ? "bg-rose-50 border border-rose-200"
                          : advice.type === "success"
                            ? "bg-emerald-50 border border-emerald-200"
                            : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          advice.type === "warning"
                            ? "text-amber-500"
                            : advice.type === "alert"
                              ? "text-rose-500"
                              : advice.type === "success"
                                ? "text-emerald-500"
                                : "text-blue-500"
                        }`}
                      />
                      <span className="font-semibold text-foreground">{advice.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{advice.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Water Temperature Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { range: "< 15°C", status: "Stop Feeding", color: "bg-blue-500" },
                    { range: "15-20°C", status: "Reduce Feed 50%", color: "bg-cyan-500" },
                    { range: "20-28°C", status: "Normal Feeding", color: "bg-emerald-500" },
                    { range: "28-32°C", status: "Monitor Closely", color: "bg-amber-500" },
                    { range: "> 32°C", status: "Reduce Activity", color: "bg-rose-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm">{item.range}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground text-center">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
