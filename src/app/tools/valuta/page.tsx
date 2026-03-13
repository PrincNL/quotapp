"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

const rates: Record<string, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.83,
  CHF: 0.94,
  JPY: 162.5,
  CAD: 1.47,
  AUD: 1.65,
  CNY: 7.82,
}

export default function ValutaConverter() {
  const [bedrag, setBedrag] = useState("")
  const [van, setVan] = useState("EUR")
  const [naar, setNaar] = useState("USD")
  
  const convert = () => {
    const num = parseFloat(bedrag.replace(",", "."))
    if (isNaN(num)) return null
    
    const inEUR = num / rates[van]
    const result = inEUR * rates[naar]
    
    return {
      result: result.toFixed(2).replace(".", ","),
      rate: (rates[naar] / rates[van]).toFixed(4).replace(".", ","),
    }
  }

  const resultaat = convert()

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Valuta Converter</h1>
        <p className="text-gray-600">Zet bedragen om naar andere valuta.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bedrag</label>
          <input
            type="text"
            value={bedrag}
            onChange={(e) => setBedrag(e.target.value)}
            placeholder="100"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Van</label>
            <select
              value={van}
              onChange={(e) => setVan(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Naar</label>
            <select
              value={naar}
              onChange={(e) => setNaar(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => { setVan(naar); setNaar(van) }}
          className="w-full mb-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          ↓ Wissel valuta ↓
        </button>

        {resultaat && (
          <div className="p-6 bg-green-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-2">Wisselkoers: 1 {van} = {resultaat.rate} {naar}</p>
            <p className="text-4xl font-bold text-green-700">
              {resultaat.result} {naar}
            </p>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4 text-center">
          * Wisselkoersen zijn indicatief en worden niet live geüpdatet
        </p>
      </div>
    </div>
  )
}
