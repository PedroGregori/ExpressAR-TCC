import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { useSentenceBuilder } from '@/hooks/useSentenceBuilder'
import { useTextToSpeech } from '@/hooks/useAudio'

export default function SentenceBuilder() {
  const { frase, remover, limpar } = useSentenceBuilder()
  const { falar, parar, falando } = useTextToSpeech()

  function handleFalar() {
    if (falando) {
      parar()
      return
    }

    const texto = frase.map((p) => p.nome).join(' ')
    if (!texto) return

    falar(texto)
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {frase.map((p) => (
          <TouchableOpacity key={p.uid} onPress={() => remover(p.uid)}>
            <Image source={{ uri: p.imagemUrl }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.apagar} onPress={limpar}>
          <Text style={styles.text}>Apagar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.falar} onPress={handleFalar}>
          <Text style={styles.text}>
            {falando ? 'Parar' : 'Falar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B3D7E6',
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  apagar: {
    backgroundColor: '#E57373',
    padding: 10,
    borderRadius: 10,
  },
  falar: {
    backgroundColor: '#FFB74D',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
})