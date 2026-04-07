import { useState } from 'react'
import * as Speech from 'expo-speech'

export function useTextToSpeech() {
  const [falando, setFalando] = useState(false)

  function falar(texto: string, onStart?: () => void) {
    if (falando) return

    setFalando(true)

    // 🔥 chama callback quando começa
    onStart?.()

    Speech.speak(texto, {
      language: 'pt-BR',
      rate: 1.2,
      pitch: 1.0,
      onDone: () => setFalando(false),
      onStopped: () => setFalando(false),
      onError: () => setFalando(false),
    })
  }

  function parar() {
    Speech.stop()
    setFalando(false)
  }

  return { falar, parar, falando }
}