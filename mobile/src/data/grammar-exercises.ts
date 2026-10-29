import type { GrammarLesson } from './grammar-reference';

export type LessonExercise = {
  id: string;
  kind: 'analyse' | 'choice' | 'correct' | 'transform' | 'produce';
  label: string;
  prompt: string;
  answer: string;
  explanation: string;
  options?: string[];
  correctOption?: number;
};

type Choice = Pick<LessonExercise, 'prompt' | 'options' | 'correctOption' | 'answer' | 'explanation'>;

const choices: Record<string, Choice> = {
  'sentence-building': { prompt: '¿Cuál conserva el orden normal del inglés?', options: ['Every day English I study.', 'I study English every day.', 'Study I every day English.'], correctOption: 1, answer: 'I study English every day.', explanation: 'El patrón neutro es sujeto + verbo + objeto + complemento.' },
  'word-classes': { prompt: '¿Qué palabra funciona como adverbio en “She answered calmly”?', options: ['She', 'answered', 'calmly'], correctOption: 2, answer: 'calmly', explanation: 'Calmly modifica la manera en que ocurre answered.' },
  nouns: { prompt: 'Elige la opción estándar.', options: ['an advice', 'two advices', 'a piece of advice'], correctOption: 2, answer: 'a piece of advice', explanation: 'Advice es incontable y necesita una unidad para contarse.' },
  pronouns: { prompt: 'This jacket belongs to Sara. It is ___.', options: ['her', 'hers', 'she'], correctOption: 1, answer: 'hers', explanation: 'Hers es pronombre posesivo y aparece sin sustantivo.' },
  be: { prompt: '___ your parents at home?', options: ['Is', 'Are', 'Do'], correctOption: 1, answer: 'Are', explanation: 'Parents es plural y las preguntas con be invierten verbo y sujeto.' },
  'present-simple': { prompt: 'My brother ___ from home on Fridays.', options: ['work', 'works', 'is work'], correctOption: 1, answer: 'works', explanation: 'La tercera persona singular añade -s.' },
  articles: { prompt: 'She waited for ___ hour.', options: ['a', 'an', 'the one'], correctOption: 1, answer: 'an', explanation: 'Hour comienza con sonido vocálico porque la h no se pronuncia.' },
  'have-there': { prompt: '___ a pharmacy near here.', options: ['It has', 'There is', 'There have'], correctOption: 1, answer: 'There is', explanation: 'There is presenta la existencia de una entidad singular.' },
  questions: { prompt: '¿Cuál pregunta está bien formada?', options: ['Where she works?', 'Where does she work?', 'Where does she works?'], correctOption: 1, answer: 'Where does she work?', explanation: 'Does lleva la marca de tercera persona y work queda en forma base.' },
  prepositions: { prompt: 'The meeting starts ___ Monday ___ nine.', options: ['in / on', 'on / at', 'at / in'], correctOption: 1, answer: 'on Monday at nine', explanation: 'On acompaña días y at horas concretas.' },
  'present-continuous': { prompt: 'Esta semana trabajo desde casa temporalmente.', options: ['I work from home this week.', 'I am working from home this week.', 'I working from home this week.'], correctOption: 1, answer: 'I am working from home this week.', explanation: 'Una situación temporal usa be + -ing.' },
  'past-continuous': { prompt: 'When the phone rang, I ___.', options: ['was sleeping', 'slept every day', 'am sleeping'], correctOption: 0, answer: 'was sleeping', explanation: 'Past continuous muestra la actividad en progreso interrumpida.' },
  'future-forms': { prompt: 'Mira esas nubes. ___.', options: ['It will to rain.', 'It is going to rain.', 'It rains tomorrow.'], correctOption: 1, answer: 'It is going to rain.', explanation: 'Going to expresa una predicción basada en evidencia visible.' },
  countable: { prompt: 'We do not have ___ information.', options: ['many', 'much', 'a few'], correctOption: 1, answer: 'much', explanation: 'Information es incontable.' },
  'past-simple': { prompt: 'She ___ to the library yesterday.', options: ['go', 'went', 'has gone'], correctOption: 1, answer: 'went', explanation: 'Yesterday exige pasado simple y go es irregular.' },
  comparatives: { prompt: 'This route is ___ than the other one.', options: ['more short', 'shorter', 'the shortest'], correctOption: 1, answer: 'shorter', explanation: 'Los adjetivos cortos forman el comparativo con -er.' },
  'present-perfect': { prompt: 'I ___ her since 2020.', options: ['know', 'knew', 'have known'], correctOption: 2, answer: 'have known', explanation: 'Since conecta el inicio pasado con el presente.' },
  'perfect-system': { prompt: 'By next Friday, we ___ the project.', options: ['will complete', 'will have completed', 'have completed yesterday'], correctOption: 1, answer: 'will have completed', explanation: 'Future perfect marca algo terminado antes de un punto futuro.' },
  'verb-patterns': { prompt: 'I stopped ___ some water during the walk.', options: ['drinking', 'to drink', 'drink'], correctOption: 1, answer: 'to drink', explanation: 'Stop to drink significa detener otra actividad con el propósito de beber.' },
  'linking-ideas': { prompt: '___ it was raining, we continued.', options: ['Because of', 'Although', 'So'], correctOption: 1, answer: 'Although', explanation: 'Although introduce una cláusula de contraste.' },
  conditionals: { prompt: 'If she arrives early, we ___ together.', options: ['leave', 'will leave', 'would have left'], correctOption: 1, answer: 'will leave', explanation: 'First conditional: if + presente, will + verbo base.' },
  'relative-clauses': { prompt: 'The woman ___ car was stolen called the police.', options: ['who', 'whose', 'which'], correctOption: 1, answer: 'whose', explanation: 'Whose expresa posesión.' },
  passive: { prompt: 'They will announce the results tomorrow.', options: ['The results will announce tomorrow.', 'The results will be announced tomorrow.', 'The results are announcing tomorrow.'], correctOption: 1, answer: 'The results will be announced tomorrow.', explanation: 'La pasiva futura usa will be + participio.' },
  causatives: { prompt: 'Un técnico reparó mi móvil por encargo.', options: ['I repaired my phone.', 'I had my phone repaired.', 'I had repaired my phone.'], correctOption: 1, answer: 'I had my phone repaired.', explanation: 'Have + objeto + participio expresa un servicio encargado.' },
  'reported-speech': { prompt: '“I will help,” she said.', options: ['She said she will help.', 'She said she would help.', 'She told she would help.'], correctOption: 1, answer: 'She said she would help.', explanation: 'Will retrocede a would y say no lleva objeto directo.' },
  'modals-deduction': { prompt: 'His office is dark. He ___ gone home.', options: ['must have', 'must', 'can to have'], correctOption: 0, answer: 'must have', explanation: 'Must have + participio expresa una deducción fuerte sobre el pasado.' },
  inversion: { prompt: 'Elige la inversión correcta.', options: ['Never I have seen this.', 'Never have I seen this.', 'Never did I have seen this.'], correctOption: 1, answer: 'Never have I seen this.', explanation: 'El auxiliar precede al sujeto tras una expresión negativa inicial.' },
  'cleft-sentences': { prompt: 'Destaca “the deadline” en “I dislike the deadline”.', options: ['What I dislike is the deadline.', 'It dislikes me the deadline.', 'The deadline what I dislike.'], correctOption: 0, answer: 'What I dislike is the deadline.', explanation: 'La wh-cleft coloca el elemento destacado después de be.' },
  'advanced-conditionals': { prompt: 'If I had accepted that job, I ___ in Berlin now.', options: ['would live', 'would have lived', 'will live'], correctOption: 0, answer: 'would live', explanation: 'Condición pasada y resultado presente forman un condicional mixto.' },
  subjunctive: { prompt: 'They recommended that he ___ immediately.', options: ['leaves', 'left', 'leave'], correctOption: 2, answer: 'leave', explanation: 'El subjuntivo formal usa la forma base.' },
  ellipsis: { prompt: 'Marta can swim, and Leo ___.', options: ['can too', 'can swim it too', 'does can too'], correctOption: 0, answer: 'can too', explanation: 'El auxiliar can sustituye el predicado recuperable.' },
  nominalisation: { prompt: 'Nominaliza “The company expanded rapidly”.', options: ['The company was rapidly expand.', 'The rapid expansion of the company', 'The company rapid expanding'], correctOption: 1, answer: 'The rapid expansion of the company', explanation: 'Expansion es el sustantivo y rapid modifica al nombre.' },
};

