import { Stack } from 'expo-router'
import { SentenceProvider } from '@/hooks/useSentenceBuilder'

export default function Layout() {
  return (
    <SentenceProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SentenceProvider>
  )
}

