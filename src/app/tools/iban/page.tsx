"use client";

import { useState } from "react";
import { Hash, Check, X } from "lucide-react";

export default function IBANChecker() {
  const [iban, setIban] = useState("")
  const [resultaat, setResultaat] = useState<{ valid: boolean; message: string } | null>(null)

  const validateIBAN = (iban: string): boolean => {
    const clean = iban.replace(/\s/g, "").toUpperCase()
    
    if (clean.length < 15 || clean.length > 34) return false
    
    // Move first 4 chars to end
    const rearranged = clean.slice(4) + clean.slice(0, 4)
    
    // Replace letters with numbers
    let numeric = ""
    for (const char of rearranged) {
      if (/[A-Z]/.test(char)) {
        numeric += (char.charCodeAt(0) - 55).toString()
      } else {
        numeric += char
      }
    }
    
    // Check mod 97
    let remainder = ""
    for (const digit of numeric) {
      remainder += digit
      if (remainder.length > 9) {
        remainder = (parseInt(remainder) % 97).toString()
      }
    }
    
    return parseInt(remainder) % 97 === 1
  }

  const checkIBAN = () => {
    const clean = iban.replace(/\s/g, "")
    
    if (clean.length === 0) {
      setResultaat({ valid: false, message: "Vul een IBAN in" })
      return
    }

    const isValid = validateIBAN(iban)
    
    if (isValid) {
      const formatted = iban.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim()
      setResultaat({ 
        valid: true, 
        message: `Geldig IBAN: ${formatted}` 
      })
    } else {
      setResultaat({ 
        valid: false, 
        message: "Ongeldig IBAN nummer" 
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IBAN Checker</h1>
        <p className="text-gray-600">Controleer of een IBAN nummer geldig is.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">IBAN nummer</label>
          <input
            type="text"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            placeholder="NL91 ABNA 0417 1643 00"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg tracking-wide"
          />
          <p className="text-xs text-gray-500 mt-1">Spaties zijn optioneel</p>
        </div>

        <button
          onClick={checkIBAN}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <Hash className="w-5 h-5" />
          Controleer IBAN
        </button>

        {resultaat && (
          <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
            resultaat.valid ? "bg-green-50" : "bg-red-50"
          }`}>
            {resultaat.valid ? (
              <>
                <Check className="w-6 h-6 text-green-600" />
                <p className="text-green-700 font-medium">{resultaat.message}</p>
              </>
            ) : (
              <>
                <X className="w-6 h-6 text-red-600" />
                <p className="text-red-700 font-medium">{resultaat.message}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
