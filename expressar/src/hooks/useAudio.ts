import { useState } from 'react'
import * as Speech from 'expo-speech'

export function useTextToSpeech() {
  const [falando, setFalando] = useState(false)

  function falar(texto: string) {
    if (falando) return
    setFalando(true)

    Speech.speak(texto, {
      language: 'pt-BR',
      rate: 1.4,
      pitch: 1.0,
      onDone: () => setFalando(false),
      onStopped: () => setFalando(false),
      onError: () => setFalando(false),
    })
  }

  return { falar, falando }
}