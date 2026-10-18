export const grammarLessons = [
  { id: 'present-simple', level: 'A1', title: 'Presente simple', summary: 'Hábitos, rutinas y hechos generales.', rule: 'Usa el verbo base con I, you, we y they. Añade -s o -es con he, she e it.', examples: ['I study every evening.', 'She works from home.', 'Do they speak English?'], tip: 'Después de does, el verbo vuelve a su forma base: Does she work?' },
  { id: 'past-simple', level: 'A2', title: 'Pasado simple', summary: 'Acciones terminadas en el pasado.', rule: 'Los verbos regulares terminan en -ed. Los irregulares cambian de forma y deben aprenderse.', examples: ['We visited London last year.', 'He went to the library.', 'Did you call Marta?'], tip: 'Con did y didn’t usa el verbo base: She didn’t go.' },
  { id: 'present-perfect', level: 'B1', title: 'Present perfect', summary: 'Experiencias y acciones conectadas al presente.', rule: 'Forma: have/has + participio. Usa since para el inicio y for para una duración.', examples: ['I have seen that film.', 'She has lived here since 2022.', 'We have studied for two hours.'], tip: 'No lo combines con momentos pasados terminados como yesterday.' },
  { id: 'conditionals', level: 'B1', title: 'First conditional', summary: 'Situaciones futuras posibles.', rule: 'If + presente simple, will + verbo base.', examples: ['If it rains, I will stay home.', 'You will improve if you practise.', 'If she calls, tell me.'], tip: 'No uses will justo después de if.' },
];

import { extraFlashcards, extraQuizQuestions } from './expanded-content';
import { masteryFlashcards, masteryQuizQuestions } from './mastery-content';

const baseQuizQuestions = [
  { prompt: 'She ___ coffee every morning.', options: ['drink', 'drinks', 'drinking', 'is drink'], answer: 1, explanation: 'Con she usamos la tercera persona: drinks.' },
  { prompt: 'I have lived here ___ 2022.', options: ['for', 'since', 'during', 'from'], answer: 1, explanation: 'Since introduce el momento en que comenzó una acción.' },
  { prompt: 'If it rains, we ___ at home.', options: ['stay', 'stayed', 'will stay', 'staying'], answer: 2, explanation: 'El first conditional usa will + verbo en la oración principal.' },
  { prompt: 'Yesterday, they ___ to the museum.', options: ['go', 'gone', 'went', 'going'], answer: 2, explanation: 'Went es el pasado irregular de go.' },
  { prompt: 'Which sentence is correct?', options: ['He don’t know.', 'He doesn’t knows.', 'He doesn’t know.', 'He not knows.'], answer: 2, explanation: 'Después de doesn’t usamos el verbo base.' },
  { prompt: 'There isn’t ___ information available.', options: ['many', 'much', 'a few', 'several'], answer: 1, explanation: 'Information es incontable, por eso usamos much.' },
  { prompt: 'This is the ___ book I have read this year.', options: ['better', 'best', 'most good', 'goodest'], answer: 1, explanation: 'Best es el superlativo irregular de good.' },
  { prompt: 'The new library ___ next month.', options: ['opens', 'will open', 'will be opened', 'is opening by'], answer: 2, explanation: 'La pasiva futura se forma con will be + participio.' },
  { prompt: 'She said she ___ tired.', options: ['is', 'was', 'has', 'will'], answer: 1, explanation: 'En estilo indirecto, am/is normalmente retrocede a was.' },
  { prompt: 'He ___ have forgotten; his keys are here.', options: ['must', 'can’t', 'should', 'ought'], answer: 1, explanation: 'Can’t have + participio expresa una deducción pasada imposible.' },
  { prompt: 'Rarely ___ such dedication.', options: ['I see', 'do I see', 'I do see', 'see I'], answer: 1, explanation: 'Tras rarely al inicio usamos inversión de auxiliar y sujeto.' },
  { prompt: 'What I need ___ a little more time.', options: ['are', 'have', 'is', 'being'], answer: 2, explanation: 'Una wh-cleft usa What + cláusula + be para destacar el foco.' },
  { prompt: 'If I had accepted the offer, I ___ in Paris now.', options: ['lived', 'would live', 'would have lived', 'will live'], answer: 1, explanation: 'Es un condicional mixto: condición pasada y resultado presente.' },
  { prompt: 'They insisted that every applicant ___ present.', options: ['is', 'was', 'be', 'will be'], answer: 2, explanation: 'El subjuntivo formal usa la forma base be.' },
  { prompt: 'Choose the best nominalisation: “Sales declined sharply.”', options: ['Sales were decline.', 'There was a sharp decline in sales.', 'Sales sharply declining.', 'The sales did decline sharp.'], answer: 1, explanation: 'Decline funciona como sustantivo y sharp pasa a ser adjetivo.' },
];

export const quizQuestions = [...baseQuizQuestions, ...extraQuizQuestions, ...masteryQuizQuestions];

const baseFlashcards = [
  { word: 'Worthwhile', type: 'adjective', meaning: 'Que vale la pena', example: 'Learning a language is always worthwhile.' },
  { word: 'Figure out', type: 'phrasal verb', meaning: 'Descubrir o resolver', example: 'I finally figured out the answer.' },
  { word: 'Eventually', type: 'adverb', meaning: 'Finalmente; con el tiempo', example: 'You will eventually feel more confident.' },
  { word: 'Although', type: 'conjunction', meaning: 'Aunque', example: 'Although it was late, we kept studying.' },
  { word: 'Reliable', type: 'adjective', meaning: 'Fiable, confiable', example: 'She is a reliable teammate.' },
  { word: 'Achieve', type: 'verb', meaning: 'Lograr, conseguir', example: 'You can achieve your goals.' },
  { word: 'Aware', type: 'adjective', meaning: 'Consciente', example: 'Be aware of common mistakes.' },
  { word: 'Despite', type: 'preposition', meaning: 'A pesar de', example: 'Despite the rain, we walked home.' },
  { word: 'Fluent', type: 'adjective', meaning: 'Fluido', example: 'She is fluent in English.' },
  { word: 'Improve', type: 'verb', meaning: 'Mejorar', example: 'Practice will improve your pronunciation.' },
  { word: 'Accurate', type: 'adjective', meaning: 'Exacto, preciso', example: 'The report provides accurate figures.' },
  { word: 'Overcome', type: 'verb', meaning: 'Superar una dificultad', example: 'She overcame her fear of speaking.' },
  { word: 'Insight', type: 'noun', meaning: 'Comprensión profunda, perspectiva', example: 'The book offers useful insights.' },
  { word: 'Regardless', type: 'adverb', meaning: 'Sin importar; de todos modos', example: 'We will continue regardless of the result.' },
  { word: 'Compelling', type: 'adjective', meaning: 'Convincente, cautivador', example: 'He presented a compelling argument.' },
];

export const flashcards = [...baseFlashcards, ...extraFlashcards, ...masteryFlashcards];

export const dictionary = [
  ...flashcards,
];
