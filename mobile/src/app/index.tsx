import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  Card,
  Header,
  Pill,
  PrimaryButton,
  Screen,
  SectionTitle,
} from "@/components/ui";
import { colors, type } from "@/constants/theme";
import { useProgress } from "@/state/progress";
import { flashcards, quizQuestions } from "@/data/content";

export default function HomeScreen() {
  const { xp, streak, lessons, mastered } = useProgress();
  return (
    <Screen>
      <Header
        eyebrow="TU AVENTURA DE INGLÉS"
        title="¡Hola! ✦"
        subtitle="Un poco cada día te lleva muy lejos."
        right={
          <View style={styles.streak}>
            <Text>🔥</Text>
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        }
      />
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <Pill color="#4B493E">LECCIÓN DIARIA</Pill>
          <Text style={styles.time}>8 min</Text>
        </View>
        <Text style={styles.heroEyebrow}>RUTA DESDE CERO · PASO 1</Text>
        <Text style={styles.heroTitle}>Construye tu primera oración</Text>
        <Text style={styles.heroText}>
          Aprende a reconocer sujeto, verbo y complemento.
        </Text>
        <View style={styles.words}>
          <Text style={styles.do}>S</Text>
          <Text style={styles.does}>V</Text>
        </View>
        <PrimaryButton
          title="Comenzar la lección"
          onPress={() => router.push("/grammar")}
        />
      </View>
      <SectionTitle label="PLAN INTEGRAL" title="Tu sesión de hoy · 60 min" />
      <Card>
        {[
          ["01", "Repaso activo", "Expresiones y flashcards", "10 min"],
          ["02", "Escucha o lectura", "Contenido comprensible", "15 min"],
          ["03", "Gramática aplicada", "Un tema de tu nivel", "10 min"],
          ["04", "Producción", "Habla o escribe sobre tu vida", "15 min"],
          ["05", "Pronunciación", "Ritmo, sonidos y revisión", "10 min"],
        ].map(([number,title,detail,time],index)=><View key={number} style={[styles.planRow,index===4&&styles.planLast]}><Text style={styles.planNumber}>{number}</Text><View style={{flex:1}}><Text style={styles.planTitle}>{title}</Text><Text style={styles.planDetail}>{detail}</Text></View><Text style={styles.planTime}>{time}</Text></View>)}
      </Card>
      <SectionTitle label="TU CAMINO" title="Sigue practicando" />
      <View style={styles.quickGrid}>
        <Pressable
          onPress={() => router.push("/quiz")}
          style={[styles.quick, { backgroundColor: colors.coralSoft }]}
        >
          <Text style={styles.quickIcon}>⚡</Text>
          <Text style={styles.quickTitle}>Quiz completo</Text>
          <Text style={styles.quickSmall}>{quizQuestions.length} preguntas · A1—C2</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/flashcards")}
          style={[styles.quick, { backgroundColor: colors.lavender }]}
        >
          <Text style={styles.quickIcon}>▱</Text>
          <Text style={styles.quickTitle}>Flashcards</Text>
          <Text style={styles.quickSmall}>
            {Math.max(0, flashcards.length - mastered.length)} palabras pendientes
          </Text>
        </Pressable>
      </View>
      <SectionTitle label="TU PROGRESO" title="Esta semana" />
      <Card>
        <View style={styles.stats}>
          <View>
            <Text style={styles.statValue}>{xp}</Text>
            <Text style={styles.statLabel}>XP TOTALES</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.statValue}>{lessons.length}</Text>
            <Text style={styles.statLabel}>LECCIONES</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.statValue}>{mastered.length}</Text>
            <Text style={styles.statLabel}>PALABRAS</Text>
          </View>
        </View>
      </Card>
      <SectionTitle label="APRENDIZAJE COMPLETO" title="Entrena cada habilidad" />
      {[
        ["Aa", "Gramática", "32 temas organizados de A1 a C2", "/grammar"],
        ["?", "Práctica y recuperación", "Comprueba, produce y vuelve a usar", "/quiz"],
        ["▱", "Vocabulario", `${flashcards.length} tarjetas con contexto`, "/flashcards"],
        ["⌕", "Diccionario", "Fonética, ejemplos y sinónimos reales", "/dictionary"],
      ].map(([icon, title, subtitle, href]) => (
        <Pressable
          key={title}
          onPress={() => router.push(href as never)}
          style={styles.row}
        >
          <Text style={styles.rowIcon}>{icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{title}</Text>
            <Text style={styles.rowSub}>{subtitle}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  streak: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#FFF0DB",
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 99,
  },
  streakText: { color: "#DE704E", fontWeight: "900" },
  hero: {
    backgroundColor: "#292922",
    borderRadius: 28,
    padding: 19,
    overflow: "hidden",
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: { color: "#AAA69D", fontSize: 11 },
  heroEyebrow: {
    color: "#C1BDB4",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginTop: 24,
  },
  heroTitle: {
    color: "white",
    fontFamily: type.rounded,
    fontWeight: "900",
    fontSize: 27,
    width: "75%",
    marginTop: 6,
  },
  heroText: {
    color: "#B7B3AA",
    fontSize: 12,
    lineHeight: 18,
    width: "72%",
    marginTop: 8,
    marginBottom: 18,
  },
  words: { position: "absolute", right: 16, top: 80, height: 100, width: 95 },
  do: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: colors.coral,
    color: "white",
    fontWeight: "900",
    fontSize: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    transform: [{ rotate: "-8deg" }],
  },
  does: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: colors.yellow,
    color: colors.ink,
    fontWeight: "900",
    fontSize: 18,
    paddingHorizontal: 13,
    paddingVertical: 14,
    borderRadius: 14,
    transform: [{ rotate: "7deg" }],
  },
  quickGrid: { flexDirection: "row", gap: 12 },
  quick: {
    flex: 1,
    height: 150,
    borderRadius: 22,
    padding: 16,
    justifyContent: "flex-end",
  },
  quickIcon: { fontSize: 24, marginBottom: "auto" },
  quickTitle: { color: colors.ink, fontWeight: "800", fontSize: 15 },
  quickSmall: { color: colors.muted, fontSize: 10, marginTop: 4 },
  planRow:{flexDirection:'row',alignItems:'center',gap:11,paddingVertical:11,borderBottomWidth:1,borderBottomColor:colors.line},planLast:{borderBottomWidth:0},planNumber:{width:31,height:31,borderRadius:10,backgroundColor:colors.coralSoft,textAlign:'center',textAlignVertical:'center',fontSize:10,fontWeight:'900',color:colors.coral},planTitle:{fontSize:12,fontWeight:'900',color:colors.ink},planDetail:{fontSize:10,color:colors.muted,marginTop:2},planTime:{fontSize:9,fontWeight:'900',color:colors.muted},
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statValue: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
  },
  statLabel: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginTop: 3,
  },
  divider: { height: 30, width: 1, backgroundColor: colors.line },
  row: {
    backgroundColor: colors.paper,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 18,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 9,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F6EBC2",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 17,
    fontWeight: "900",
    color: colors.ink,
  },
  rowTitle: { fontWeight: "800", color: colors.ink, fontSize: 13 },
  rowSub: { color: colors.muted, fontSize: 10, marginTop: 3 },
  arrow: { fontSize: 24, color: colors.muted },
});
