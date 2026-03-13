"use client";

import { useState } from "react";
import { Home, TrendingUp, Percent } from "lucide-react";

export default function HypotheekCalculator() {
  const [inkomen, setInkomen] = useState("")
  const [rente, setRente] = useState("3.5")
  const [looptijd, setLooptijd] = useState(30)
  const [partnerInkomen, setPartnerInkomen] = useState("")
  const [resultaat, setResultaat] = useState<{
    maxHypotheek: number
    maandlasten: number
    totaalInkomen: number
  } | null>(null)

  const bereken = () => {
    const inkomenNum = parseFloat(inkomen) || 0
    const partnerNum = parseFloat(partnerInkomen) || 0
    const totaalInkomen = inkomenNum + partnerNum
    
    if (totaalInkomen <= 0) return

    // Max 4.5x jaarinkomen (conservatieve schatting)
    const maxHypotheek = totaalInkomen * 4.5
    
    // Maandlasten berekenen (annuïteitenhypotheek, benadering)
    const maandRente = parseFloat(rente) / 100 / 12
    const aantalMaanden = looptijd * 12
    
    let maandlasten = 0
    if (maandRente > 0) {
      maandlasten = maxHypotheek * (maandRente * Math.pow(1 + maandRente, aantalMaanden)) / (Math.pow(1 + maandRente, aantalMaanden) - 1)
    } else {
      maandlasten = maxHypotheek / aantalMaanden
    }

    setResultaat({
      maxHypotheek: Math.round(maxHypotheek),
      maandlasten: Math.round(maandlasten),
      totaalInkomen: Math.round(totaalInkomen),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hypotheek Calculator</h1>
        <p className="text-gray-600">Bereken je maximale hypotheek en maandlasten.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Jouw bruto jaarinkomen (€)</label>
            <input
              type="number"
              value={inkomen}
              onChange={(e) => setInkomen(e.target.value)}
              placeholder="45000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Partner bruto jaarinkomen (€, optioneel)</label>
            <input
              type="number"
              value={partnerInkomen}
              onChange={(e) => setPartnerInkomen(e.target.value)}
              placeholder="35000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rente (%)</label>
            <input
              type="number"
              step="0.1"
              value={rente}
              onChange={(e) => setRente(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Looptijd (jaren)</label>
            <select
              value={looptijd}
              onChange={(e) => setLooptijd(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {[10, 15, 20, 25, 30].map((jaren) => (
                <option key={jaren} value={jaren}>{jaren} jaar</option>
              ))}
            </select>
          </div>

          <button
            onClick={bereken}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Bereken hypotheek
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Resultaat</h3>
          
          {resultaat ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Maximale hypotheek</p>
                <p className="text-3xl font-bold text-green-700">€ {resultaat.maxHypotheek.toLocaleString("nl-NL")}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Maandlasten (bruto)</p>
                <p className="text-2xl font-bold text-blue-700">€ {resultaat.maandlasten.toLocaleString("nl-NL")}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Totaal inkomen</p>
                <p className="text-xl font-bold">€ {resultaat.totaalInkomen.toLocaleString("nl-NL")}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Home className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Vul je inkomen in</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
