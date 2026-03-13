"use client";

import { useState } from "react";
import { Scale } from "lucide-react";

export default function BMICalculator() {
  const [lengte, setLengte] = useState("")
  const [gewicht, setGewicht] = useState("")
  const [geslacht, setGeslacht] = useState<"man" | "vrouw">("man")
  const [resultaat, setResultaat] = useState<{
    bmi: number
    categorie: string
    kleur: string
  } | null>(null)

  const bereken = () => {
    const l = parseFloat(lengte) / 100 // cm naar m
    const g = parseFloat(gewicht)
    
    if (isNaN(l) || isNaN(g) || l <= 0) return
    
    const bmi = g / (l * l)
    
    let categorie, kleur
    if (bmi < 18.5) {
      categorie = "Ondergewicht"
      kleur = "text-blue-600"
    } else if (bmi < 25) {
      categorie = "Gezond gewicht"
      kleur = "text-green-600"
    } else if (bmi < 30) {
      categorie = "Overgewicht"
      kleur = "text-orange-600"
    } else {
      categorie = "Obesitas"
      kleur = "text-red-600"
    }
    
    setResultaat({
      bmi: Math.round(bmi * 10) / 10,
      categorie,
      kleur,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Calculator</h1>
        <p className="text-gray-600">Bereken je Body Mass Index.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Lengte (cm)</label>
          <input
            type="number"
            value={lengte}
            onChange={(e) => setLengte(e.target.value)}
            placeholder="175"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gewicht (kg)</label>
          <input
            type="number"
            value={gewicht}
            onChange={(e) => setGewicht(e.target.value)}
            placeholder="70"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Geslacht</label>
          <div className="flex gap-4">
            <button
              onClick={() => setGeslacht("man")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                geslacht === "man"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Man
            </button>
            <button
              onClick={() => setGeslacht("vrouw")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                geslacht === "vrouw"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Vrouw
            </button>
          </div>
        </div>

        <button
          onClick={bereken}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mb-6"
        >
          Bereken BMI
        </button>

        {resultaat && (
          <div className="p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-2">Jouw BMI</p>
            <p className="text-5xl font-bold text-gray-900 mb-2">{resultaat.bmi}</p>
            <p className={`text-xl font-medium ${resultaat.kleur}`}>{resultaat.categorie}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2">BMI Schaal:</h4>
          <ul className="text-sm space-y-1 text-gray-600">
            <li><span className="text-blue-600">●</span> Onder 18.5 = Ondergewicht</li>
            <li><span className="text-green-600">●</span> 18.5 - 24.9 = Gezond</li>
            <li><span className="text-orange-600">●</span> 25 - 29.9 = Overgewicht</li>
            <li><span className="text-red-600">●</span> 30+ = Obesitas</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
