"use client";

import { useState } from "react";
import { Percent } from "lucide-react";

export default function ProcentCalculator() {
  const [mode, setMode] = useState<"van" | "percentage" | "stijging">("van")
  const [waarde1, setWaarde1] = useState("")
  const [waarde2, setWaarde2] = useState("")
  const [resultaat, setResultaat] = useState<string | null>(null)

  const bereken = () => {
    const num1 = parseFloat(waarde1.replace(",", "."))
    const num2 = parseFloat(waarde2.replace(",", "."))
    
    if (isNaN(num1) || isNaN(num2)) return

    let result
    switch (mode) {
      case "van":
        // Wat is X% van Y?
        result = (num1 / 100) * num2
        setResultaat(`${num1}% van ${num2} = ${result.toFixed(2).replace(".", ",")}`)
        break
      case "percentage":
        // X is hoeveel % van Y?
        result = (num1 / num2) * 100
        setResultaat(`${num1} is ${result.toFixed(2).replace(".", ",")}% van ${num2}`)
        break
      case "stijging":
        // Percentage stijging/daling van X naar Y
        result = ((num2 - num1) / num1) * 100
        const type = result >= 0 ? "stijging" : "daling"
        setResultaat(`Van ${num1} naar ${num2} = ${Math.abs(result).toFixed(2).replace(".", ",")}% ${type}`)
        break
    }
  }

  const labels = {
    van: { l1: "Percentage (%)", l2: "Van bedrag" },
    percentage: { l1: "Deel", l2: "Totaal" },
    stijging: { l1: "Oude waarde", l2: "Nieuwe waarde" },
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Procent Calculator</h1>
        <p className="text-gray-600">Alle percentage berekeningen in één tool.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <div className="flex gap-2 mb-6">
          {[
            { key: "van", label: "X% van Y" },
            { key: "percentage", label: "X is % van Y" },
            { key: "stijging", label: "% stijging" },
          ].map((m) => (
            <button
              key={m.key}
              onClick={() => { setMode(m.key as any); setResultaat(null) }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                mode === m.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{labels[mode].l1}</label>
            <input
              type="text"
              value={waarde1}
              onChange={(e) => setWaarde1(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{labels[mode].l2}</label>
            <input
              type="text"
              value={waarde2}
              onChange={(e) => setWaarde2(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={bereken}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Berekenen
        </button>

        {resultaat && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-700">{resultaat}</p>
          </div>
        )}
      </div>
    </div>
  )
}
