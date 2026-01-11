"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Fish, Droplets, Calendar, AlertCircle, Download, RefreshCw, TrendingUp } from "lucide-react"

const fishSpecies = [
  { id: "rohu", name: "Rohu (Labeo rohita)", feedRate: 3, proteinReq: 30 },
  { id: "catla", name: "Catla (Catla catla)", feedRate: 2.8, proteinReq: 32 },
  { id: "mrigal", name: "Mrigal (Cirrhinus mrigala)", feedRate: 2.5, proteinReq: 28 },
  { id: "pangasius", name: "Pangasius (Pangasianodon)", feedRate: 3.5, proteinReq: 35 },
  { id: "tilapia", name: "Tilapia (Oreochromis)", feedRate: 3.2, proteinReq: 32 },
  { id: "carp", name: "Common Carp (Cyprinus)", feedRate: 2.8, proteinReq: 30 },
  { id: "murrel", name: "Murrel (Channa striata)", feedRate: 4, proteinReq: 40 },
]

const growthStages = [
  { id: "fry", name: "Fry (0-5g)", multiplier: 1.5 },
  { id: "fingerling", name: "Fingerling (5-50g)", multiplier: 1.2 },
  { id: "juvenile", name: "Juvenile (50-200g)", multiplier: 1.0 },
  { id: "growout", name: "Grow-out (200g+)", multiplier: 0.8 },
]

