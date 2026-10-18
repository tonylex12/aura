import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { ProgressProvider } from '@/state/progress';
import { colors } from '@/constants/theme';

const icons: Record<string, string> = { index: '⌂', grammar: 'Aa', quiz: '?', flashcards: '▱', dictionary: '⌕' };

export default function RootLayout() {
  return (
    <ProgressProvider>
      <StatusBar style="dark" />
      <Tabs screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.coral,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { height: 76, paddingTop: 8, paddingBottom: 10, backgroundColor: colors.paper, borderTopColor: colors.line },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: route.name === 'grammar' ? 15 : 22, fontWeight: '900' }}>{icons[route.name]}</Text>,
      })}>
        <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
        <Tabs.Screen name="grammar" options={{ title: 'Gramática' }} />
        <Tabs.Screen name="quiz" options={{ title: 'Quiz' }} />
        <Tabs.Screen name="flashcards" options={{ title: 'Tarjetas' }} />
        <Tabs.Screen name="dictionary" options={{ title: 'Diccionario' }} />
      </Tabs>
    </ProgressProvider>
  );
}
