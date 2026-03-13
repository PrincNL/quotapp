"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

export default function DatumCalculator() {
  const [datum1, setDatum1] = useState("")
  const [datum2, setDatum2] = useState("")
  const [resultaat, setResultaat] = useState<{
    dagen: number
    weken: number
    maanden: number
    jaren: number
    werkdagen: number
  } | null>(null)

  const bereken = () => {
    if (!datum1 || !datum2) return
    
    const d1 = new Date(datum1)
    const d2 = new Date(datum2)
    
    const msPerDag = 1000 * 60 * 60 * 24
    const verschilMs = Math.abs(d2.getTime() - d1.getTime())
    const dagen = Math.floor(verschilMs / msPerDag)
    
    // Tel werkdagen
    let werkdagen = 0
    const start = new Date(Math.min(d1.getTime(), d2.getTime()))
    const end = new Date(Math.max(d1.getTime(), d2.getTime()))
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dag = d.getDay()
      if (dag !== 0 && dag !== 6) werkdagen++
    }
    
    setResultaat({
      dagen,
      weken: Math.floor(dagen / 7),
      maanden: Math.floor(dagen / 30.44),
      jaren: Math.floor(dagen / 365.25),
      werkdagen: Math.max(0, werkdagen - 1),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Datum Calculator</h1>
        <p className="text-gray-600">Bereken het verschil tussen twee datums.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Eerste datum</label>
            <input
              type="date"
              value={datum1}
              onChange={(e) => setDatum1(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tweede datum</label>
            <input
              type="date"
              value={datum2}
              onChange={(e) => setDatum2(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={bereken}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mb-6"
        >
          Bereken verschil
        </button>

        {resultaat && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Dagen</p>
              <p className="text-2xl font-bold text-blue-700">{resultaat.dagen}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Werkdagen</p>
              <p className="text-2xl font-bold text-green-700">{resultaat.werkdagen}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Weken</p>
              <p className="text-2xl font-bold">{resultaat.weken}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Maanden</p>
              <p className="text-2xl font-bold">{resultaat.maanden}</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg text-center col-span-2 md:col-span-1">
              <p className="text-sm text-gray-600">Jaren</p>
              <p className="text-2xl font-bold text-purple-700">{resultaat.jaren}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
