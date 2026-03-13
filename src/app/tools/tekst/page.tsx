"use client";

import { useState } from "react";
import { Type, Clock, Hash, AlignLeft } from "lucide-react";

export default function TekstTools() {
  const [tekst, setTekst] = useState("")
  
  const stats = {
    karakters: tekst.length,
    karaktersZonderSpaties: tekst.replace(/\s/g, "").length,
    woorden: tekst.trim() === "" ? 0 : tekst.trim().split(/\s+/).length,
    zinnen: tekst.split(/[.!?]+/).filter(Boolean).length,
    leestijd: Math.ceil((tekst.trim() === "" ? 0 : tekst.trim().split(/\s+/).length) / 200), // 200 wpm
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tekst)
  }

  const clearText = () => {
    setTekst("")
  }

  const convertToUpper = () => setTekst(tekst.toUpperCase())
  const convertToLower = () => setTekst(tekst.toLowerCase())

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tekst Tools</h1>
        <p className="text-gray-600">Analyseer en bewerk je tekst.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-4">
            <textarea
              value={tekst}
              onChange={(e) => setTekst(e.target.value)}
              placeholder="Plak of typ je tekst hier..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={convertToUpper} className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">HOOFDLETTERS</button>
              <button onClick={convertToLower} className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">kleine letters</button>
              <button onClick={copyToClipboard} className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">Kopiëren</button>
              <button onClick={clearText} className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm">Wissen</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-bold mb-4">Statistieken</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2"><Hash className="w-4 h-4" /> Karakters</span>
                <span className="font-bold">{stats.karakters}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Zonder spaties</span>
                <span className="font-bold">{stats.karaktersZonderSpaties}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2"><AlignLeft className="w-4 h-4" /> Woorden</span>
                <span className="font-bold">{stats.woorden}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Zinnen</span>
                <span className="font-bold">{stats.zinnen}</span>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-gray-600 flex items-center gap-2"><Clock className="w-4 h-4" /> Leestijd</span>
                <span className="font-bold text-blue-600">~{stats.leestijd} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