const transformations: Record<GrammarLesson['level'], string> = {
  A1: 'Transforma el primer ejemplo en negativa y después en pregunta.',
  A2: 'Cambia el primer ejemplo a otro sujeto y a otro momento temporal.',
  B1: 'Reescribe el primer ejemplo conservando el significado, pero usando la estructura de la lección.',
  B2: 'Cambia el foco o el punto de vista del primer ejemplo sin perder su significado principal.',
  C1: 'Reformula el primer ejemplo para crear un énfasis diferente y explica el efecto.',
  C2: 'Reescribe el primer ejemplo en un registro formal y después en uno conversacional.',
};

export function getLessonExercises(lesson: GrammarLesson): LessonExercise[] {
  const choice = choices[lesson.id];
  const mistake = lesson.mistakes?.[0];
  const corrected = mistake?.includes('→') ? mistake.split('→')[1].trim() : `Revisa la forma siguiendo esta regla: ${lesson.rule}`;
  return [
    { id: `${lesson.id}-analyse`, kind: 'analyse', label: 'Analiza', prompt: `Explica qué regla aparece en: “${lesson.examples[0]}”`, answer: lesson.rule, explanation: lesson.tip },
    { id: `${lesson.id}-choice`, kind: 'choice', label: 'Elige', ...choice },
    { id: `${lesson.id}-correct`, kind: 'correct', label: 'Corrige', prompt: mistake ? `Corrige y explica: ${mistake.split('→')[0].trim()}` : `Detecta un posible error al aplicar “${lesson.title}” y escribe la forma correcta.`, answer: corrected, explanation: mistake ?? lesson.tip },
    { id: `${lesson.id}-transform`, kind: 'transform', label: 'Transforma', prompt: transformations[lesson.level], answer: `Respuesta modelo inicial: ${lesson.examples[0]}`, explanation: 'Compara sujeto, auxiliar, forma verbal, orden y significado después de transformar.' },
    { id: `${lesson.id}-produce`, kind: 'produce', label: 'Produce', prompt: lesson.practice ?? `Escribe tres ejemplos propios relacionados con ${lesson.title.toLowerCase()}.`, answer: `Modelo de referencia: ${lesson.examples.join(' · ')}`, explanation: 'La respuesta puede variar. Comprueba que respete la regla y que comunique una idea real.' },
  ];
}
