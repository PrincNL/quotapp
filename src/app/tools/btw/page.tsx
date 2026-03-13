"use client";

import { useState } from "react";
import { Calculator, ArrowRight, ArrowLeft } from "lucide-react";

export default function BTWCalculator() {
  const [bedrag, setBedrag] = useState("")
  const [btwType, setBtwType] = useState(21)
  const [mode, setMode] = useState<"excl" | "incl">("excl")
  const [resultaat, setResultaat] = useState<{
    excl: number
    btw: number
    incl: number
  } | null>(null)

  const bereken = () => {
    const bedragNum = parseFloat(bedrag.replace(",", "."))
    if (isNaN(bedragNum)) return

    let excl, btw, incl

    if (mode === "excl") {
      // Bedrag is exclusief BTW
      excl = bedragNum
      btw = bedragNum * (btwType / 100)
      incl = excl + btw
    } else {
      // Bedrag is inclusief BTW
      incl = bedragNum
      excl = incl / (1 + btwType / 100)
      btw = incl - excl
    }

    setResultaat({
      excl: Math.round(excl * 100) / 100,
      btw: Math.round(btw * 100) / 100,
      incl: Math.round(incl * 100) / 100,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BTW Calculator</h1>
        <p className="text-gray-600">
          Bereken BTW over elk bedrag. Ondersteunt 21%, 9% en 0%.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
          {/* Mode Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode("excl")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                mode === "excl"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Excl. BTW → Incl. BTW
            </button>
            <button
              onClick={() => setMode("incl")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                mode === "incl"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Incl. BTW → Excl. BTW
            </button>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === "excl" ? "Bedrag exclusief BTW (€)" : "Bedrag inclusief BTW (€)"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
              <input
                type="text"
                value={bedrag}
                onChange={(e) => setBedrag(e.target.value)}
                placeholder="0,00"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* BTW Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">BTW Percentage</label>
            <div className="flex gap-3">
              {[21, 9, 0].map((percentage) => (
                <button
                  key={percentage}
                  onClick={() => setBtwType(percentage)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    btwType === percentage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {percentage}%
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {btwType === 21 && "Hoog tarief (standaard)"}
              {btwType === 9 && "Laag tarief (eten, boeken, etc.)"}
              {btwType === 0 && "Vrijgesteld (export, onderwijs)"}
            </p>
          </div>

          <button
            onClick={bereken}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Berekenen
          </button>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-900">Resultaat</h3>
          
          {resultaat ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${mode === "excl" ? "bg-gray-100" : "bg-blue-50 border-2 border-blue-200"}`}>
                <p className="text-sm text-gray-600">Exclusief BTW</p>
                <p className="text-2xl font-bold text-gray-900">€ {resultaat.excl.toFixed(2).replace(".", ",")}</p>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">BTW ({btwType}%)</p>
                <p className="text-xl font-bold text-yellow-700">€ {resultaat.btw.toFixed(2).replace(".", ",")}</p>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className={`p-4 rounded-lg ${mode === "incl" ? "bg-gray-100" : "bg-green-50 border-2 border-green-200"}`}>
                <p className="text-sm text-gray-600">Inclusief BTW</p>
                <p className="text-2xl font-bold text-gray-900">€ {resultaat.incl.toFixed(2).replace(".", ",")}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Calculator className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Vul een bedrag in en klik op berekenen</p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hoe werkt de BTW calculator?</h2>
        <div className="prose text-gray-600">
          <p className="mb-4">
            Met deze BTW calculator kun je eenvoudig btw berekenen over elk bedrag. 
            Je kunt kiezen of je wilt berekenen van exclusief naar inclusief btw, 
            of juist andersom. De calculator ondersteunt alle Nederlandse btw-tarieven:
          </p>
          
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>21% btw</strong> - Het standaard btw-tarief voor de meeste producten en diensten</li>
            <li><strong>9% btw</strong> - Verlaagd tarief voor onder andere eten, boeken en arbeid</li>
            <li><strong>0% btw</strong> - Vrijgesteld, bijvoorbeeld voor export of onderwijs</li>
          </ul>
          
          <p>
            De calculator werkt direct in je browser en slaat geen gegevens op. 
            Handig voor ondernemers, boekhouders en iedereen die snel een btw-berekening wil maken!
          </p>
        </div>
      </div>
    </div>
  )
}
