import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, Header, PrimaryButton, Screen } from '@/components/ui';
import { colors, type } from '@/constants/theme';
import { grammarReference, learningStages } from '@/data/grammar-reference';
import { useProgress } from '@/state/progress';

export default function GrammarScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [level, setLevel] = useState('Todos');
  const [stageView, setStageView] = useState<string | null>(null);
  const { lessons, completeLesson } = useProgress();
  const active = grammarReference.find((item) => item.id === selected);

  if (active) {
    return (
      <Screen>
        <Pressable onPress={() => setSelected(null)}>
          <Text style={styles.back}>‹ {stageView ? `Volver al nivel ${stageView}` : 'Todas las lecciones'}</Text>
        </Pressable>
        <Header eyebrow={`GRAMÁTICA · ${active.level}`} title={active.title} subtitle={active.summary} />
        <Card style={styles.ruleCard}>
          <Text style={styles.label}>1 · SIGNIFICADO</Text>
          <Text style={styles.rule}>{active.summary}</Text>
        </Card>
        <Text style={styles.section}>2 · Forma</Text>
        <Text style={styles.bodyText}>{active.rule}</Text>
        <Text style={styles.section}>3 · Variantes y ejemplos</Text>
        {active.examples.map((example, index) => (
          <View style={styles.example} key={example}>
            <Text style={styles.number}>{index + 1}</Text>
            <Text style={styles.exampleText}>{example}</Text>
          </View>
        ))}
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>✦</Text>
          <View style={styles.flex}>
            <Text style={styles.tipTitle}>4 · USO</Text>
            <Text style={styles.tipText}>{active.tip}</Text>
          </View>
        </View>
        <Text style={styles.section}>5 · Contraste</Text>
        <Text style={styles.bodyText}>{active.contrast ?? 'Compara esta estructura con formas cercanas y observa qué cambia en el significado, el tiempo o la intención.'}</Text>
        <Text style={styles.section}>6 · Errores frecuentes</Text>
        {(active.mistakes ?? ['Evita traducir palabra por palabra desde el español.', 'Comprueba el sujeto, el auxiliar y la forma del verbo.']).map((error) => (
          <View style={styles.errorRow} key={error}>
            <Text style={styles.errorMark}>!</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ))}
        <View style={styles.practice}>
          <Text style={styles.practiceLabel}>7 · APLICACIÓN</Text>
          <Text style={styles.practiceTitle}>Ahora te toca a ti</Text>
          <Text style={styles.practiceText}>{active.practice ?? 'Escribe tres ejemplos propios y transforma uno en afirmación, negación y pregunta.'}</Text>
        </View>
        <PrimaryButton
          disabled={lessons.includes(active.id)}
          title={lessons.includes(active.id) ? 'Lección completada ✓' : 'Completar · +20 XP'}
          onPress={() => {
            completeLesson(active.id);
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
        />
      </Screen>
    );
  }

  if (stageView) {
    const stage = learningStages.find((item) => item.level === stageView)!;
    const stageLessons = grammarReference.filter((item) => item.level === stageView);
    const completed = stageLessons.filter((item) => lessons.includes(item.id)).length;
    const nextLesson = stageLessons.find((item) => !lessons.includes(item.id)) ?? stageLessons[0];
    const progressWidth = `${stageLessons.length ? (completed / stageLessons.length) * 100 : 0}%` as `${number}%`;

    return (
      <Screen>
        <Pressable onPress={() => setStageView(null)}><Text style={styles.back}>‹ Volver a la ruta</Text></Pressable>
        <Header eyebrow={`${stage.level} · ${stage.name.toUpperCase()}`} title={`Nivel ${stage.level}`} subtitle={stage.outcome} />
        <View style={[styles.stageHero, { backgroundColor: stage.color }]}>
          <View style={styles.stageHeroTop}>
            <Text style={styles.stageHeroLabel}>PROGRESO DEL NIVEL</Text>
            <Text style={styles.stageHeroCount}>{completed}/{stageLessons.length}</Text>
          </View>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: progressWidth }]} /></View>
          <Text style={styles.stageHeroHelp}>{completed === stageLessons.length ? 'Has completado todos los temas. Puedes repasarlos cuando quieras.' : 'Continúa en orden para construir una base sólida.'}</Text>
        </View>
        <PrimaryButton title={completed ? 'Continuar aprendiendo' : 'Comenzar este nivel'} onPress={() => setSelected(nextLesson.id)} />
        <Text style={styles.levelTopics}>TEMAS DEL NIVEL</Text>
        {stageLessons.map((item, index) => (
          <Pressable key={item.id} onPress={() => setSelected(item.id)} style={styles.lesson}>
            <View style={[styles.lessonIcon, { backgroundColor: stage.color }]}><Text style={styles.lessonOrder}>{lessons.includes(item.id) ? '✓' : index + 1}</Text></View>
            <View style={styles.flex}><Text style={styles.lessonTitle}>{item.title}</Text><Text style={styles.lessonSummary}>{item.summary}</Text></View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </Screen>
    );
  }

  const visible = level === 'Todos' ? grammarReference : grammarReference.filter((item) => item.level === level);
  return (
    <Screen>
      <Header eyebrow="RUTA DESDE CERO" title="Gramática paso a paso" subtitle="Primero construye oraciones; después aprende a expresar tiempo, relaciones, hipótesis y matices." />
      <Text style={styles.routeTitle}>Tu ruta de aprendizaje</Text>
      <View style={styles.stageGrid}>
        {learningStages.map((stage) => {
          const stageLessons = grammarReference.filter((item) => item.level === stage.level);
          const done = stageLessons.filter((item) => lessons.includes(item.id)).length;
          return (
            <Pressable accessibilityRole="button" accessibilityLabel={`Abrir nivel ${stage.level} ${stage.name}`} key={stage.level} onPress={() => setStageView(stage.level)} style={({ pressed }) => [styles.stage, { backgroundColor: stage.color }, pressed && styles.stagePressed]}>
              <View style={styles.stageTop}><Text style={styles.stageLevel}>{stage.level}</Text><Text style={styles.stageArrow}>›</Text></View>
              <Text style={styles.stageName}>{stage.name}</Text>
              <Text style={styles.stageOutcome}>{stage.outcome}</Text>
              <Text style={styles.stageProgress}>{done}/{stageLessons.length} temas · {done ? 'Continuar' : 'Comenzar'} →</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.routeTitle}>Biblioteca de referencia</Text>
      <View style={styles.filters}>{['Todos', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((item) => <Pressable key={item} onPress={() => setLevel(item)} style={[styles.filter, level === item && styles.filterActive]}><Text style={[styles.filterText, level === item && styles.filterTextActive]}>{item}</Text></Pressable>)}</View>
      <Text style={styles.catalogMeta}>{visible.length} TEMAS · {lessons.length} COMPLETADOS</Text>
      {visible.map((item, index) => (
        <Pressable key={item.id} onPress={() => setSelected(item.id)} style={styles.lesson}>
          <View style={[styles.lessonIcon, { backgroundColor: [colors.yellow, colors.coralSoft, colors.mint, colors.lavender][index % 4] }]}><Text style={styles.lessonIconText}>{item.level}</Text></View>
          <View style={styles.flex}><View style={styles.lessonTop}><Text style={styles.lessonTitle}>{item.title}</Text>{lessons.includes(item.id) && <Text style={styles.done}>✓</Text>}</View><Text style={styles.lessonSummary}>{item.summary}</Text></View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, back: { color: colors.coral, fontWeight: '800', marginBottom: 18 }, routeTitle: { fontFamily: type.rounded, fontWeight: '900', fontSize: 20, color: colors.ink, marginBottom: 12, marginTop: 5 },
  stageGrid: { gap: 10, marginBottom: 28 }, stage: { borderRadius: 20, padding: 16, minHeight: 128 }, stagePressed: { opacity: 0.88, transform: [{ scale: 0.99 }] }, stageTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, stageLevel: { fontSize: 10, fontWeight: '900', letterSpacing: 1.2, color: colors.ink }, stageArrow: { fontSize: 27, fontWeight: '700', color: colors.ink }, stageName: { fontFamily: type.rounded, fontSize: 20, fontWeight: '900', color: colors.ink, marginTop: 5 }, stageOutcome: { fontSize: 11, lineHeight: 17, color: '#615D55', maxWidth: '85%', marginTop: 5 }, stageProgress: { fontSize: 10, fontWeight: '900', color: colors.ink, marginTop: 'auto', paddingTop: 10 },
  stageHero: { borderRadius: 24, padding: 18, marginBottom: 15 }, stageHeroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, stageHeroLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1.2, color: colors.ink }, stageHeroCount: { fontSize: 13, fontWeight: '900', color: colors.ink }, progressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,.55)', borderRadius: 99, overflow: 'hidden', marginTop: 13 }, progressFill: { height: '100%', backgroundColor: colors.ink, borderRadius: 99 }, stageHeroHelp: { fontSize: 11, lineHeight: 17, color: '#514D46', marginTop: 12 }, levelTopics: { fontSize: 9, fontWeight: '900', letterSpacing: 1.2, color: '#8D877D', marginTop: 25, marginBottom: 10 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 15 }, filter: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 99, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line }, filterActive: { backgroundColor: colors.ink, borderColor: colors.ink }, filterText: { fontSize: 11, fontWeight: '800', color: colors.muted }, filterTextActive: { color: 'white' }, catalogMeta: { fontSize: 9, fontWeight: '900', letterSpacing: 1.1, color: '#9A948A', marginBottom: 10 },
  lesson: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 11 }, lessonIcon: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, lessonIconText: { fontWeight: '900', color: colors.ink, fontSize: 12 }, lessonOrder: { fontWeight: '900', color: colors.ink, fontSize: 13 }, lessonTop: { flexDirection: 'row', alignItems: 'center', gap: 7 }, lessonTitle: { color: colors.ink, fontWeight: '800', fontSize: 15 }, lessonSummary: { color: colors.muted, fontSize: 11, marginTop: 4 }, done: { color: colors.success, fontWeight: '900' }, chevron: { fontSize: 26, color: colors.muted },
  ruleCard: { backgroundColor: '#292922', borderWidth: 0, marginBottom: 23 }, label: { fontSize: 9, fontWeight: '800', letterSpacing: 1.4, color: colors.yellow }, rule: { color: 'white', fontFamily: type.rounded, fontSize: 20, lineHeight: 29, fontWeight: '700', marginTop: 11 }, section: { fontFamily: type.rounded, color: colors.ink, fontWeight: '900', fontSize: 20, marginTop: 22, marginBottom: 11 }, bodyText: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 16, padding: 15, color: colors.ink, fontSize: 13, lineHeight: 21 }, example: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 8 }, number: { width: 29, height: 29, borderRadius: 10, backgroundColor: colors.coralSoft, textAlign: 'center', textAlignVertical: 'center', color: colors.coral, fontWeight: '900' }, exampleText: { color: colors.ink, fontWeight: '600', flex: 1 },
  tip: { backgroundColor: '#FFF1C8', borderRadius: 18, padding: 15, flexDirection: 'row', gap: 12, marginVertical: 18 }, tipIcon: { fontSize: 20, color: '#A88012' }, tipTitle: { fontSize: 9, fontWeight: '900', letterSpacing: 1.1, color: '#9B7716' }, tipText: { fontSize: 12, lineHeight: 18, color: '#594C29', marginTop: 4 }, errorRow: { backgroundColor: '#FAE5DF', borderRadius: 14, padding: 12, flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 8 }, errorMark: { width: 26, height: 26, borderRadius: 9, backgroundColor: colors.coral, textAlign: 'center', textAlignVertical: 'center', color: 'white', fontWeight: '900' }, errorText: { color: '#704D45', fontSize: 12, lineHeight: 18, flex: 1 }, practice: { backgroundColor: colors.lavender, borderRadius: 20, padding: 17, marginTop: 22, marginBottom: 18 }, practiceLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1.3, color: '#6C6198' }, practiceTitle: { fontFamily: type.rounded, fontSize: 19, fontWeight: '900', color: colors.ink, marginTop: 5 }, practiceText: { fontSize: 12, lineHeight: 19, color: '#5B5669', marginTop: 6 },
});
