import React, { useState, useEffect } from "react";

interface Flashcard {
  id: string;
  word: string;
  translation: string;
  example: string;
}

const FLASHCARDS: { [key: string]: Flashcard[] } = {
  idioms: [
    { id: "id1", word: "Break a leg", translation: "Buena suerte (especialmente en teatro/actuación)", example: "You are going to do great on stage. Break a leg!" },
    { id: "id2", word: "Bite the bullet", translation: "Aceptar una situación difícil con valor", example: "I have to bite the bullet and go to the dentist tomorrow." },
    { id: "id3", word: "Under the weather", translation: "Sentirse un poco enfermo", example: "I won't be able to come to work today. I'm feeling under the weather." },
    { id: "id4", word: "Spill the beans", translation: "Revelar un secreto sin querer", example: "Don't tell Sarah about the surprise party, she will spill the beans!" },
    { id: "id5", word: "A piece of cake", translation: "Pan comido (muy fácil)", example: "Don't worry about the English exam. It's going to be a piece of cake." }
  ],
  phrasal: [
    { id: "ph1", word: "Keep on", translation: "Continuar (haciendo algo)", example: "If you keep on practicing, your English will improve rapidly." },
    { id: "ph2", word: "Look forward to", translation: "Esperar algo con ansias e ilusión", example: "I am really looking forward to our trip to London next month." },
    { id: "ph3", word: "Run out of", translation: "Quedarse sin algo", example: "We ran out of coffee, so I need to go to the supermarket." },
    { id: "ph4", word: "Give up", translation: "Rendirse o abandonar un hábito", example: "Learning a language is hard, but you must never give up!" },
    { id: "ph5", word: "Look up to", translation: "Admirar y respetar a alguien", example: "I have always looked up to my older sister because she is very smart." }
  ],
  business: [
    { id: "bu1", word: "Touch base", translation: "Ponerse en contacto brevemente", example: "Let's touch base next Monday to discuss the progress of the project." },
    { id: "bu2", word: "Think outside the box", translation: "Pensar de forma creativa e innovadora", example: "To solve this problem, we need to think outside the box." },
    { id: "bu3", word: "On the same page", translation: "Estar de acuerdo o en sintonía", example: "Before we start, I want to make sure everyone is on the same page." },
    { id: "bu4", word: "To wrap up", translation: "Concluir o finalizar una reunión o tarea", example: "Let's wrap up this meeting so we can get back to work." },
    { id: "bu5", word: "Feedback", translation: "Retroalimentación u opiniones constructivas", example: "Your feedback was extremely helpful for improving our design." }
  ],
  travel: [
    { id: "tr1", word: "Check in", translation: "Registrarse (en un hotel o aeropuerto)", example: "We need to check in at the hotel before 3:00 PM." },
    { id: "tr2", word: "Take off", translation: "Despegar (avión) o irse rápido", example: "Our flight is scheduled to take off at 9:00 AM." },
    { id: "tr3", word: "Catch up", translation: "Alcanzar a alguien o ponerse al día", example: "Go ahead, I will catch up with you at the museum entrance." },
    { id: "tr4", word: "On a budget", translation: "Viajar o vivir con un presupuesto limitado", example: "We traveled around Europe on a budget, staying in hostels." },
    { id: "tr5", word: "Book in advance", translation: "Reservar con anticipación", example: "You should book the train tickets in advance to get a discount." }
  ]
};

interface FlashcardsProps {
  masteredFlashcards: Set<string>;
  onCardMasteredToggle: (cardId: string) => void;
  speakText: (text: string) => void;
}

