import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header, PrimaryButton, Screen } from '@/components/ui';
import { colors, type } from '@/constants/theme';
import { quizQuestions } from '@/data/content';
import type { QuizQuestion } from '@/data/expanded-content';
import { useProgress } from '@/state/progress';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export default function QuizScreen() {
  const [level, setLevel] = useState<(typeof levels)[number] | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { addXp } = useProgress();
  const questions = quizQuestions.filter((item): item is QuizQuestion => 'level' in item && item.level === level);
  const question = questions[index];

  const selectLevel = (nextLevel: (typeof levels)[number]) => {
    setLevel(nextLevel); setIndex(0); setAnswer(null); setScore(0); setFinished(false);
  };
  const choose = (choice: number) => {
    if (answer !== null || !question) return;
    setAnswer(choice);
    if (choice === question.answer) {
      setScore((value) => value + 1); addXp(10);
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };
  const next = () => {
    if (index === questions.length - 1) setFinished(true);
    else { setIndex((value) => value + 1); setAnswer(null); }
  };

  if (!level) {
    return <Screen><Header eyebrow="BANCO COMPLETO · 120+ PREGUNTAS" title="Quizzes por nivel" subtitle="Practica desde los fundamentos de A1 hasta los matices académicos de C2." />
      <View style={styles.levelGrid}>{levels.map((item) => { const count = quizQuestions.filter((q) => 'level' in q && q.level === item).length; return <Pressable key={item} onPress={() => selectLevel(item)} style={styles.levelCard}><View style={styles.levelBadge}><Text style={styles.levelBadgeText}>{item}</Text></View><View style={styles.flex}><Text style={styles.levelTitle}>Quiz {item}</Text><Text style={styles.levelMeta}>{count} preguntas · gramática y uso</Text></View><Text style={styles.chevron}>›</Text></Pressable>; })}</View>
    </Screen>;
  }

  if (finished) {
    return <Screen><Pressable onPress={() => setLevel(null)}><Text style={styles.back}>‹ Cambiar nivel</Text></Pressable><View style={styles.result}><Text style={styles.trophy}>🏆</Text><Text style={styles.resultTitle}>{score / questions.length >= 0.8 ? '¡Excelente trabajo!' : '¡Buen intento!'}</Text><Text style={styles.resultScore}>{score}/{questions.length}</Text><Text style={styles.resultText}>Has ganado {score * 10} XP. Elige dos estructuras del quiz y escribe un ejemplo propio con cada una.</Text></View><View style={styles.production}><Text style={styles.productionLabel}>PRODUCCIÓN ACTIVA</Text><Text style={styles.productionTitle}>Convierte conocimiento en comunicación</Text><Text style={styles.productionText}>1. Di una frase sobre tu vida.{"\n"}2. Transfórmala en negativa.{"\n"}3. Formula una pregunta con la misma estructura.</Text></View><PrimaryButton title={`Repetir nivel ${level}`} onPress={() => selectLevel(level)} /></Screen>;
  }

  return <Screen><Pressable onPress={() => setLevel(null)}><Text style={styles.back}>‹ Niveles de quiz</Text></Pressable><Header eyebrow={`PRÁCTICA ${level}`} title="Elige la respuesta" subtitle={`${questions.length} preguntas para dominar este nivel.`} /><View style={styles.progress}><View style={[styles.progressFill, { width: `${((index + 1) / questions.length) * 100}%` as `${number}%` }]} /></View><View style={styles.question}><Text style={styles.count}>{level} · {index + 1} / {questions.length}</Text><Text style={styles.prompt}>{question.prompt}</Text></View><View style={styles.options}>{question.options.map((option, i) => { const status = answer === null ? '' : i === question.answer ? 'correct' : i === answer ? 'wrong' : 'muted'; return <Pressable key={`${option}-${i}`} onPress={() => choose(i)} style={[styles.option, status === 'correct' && styles.correct, status === 'wrong' && styles.wrong, status === 'muted' && styles.muted]}><Text style={styles.letter}>{String.fromCharCode(65 + i)}</Text><Text style={styles.optionText}>{option}</Text>{status === 'correct' && <Text style={styles.check}>✓</Text>}{status === 'wrong' && <Text style={styles.cross}>×</Text>}</Pressable>; })}</View>{answer !== null && <View style={[styles.feedback, answer === question.answer ? styles.feedbackGood : styles.feedbackBad]}><Text style={styles.feedbackTitle}>{answer === question.answer ? '¡Muy bien! +10 XP' : 'Casi. Sigue practicando.'}</Text><Text style={styles.feedbackText}>{question.explanation}</Text><PrimaryButton title={index === questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'} onPress={next} /></View>}</Screen>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, back: { color: colors.coral, fontWeight: '800', marginBottom: 18 }, levelGrid: { gap: 10 }, levelCard: { minHeight: 78, borderRadius: 19, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.paper, flexDirection: 'row', alignItems: 'center', padding: 13, gap: 13 }, levelBadge: { width: 49, height: 49, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.yellow }, levelBadgeText: { fontFamily: type.rounded, fontSize: 17, fontWeight: '900', color: colors.ink }, levelTitle: { fontWeight: '900', fontSize: 15, color: colors.ink }, levelMeta: { fontSize: 11, color: colors.muted, marginTop: 4 }, chevron: { fontSize: 27, color: colors.muted },
  progress: { height: 7, backgroundColor: '#E5DED3', borderRadius: 9, overflow: 'hidden', marginBottom: 24 }, progressFill: { height: '100%', backgroundColor: colors.coral, borderRadius: 9 }, question: { minHeight: 178, backgroundColor: '#292922', borderRadius: 25, padding: 20, justifyContent: 'space-between' }, count: { color: '#B6B1A7', fontSize: 11 }, prompt: { color: 'white', fontFamily: type.rounded, fontWeight: '900', fontSize: 27, lineHeight: 35 }, options: { gap: 10, marginTop: 17 }, option: { minHeight: 58, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 17, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 12 }, letter: { width: 37, height: 37, borderRadius: 11, backgroundColor: '#F2EEE7', textAlign: 'center', textAlignVertical: 'center', fontWeight: '900', color: colors.ink }, optionText: { color: colors.ink, fontWeight: '700', flex: 1 }, correct: { backgroundColor: colors.mint, borderColor: colors.success }, wrong: { backgroundColor: colors.coralSoft, borderColor: colors.danger }, muted: { opacity: 0.45 }, check: { color: colors.success, fontSize: 20, fontWeight: '900' }, cross: { color: colors.danger, fontSize: 22, fontWeight: '900' }, feedback: { marginTop: 15, borderRadius: 19, padding: 15, gap: 5 }, feedbackGood: { backgroundColor: '#DCEEE2' }, feedbackBad: { backgroundColor: '#FAE2DD' }, feedbackTitle: { color: colors.ink, fontWeight: '900' }, feedbackText: { color: colors.muted, fontSize: 11, lineHeight: 16, marginBottom: 8 },
  result: { alignItems: 'center', paddingTop: 25, paddingBottom: 20 }, trophy: { fontSize: 62 }, resultTitle: { fontFamily: type.rounded, fontWeight: '900', fontSize: 28, color: colors.ink, marginTop: 20 }, resultScore: { fontSize: 58, fontWeight: '900', color: colors.coral, marginVertical: 12 }, resultText: { color: colors.muted, textAlign: 'center', lineHeight: 21, maxWidth: 310 }, production: { backgroundColor: colors.lavender, borderRadius: 20, padding: 17, marginBottom: 18 }, productionLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1.2, color: '#6C6198' }, productionTitle: { fontFamily: type.rounded, fontWeight: '900', fontSize: 18, color: colors.ink, marginTop: 5 }, productionText: { fontSize: 12, lineHeight: 20, color: '#5B5669', marginTop: 7 },
});
