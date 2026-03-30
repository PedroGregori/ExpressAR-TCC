// services/speechService.ts
import * as Speech from 'expo-speech'

export function falarTexto(texto: string) {
  Speech.speak(texto, {
    language: 'pt-BR', // ou outro idioma
    rate: 1.0,
    pitch: 1.0,
  })
}

export function pararFala() {
  Speech.stop()
}