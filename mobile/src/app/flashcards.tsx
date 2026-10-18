import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header, Screen } from '@/components/ui';
import { colors, type } from '@/constants/theme';
import { flashcards } from '@/data/content';
import type { Flashcard } from '@/data/expanded-content';
import { useProgress } from '@/state/progress';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export default function FlashcardsScreen() {
  const [level, setLevel] = useState<(typeof levels)[number] | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { mastered, masterWord } = useProgress();
  const cards = flashcards.filter((item): item is Flashcard => 'level' in item && item.level === level);
  const card = cards[index];
  const selectLevel = (nextLevel: (typeof levels)[number]) => { setLevel(nextLevel); setIndex(0); setFlipped(false); };
  const next = () => { setFlipped(false); setIndex((value) => (value + 1) % cards.length); };

  if (!level) {
    return <Screen><Header eyebrow="VOCABULARIO · 120+ TARJETAS" title="Flashcards por nivel" subtitle="Construye vocabulario útil y progresivo desde A1 hasta C2." /><View style={styles.levelGrid}>{levels.map((item) => { const levelCards = flashcards.filter((entry) => 'level' in entry && entry.level === item); const known = levelCards.filter((entry) => mastered.includes(entry.word)).length; return <Pressable key={item} onPress={() => selectLevel(item)} style={styles.levelCard}><View style={styles.levelBadge}><Text style={styles.levelBadgeText}>{item}</Text></View><View style={styles.flex}><Text style={styles.levelTitle}>Vocabulario {item}</Text><Text style={styles.levelMeta}>{levelCards.length} tarjetas · {known} dominadas</Text></View><Text style={styles.chevron}>›</Text></Pressable>; })}</View></Screen>;
  }

  const flip = () => { setFlipped((value) => !value); void Haptics.selectionAsync(); };
  const know = () => { if (!mastered.includes(card.word)) void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); masterWord(card.word); next(); };
  return <Screen><Pressable onPress={() => setLevel(null)}><Text style={styles.backLink}>‹ Niveles de flashcards</Text></Pressable><Header eyebrow={`REPASO ${level}`} title="Flashcards" subtitle="Toca la tarjeta para revelar el significado." /><View style={styles.meta}><Text>{index + 1} de {cards.length}</Text><Text style={styles.star}>★ {cards.filter((item) => mastered.includes(item.word)).length} dominadas</Text></View><Pressable onPress={flip} style={styles.scene}>{!flipped ? <View style={[styles.card, styles.front]}><Text style={styles.spark}>✦</Text><View><Text style={styles.type}>{card.type.toUpperCase()} · {card.level}</Text><Text style={styles.word}>{card.word}</Text></View><Text style={styles.tap}>Toca para descubrir ↻</Text></View> : <View style={[styles.card, styles.back]}><View><Text style={styles.backLabel}>SIGNIFICADO</Text><Text style={styles.meaning}>{card.meaning}</Text><Text style={styles.example}>“{card.example}”</Text></View><Text style={styles.backWord}>{card.word}</Text></View>}</Pressable><View style={styles.actions}><Pressable onPress={next} style={styles.review}><Text style={styles.actionIcon}>↻</Text><Text style={styles.reviewText}>Repasar</Text></Pressable><Pressable onPress={know} style={styles.know}><Text style={styles.actionIcon}>✓</Text><Text style={styles.knowText}>La sé · +5 XP</Text></Pressable></View></Screen>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, backLink: { color: colors.coral, fontWeight: '800', marginBottom: 18 }, levelGrid: { gap: 10 }, levelCard: { minHeight: 78, borderRadius: 19, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.paper, flexDirection: 'row', alignItems: 'center', padding: 13, gap: 13 }, levelBadge: { width: 49, height: 49, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lavender }, levelBadgeText: { fontFamily: type.rounded, fontSize: 17, fontWeight: '900', color: colors.ink }, levelTitle: { fontWeight: '900', fontSize: 15, color: colors.ink }, levelMeta: { fontSize: 11, color: colors.muted, marginTop: 4 }, chevron: { fontSize: 27, color: colors.muted },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }, star: { color: '#A98219', fontWeight: '800' }, scene: { height: 370 }, card: { position: 'absolute', width: '100%', height: '100%', borderRadius: 29, padding: 25, alignItems: 'center', justifyContent: 'space-between' }, front: { backgroundColor: colors.yellow }, back: { backgroundColor: '#302F29', justifyContent: 'center' }, spark: { alignSelf: 'flex-end', fontSize: 28, color: '#9E8C37' }, type: { fontSize: 10, fontWeight: '900', letterSpacing: 1.4, color: '#665D32', textAlign: 'center' }, word: { fontFamily: type.rounded, fontWeight: '900', fontSize: 38, color: colors.ink, marginTop: 7, textAlign: 'center' }, tap: { fontSize: 11, color: '#665D32' }, backLabel: { fontSize: 10, fontWeight: '900', letterSpacing: 1.4, color: colors.yellow, textAlign: 'center' }, meaning: { fontFamily: type.rounded, fontWeight: '900', fontSize: 30, color: 'white', textAlign: 'center', marginTop: 12 }, example: { color: '#C8C3BA', fontStyle: 'italic', fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 20 }, backWord: { color: colors.yellow, fontWeight: '900', marginTop: 45 }, actions: { flexDirection: 'row', gap: 11, marginTop: 18 }, review: { flex: 1, height: 58, borderRadius: 17, borderColor: colors.line, borderWidth: 1, backgroundColor: colors.paper, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, know: { flex: 1, height: 58, borderRadius: 17, backgroundColor: colors.coral, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, actionIcon: { fontSize: 20 }, reviewText: { fontWeight: '800', color: colors.ink }, knowText: { fontWeight: '800', color: 'white' },
});