export default function Flashcards({
  masteredFlashcards,
  onCardMasteredToggle,
  speakText,
}: FlashcardsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("idioms");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [deck, setDeck] = useState<Flashcard[]>([]);

  // Load deck on mount or category change dynamically from SQLite
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await fetch(`/api/vocabulary?category=${activeCategory}`);
        if (res.ok) {
          const data = await res.json();
          setDeck(data);
        }
      } catch (err) {
        console.error("Error al cargar vocabulario desde SQLite:", err);
      }
    };
    fetchDeck();
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeCategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleShuffle = () => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleAdvance = (direction: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop flip card action on button clicks
    setIsFlipped(false);
    
    setTimeout(() => {
      setCurrentIndex(prev => {
        let next = prev + direction;
        if (next >= deck.length) return 0;
        if (next < 0) return deck.length - 1;
        return next;
      });
    }, 150);
  };

  const handleMasteredToggle = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onCardMasteredToggle(cardId);
    
    // Auto advance if newly mastered
    const wasAlreadyMastered = masteredFlashcards.has(cardId);
    if (!wasAlreadyMastered) {
      setTimeout(() => {
        setIsFlipped(false);
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1 >= deck.length ? 0 : prev + 1));
        }, 150);
      }, 500);
    }
  };

  const handleSpeakExample = (example: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speakText(example);
  };

  if (deck.length === 0) return null;

  const currentCard = deck[currentIndex];
  const isMastered = masteredFlashcards.has(currentCard.id);

  return (
    <div className="flex flex-col items-center gap-8 py-4 max-w-[600px] mx-auto">
      
      {/* Deck categories selector bar */}
      <div className="w-full flex justify-between items-center flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {["idioms", "phrasal", "business", "travel", "core"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-200 capitalize ${
                activeCategory === cat
                  ? "bg-primary-color-glow border-primary-color text-text-primary"
                  : "bg-white/3 border-white/6 text-text-secondary hover:bg-white/6 hover:text-text-primary"
              }`}
            >
              {cat === "phrasal" ? "Phrasal Verbs" : cat === "business" ? "Business" : cat === "core" ? "Vocabulario Principal" : cat}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/8 rounded-xl text-xs font-bold cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all transform hover:-translate-y-0.5"
        >
          <i className="fa-solid fa-shuffle"></i> Mezclar
        </button>
      </div>

      {/* 3D Flipping Flashcard Visual Element */}
      <div className="flashcard-scene" onClick={handleFlip}>
        <div className={`flashcard-item ${isFlipped ? "flipped" : ""}`}>
          
          {/* FRONT: English Word */}
          <div className="flashcard-face flashcard-front glass-panel flex flex-col justify-between items-center text-center">
            <span className="card-badge">INGLÉS</span>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight px-4 leading-normal">
              {currentCard.word}
            </h3>
            <span className="card-hint text-[0.78rem] text-text-muted flex items-center gap-1.5 font-medium">
              <i className="fa-solid fa-arrow-rotate-left"></i> Haz clic para revelar la traducción
            </span>
          </div>

          {/* BACK: Spanish Translation & Examples */}
          <div className="flashcard-face flashcard-back glass-panel flex flex-col justify-center items-center gap-6">
            <span className="card-badge badge-es">ESPAÑOL</span>
            <h3 className="text-xl lg:text-2xl font-bold text-text-primary text-center px-4 leading-relaxed">
              {currentCard.translation}
            </h3>
            
            {/* Example sentence widget */}
            <div className="bg-black/15 border border-white/4 p-4 px-5 rounded-xl w-full relative">
              <strong className="block text-[0.7rem] text-text-muted uppercase tracking-wider mb-1">Ejemplo:</strong>
              <p className="text-[0.88rem] text-text-secondary italic leading-relaxed pr-8">
                &quot;{currentCard.example}&quot;
              </p>
              
              <button
                onClick={(e) => handleSpeakExample(currentCard.example, e)}
                className="absolute right-3.5 bottom-3.5 w-8 h-8 flex items-center justify-center bg-white/6 border border-white/10 rounded-full text-text-primary cursor-pointer hover:bg-primary-color hover:border-primary-color transition-colors"
                title="Escuchar ejemplo"
              >
                <i className="fa-solid fa-volume-high text-xs"></i>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Flashcard navigation and mastering action controls footer panel */}
      <div className="w-full flex justify-between items-center gap-4">
        {/* Needs review button */}
        <button
          onClick={(e) => handleAdvance(-1, e)}
          className="flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl text-[0.95rem] font-bold border border-white/8 bg-white/3 text-text-secondary cursor-pointer hover:bg-white/8 hover:text-text-primary transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <i className="fa-solid fa-arrow-left"></i> Anterior
        </button>

        {/* Mid counter */}
        <div className="text-sm font-semibold text-text-secondary">
          {currentIndex + 1} / {deck.length}
        </div>

        {/* Mastered/Learn check button toggle */}
        <button
          onClick={(e) => handleMasteredToggle(currentCard.id, e)}
          className={`flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl text-[0.95rem] font-bold border cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 ${
            isMastered
              ? "bg-success-color border-success-color text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]"
              : "bg-success-color/10 border-success-color/20 text-success-color hover:bg-success-color hover:text-white hover:shadow-[0_4px_15px_rgba(16,185,129,0.3)]"
          }`}
        >
          <i className={`fa-solid ${isMastered ? "fa-circle-check" : "fa-check"}`}></i>
          {isMastered ? "Dominada" : "Dominada"}
        </button>
      </div>

    </div>
  );
}
