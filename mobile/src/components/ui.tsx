import { PropsWithChildren, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, type } from '@/constants/theme';

export function Screen({ children }: PropsWithChildren) { return <SafeAreaView edges={['top']} style={styles.safe}><ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>{children}</ScrollView></SafeAreaView>; }
export function Header({ eyebrow, title, subtitle, right }: { eyebrow: string; title: string; subtitle?: string; right?: ReactNode }) { return <View style={styles.header}><View style={{ flex: 1 }}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>{right}</View>; }
export function SectionTitle({ label, title }: { label?: string; title: string }) { return <View style={styles.sectionTitle}>{label ? <Text style={styles.eyebrow}>{label}</Text> : null}<Text style={styles.sectionHeading}>{title}</Text></View>; }
export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) { return <View style={[styles.card, style]}>{children}</View>; }
export function Pill({ children, color = colors.coralSoft }: PropsWithChildren<{ color?: string }>) { return <View style={[styles.pill, { backgroundColor: color }]}><Text style={styles.pillText}>{children}</Text></View>; }
export function PrimaryButton({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) { return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.primary, pressed && styles.pressed, disabled && { opacity: .45 }]}><Text style={styles.primaryText}>{title}</Text><Text style={styles.primaryText}>→</Text></Pressable>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, scroll: { padding: 20, paddingBottom: 34 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 22 }, eyebrow: { color: '#9A948A', fontSize: 10, letterSpacing: 1.6, fontWeight: '800', marginBottom: 5 },
  title: { color: colors.ink, fontFamily: type.rounded, fontWeight: '900', fontSize: 29, letterSpacing: -.6 }, subtitle: { color: colors.muted, fontSize: 14, marginTop: 6, lineHeight: 20 },
  sectionTitle: { marginTop: 26, marginBottom: 12 }, sectionHeading: { color: colors.ink, fontFamily: type.rounded, fontWeight: '800', fontSize: 20 },
  card: { backgroundColor: colors.paper, borderColor: colors.line, borderWidth: 1, borderRadius: 22, padding: 16 }, pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 99 }, pillText: { color: colors.ink, fontSize: 9, fontWeight: '800', letterSpacing: .5 },
  primary: { minHeight: 52, borderRadius: 16, backgroundColor: colors.coral, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingHorizontal: 18 }, primaryText: { color: 'white', fontWeight: '800', fontSize: 14 }, pressed: { opacity: .82, transform: [{ scale: .985 }] },
});