export default function FeedCalculatorPage() {
  const [species, setSpecies] = useState("")
  const [stage, setStage] = useState("")
  const [fishCount, setFishCount] = useState("")
  const [avgWeight, setAvgWeight] = useState("")
  const [waterTemp, setWaterTemp] = useState("")
  const [pondArea, setPondArea] = useState("")
  const [result, setResult] = useState(null)

  const [scheduleData, setScheduleData] = useState({
    species: "",
    totalBiomass: "",
    feedingDays: "30",
    feedType: "floating",
  })
  const [schedule, setSchedule] = useState(null)

  const calculateFeed = () => {
    if (!species || !stage || !fishCount || !avgWeight) {
      return
    }

    const selectedSpecies = fishSpecies.find((s) => s.id === species)
    const selectedStage = growthStages.find((s) => s.id === stage)

    const totalBiomass = Number.parseFloat(fishCount) * Number.parseFloat(avgWeight)
    const baseFeedRate = selectedSpecies.feedRate
    const stageMultiplier = selectedStage.multiplier

    // Adjust for temperature
    let tempMultiplier = 1
    if (waterTemp) {
      const temp = Number.parseFloat(waterTemp)
      if (temp < 20) tempMultiplier = 0.5
      else if (temp < 25) tempMultiplier = 0.8
      else if (temp > 32) tempMultiplier = 0.7
      else tempMultiplier = 1
    }

    const dailyFeedKg = (totalBiomass / 1000) * (baseFeedRate / 100) * stageMultiplier * tempMultiplier
    const monthlyFeedKg = dailyFeedKg * 30

    setResult({
      dailyFeed: dailyFeedKg.toFixed(2),
      monthlyFeed: monthlyFeedKg.toFixed(2),
      feedingFrequency:
        selectedStage.id === "fry" ? "4-5 times" : selectedStage.id === "fingerling" ? "3-4 times" : "2-3 times",
      proteinRequirement: selectedSpecies.proteinReq,
      totalBiomass: (totalBiomass / 1000).toFixed(2),
      feedRate: (baseFeedRate * stageMultiplier * tempMultiplier).toFixed(1),
    })
  }

  const generateSchedule = () => {
    if (!scheduleData.species || !scheduleData.totalBiomass) return

    const selectedSpecies = fishSpecies.find((s) => s.id === scheduleData.species)
    const biomass = Number.parseFloat(scheduleData.totalBiomass)
    const days = Number.parseInt(scheduleData.feedingDays)

    const weeklySchedule = []
    for (let week = 1; week <= Math.ceil(days / 7); week++) {
      const growthFactor = 1 + (week - 1) * 0.02
      const adjustedBiomass = biomass * growthFactor
      const dailyFeed = (adjustedBiomass * selectedSpecies.feedRate) / 100

      weeklySchedule.push({
        week,
        estimatedBiomass: adjustedBiomass.toFixed(0),
        dailyFeed: dailyFeed.toFixed(2),
        weeklyFeed: (dailyFeed * 7).toFixed(2),
        feedType: scheduleData.feedType === "floating" ? "Floating Pellets" : "Sinking Pellets",
      })
    }

    setSchedule({
      species: selectedSpecies.name,
      scheduleData: weeklySchedule,
      totalFeed: weeklySchedule.reduce((acc, w) => acc + Number.parseFloat(w.weeklyFeed), 0).toFixed(2),
    })
  }

  const resetCalculator = () => {
    setSpecies("")
    setStage("")
    setFishCount("")
    setAvgWeight("")
    setWaterTemp("")
    setPondArea("")
    setResult(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Feed Calculator</h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            Calculate optimal feed quantities and create feeding schedules based on your fish species, pond conditions,
            and growth targets.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="calculator">
          <TabsList className="mb-8">
            <TabsTrigger value="calculator" className="gap-2">
              <Calculator className="w-4 h-4" />
              Feed Calculator
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="w-4 h-4" />
              Feed Schedule
            </TabsTrigger>
            <TabsTrigger value="management" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Feed Management Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fish className="w-5 h-5 text-primary" />
                    Enter Pond Details
                  </CardTitle>
                  <CardDescription>Provide information about your fish stock and pond conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Fish Species</Label>
                      <Select value={species} onValueChange={setSpecies}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select species" />
                        </SelectTrigger>
                        <SelectContent>
                          {fishSpecies.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Growth Stage</Label>
                      <Select value={stage} onValueChange={setStage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {growthStages.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Number of Fish</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 5000"
                        value={fishCount}
                        onChange={(e) => setFishCount(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Average Weight (grams)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 150"
                        value={avgWeight}
                        onChange={(e) => setAvgWeight(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Water Temperature (°C)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 28"
                        value={waterTemp}
                        onChange={(e) => setWaterTemp(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Pond Area (sq ft) - Optional</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 10000"
                        value={pondArea}
                        onChange={(e) => setPondArea(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={calculateFeed} className="flex-1">
                      <Calculator className="mr-2 w-4 h-4" />
                      Calculate Feed
                    </Button>
                    <Button variant="outline" onClick={resetCalculator}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {result ? (
                  <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Droplets className="w-5 h-5" />
                        Feeding Recommendation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-lg p-4">
                          <div className="text-3xl font-bold">{result.dailyFeed} kg</div>
                          <div className="text-sm text-white/80">Daily Feed Required</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <div className="text-3xl font-bold">{result.monthlyFeed} kg</div>
                          <div className="text-sm text-white/80">Monthly Feed Required</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <div className="text-2xl font-bold">{result.feedingFrequency}</div>
                          <div className="text-sm text-white/80">Feeding Frequency/Day</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <div className="text-2xl font-bold">{result.proteinRequirement}%</div>
                          <div className="text-sm text-white/80">Protein Requirement</div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/20">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-white/70">Total Biomass:</span>
                            <span className="ml-2 font-semibold">{result.totalBiomass} kg</span>
                          </div>
                          <div>
                            <span className="text-white/70">Feed Rate:</span>
                            <span className="ml-2 font-semibold">{result.feedRate}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-lg bg-muted">
                    <CardContent className="p-8 text-center">
                      <Calculator className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Enter Details to Calculate</h3>
                      <p className="text-muted-foreground">
                        Fill in the pond details on the left to get personalized feed recommendations.
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      Important Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• Adjust feeding based on actual fish response and water quality</p>
                    <p>• Reduce feeding during disease outbreaks or poor water quality</p>
                    <p>• Monitor dissolved oxygen levels, especially after feeding</p>
                    <p>• Feed at consistent times each day for best results</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Generate Schedule</CardTitle>
                  <CardDescription>Create a weekly feeding schedule for your pond</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Fish Species</Label>
                    <Select
                      value={scheduleData.species}
                      onValueChange={(v) => setScheduleData({ ...scheduleData, species: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent>
                        {fishSpecies.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Total Biomass (kg)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 500"
                      value={scheduleData.totalBiomass}
                      onChange={(e) => setScheduleData({ ...scheduleData, totalBiomass: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Schedule Duration (days)</Label>
                    <Select
                      value={scheduleData.feedingDays}
                      onValueChange={(v) => setScheduleData({ ...scheduleData, feedingDays: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">1 Week</SelectItem>
                        <SelectItem value="14">2 Weeks</SelectItem>
                        <SelectItem value="30">1 Month</SelectItem>
                        <SelectItem value="60">2 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Feed Type</Label>
                    <Select
                      value={scheduleData.feedType}
                      onValueChange={(v) => setScheduleData({ ...scheduleData, feedType: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="floating">Floating Pellets</SelectItem>
                        <SelectItem value="sinking">Sinking Pellets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={generateSchedule} className="w-full">
                    <Calendar className="mr-2 w-4 h-4" />
                    Generate Schedule
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-2">
                {schedule ? (
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Weekly Feeding Schedule</CardTitle>
                        <CardDescription>{schedule.species}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 w-4 h-4" />
                        Export
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 font-semibold">Week</th>
                              <th className="text-left py-3 px-4 font-semibold">Est. Biomass (kg)</th>
                              <th className="text-left py-3 px-4 font-semibold">Daily Feed (kg)</th>
                              <th className="text-left py-3 px-4 font-semibold">Weekly Feed (kg)</th>
                              <th className="text-left py-3 px-4 font-semibold">Feed Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.scheduleData.map((row) => (
                              <tr key={row.week} className="border-b border-border hover:bg-muted/50">
                                <td className="py-3 px-4 font-medium">Week {row.week}</td>
                                <td className="py-3 px-4">{row.estimatedBiomass}</td>
                                <td className="py-3 px-4">{row.dailyFeed}</td>
                                <td className="py-3 px-4 font-semibold text-primary">{row.weeklyFeed}</td>
                                <td className="py-3 px-4">{row.feedType}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-muted">
                              <td colSpan={3} className="py-3 px-4 font-semibold">
                                Total Feed Required
                              </td>
                              <td className="py-3 px-4 font-bold text-primary">{schedule.totalFeed} kg</td>
                              <td></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-lg bg-muted h-full flex items-center justify-center">
                    <CardContent className="text-center py-12">
                      <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Schedule Generated</h3>
                      <p className="text-muted-foreground">
                        Fill in the details and click Generate to create your feeding schedule.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="management">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Optimal Feeding Times",
                  tips: [
                    "Feed during cooler parts of the day (morning and evening)",
                    "Avoid feeding during extreme heat",
                    "Maintain consistent feeding schedule",
                    "Wait 2-3 hours after sunrise for first feeding",
                  ],
                },
                {
                  title: "Feed Quality",
                  tips: [
                    "Store feed in cool, dry place",
                    "Use feed within 3 months of manufacture",
                    "Check for mold or off-odor before use",
                    "Match protein content to fish species and stage",
                  ],
                },
                {
                  title: "Monitoring",
                  tips: [
                    "Observe fish behavior during feeding",
                    "Check if all feed is consumed in 20-30 minutes",
                    "Monitor water quality after feeding",
                    "Adjust quantities based on fish response",
                  ],
                },
                {
                  title: "Seasonal Adjustments",
                  tips: [
                    "Reduce feeding in winter months",
                    "Increase frequency in warm weather",
                    "Stop feeding if water temp drops below 15°C",
                    "Consider supplemental feeding during monsoon",
                  ],
                },
                {
                  title: "Water Quality",
                  tips: [
                    "Maintain DO levels above 5 mg/L",
                    "Keep ammonia below 0.02 mg/L",
                    "Regular water exchange after heavy feeding",
                    "Use aerators during and after feeding",
                  ],
                },
                {
                  title: "Cost Management",
                  tips: [
                    "Buy in bulk during off-season",
                    "Use FCR to track feed efficiency",
                    "Consider supplemental natural feed",
                    "Avoid overfeeding - increases costs and pollution",
                  ],
                },
              ].map((section, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
