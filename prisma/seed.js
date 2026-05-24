const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const vocabularyData = [
  // ================= IDIOMS (80) =================
  {
    word: "Break a leg",
    translation: "Buena suerte",
    example: "You are going to do great on stage. Break a leg!",
    category: "idioms",
  },
  {
    word: "Bite the bullet",
    translation: "Aceptar una situación difícil con valor",
    example: "I have to bite the bullet and go to the dentist tomorrow.",
    category: "idioms",
  },
  {
    word: "Under the weather",
    translation: "Sentirse un poco enfermo/decaído",
    example:
      "I won't be able to come to work today. I'm feeling under the weather.",
    category: "idioms",
  },
  {
    word: "Spill the beans",
    translation: "Revelar un secreto accidentalmente",
    example:
      "Don't tell Sarah about the surprise party, she will spill the beans!",
    category: "idioms",
  },
  {
    word: "A piece of cake",
    translation: "Pan comido / Muy fácil",
    example:
      "Don't worry about the English exam. It's going to be a piece of cake.",
    category: "idioms",
  },
  {
    word: "Cost an arm and a leg",
    translation: "Costar un ojo de la cara / Muy caro",
    example: "I'd love to buy that new laptop, but it costs an arm and a leg.",
    category: "idioms",
  },
  {
    word: "Once in a blue moon",
    translation: "Casi nunca / Muy rara vez",
    example:
      "He visits his hometown once in a blue moon because he lives abroad.",
    category: "idioms",
  },
  {
    word: "Let the cat out of the bag",
    translation: "Revelar un secreto sin querer",
    example:
      "We wanted it to be a surprise, but John let the cat out of the bag.",
    category: "idioms",
  },
  {
    word: "Hit the nail on the head",
    translation: "Dar en el clavo / Acertar exactamente",
    example: "You hit the nail on the head when you identified the server bug.",
    category: "idioms",
  },
  {
    word: "Beat around the bush",
    translation: "Andarse con rodeos / Evitar el tema",
    example: "Stop beating around the bush and tell me what the problem is.",
    category: "idioms",
  },
  {
    word: "Blessing in disguise",
    translation: "No hay mal que por bien no venga",
    example:
      "Losing that job was a blessing in disguise; I found a much better one.",
    category: "idioms",
  },
  {
    word: "Cry over spilled milk",
    translation: "Lamentarse por cosas pasadas que no tienen solución",
    example:
      "The mistake is made, so let's fix it. No use crying over spilled milk.",
    category: "idioms",
  },
  {
    word: "Cut corners",
    translation: "Hacer las cosas rápido y mal para ahorrar dinero o tiempo",
    example:
      "They cut corners when building the server, and now it keeps crashing.",
    category: "idioms",
  },
  {
    word: "Devil's advocate",
    translation: "Abogado del diablo (presentar el lado contrario por debatir)",
    example: "I agree with you, but let me play devil's advocate for a moment.",
    category: "idioms",
  },
  {
    word: "Easier said than done",
    translation: "Fácil de decir, difícil de hacer",
    example:
      "Finding a new remote job is easier said than done in this market.",
    category: "idioms",
  },
  {
    word: "Get out of hand",
    translation: "Salirse de control",
    example: "The discussion got out of hand and people started shouting.",
    category: "idioms",
  },
  {
    word: "Go back to the drawing board",
    translation: "Empezar de nuevo desde el principio",
    example:
      "Our design was rejected, so we must go back to the drawing board.",
    category: "idioms",
  },
  {
    word: "Make a long story short",
    translation: "Para no hacer el cuento largo / En resumen",
    example: "To make a long story short, we got lost and missed the train.",
    category: "idioms",
  },
  {
    word: "Miss the boat",
    translation: "Perder la oportunidad",
    example:
      "If you don't apply for the scholarship today, you will miss the boat.",
    category: "idioms",
  },
  {
    word: "No pain, no gain",
    translation:
      "El que quiere celeste, que le cueste / Sin esfuerzo no hay recompensa",
    example: "Gym training is hard, but no pain, no gain!",
    category: "idioms",
  },
  {
    word: "Pull yourself together",
    translation: "Cálmate / Recupera el control de tus emociones",
    example:
      "I know you are stressed, but you need to pull yourself together for the meeting.",
    category: "idioms",
  },
  {
    word: "See eye to eye",
    translation: "Estar totalmente de acuerdo",
    example: "My boss and I don't always see eye to eye on scheduling.",
    category: "idioms",
  },
  {
    word: "Speak of the devil",
    translation: "Hablando del rey de Roma (cuando aparece de quien hablas)",
    example:
      "Did you hear what Alex did? Oh, speak of the devil, here he comes!",
    category: "idioms",
  },
  {
    word: "Take it with a grain of salt",
    translation: "Tomarlo con pinzas / No creerlo al pie de la letra",
    example: "He exaggerates, so take his stories with a grain of salt.",
    category: "idioms",
  },
  {
    word: "Through thick and thin",
    translation: "En las buenas y en las malas",
    example:
      "They have been best friends for twenty years through thick and thin.",
    category: "idioms",
  },
  {
    word: "The best of both worlds",
    translation:
      "Lo mejor de dos mundos / Disfrutar de dos oportunidades distintas a la vez",
    example:
      "Working remotely from the beach gives him the best of both worlds.",
    category: "idioms",
  },
  {
    word: "On thin ice",
    translation: "Estar en una situación muy arriesgada o delicada",
    example:
      "After missing three deadlines, he is on thin ice with his manager.",
    category: "idioms",
  },
  {
    word: "Barking up the wrong tree",
    translation: "Equivocar el camino / Buscar en el lugar equivocado",
    example:
      "If you think I'm responsible for this bug, you're barking up the wrong tree.",
    category: "idioms",
  },
  {
    word: "A penny for your thoughts",
    translation: "¿En qué estás pensando? / Conocer la opinión de alguien",
    example: "You've been quiet for a while. A penny for your thoughts?",
    category: "idioms",
  },
  {
    word: "Break the ice",
    translation: "Romper el hielo / Iniciar una conversación de forma amigable",
    example:
      "He told a joke at the beginning of the presentation to break the ice.",
    category: "idioms",
  },
  {
    word: "Burn bridges",
    translation: "Quemar puentes / Cortar lazos de forma irreversible",
    example:
      "Never burn bridges when leaving a company; you might work with them again.",
    category: "idioms",
  },
  {
    word: "Hit the sack",
    translation: "Irse a dormir / Irse a la cama",
    example:
      "I'm exhausted after coding all day, it's time for me to hit the sack.",
    category: "idioms",
  },
  {
    word: "Let someone off the hook",
    translation:
      "Dejar a alguien libre de culpa / Salvar a alguien de una situación difícil",
    example:
      "The manager decided to let him off the hook this time for forgetting the report.",
    category: "idioms",
  },
  {
    word: "Call it a day",
    translation: "Dar por terminado el día / Dejar de trabajar por hoy",
    example: "We have solved the main bugs, so let's call it a day.",
    category: "idioms",
  },
  {
    word: "Pull someone's leg",
    translation: "Tomarle el pelo a alguien / Bromear",
    example:
      "Don't worry, I didn't actually delete the production database; I was just pulling your leg!",
    category: "idioms",
  },
  {
    word: "Jump on the bandwagon",
    translation: "Subirse al carro / Unirse a una tendencia popular",
    example:
      "Many companies are jumping on the AI bandwagon without a clear strategy.",
    category: "idioms",
  },
  {
    word: "Burn the midnight oil",
    translation: "Trabajar o estudiar hasta muy tarde en la noche",
    example:
      "She has been burning the midnight oil to prepare for the product launch.",
    category: "idioms",
  },
  {
    word: "Keep your chin up",
    translation:
      "Mantener la frente en alto / Seguir adelante ante la adversidad",
    example:
      "Keep your chin up, I am sure you will find a better job opportunity soon.",
    category: "idioms",
  },
  {
    word: "Cry wolf",
    translation:
      "Mentir pidiendo ayuda de forma que nadie te crea cuando sea verdad",
    example:
      "If you keep crying wolf about system errors, nobody will believe you in a real emergency.",
    category: "idioms",
  },
  {
    word: "Face the music",
    translation: "Afrontar las consecuencias de tus actos",
    example:
      "After ignoring the warning signs, he had to face the music and explain the failure.",
    category: "idioms",
  },

  // ================= PHRASAL VERBS (80) =================
  {
    word: "Keep on",
    translation: "Continuar haciendo algo",
    example: "If you keep on practicing, your English will improve rapidly.",
    category: "phrasal",
  },
  {
    word: "Look forward to",
    translation: "Esperar algo con ansias y emoción",
    example: "I am really looking forward to our trip to London next month.",
    category: "phrasal",
  },
  {
    word: "Run out of",
    translation: "Quedarse sin algo",
    example: "We ran out of coffee, so I need to go to the supermarket.",
    category: "phrasal",
  },
  {
    word: "Give up",
    translation: "Rendirse / Abandonar un hábito",
    example: "Learning a language is hard, but you must never give up!",
    category: "phrasal",
  },
  {
    word: "Look up to",
    translation: "Admirar y respetar a alguien",
    example:
      "I have always looked up to my older sister because she is very smart.",
    category: "phrasal",
  },
  {
    word: "Bring up",
    translation: "Mencionar un tema en una conversación",
    example: "Please don't bring up politics during family dinner.",
    category: "phrasal",
  },
  {
    word: "Call off",
    translation: "Cancelar un evento o reunión",
    example:
      "They decided to call off the outdoor concert because of the heavy rain.",
    category: "phrasal",
  },
  {
    word: "Carry on",
    translation: "Continuar (especialmente ante dificultades)",
    example: "Keep calm and carry on with your tasks.",
    category: "phrasal",
  },
  {
    word: "Cheer up",
    translation: "Alegrarse / Consolar a alguien",
    example: "Here is a cup of hot chocolate to cheer you up.",
    category: "phrasal",
  },
  {
    word: "Come up with",
    translation: "Inventar / Idear una solución o idea",
    example: "We need to come up with a marketing strategy by tomorrow.",
    category: "phrasal",
  },
  {
    word: "Cut down on",
    translation: "Reducir el consumo de algo",
    example: "My doctor told me to cut down on sugar and processed food.",
    category: "phrasal",
  },
  {
    word: "End up",
    translation: "Terminar en una situación o lugar no planeado",
    example:
      "We took the wrong turn and ended up in a beautiful quiet village.",
    category: "phrasal",
  },
  {
    word: "Find out",
    translation: "Descubrir / Enterarse de algo",
    example: "I need to find out what time the museum opens.",
    category: "phrasal",
  },
  {
    word: "Get along with",
    translation: "Llevarse bien con alguien",
    example: "I get along with all my coworkers in the development team.",
    category: "phrasal",
  },
  {
    word: "Hold on",
    translation: "Esperar un momento (generalmente por teléfono o prisa)",
    example: "Hold on a minute, let me grab a pen to write this down.",
    category: "phrasal",
  },
  {
    word: "Look after",
    translation: "Cuidar de alguien o algo",
    example: "Could you look after my cat while I am on vacation next week?",
    category: "phrasal",
  },
  {
    word: "Look up",
    translation: "Buscar información (en un libro, diccionario o internet)",
    example: "If you don't know the definition, look it up in the dictionary.",
    category: "phrasal",
  },
  {
    word: "Make up",
    translation: "Inventar una historia / Reconciliarse",
    example: "He made up an excuse for being late to the morning standup.",
    category: "phrasal",
  },
  {
    word: "Put off",
    translation: "Posponer o retrasar una tarea",
    example: "Don't put off studying for your exam until the last night.",
    category: "phrasal",
  },
  {
    word: "Put up with",
    translation: "Tolerar o aguantar una situación molesta",
    example: "I cannot put up with this noisy air conditioner anymore.",
    category: "phrasal",
  },
  {
    word: "Set up",
    translation: "Instalar / Configurar un sistema o negocio",
    example: "It took me two hours to set up my new dual-monitor workstation.",
    category: "phrasal",
  },
  {
    word: "Take off",
    translation: "Despegar (avión) / Quitarse ropa / Tener éxito repentino",
    example: "The airplane took off exactly on schedule.",
    category: "phrasal",
  },
  {
    word: "Turn down",
    translation: "Rechazar una oferta / Bajar el volumen",
    example: "She turned down the job offer because the salary was too low.",
    category: "phrasal",
  },
  {
    word: "Wake up",
    translation: "Despertar / Despertarse",
    example: "I usually wake up at 7:00 AM without an alarm.",
    category: "phrasal",
  },
  {
    word: "Work out",
    translation: "Hacer ejercicio / Resolver un problema con éxito",
    example: "I hope everything works out well for your new business venture.",
    category: "phrasal",
  },
  {
    word: "Back up",
    translation: "Hacer una copia de seguridad / Respaldar a alguien",
    example:
      "Make sure you back up your files before running the operating system update.",
    category: "phrasal",
  },
  {
    word: "Bring about",
    translation: "Causar / Provocar que algo suceda",
    example:
      "The new policy brought about major changes in the corporate culture.",
    category: "phrasal",
  },
  {
    word: "Count on",
    translation: "Contar con alguien / Confiar en alguien",
    example: "You can always count on me to help you debug your code.",
    category: "phrasal",
  },
  {
    word: "Cut out",
    translation: "Eliminar / Recortar algo",
    example:
      "We need to cut out unnecessary features to release the app next week.",
    category: "phrasal",
  },
  {
    word: "Deal with",
    translation: "Lidiar con / Tratar de resolver un problema",
    example:
      "Our customer support team is trained to deal with difficult issues.",
    category: "phrasal",
  },
  {
    word: "Fall behind",
    translation: "Quedarse atrás / Retrasarse",
    example: "If we don't start coding today, we will fall behind schedule.",
    category: "phrasal",
  },
  {
    word: "Get over",
    translation: "Superar una enfermedad, pérdida o dificultad",
    example:
      "It took him a long time to get over the failure of his first startup.",
    category: "phrasal",
  },
  {
    word: "Go over",
    translation: "Revisar detalladamente",
    example:
      "Let's go over the presentation slides one more time before the demo.",
    category: "phrasal",
  },
  {
    word: "Look down on",
    translation: "Menospreciar / Mirar por encima del hombro",
    example:
      "You should never look down on junior developers; we were all beginners once.",
    category: "phrasal",
  },
  {
    word: "Point out",
    translation: "Señalar / Resaltar un detalle o información",
    example:
      "She pointed out a security vulnerability in our authentication system.",
    category: "phrasal",
  },
  {
    word: "Run into",
    translation: "Encontrarse con alguien o algo por casualidad",
    example: "I ran into my old colleague at the tech conference yesterday.",
    category: "phrasal",
  },
  {
    word: "Take over",
    translation: "Asumir el control o la responsabilidad de algo",
    example:
      "The senior engineer will take over the project leader role next month.",
    category: "phrasal",
  },
  {
    word: "Turn out",
    translation: "Resultar / Acabar siendo de una manera particular",
    example:
      "The backup plan turned out to be much better than the original one.",
    category: "phrasal",
  },
  {
    word: "Watch out",
    translation: "Tener cuidado / Prestar atención al peligro",
    example: "Watch out for outdated libraries when configuring your packages.",
    category: "phrasal",
  },
  {
    word: "Blow up",
    translation: "Explotar / Enojarse mucho repentinamente",
    example:
      "The server blew up because of the sudden influx of concurrent users.",
    category: "phrasal",
  },
  {
    word: "Add fuel to the fire",
    translation: "Echar leña al fuego / Empeorar una situación ya mala",
    example: "Criticizing the team publicly only added fuel to the fire.",
    category: "idioms",
  },
  {
    word: "All ears",
    translation: "Todo oídos / Prestar toda la atención",
    example: "Tell me what happened at the meeting, I'm all ears.",
    category: "idioms",
  },
  {
    word: "At the drop of a hat",
    translation: "En un abrir y cerrar de ojos / Sin dudarlo un momento",
    example:
      "She would quit that job at the drop of a hat if she got a better offer.",
    category: "idioms",
  },
  {
    word: "Back to square one",
    translation: "Volver al punto de partida / Empezar desde cero de nuevo",
    example: "The client rejected our prototype, so we're back to square one.",
    category: "idioms",
  },
  {
    word: "Beat the clock",
    translation: "Ganarle al tiempo / Terminar antes del límite",
    example:
      "The team worked all night to beat the clock and deliver the feature.",
    category: "idioms",
  },
  {
    word: "Bite off more than you can chew",
    translation: "Abarcar más de lo que se puede / Comprometerse con demasiado",
    example:
      "He bit off more than he could chew by taking five projects at once.",
    category: "idioms",
  },
  {
    word: "Blow hot and cold",
    translation: "Ser indeciso / Cambiar de opinión constantemente",
    example:
      "The investor kept blowing hot and cold about funding our startup.",
    category: "idioms",
  },
  {
    word: "Burn the candle at both ends",
    translation: "Quemarse por ambos lados / Trabajar demasiado agotándose",
    example:
      "She's been burning the candle at both ends since the product launch.",
    category: "idioms",
  },
  {
    word: "Cold turkey",
    translation: "Dejar algo de golpe / Abandono abrupto de un hábito",
    example: "He quit social media cold turkey to regain focus on his work.",
    category: "idioms",
  },
  {
    word: "Cost the earth",
    translation: "Costar una fortuna / Ser extremadamente caro",
    example:
      "That conference ticket costs the earth, but it's worth every penny.",
    category: "idioms",
  },
  {
    word: "Cut to the chase",
    translation: "Ir directo al grano / Hablar de lo importante sin rodeos",
    example: "Let's cut to the chase: the launch date has been moved forward.",
    category: "idioms",
  },
  {
    word: "Draw a blank",
    translation: "Quedarse en blanco / No recordar nada",
    example: "I drew a blank when the interviewer asked about binary trees.",
    category: "idioms",
  },
  {
    word: "Drop the ball",
    translation: "Cometer un error / Fallar en una responsabilidad importante",
    example:
      "Someone dropped the ball and forgot to renew the SSL certificate.",
    category: "idioms",
  },
  {
    word: "Every cloud has a silver lining",
    translation: "No hay mal que por bien no venga / Siempre hay algo positivo",
    example:
      "Losing that contract was painful, but every cloud has a silver lining.",
    category: "idioms",
  },
  {
    word: "Feel under the gun",
    translation: "Sentirse bajo presión / Tener que actuar rápido",
    example: "The whole dev team feels under the gun before the product demo.",
    category: "idioms",
  },
  {
    word: "Get the ball rolling",
    translation: "Poner algo en marcha / Dar inicio a un proyecto o tarea",
    example: "Let's get the ball rolling by setting up the project repository.",
    category: "idioms",
  },
  {
    word: "Give the benefit of the doubt",
    translation: "Dar el beneficio de la duda / Creer en alguien sin evidencia",
    example:
      "He was late but I'll give him the benefit of the doubt this time.",
    category: "idioms",
  },
  {
    word: "Go the extra mile",
    translation: "Dar más de lo esperado / Esforzarse más allá de lo requerido",
    example:
      "She always goes the extra mile to make sure the code is well documented.",
    category: "idioms",
  },
  {
    word: "Hit the ground running",
    translation: "Empezar con mucha energía / Arrancar a toda velocidad",
    example:
      "The new developer hit the ground running and shipped code on day one.",
    category: "idioms",
  },
  {
    word: "In a nutshell",
    translation: "En pocas palabras / Resumiendo brevemente",
    example:
      "In a nutshell, we need to refactor the entire authentication module.",
    category: "idioms",
  },
  {
    word: "In the loop",
    translation: "Al tanto / Bien informado sobre lo que está pasando",
    example:
      "Keep me in the loop about any changes to the deployment schedule.",
    category: "idioms",
  },
  {
    word: "Kill two birds with one stone",
    translation:
      "Matar dos pájaros de un tiro / Resolver dos problemas a la vez",
    example:
      "We can kill two birds with one stone by refactoring and adding tests together.",
    category: "idioms",
  },
  {
    word: "Leave no stone unturned",
    translation: "No dejar piedra sin mover / Agotar todas las posibilidades",
    example: "We left no stone unturned while investigating the memory leak.",
    category: "idioms",
  },
  {
    word: "Let sleeping dogs lie",
    translation:
      "Dejar las cosas como están / No despertar problemas del pasado",
    example:
      "That bug hasn't caused issues in months, so let sleeping dogs lie.",
    category: "idioms",
  },
  {
    word: "Look before you leap",
    translation: "Mira antes de saltar / Pensar bien las cosas antes de actuar",
    example:
      "Look before you leap when choosing a new tech stack for production.",
    category: "idioms",
  },
  {
    word: "Move the goalposts",
    translation: "Cambiar las reglas a mitad del juego / Mover los objetivos",
    example:
      "The client keeps moving the goalposts every time we reach a milestone.",
    category: "idioms",
  },
  {
    word: "On the fence",
    translation: "Estar indeciso / No haberse decidido todavía",
    example: "I'm still on the fence about switching from REST to GraphQL.",
    category: "idioms",
  },
  {
    word: "Out of the blue",
    translation: "De la nada / Sin previo aviso",
    example: "Out of the blue, the server crashed right before the demo.",
    category: "idioms",
  },
  {
    word: "Put your foot in your mouth",
    translation: "Meter la pata / Decir algo inapropiado sin querer",
    example:
      "He put his foot in his mouth by mentioning the bug in front of the client.",
    category: "idioms",
  },
  {
    word: "Read between the lines",
    translation: "Leer entre líneas / Entender el mensaje implícito",
    example:
      "Reading between the lines, the manager wants us to release sooner.",
    category: "idioms",
  },
  {
    word: "Reinvent the wheel",
    translation: "Reinventar la rueda / Crear algo que ya existe",
    example:
      "Use a proven library instead of reinventing the wheel for routing.",
    category: "idioms",
  },
  {
    word: "Rule of thumb",
    translation: "Regla general / Criterio práctico basado en experiencia",
    example: "As a rule of thumb, write tests before fixing any critical bug.",
    category: "idioms",
  },
  {
    word: "Step up to the plate",
    translation:
      "Ponerse al frente / Asumir la responsabilidad cuando se necesita",
    example: "When the lead developer left, she stepped up to the plate.",
    category: "idioms",
  },
  {
    word: "Stretch the truth",
    translation: "Exagerar / Decir algo no del todo cierto",
    example:
      "He stretched the truth a bit during the product demo to impress investors.",
    category: "idioms",
  },
  {
    word: "The tip of the iceberg",
    translation: "La punta del iceberg / Lo visible de un problema mucho mayor",
    example:
      "The UI bug is just the tip of the iceberg; the backend logic is broken too.",
    category: "idioms",
  },
  {
    word: "Think on your feet",
    translation: "Pensar rápido / Reaccionar con rapidez ante lo inesperado",
    example:
      "Good developers know how to think on their feet during production incidents.",
    category: "idioms",
  },
  {
    word: "Throw in the towel",
    translation: "Tirar la toalla / Rendirse después de mucho esfuerzo",
    example:
      "After three failed refactoring attempts, the team threw in the towel.",
    category: "idioms",
  },
  {
    word: "Turn over a new leaf",
    translation: "Reformarse / Empezar de nuevo con mejor actitud",
    example:
      "After the failed sprint, the team decided to turn over a new leaf.",
    category: "idioms",
  },
  {
    word: "Under the radar",
    translation: "Bajo el radar / Sin llamar la atención de nadie",
    example: "The security vulnerability went under the radar for six months.",
    category: "idioms",
  },
  {
    word: "Up in the air",
    translation: "En el aire / Todavía sin definir o decidir",
    example:
      "The release date is still up in the air because of budget issues.",
    category: "idioms",
  },
  {
    word: "Break down",
    translation:
      "Descomponerse / Desglosar en partes / Derrumbarse emocionalmente",
    example: "The machine broke down right before the quality test.",
    category: "phrasal",
  },
  {
    word: "Break through",
    translation: "Abrirse paso / Lograr un avance significativo",
    example:
      "After weeks of trying, we finally broke through the performance barrier.",
    category: "phrasal",
  },
  {
    word: "Bring in",
    translation: "Traer / Incorporar / Generar ingresos",
    example: "We decided to bring in an external security consultant.",
    category: "phrasal",
  },
  {
    word: "Build up",
    translation: "Acumular / Construir progresivamente",
    example:
      "We need to build up our test coverage before adding new features.",
    category: "phrasal",
  },
  {
    word: "Burn out",
    translation: "Agotarse / Sufrir burnout por exceso de trabajo",
    example: "She burned out after working twelve-hour days for three months.",
    category: "phrasal",
  },
  {
    word: "Check out",
    translation: "Revisar / Echar un vistazo a algo",
    example: "Check out the new component library we added to the project.",
    category: "phrasal",
  },
  {
    word: "Chip in",
    translation: "Contribuir / Aportar dinero o ideas en grupo",
    example: "Everyone chipped in to find a solution during the hackathon.",
    category: "phrasal",
  },
  {
    word: "Come across",
    translation: "Encontrarse con algo / Dar la impresión de ser",
    example: "I came across a useful Stack Overflow thread while debugging.",
    category: "phrasal",
  },
  {
    word: "Come down to",
    translation: "Reducirse a / Depender fundamentalmente de algo",
    example: "The final decision comes down to cost and scalability.",
    category: "phrasal",
  },
  {
    word: "Cut back",
    translation: "Recortar / Reducir gastos o recursos",
    example: "We had to cut back on server expenses after the funding round.",
    category: "phrasal",
  },
  {
    word: "Figure out",
    translation: "Descifrar / Llegar a entender algo",
    example: "I finally figured out why the pagination was breaking.",
    category: "phrasal",
  },
  {
    word: "Fill in",
    translation: "Rellenar / Reemplazar temporalmente a alguien",
    example: "Can you fill in for me during Tuesday's standup?",
    category: "phrasal",
  },
  {
    word: "Get ahead",
    translation: "Adelantarse / Progresar profesionalmente",
    example:
      "Learning cloud architecture will help you get ahead in your career.",
    category: "phrasal",
  },
  {
    word: "Get back to",
    translation: "Volver a / Responder más tarde a alguien",
    example: "I'll get back to you once I've reviewed the pull request.",
    category: "phrasal",
  },
  {
    word: "Get rid of",
    translation: "Deshacerse de algo / Eliminar",
    example: "We need to get rid of all the deprecated API endpoints.",
    category: "phrasal",
  },
  {
    word: "Give in",
    translation: "Ceder / Rendirse ante la presión",
    example: "Don't give in to technical debt just to ship faster.",
    category: "phrasal",
  },
  {
    word: "Go ahead",
    translation: "Proceder / Continuar / Dar luz verde",
    example: "Go ahead and merge the branch once the CI pipeline passes.",
    category: "phrasal",
  },
  {
    word: "Hang up",
    translation: "Colgar el teléfono / Rendirse",
    example: "He hung up the call when the client became unreasonable.",
    category: "phrasal",
  },
  {
    word: "Keep up with",
    translation: "Mantenerse al día con algo / Seguir el ritmo",
    example: "It's hard to keep up with all the new JavaScript frameworks.",
    category: "phrasal",
  },
  {
    word: "Leave out",
    translation: "Omitir / Excluir algo de una lista o proceso",
    example: "Don't leave out the error handling in the async functions.",
    category: "phrasal",
  },
  {
    word: "Log in",
    translation: "Iniciar sesión",
    example:
      "Users need to log in with their credentials to access the dashboard.",
    category: "phrasal",
  },
  {
    word: "Log out",
    translation: "Cerrar sesión",
    example: "Always log out when using a shared or public computer.",
    category: "phrasal",
  },
  {
    word: "Make out",
    translation: "Entender algo con dificultad / Distinguir",
    example: "I could barely make out the error message on the tiny screen.",
    category: "phrasal",
  },
  {
    word: "Map out",
    translation: "Planificar / Trazar un plan detallado",
    example: "Let's map out the entire sprint before assigning tasks.",
    category: "phrasal",
  },
  {
    word: "Move on",
    translation: "Seguir adelante / Pasar a lo siguiente",
    example: "The bug is fixed, so let's move on to the next ticket.",
    category: "phrasal",
  },
  {
    word: "Narrow down",
    translation: "Reducir opciones / Acotar posibilidades",
    example:
      "We narrowed down the root cause to a faulty environment variable.",
    category: "phrasal",
  },
  {
    word: "Open up",
    translation: "Abrirse / Revelar posibilidades nuevas",
    example: "Microservices open up new possibilities for independent scaling.",
    category: "phrasal",
  },
  {
    word: "Phase out",
    translation: "Eliminar gradualmente / Retirar de forma progresiva",
    example: "We're phasing out the old REST API in favor of GraphQL.",
    category: "phrasal",
  },
  {
    word: "Pick up",
    translation: "Aprender rápido / Recoger / Retomar algo",
    example: "She picked up React in just two weeks of dedicated practice.",
    category: "phrasal",
  },
  {
    word: "Pull off",
    translation: "Lograr algo difícil / Conseguir contra todo pronóstico",
    example: "The team pulled off the release despite last-minute issues.",
    category: "phrasal",
  },
  {
    word: "Push forward",
    translation: "Avanzar / Seguir adelante con determinación",
    example: "Despite the delays, we pushed forward and delivered the MVP.",
    category: "phrasal",
  },
  {
    word: "Roll out",
    translation: "Lanzar / Implementar progresivamente",
    example: "We will roll out the new feature to 10% of users first.",
    category: "phrasal",
  },
  {
    word: "Scale up",
    translation: "Escalar / Aumentar la capacidad de algo",
    example:
      "We need to scale up the infrastructure before the marketing campaign.",
    category: "phrasal",
  },
  {
    word: "Sign up",
    translation: "Registrarse / Inscribirse",
    example: "New users can sign up using their Google or GitHub account.",
    category: "phrasal",
  },
  {
    word: "Slow down",
    translation: "Reducir la velocidad / Ir más despacio",
    example: "The app slowed down after the latest database migration.",
    category: "phrasal",
  },
  {
    word: "Sort out",
    translation: "Resolver / Organizar / Solucionar un problema",
    example: "We need to sort out the authentication bug before the release.",
    category: "phrasal",
  },
  {
    word: "Start over",
    translation: "Volver a empezar / Comenzar de nuevo",
    example: "The prototype was so flawed we had to start over completely.",
    category: "phrasal",
  },
  {
    word: "Step back",
    translation: "Dar un paso atrás / Alejarse para ver el panorama general",
    example: "Sometimes you need to step back and look at the big picture.",
    category: "phrasal",
  },
  {
    word: "Stick to",
    translation: "Mantenerse firme en / Seguir con algo",
    example:
      "Let's stick to the original plan and not change the database schema.",
    category: "phrasal",
  },
  {
    word: "Sum up",
    translation: "Resumir / Hacer un recuento de los puntos clave",
    example: "To sum up, we have three blockers and one critical bug to fix.",
    category: "phrasal",
  },

  // ================= BUSINESS & TECH (100) =================
  {
    word: "Touch base",
    translation: "Ponerse en contacto brevemente",
    example:
      "Let's touch base next Monday to discuss the progress of the project.",
    category: "business",
  },
  {
    word: "Think outside the box",
    translation: "Pensar de forma creativa e innovadora",
    example:
      "To solve this architectural problem, we need to think outside the box.",
    category: "business",
  },
  {
    word: "On the same page",
    translation: "Estar de acuerdo o en sintonía",
    example:
      "Before we start, I want to make sure everyone is on the same page.",
    category: "business",
  },
  {
    word: "To wrap up",
    translation: "Concluir o finalizar una reunión o tarea",
    example: "Let's wrap up this meeting so we can get back to coding.",
    category: "business",
  },
  {
    word: "Feedback",
    translation: "Retroalimentación / Opiniones constructivas",
    example: "Your feedback on my pull request was extremely helpful.",
    category: "business",
  },
  {
    word: "Bandwidth",
    translation: "Capacidad de tiempo o recursos para hacer algo",
    example: "I don't have the bandwidth to take on another project this week.",
    category: "business",
  },
  {
    word: "Bottleneck",
    translation: "Cuello de botella / Punto que frena un proceso",
    example:
      "The manual database review is a major bottleneck in our deployment.",
    category: "business",
  },
  {
    word: "Leverage",
    translation: "Aprovechar / Utilizar algo para obtener ventaja",
    example:
      "We can leverage our existing React components to build this page faster.",
    category: "business",
  },
  {
    word: "Pivot",
    translation: "Cambiar de dirección o estrategia drásticamente",
    example: "The startup had to pivot its business model to survive.",
    category: "business",
  },
  {
    word: "Scale",
    translation: "Escalar / Crecer de forma estructurada",
    example:
      "Our server needs to scale automatically when user traffic increases.",
    category: "business",
  },
  {
    word: "Core competency",
    translation: "Competencia clave / Habilidad principal",
    example: "Writing clean TypeScript code is our team's core competency.",
    category: "business",
  },
  {
    word: "Deadline",
    translation: "Fecha límite de entrega",
    example:
      "The absolute deadline for completing the database migration is Friday.",
    category: "business",
  },
  {
    word: "Deliverable",
    translation: "Entregable / Producto final a presentar",
    example: "We have three main deliverables for the client this sprint.",
    category: "business",
  },
  {
    word: "Disruptive",
    translation: "Disruptivo / Que rompe los esquemas tradicionales",
    example: "Generative AI is a highly disruptive technology in our industry.",
    category: "business",
  },
  {
    word: "Empower",
    translation: "Empoderar / Dar autoridad o herramientas",
    example:
      "A good manager empowers their team to make architectural choices.",
    category: "business",
  },
  {
    word: "Benchmark",
    translation: "Punto de referencia / Estándar de comparación",
    example:
      "We ran a benchmark to compare SQLite performance against PostgreSQL.",
    category: "business",
  },
  {
    word: "Low-hanging fruit",
    translation: "Objetivos fáciles de alcanzar / Ganancias rápidas",
    example: "Optimizing image sizes is low-hanging fruit for page speed.",
    category: "business",
  },
  {
    word: "Mitigate",
    translation: "Mitigar / Reducir un impacto negativo o riesgo",
    example: "We wrote unit tests to mitigate the risk of introducing bugs.",
    category: "business",
  },
  {
    word: "Outsource",
    translation: "Subcontratar / Tercerizar",
    example:
      "We decided to outsource the graphic design work to a specialized agency.",
    category: "business",
  },
  {
    word: "Paradigm shift",
    translation: "Cambio de paradigma / Transformación de mentalidad",
    example:
      "Tailwind v4's CSS-first theme configuration represents a paradigm shift.",
    category: "business",
  },
  {
    word: "ROI (Return on Investment)",
    translation: "Retorno de inversión",
    example:
      "Refactoring this old code has a high ROI in terms of developer speed.",
    category: "business",
  },
  {
    word: "Stakeholder",
    translation: "Parte interesada / Cliente o socio involucrado",
    example: "We need to present our implementation plan to all stakeholders.",
    category: "business",
  },
  {
    word: "Streamline",
    translation: "Optimizar / Simplificar un proceso",
    example: "Prisma handles migrations to streamline database development.",
    category: "business",
  },
  {
    word: "Synergy",
    translation: "Sinergia / Cooperación que produce un resultado superior",
    example:
      "The synergy between our designers and frontend developers is excellent.",
    category: "business",
  },
  {
    word: "Takeaway",
    translation: "Punto clave / Conclusión a recordar",
    example:
      "The main takeaway from the post-mortem is that we need better monitoring.",
    category: "business",
  },
  {
    word: "Best practice",
    translation: "Buena práctica / Estándar recomendado",
    example:
      "Using clean singletons for database clients is a Next.js best practice.",
    category: "business",
  },
  {
    word: "Redundant",
    translation: "Redundante / Duplicado innecesario",
    example: "We removed the redundant API endpoints to clean up the backend.",
    category: "business",
  },
  {
    word: "Milestone",
    translation: "Hito / Logro importante en un proyecto",
    example: "Reaching 100 daily active users is a huge milestone for us.",
    category: "business",
  },
  {
    word: "Trade-off",
    translation: "Compromiso / Intercambio de ventajas y desventajas",
    example:
      "Choosing SQLite over PostgreSQL is a trade-off between simplicity and scale.",
    category: "business",
  },
  {
    word: "Actionable",
    translation: "Accionable / Que se puede poner en práctica directamente",
    example: "The feedback on my code was very clear and actionable.",
    category: "business",
  },
  {
    word: "Agile",
    translation: "Metodología de desarrollo rápido y adaptable",
    example:
      "Our software development team uses Agile methodology to release updates weekly.",
    category: "business",
  },
  {
    word: "Scalability",
    translation: "Escalabilidad / Capacidad de adaptación al crecimiento",
    example: "We designed the cloud backend with high scalability in mind.",
    category: "business",
  },
  {
    word: "Framework",
    translation: "Marco de trabajo / Entorno de desarrollo estructurado",
    example:
      "Next.js is the most popular framework for building modern React web apps.",
    category: "business",
  },
  {
    word: "Deployment",
    translation: "Despliegue / Lanzamiento a producción",
    example:
      "The deployment of the new software version was completed successfully without downtime.",
    category: "business",
  },
  {
    word: "Refactoring",
    translation:
      "Refactorización / Mejora interna del código sin alterar su comportamiento",
    example:
      "Code refactoring is necessary to keep our database logic clean and maintainable.",
    category: "business",
  },
  {
    word: "Repository",
    translation: "Repositorio / Almacén de código",
    example:
      "Please clone the GitHub repository and create a new branch for your feature.",
    category: "business",
  },
  {
    word: "Vulnerability",
    translation: "Vulnerabilidad / Punto débil en seguridad",
    example:
      "We patched a critical security vulnerability in the user login system.",
    category: "business",
  },
  {
    word: "KPI (Key Performance Indicator)",
    translation: "Indicador clave de rendimiento",
    example:
      "Our main KPI for this quarter is to reduce the application page load time.",
    category: "business",
  },
  {
    word: "Bootcamp",
    translation: "Curso intensivo y práctico",
    example:
      "He joined a coding bootcamp to switch his career path to web development.",
    category: "business",
  },
  {
    word: "API (Application Programming Interface)",
    translation: "Interfaz de programación de aplicaciones",
    example:
      "The speech recognition feature communicates with the Google Cloud Speech API.",
    category: "business",
  },
  {
    word: "Onboarding",
    translation: "Proceso de integración y capacitación de nuevos miembros",
    example:
      "The new developer onboarding process was very smooth and well-documented.",
    category: "business",
  },
  {
    word: "User experience (UX)",
    translation: "Experiencia de usuario",
    example:
      "Adding smooth animations significantly improves the app's user experience.",
    category: "business",
  },
  {
    word: "User interface (UI)",
    translation: "Interfaz de usuario",
    example:
      "Our UI has a beautiful glassmorphism design with harmonized HSL colors.",
    category: "business",
  },
  {
    word: "Churn rate",
    translation: "Tasa de cancelación o abandono de clientes",
    example:
      "We need to improve our premium features to reduce the subscriber churn rate.",
    category: "business",
  },
  {
    word: "Freemium",
    translation: "Modelo de negocio gratuito con opciones de pago",
    example:
      "Aura uses a freemium model where basic lessons are free, but voice tutor is premium.",
    category: "business",
  },
  {
    word: "Retention",
    translation: "Retención / Capacidad de mantener a los usuarios activos",
    example:
      "Gamifying the vocabulary practice is a powerful strategy to boost retention.",
    category: "business",
  },
  {
    word: "Technical debt",
    translation:
      "Deuda técnica / Costo acumulado por tomar atajos de desarrollo rápidos",
    example:
      "Ignoring clean code practices creates technical debt that slows down the team.",
    category: "business",
  },
  {
    word: "Monetization",
    translation: "Monetización / Proceso de convertir algo en dinero",
    example:
      "Adding a premium AI conversation tier is the next step in our monetization plan.",
    category: "business",
  },
  {
    word: "Sprint",
    translation: "Ciclo de desarrollo corto (usualmente de 2 semanas)",
    example:
      "We committed to completing the speech evaluation dashboard in this sprint.",
    category: "business",
  },
  {
    word: "SaaS (Software as a Service)",
    translation: "Software como servicio (modelo de distribución en la nube)",
    example:
      "Our goal is to launch the English learning platform as a scalable SaaS product.",
    category: "business",
  },
  {
    word: "Optimization",
    translation:
      "Optimización / Proceso de hacer algo lo más eficiente posible",
    example:
      "Database index optimization reduced search response time to less than ten milliseconds.",
    category: "business",
  },
  {
    word: "Above the fold",
    translation:
      "Parte visible sin desplazarse / Contenido de alta prioridad visual",
    example:
      "Always place the call-to-action above the fold for higher conversions.",
    category: "business",
  },
  {
    word: "Asynchronous",
    translation: "Asincrónico / Proceso que no bloquea la ejecución principal",
    example:
      "Use asynchronous API calls to keep the user interface responsive.",
    category: "business",
  },
  {
    word: "Backlog",
    translation: "Lista de tareas pendientes de un proyecto",
    example: "We have thirty items in our backlog waiting for the next sprint.",
    category: "business",
  },
  {
    word: "Blue-sky thinking",
    translation:
      "Pensamiento sin límites / Brainstorming creativo sin restricciones",
    example:
      "In today's session, we want pure blue-sky thinking about new product ideas.",
    category: "business",
  },
  {
    word: "Boilerplate",
    translation: "Código base reutilizable / Plantilla estándar",
    example:
      "This Next.js boilerplate already includes Prisma and Tailwind configured.",
    category: "business",
  },
  {
    word: "Bug bounty",
    translation: "Recompensa por encontrar vulnerabilidades de seguridad",
    example:
      "Our company runs a bug bounty program to find security vulnerabilities.",
    category: "business",
  },
  {
    word: "Cache",
    translation:
      "Caché / Almacenamiento temporal para acelerar el acceso a datos",
    example: "Implementing a Redis cache reduced our API response time by 80%.",
    category: "business",
  },
  {
    word: "CI/CD",
    translation:
      "Integración y entrega continua / Automatización del despliegue",
    example:
      "Our CI/CD pipeline runs all tests automatically before every deployment.",
    category: "business",
  },
  {
    word: "Clickbait",
    translation: "Contenido sensacionalista diseñado para generar clics",
    example:
      "Avoid clickbait titles; they damage long-term trust with your audience.",
    category: "business",
  },
  {
    word: "Cloud-native",
    translation: "Diseñado específicamente para funcionar en la nube",
    example: "We are rebuilding the app as a cloud-native solution on AWS.",
    category: "business",
  },
  {
    word: "Cold start",
    translation: "Inicio en frío / Primera carga de una función serverless",
    example:
      "Lambda cold start times increased our API latency at low traffic.",
    category: "business",
  },
  {
    word: "Compliance",
    translation: "Cumplimiento normativo / Adherencia a regulaciones",
    example:
      "GDPR compliance is mandatory for all apps that handle European user data.",
    category: "business",
  },
  {
    word: "Containerization",
    translation:
      "Contenerización / Encapsular aplicaciones en contenedores Docker",
    example:
      "Containerization with Docker ensures consistency across all environments.",
    category: "business",
  },
  {
    word: "Conversion rate",
    translation:
      "Tasa de conversión / % de visitantes que realizan una acción clave",
    example: "Our landing page redesign boosted the conversion rate by 35%.",
    category: "business",
  },
  {
    word: "Customer journey",
    translation:
      "Recorrido del cliente / Todas las interacciones con el producto",
    example:
      "Mapping the customer journey helped us identify friction points in onboarding.",
    category: "business",
  },
  {
    word: "Daily Active Users (DAU)",
    translation: "Usuarios activos diarios",
    example:
      "Our DAU grew from 500 to 5,000 in just three months after launch.",
    category: "business",
  },
  {
    word: "Data-driven",
    translation: "Basado en datos / Decisiones respaldadas por métricas",
    example: "We take a data-driven approach to every new feature we build.",
    category: "business",
  },
  {
    word: "Dependency",
    translation: "Dependencia / Librería o módulo externo requerido",
    example:
      "We need to update our dependencies to patch the security vulnerabilities.",
    category: "business",
  },
  {
    word: "DevOps",
    translation: "Cultura de integración entre desarrollo y operaciones",
    example:
      "Adopting DevOps practices cut our deployment time from days to hours.",
    category: "business",
  },
  {
    word: "Downtime",
    translation:
      "Tiempo de inactividad / Período en que un sistema no está disponible",
    example:
      "The system experienced 2 hours of downtime after the failed migration.",
    category: "business",
  },
  {
    word: "Edge case",
    translation: "Caso extremo / Situación límite poco frecuente",
    example: "Make sure the input validator handles all edge cases properly.",
    category: "business",
  },
  {
    word: "End-to-end testing",
    translation: "Pruebas de extremo a extremo / Validación completa del flujo",
    example:
      "We use Playwright for end-to-end testing of all critical user flows.",
    category: "business",
  },
  {
    word: "Endpoint",
    translation: "Punto final de una API / URL que recibe peticiones",
    example:
      "The /api/users endpoint returns paginated results from the database.",
    category: "business",
  },
  {
    word: "Event-driven",
    translation: "Basado en eventos / Arquitectura que reacciona a eventos",
    example:
      "We use an event-driven architecture to handle real-time notifications.",
    category: "business",
  },
  {
    word: "Fail-safe",
    translation:
      "A prueba de fallos / Diseño que minimiza el daño ante errores",
    example:
      "The payment system has a fail-safe mechanism that prevents double charges.",
    category: "business",
  },
  {
    word: "Feature flag",
    translation:
      "Bandera de característica / Control para activar funciones gradualmente",
    example:
      "Use feature flags to roll out the new dashboard without a full deployment.",
    category: "business",
  },
  {
    word: "Go-to-market",
    translation: "Estrategia de salida al mercado",
    example:
      "Our go-to-market strategy targets mid-size companies in Latin America.",
    category: "business",
  },
  {
    word: "Hardcoded",
    translation:
      "Codificado directamente / Valor fijo en el código (mala práctica)",
    example:
      "Never leave hardcoded credentials in your source code repository.",
    category: "business",
  },
  {
    word: "Infrastructure as Code (IaC)",
    translation:
      "Infraestructura como código / Gestión de servidores mediante código",
    example:
      "We use Terraform for Infrastructure as Code to automate our cloud setup.",
    category: "business",
  },
  {
    word: "Integration",
    translation: "Integración / Conexión entre dos sistemas o herramientas",
    example:
      "The Stripe integration handles all premium subscription payments.",
    category: "business",
  },
  {
    word: "Iteration",
    translation: "Iteración / Ciclo de mejora progresiva",
    example: "Each iteration brings us closer to the final polished product.",
    category: "business",
  },
  {
    word: "Legacy code",
    translation: "Código heredado / Código antiguo difícil de mantener",
    example:
      "We spent two sprints refactoring legacy code in the authentication module.",
    category: "business",
  },
  {
    word: "Load balancer",
    translation:
      "Balanceador de carga / Distribuye el tráfico entre servidores",
    example: "We added a load balancer to handle sudden traffic spikes.",
    category: "business",
  },
  {
    word: "Microservices",
    translation:
      "Microservicios / Arquitectura de servicios pequeños e independientes",
    example: "We split the monolith into microservices for better scalability.",
    category: "business",
  },
  {
    word: "Mock-up",
    translation: "Maqueta visual / Prototipo visual de una pantalla o diseño",
    example: "The designer shared a mock-up of the new dashboard in Figma.",
    category: "business",
  },
  {
    word: "Monolith",
    translation: "Monolito / Aplicación de una sola pieza unificada",
    example: "Our monolith worked fine early on but now it's hard to scale.",
    category: "business",
  },
  {
    word: "Open source",
    translation: "Código abierto / Software con código disponible públicamente",
    example: "Next.js is an open source framework maintained by Vercel.",
    category: "business",
  },
  {
    word: "Overhead",
    translation: "Carga adicional / Coste extra que no aporta valor directo",
    example: "Too many meetings create overhead that slows down development.",
    category: "business",
  },
  {
    word: "Proof of concept (POC)",
    translation: "Prueba de concepto / Demostración inicial de viabilidad",
    example: "We built a POC in a week to validate the AI integration idea.",
    category: "business",
  },
  {
    word: "Rate limiting",
    translation:
      "Limitación de peticiones / Control de la frecuencia de llamadas a una API",
    example: "We implemented rate limiting to prevent abuse of the public API.",
    category: "business",
  },
  {
    word: "Refactor",
    translation:
      "Refactorizar / Reescribir código para mejorar su estructura interna",
    example:
      "We need to refactor the payment logic before adding new currencies.",
    category: "business",
  },
  {
    word: "Release candidate",
    translation:
      "Candidato a lanzamiento / Versión casi final lista para pruebas",
    example:
      "The release candidate is deployed in staging for final QA testing.",
    category: "business",
  },
  {
    word: "Rollback",
    translation: "Reversión / Volver a una versión anterior ante un fallo",
    example:
      "We triggered a rollback after the deployment broke the login screen.",
    category: "business",
  },
  {
    word: "Serverless",
    translation:
      "Sin servidor / Modelo donde el proveedor gestiona la infraestructura",
    example:
      "Serverless functions on Vercel handle our background processing tasks.",
    category: "business",
  },
  {
    word: "Singleton",
    translation:
      "Patrón de una sola instancia / Objeto con una única instancia global",
    example:
      "We use a singleton pattern for the database client to avoid connection leaks.",
    category: "business",
  },
  {
    word: "Tech stack",
    translation:
      "Stack tecnológico / Conjunto de tecnologías usadas en un proyecto",
    example:
      "Our tech stack is Next.js, Prisma, SQLite, Tailwind, and TypeScript.",
    category: "business",
  },
  {
    word: "Token",
    translation: "Token / Credencial de acceso o unidad de datos en IA",
    example:
      "Each API request must include a valid bearer token in the header.",
    category: "business",
  },
  {
    word: "Unit test",
    translation:
      "Prueba unitaria / Validación de una función o componente individual",
    example: "We write unit tests for every utility function in the codebase.",
    category: "business",
  },
  {
    word: "Uptime",
    translation:
      "Tiempo de actividad / Porcentaje de tiempo que el sistema está disponible",
    example: "We guarantee 99.9% uptime in our premium SaaS service agreement.",
    category: "business",
  },
  {
    word: "User story",
    translation:
      "Historia de usuario / Descripción de una necesidad desde la perspectiva del usuario",
    example:
      "Each user story describes what the feature should do, not how it works.",
    category: "business",
  },
  {
    word: "Zero downtime deployment",
    translation:
      "Despliegue sin interrupciones / Actualización sin tiempo de inactividad",
    example:
      "We use blue-green deployment to achieve zero downtime deployments.",
    category: "business",
  },

  // ================= TRAVEL (80) =================
  {
    word: "Check in",
    translation: "Registrarse en un hotel o aeropuerto",
    example: "We need to check in at the hotel before 3:00 PM.",
    category: "travel",
  },
  {
    word: "Touch down",
    translation: "Aterrizar (un avión)",
    example: "Our flight is scheduled to touch down at 9:00 AM.",
    category: "travel",
  },
  {
    word: "Catch up",
    translation: "Alcanzar a alguien / Ponerse al día",
    example: "Go ahead, I will catch up with you at the museum entrance.",
    category: "travel",
  },
  {
    word: "On a budget",
    translation: "Con presupuesto ajustado",
    example: "We traveled around Europe on a budget, staying in hostels.",
    category: "travel",
  },
  {
    word: "Book in advance",
    translation: "Reservar con anticipación",
    example: "You should book the train tickets in advance to get a discount.",
    category: "travel",
  },
  {
    word: "Accommodation",
    translation: "Alojamiento / Hospedaje",
    example: "Finding affordable accommodation in Tokyo can be challenging.",
    category: "travel",
  },
  {
    word: "Boarding pass",
    translation: "Pase de abordar / Tarjeta de embarque",
    example: "Please have your boarding pass and passport ready at the gate.",
    category: "travel",
  },
  {
    word: "Customs",
    translation: "Aduana",
    example: "It took us forty minutes to pass through customs at the airport.",
    category: "travel",
  },
  {
    word: "Delayed",
    translation: "Demorado / Retrasado",
    example:
      "Our flight was delayed by two hours due to bad weather conditions.",
    category: "travel",
  },
  {
    word: "Departure",
    translation: "Salida / Partida",
    example: "Check the departure screen to find your flight's gate number.",
    category: "travel",
  },
  {
    word: "Destination",
    translation: "Destino",
    example:
      "Paris remains one of the most popular travel destinations in the world.",
    category: "travel",
  },
  {
    word: "Fare",
    translation: "Tarifa / Precio del pasaje (transporte)",
    example: "The subway fare in London is quite expensive.",
    category: "travel",
  },
  {
    word: "Itinerary",
    translation: "Itinerario / Plan de viaje detallado",
    example: "I have prepared a detailed itinerary for our trip to Rome.",
    category: "travel",
  },
  {
    word: "Layover",
    translation: "Escala / Parada técnica en un viaje",
    example: "We have a six-hour layover in Madrid before our flight to Miami.",
    category: "travel",
  },
  {
    word: "Luggage",
    translation: "Equipaje / Maletas",
    example: "Make sure to keep an eye on your luggage at the train station.",
    category: "travel",
  },
  {
    word: "One-way ticket",
    translation: "Boleto de ida",
    example:
      "I bought a one-way ticket because I don't know when I will return.",
    category: "travel",
  },
  {
    word: "Round-trip ticket",
    translation: "Boleto de ida y vuelta",
    example:
      "A round-trip ticket is usually cheaper than buying two single ones.",
    category: "travel",
  },
  {
    word: "Sightseeing",
    translation: "Turismo / Visita de lugares de interés",
    example: "We spent the whole afternoon sightseeing around the old town.",
    category: "travel",
  },
  {
    word: "Terminal",
    translation: "Terminal (de aeropuerto o autobús)",
    example: "International flights depart from Terminal 2.",
    category: "travel",
  },
  {
    word: "Tour guide",
    translation: "Guía turístico",
    example:
      "Our tour guide explained the history of the Colosseum beautifully.",
    category: "travel",
  },
  {
    word: "Travel agency",
    translation: "Agencia de viajes",
    example: "We booked our cruise vacation through a local travel agency.",
    category: "travel",
  },
  {
    word: "Unpack",
    translation: "Desempacar / Deshacer las maletas",
    example: "I want to unpack my bags as soon as we check in to our room.",
    category: "travel",
  },
  {
    word: "Voucher",
    translation: "Vale / Cupón de reserva",
    example: "Here is your hotel voucher; please present it at the reception.",
    category: "travel",
  },
  {
    word: "Youth hostel",
    translation: "Albergue juvenil",
    example:
      "Staying in a youth hostel is a great way to meet other travelers.",
    category: "travel",
  },
  {
    word: "Leisure",
    translation: "Ocio / Tiempo libre",
    example:
      "The hotel offers excellent facilities for both business and leisure.",
    category: "travel",
  },
  {
    word: "Broaden your horizons",
    translation: "Ampliar tus horizontes / Conocer nuevas culturas",
    example:
      "Traveling the world is one of the best ways to broaden your horizons.",
    category: "travel",
  },
  {
    word: "Jet lag",
    translation: "Fatiga por diferencia horaria tras un largo vuelo",
    example:
      "She suffered from terrible jet lag after her twelve-hour flight from Tokyo.",
    category: "travel",
  },
  {
    word: "Overbook",
    translation: "Sobrevender (vuelos o habitaciones de hotel)",
    example:
      "The airline had to overbook the flight, so they offered a free upgrade to first class.",
    category: "travel",
  },
  {
    word: "Breathtaking",
    translation: "Impresionante / Que te deja sin aliento",
    example:
      "The view from the top of the mountain was absolutely breathtaking.",
    category: "travel",
  },
  {
    word: "Hitchhike",
    translation: "Hacer autostop / Viajar 'a dedo'",
    example:
      "They decided to hitchhike across South America to save money and meet locals.",
    category: "travel",
  },
  {
    word: "Local custom",
    translation: "Costumbre local",
    example:
      "It is highly important to respect local customs when visiting another country.",
    category: "travel",
  },
  {
    word: "Touristic",
    translation: "Turístico / Muy concurrido por turistas",
    example:
      "We preferred exploring hidden villages rather than staying in highly touristic areas.",
    category: "travel",
  },
  {
    word: "Wanderlust",
    translation: "Pasión por viajar / Fuerte deseo de explorar el mundo",
    example:
      "Her wanderlust led her to visit over thirty different countries in five years.",
    category: "travel",
  },
  {
    word: "Check out (hotel)",
    translation: "Hacer el registro de salida de un hotel",
    example:
      "We must check out of the room by noon, but we can leave our luggage at the reception.",
    category: "travel",
  },
  {
    word: "Backpacker",
    translation: "Mochilero / Viajero de bajo presupuesto con mochila",
    example:
      "He spent his summer traveling through Southeast Asia as a backpacker.",
    category: "travel",
  },
  {
    word: "Souvenir",
    translation: "Recuerdo de viaje",
    example:
      "I bought a beautiful handmade ceramic cup as a souvenir from the local market.",
    category: "travel",
  },
  {
    word: "Embassy",
    translation: "Embajada",
    example:
      "If you lose your passport abroad, you must contact your national embassy immediately.",
    category: "travel",
  },
  {
    word: "Foreign currency",
    translation: "Moneda extranjera / Divisa",
    example:
      "It is a good idea to exchange some foreign currency before traveling to remote areas.",
    category: "travel",
  },
  {
    word: "Off the beaten track",
    translation: "Fuera de la ruta turística habitual / Recóndito",
    example:
      "We love discovering local restaurants that are off the beaten track.",
    category: "travel",
  },
  {
    word: "Visa",
    translation: "Visado / Permiso de entrada a un país",
    example:
      "Make sure you apply for your tourist visa at least three weeks before your trip.",
    category: "travel",
  },

  // ================= CORE HIGH-FREQUENCY WORDS (100) =================
  {
    word: "Achieve",
    translation: "Lograr / Alcanzar un objetivo",
    example: "If you work hard, you can achieve your professional goals.",
    category: "core",
  },
  {
    word: "Acquire",
    translation: "Adquirir / Obtener",
    example:
      "Learning is the process by which we acquire new knowledge and skills.",
    category: "core",
  },
  {
    word: "Adapt",
    translation: "Adaptarse / Acomodarse",
    example: "Successful developers must adapt quickly to new technologies.",
    category: "core",
  },
  {
    word: "Analyze",
    translation: "Analizar",
    example:
      "We need to analyze the application logs to find the root cause of the error.",
    category: "core",
  },
  {
    word: "Approach",
    translation: "Enfoque / Aproximación / Acercamiento",
    example: "Our approach to learning English focuses on voice interaction.",
    category: "core",
  },
  {
    word: "Assess",
    translation: "Evaluar / Tasar / Valorar",
    example: "The Gemini tutor will assess your grammar in real time.",
    category: "core",
  },
  {
    word: "Assume",
    translation: "Asumir / Suponer",
    example:
      "Do not assume the user has a local database installed; handle errors gracefully.",
    category: "core",
  },
  {
    word: "Authority",
    translation: "Autoridad / Experto",
    example: "She is a leading authority on artificial intelligence research.",
    category: "core",
  },
  {
    word: "Available",
    translation: "Disponible",
    example: "The SQLite database is available immediately upon installation.",
    category: "core",
  },
  {
    word: "Benefit",
    translation: "Beneficio / Beneficiar",
    example:
      "Learning English will highly benefit your software engineering career.",
    category: "core",
  },
  {
    word: "Category",
    translation: "Categoría",
    example:
      "Our vocabulary flashcards are divided into five separate categories.",
    category: "core",
  },
  {
    word: "Challenge",
    translation: "Desafío / Reto",
    example:
      "Speaking a new language fluently is a challenging but rewarding task.",
    category: "core",
  },
  {
    word: "Clarify",
    translation: "Aclarar / Clarificar",
    example: "Could you clarify the requirements for this new feature?",
    category: "core",
  },
  {
    word: "Comply",
    translation: "Cumplir con / Acatar",
    example: "Our app must comply with Radix UI accessibility standards.",
    category: "core",
  },
  {
    word: "Consequence",
    translation: "Consecuencia",
    example:
      "Writing messy code has long-term consequences for product stability.",
    category: "core",
  },
  {
    word: "Consistent",
    translation: "Consistente / Constante",
    example:
      "Consistent practice is the key to mastering English pronunciation.",
    category: "core",
  },
  {
    word: "Constant",
    translation: "Constante / Continuo",
    example:
      "Technology undergoes constant change, requiring lifelong learning.",
    category: "core",
  },
  {
    word: "Consumer",
    translation: "Consumidor / Cliente",
    example: "We must focus on delivering value to our end consumers.",
    category: "core",
  },
  {
    word: "Context",
    translation: "Contexto",
    example:
      "Having the correct context helps the AI provide much better answers.",
    category: "core",
  },
  {
    word: "Criteria",
    translation: "Criterio / Criterios",
    example: "What are the criteria for scoring pronunciation accuracy?",
    category: "core",
  },
  {
    word: "Define",
    translation: "Definir",
    example:
      "We will define the database models inside the prisma schema file.",
    category: "core",
  },
  {
    word: "Derived",
    translation: "Derivado",
    example: "Many English words are derived from Latin and French.",
    category: "core",
  },
  {
    word: "Device",
    translation: "Dispositivo / Aparato",
    example: "Aura is responsive and works beautifully on any mobile device.",
    category: "core",
  },
  {
    word: "Distinction",
    translation: "Distinción / Diferencia",
    example:
      "It is important to understand the distinction between React and Next.js.",
    category: "core",
  },
  {
    word: "Diverse",
    translation: "Diverso / Variado",
    example:
      "Our seed list contains a diverse set of practical vocabulary terms.",
    category: "core",
  },
  {
    word: "Draft",
    translation: "Borrador / Redactar",
    example: "I will write a quick draft of our database migration plan.",
    category: "core",
  },
  {
    word: "Duration",
    translation: "Duración",
    example: "The duration of the audio clip is exactly five seconds.",
    category: "core",
  },
  {
    word: "Efficient",
    translation: "Eficiente",
    example: "Prisma query engine is highly efficient for SQLite databases.",
    category: "core",
  },
  {
    word: "Element",
    translation: "Elemento",
    example:
      "Hover effects and interactive cards are essential design elements.",
    category: "core",
  },
  {
    word: "Emphasize",
    translation: "Enfatizar / Destacar",
    example: "We emphasize practical conversation over grammar memorization.",
    category: "core",
  },
  {
    word: "Enable",
    translation: "Habilitar / Permitir",
    example: "Enabling speech recognition allows hands-free voice chats.",
    category: "core",
  },
  {
    word: "Encounter",
    translation: "Encontrar / Tropezar con / Suceso",
    example: "If you encounter a network error, check your system microphone.",
    category: "core",
  },
  {
    word: "Enhance",
    translation: "Mejorar / Realzar / Potenciar",
    example: "Using Sonner toasts will enhance the overall user experience.",
    category: "core",
  },
  {
    word: "Ensure",
    translation: "Asegurar / Garantizar",
    example:
      "Ensure the local dev server is running before opening the browser.",
    category: "core",
  },
  {
    word: "Environment",
    translation: "Entorno / Medio ambiente",
    example:
      "Configuring the environment variables is the first deployment step.",
    category: "core",
  },
  {
    word: "Equivalent",
    translation: "Equivalente",
    example:
      "SQLite is the local equivalent of a full scale cloud SQL database.",
    category: "core",
  },
  {
    word: "Establish",
    translation: "Establecer / Instaurar",
    example: "We want to establish Aura as a premium English companion app.",
    category: "core",
  },
  {
    word: "Estimate",
    translation: "Estimar / Presupuestar",
    example:
      "Can you estimate how long it will take to complete the migration?",
    category: "core",
  },
  {
    word: "Evaluate",
    translation: "Evaluar / Valorar",
    example:
      "The sandbox tokenizes spoken words to evaluate matching accuracy.",
    category: "core",
  },
  {
    word: "Evidence",
    translation: "Evidencia / Pruebas",
    example:
      "There is clear evidence that interactive learning improves retention.",
    category: "core",
  },
  {
    word: "Exceed",
    translation: "Exceder / Superar",
    example: "Your quiz score is so high, it exceeds the previous high score!",
    category: "core",
  },
  {
    word: "Exclude",
    translation: "Excluir",
    example: "We will exclude the node_modules folder from our source control.",
    category: "core",
  },
  {
    word: "Expand",
    translation: "Expandir / Ampliar",
    example:
      "We will expand the vocabulary list to over 150 terms dynamically.",
    category: "core",
  },
  {
    word: "Expert",
    translation: "Experto / Especialista",
    example: "Sarah is a database expert who helped design our schema.",
    category: "core",
  },
  {
    word: "Explicit",
    translation: "Explícito / Claro",
    example: "The user gave explicit approval to run the migration scripts.",
    category: "core",
  },
  {
    word: "Export",
    translation: "Exportar",
    example: "We can export the chat transcript to a text file for review.",
    category: "core",
  },
  {
    word: "Feature",
    translation: "Característica / Funcionalidad",
    example:
      "The speech-to-text dictation is the most premium feature of the app.",
    category: "core",
  },
  {
    word: "Flexible",
    translation: "Flexible / Adaptable",
    example:
      "SQLite offers a flexible database file that can be committed to Git.",
    category: "core",
  },
  {
    word: "Fluency",
    translation: "Fluidez",
    example:
      "Daily conversation simulation is key to gaining vocabulary and fluency.",
    category: "core",
  },
  {
    word: "Focus",
    translation: "Enfoque / Enfocarse",
    example:
      "Our primary focus is visual excellence and modern rich aesthetics.",
    category: "core",
  },
  {
    word: "Function",
    translation: "Función / Funcionar",
    example:
      "We wrote a helper function to calculate pronunciation similarity.",
    category: "core",
  },
  {
    word: "Generate",
    translation: "Generar",
    example:
      "Next.js will generate static HTML layouts on server-side compilation.",
    category: "core",
  },
  {
    word: "Goal",
    translation: "Meta / Objetivo",
    example: "Our ultimate goal is making English practice fun and affordable.",
    category: "core",
  },
  {
    word: "Identify",
    translation: "Identificar",
    example: "We can easily identify spelling mistakes in the user text.",
    category: "core",
  },
  {
    word: "Ignore",
    translation: "Ignorar",
    example:
      "You can ignore the lint warnings for unused variables temporarily.",
    category: "core",
  },
  {
    word: "Impact",
    translation: "Impacto / Impactar",
    example:
      "A sleek UI layout has a highly positive impact on user retention.",
    category: "core",
  },
  {
    word: "Implement",
    translation: "Implementar / Poner en marcha",
    example: "We will implement a clean postgres-ready SQLite database.",
    category: "core",
  },
  {
    word: "Imply",
    translation: "Implicar / Sugerir",
    example:
      "A 'no-speech' error does not imply your hardware microphone is broken.",
    category: "core",
  },
  {
    word: "Indicate",
    translation: "Indicar / Señalar",
    example: "Red highlights indicate words that were pronounced incorrectly.",
    category: "core",
  },
  {
    word: "Individual",
    translation: "Individual / Particular",
    example:
      "Every individual user profile stores its own local stats records.",
    category: "core",
  },
  {
    word: "Initial",
    translation: "Inicial",
    example:
      "The initial page load reads user data inside a safe useEffect block.",
    category: "core",
  },
  {
    word: "Interact",
    translation: "Interactuar",
    example:
      "Hover animations make it delightful to interact with the sidebar.",
    category: "core",
  },
  {
    word: "Investigate",
    translation: "Investigar / Indagar",
    example: "Let's investigate why the SpeechRecognition API failed to boot.",
    category: "core",
  },
  {
    word: "Job",
    translation: "Trabajo / Empleo",
    example:
      "Developing English fluency will help you secure a global developer job.",
    category: "core",
  },
  {
    word: "Locate",
    translation: "Localizar / Ubicar",
    example:
      "We need to locate the globals.css file to inject custom HSL tokens.",
    category: "core",
  },
  {
    word: "Maintain",
    translation: "Mantener / Conservar",
    example:
      "We must maintain clean separation between client and server components.",
    category: "core",
  },
  {
    word: "Method",
    translation: "Método / Procedimiento",
    example:
      "Fetching from dynamic database endpoints is our preferred method.",
    category: "core",
  },
  {
    word: "Modify",
    translation: "Modificar / Alterar",
    example: "We will modify the page routing to support the new Quiz view.",
    category: "core",
  },
  {
    word: "Monitor",
    translation: "Monitorear / Pantalla",
    example:
      "We will monitor the database performance during intensive queries.",
    category: "core",
  },
  {
    word: "Mutual",
    translation: "Mutuo",
    example:
      "Learning from an AI tutor is based on mutual engagement and curiosity.",
    category: "core",
  },
  {
    word: "Navigate",
    translation: "Navegar / Direccionar",
    example:
      "Clicking items in the sidebar will navigate between application panels.",
    category: "core",
  },
  {
    word: "Obvious",
    translation: "Obvio / Evidente",
    example:
      "It is obvious that learning grammar in context is highly effective.",
    category: "core",
  },
  {
    word: "Occur",
    translation: "Ocurrir / Suceder",
    example:
      "Hydration errors occur when the server HTML differs from the client.",
    category: "core",
  },
  {
    word: "Option",
    translation: "Opción",
    example: "Multiple-choice quizzes offer four options for each question.",
    category: "core",
  },
  {
    word: "Outcome",
    translation: "Resultado / Desenlace",
    example:
      "We are very excited about the positive outcome of our testing phase.",
    category: "core",
  },
  {
    word: "Advocate",
    translation: "Defensor / Abogar por",
    example:
      "The tutor acts as an advocate for your speech confidence and expression.",
    category: "core",
  },
  {
    word: "Alternative",
    translation: "Alternativa / Opción diferente",
    example:
      "Using a local database provides a reliable alternative to online cloud storage.",
    category: "core",
  },
  {
    word: "Appreciate",
    translation: "Apreciar / Valorar",
    example:
      "We highly appreciate constructive feedback to improve our application code.",
    category: "core",
  },
  {
    word: "Attribute",
    translation: "Atributo / Característica",
    example:
      "The user table has an attribute that indicates if they have premium access.",
    category: "core",
  },
  {
    word: "Capacity",
    translation: "Capacidad / Volumen máximo",
    example:
      "The database engine has a massive capacity to handle millions of records.",
    category: "core",
  },
  {
    word: "Complex",
    translation: "Complejo / Difícil",
    example:
      "Learning conversational English can be complex but highly engaging.",
    category: "core",
  },
  {
    word: "Component",
    translation: "Componente / Parte de un sistema",
    example:
      "React components allow us to reuse interactive UI elements across pages.",
    category: "core",
  },
  {
    word: "Contrast",
    translation: "Contraste / Contrastar",
    example:
      "The UI layout uses high-contrast HSL colors for excellent readability.",
    category: "core",
  },
  {
    word: "Contribution",
    translation: "Contribución / Aporte",
    example: "Every contribution to our open-source codebase is deeply valued.",
    category: "core",
  },
  {
    word: "Core",
    translation: "Núcleo / Parte central",
    example:
      "Clean state management is the core component of a responsive app.",
    category: "core",
  },
  {
    word: "Determine",
    translation: "Determinar / Establecer",
    example:
      "User choices during the quiz determine their final vocabulary level.",
    category: "core",
  },
  {
    word: "Diversity",
    translation: "Diversidad / Variedad",
    example:
      "Our seed list offers a rich diversity of words from different business areas.",
    category: "core",
  },
  {
    word: "Dynamic",
    translation: "Dinámico / En constante movimiento o cambio",
    example:
      "Animations create a dynamic user interface that reacts to hover actions.",
    category: "core",
  },
  {
    word: "Evolve",
    translation: "Evolucionar / Desarrollarse",
    example:
      "Web development standards evolve rapidly, requiring constant learning.",
    category: "core",
  },
  {
    word: "Fundamental",
    translation: "Fundamental / Esencial",
    example:
      "Consistent pronunciation practice is fundamental to gaining real confidence.",
    category: "core",
  },
  {
    word: "Generation",
    translation: "Generación / Acción de crear",
    example:
      "Automated seed generation populates the database tables with rich phrases.",
    category: "core",
  },
  {
    word: "Innovation",
    translation: "Innovación / Novedad",
    example:
      "Combining AI tutoring with voice chat is a major learning innovation.",
    category: "core",
  },
  {
    word: "Interaction",
    translation: "Interacción / Acción recíproca",
    example:
      "Voice interaction is the most engaging way to practice speaking skills.",
    category: "core",
  },
  {
    word: "Logical",
    translation: "Lógico / Coherente",
    example:
      "The code follows a highly logical structure that is easy to understand.",
    category: "core",
  },
  {
    word: "Mechanism",
    translation: "Mecanismo / Procedimiento",
    example:
      "The application has a robust mechanism to detect microphone failures.",
    category: "core",
  },
  {
    word: "Objective",
    translation: "Objetivo / Meta",
    example: "Our main objective is making language practice feel like a game.",
    category: "core",
  },
  {
    word: "Perspective",
    translation: "Perspectiva / Punto de vista",
    example:
      "Hearing stories from different perspectives deepens cultural understanding.",
    category: "core",
  },
  {
    word: "Precede",
    translation: "Preceder / Ir antes de",
    example: "A database schema update must precede running a new seed script.",
    category: "core",
  },
  {
    word: "Regulation",
    translation: "Regulación / Norma",
    example:
      "Data protection regulations require secure storage of user account data.",
    category: "core",
  },
  {
    word: "Scenario",
    translation: "Escenario / Situación hipotética",
    example:
      "The chat sandbox features several scenarios like ordering food or job interviews.",
    category: "core",
  },
  {
    word: "Significant",
    translation: "Significativo / Importante",
    example:
      "Daily habit builders lead to significant progress in vocabulary acquisition.",
    category: "core",
  },
  {
    word: "Sustainability",
    translation: "Sostenibilidad / Capacidad de mantenerse en el tiempo",
    example:
      "Clean architectural patterns ensure the long-term sustainability of the code.",
    category: "core",
  },
  {
    word: "Valid",
    translation: "Válido / Con fundamento",
    example:
      "Make sure you provide a valid email address during user registration.",
    category: "core",
  },
  {
    word: "All-inclusive",
    translation:
      "Todo incluido / Paquete con alojamiento, comida y actividades",
    example:
      "We chose an all-inclusive resort to avoid worrying about extra costs.",
    category: "travel",
  },
  {
    word: "Arrival",
    translation: "Llegada / Momento en que se arriba a un destino",
    example: "Please notify the hotel of your arrival time in advance.",
    category: "travel",
  },
  {
    word: "Baggage claim",
    translation:
      "Recogida de equipaje / Área del aeropuerto para recoger maletas",
    example: "Meet me at baggage claim on the lower level of Terminal 1.",
    category: "travel",
  },
  {
    word: "Bed and breakfast",
    translation: "Casa de huéspedes con cama y desayuno incluido",
    example:
      "We stayed at a charming bed and breakfast in the Scottish Highlands.",
    category: "travel",
  },
  {
    word: "Border crossing",
    translation: "Cruce de frontera / Punto de paso entre dos países",
    example:
      "The border crossing between Peru and Bolivia is at the Desaguadero bridge.",
    category: "travel",
  },
  {
    word: "Budget airline",
    translation: "Aerolínea de bajo coste",
    example: "We flew with a budget airline to save money on the short trip.",
    category: "travel",
  },
  {
    word: "Carry-on",
    translation: "Equipaje de mano / Maleta pequeña para llevar en cabina",
    example:
      "Make sure your carry-on fits in the overhead bin above your seat.",
    category: "travel",
  },
  {
    word: "City break",
    translation: "Escapada de fin de semana a una ciudad / Viaje corto urbano",
    example: "We planned a quick city break to Rome for our anniversary.",
    category: "travel",
  },
  {
    word: "Connecting flight",
    translation: "Vuelo de conexión / Vuelo que hace escala en otra ciudad",
    example:
      "My connecting flight in Amsterdam gave me two hours to explore the airport.",
    category: "travel",
  },
  {
    word: "Cruise",
    translation: "Crucero / Viaje en barco con escales en distintas ciudades",
    example:
      "We took a Mediterranean cruise and visited six countries in ten days.",
    category: "travel",
  },
  {
    word: "Culture shock",
    translation:
      "Choque cultural / Desconcierto al encontrarse con costumbres muy distintas",
    example:
      "Moving to Japan was exciting but I experienced a lot of culture shock at first.",
    category: "travel",
  },
  {
    word: "Day trip",
    translation:
      "Excursión de un día / Viaje corto que no requiere dormir fuera",
    example:
      "We did a day trip from Lima to Pachacamac to see the ancient ruins.",
    category: "travel",
  },
  {
    word: "Domestic flight",
    translation: "Vuelo doméstico / Vuelo dentro del mismo país",
    example:
      "We took a domestic flight from Lima to Cusco instead of the long bus ride.",
    category: "travel",
  },
  {
    word: "Duty-free",
    translation: "Libre de impuestos / Tiendas del aeropuerto sin aranceles",
    example:
      "I bought a bottle of perfume at the duty-free shop before boarding.",
    category: "travel",
  },
  {
    word: "Exchange rate",
    translation: "Tipo de cambio / Relación de valor entre dos monedas",
    example:
      "Check the exchange rate before converting your money at the airport.",
    category: "travel",
  },
  {
    word: "Excursion",
    translation: "Excursión / Salida organizada a un lugar de interés",
    example: "We booked an excursion to see Machu Picchu on our second day.",
    category: "travel",
  },
  {
    word: "Expatriate (expat)",
    translation: "Expatriado / Persona que vive fuera de su país de origen",
    example: "The city has a large expat community from all over the world.",
    category: "travel",
  },
  {
    word: "First class",
    translation:
      "Primera clase / Servicio de mayor calidad en aviones o trenes",
    example:
      "She upgraded to first class using her accumulated frequent flyer miles.",
    category: "travel",
  },
  {
    word: "Frequent flyer",
    translation:
      "Viajero frecuente / Miembro del programa de fidelidad de una aerolínea",
    example: "As a frequent flyer, he gets priority boarding on every flight.",
    category: "travel",
  },
  {
    word: "Gate",
    translation: "Puerta de embarque / Acceso al avión en el aeropuerto",
    example: "Please proceed to gate B12 for your flight to Madrid.",
    category: "travel",
  },
  {
    word: "Getaway",
    translation: "Escapada / Viaje corto y rápido para descansar",
    example:
      "We needed a weekend getaway to recharge after the product launch.",
    category: "travel",
  },
  {
    word: "Guided tour",
    translation: "Visita guiada / Recorrido turístico con un guía oficial",
    example: "The guided tour of the Vatican Museums lasted three hours.",
    category: "travel",
  },
  {
    word: "Hidden gem",
    translation: "Joya oculta / Lugar poco conocido pero maravilloso",
    example:
      "That small fishing village was an absolute hidden gem off the tourist path.",
    category: "travel",
  },
  {
    word: "Hostel",
    translation: "Hostal / Alojamiento económico con habitaciones compartidas",
    example:
      "We stayed in a vibrant hostel and met travelers from twenty countries.",
    category: "travel",
  },
  {
    word: "Landmark",
    translation: "Punto de referencia / Lugar icónico de un destino",
    example: "The Eiffel Tower is the most iconic landmark in Paris.",
    category: "travel",
  },
  {
    word: "Long-haul flight",
    translation: "Vuelo de larga distancia / Vuelo de más de seis horas",
    example: "I always bring noise-canceling headphones on long-haul flights.",
    category: "travel",
  },
  {
    word: "Overseas",
    translation: "En el extranjero / Al otro lado del mar / Internacional",
    example: "He accepted an overseas job offer and moved to Singapore.",
    category: "travel",
  },
  {
    word: "Passport control",
    translation:
      "Control de pasaportes / Verificación de identidad al entrar a un país",
    example:
      "The line at passport control took over an hour at the busy airport.",
    category: "travel",
  },
  {
    word: "Peak season",
    translation: "Temporada alta / Época del año con más turistas",
    example: "Flights to Cusco are much more expensive during peak season.",
    category: "travel",
  },
  {
    word: "Per diem",
    translation:
      "Viáticos / Asignación diaria para gastos durante un viaje de trabajo",
    example:
      "The company pays a per diem of fifty dollars for each day of business travel.",
    category: "travel",
  },
  {
    word: "Return journey",
    translation: "Viaje de regreso / El trayecto de vuelta al punto de origen",
    example:
      "We were exhausted by the return journey after the long conference.",
    category: "travel",
  },
  {
    word: "Road trip",
    translation: "Viaje por carretera / Recorrido largo en automóvil",
    example: "We did an epic road trip along the entire Pacific Coast Highway.",
    category: "travel",
  },
  {
    word: "Self-catering",
    translation:
      "Con cocina propia / Alojamiento donde preparas tu propia comida",
    example:
      "We rented a self-catering apartment to save money on restaurant meals.",
    category: "travel",
  },
  {
    word: "Stopover",
    translation: "Parada técnica / Escala entre dos vuelos internacionales",
    example: "We had a pleasant stopover in Dubai on our way to Thailand.",
    category: "travel",
  },
  {
    word: "Time zone",
    translation: "Zona horaria / División del mundo según la hora solar local",
    example:
      "Working remotely across different time zones requires good coordination.",
    category: "travel",
  },
  {
    word: "Travel insurance",
    translation:
      "Seguro de viaje / Cobertura para imprevistos durante el viaje",
    example:
      "Always buy travel insurance before going on a long international trip.",
    category: "travel",
  },
  {
    word: "Travel-sized",
    translation:
      "De tamaño de viaje / Presentación pequeña apta para llevar en avión",
    example: "I pack travel-sized toiletries to fit everything in my carry-on.",
    category: "travel",
  },
  {
    word: "Trek",
    translation: "Trekking / Caminata larga por terreno natural o montañoso",
    example:
      "The five-day trek to Salkantay was one of the best experiences of my life.",
    category: "travel",
  },
  {
    word: "Turbulence",
    translation:
      "Turbulencia / Movimiento brusco del avión por corrientes de aire",
    example:
      "The flight was smooth until we hit heavy turbulence over the Andes.",
    category: "travel",
  },
  {
    word: "Visa on arrival",
    translation:
      "Visa a la llegada / Permiso de entrada obtenido en el destino",
    example:
      "Citizens of Peru can get a visa on arrival when visiting Thailand.",
    category: "travel",
  },
  {
    word: "Abstract",
    translation: "Abstracto / Resumen / No concreto",
    example: "The concept of recursion can be abstract for beginners at first.",
    category: "core",
  },
  {
    word: "Access",
    translation: "Acceso / Acceder a algo",
    example: "Only admin users have access to the settings panel.",
    category: "core",
  },
  {
    word: "Accurate",
    translation: "Preciso / Exacto / Sin errores",
    example:
      "The pronunciation score must be accurate to be useful for learners.",
    category: "core",
  },
  {
    word: "Acknowledge",
    translation: "Reconocer / Acusar recibo de algo",
    example: "Please acknowledge receipt of the deployment instructions.",
    category: "core",
  },
  {
    word: "Activate",
    translation: "Activar / Poner en funcionamiento",
    example: "Activate the premium plan to unlock the AI conversation tutor.",
    category: "core",
  },
  {
    word: "Allocate",
    translation: "Asignar / Distribuir recursos o tareas",
    example: "We need to allocate more server memory for the new AI feature.",
    category: "core",
  },
  {
    word: "Anticipate",
    translation: "Anticipar / Prever algo con antelación",
    example:
      "We should anticipate higher traffic after the marketing campaign.",
    category: "core",
  },
  {
    word: "Apparent",
    translation: "Aparente / Evidente / Que parece claro",
    example: "It became apparent that the bug was caused by a race condition.",
    category: "core",
  },
  {
    word: "Application",
    translation: "Aplicación / Solicitud / Uso práctico",
    example:
      "This mobile application helps learners practice English every day.",
    category: "core",
  },
  {
    word: "Apply",
    translation: "Aplicar / Solicitar / Usar algo en la práctica",
    example:
      "Apply the latest security patch before redeploying the application.",
    category: "core",
  },
  {
    word: "Arrange",
    translation: "Ordenar / Organizar / Planificar",
    example: "Can you arrange a code review session for tomorrow morning?",
    category: "core",
  },
  {
    word: "Aspect",
    translation: "Aspecto / Faceta / Dimensión de algo",
    example: "User privacy is a critical aspect of our application design.",
    category: "core",
  },
  {
    word: "Assist",
    translation: "Asistir / Ayudar / Dar apoyo",
    example:
      "The AI tutor can assist you with grammar corrections in real time.",
    category: "core",
  },
  {
    word: "Awareness",
    translation: "Conciencia / Conocimiento de algo",
    example:
      "Increasing security awareness in the team helps prevent data breaches.",
    category: "core",
  },
  {
    word: "Calculate",
    translation: "Calcular / Estimar numéricamente",
    example:
      "The algorithm can calculate the pronunciation similarity score instantly.",
    category: "core",
  },
  {
    word: "Capture",
    translation: "Capturar / Registrar / Obtener información",
    example: "The app captures audio input through the device microphone.",
    category: "core",
  },
  {
    word: "Circumstance",
    translation: "Circunstancia / Condición o situación concreta",
    example:
      "Under normal circumstances, the deployment takes less than five minutes.",
    category: "core",
  },
  {
    word: "Collaborate",
    translation: "Colaborar / Trabajar en conjunto con otros",
    example:
      "Developers and designers need to collaborate closely from day one.",
    category: "core",
  },
  {
    word: "Commit",
    translation: "Comprometerse / Hacer un commit en Git",
    example: "Remember to commit your changes before closing the branch.",
    category: "core",
  },
  {
    word: "Communicate",
    translation: "Comunicar / Transmitir información claramente",
    example: "It is important to communicate blockers early during a sprint.",
    category: "core",
  },
  {
    word: "Compare",
    translation: "Comparar / Establecer semejanzas y diferencias",
    example:
      "Let's compare the performance of both database engines before deciding.",
    category: "core",
  },
  {
    word: "Completion",
    translation: "Finalización / Estado de haber terminado algo",
    example: "The completion of the migration marks a major project milestone.",
    category: "core",
  },
  {
    word: "Conduct",
    translation: "Llevar a cabo / Realizar / Conducir",
    example: "We will conduct a thorough security audit next month.",
    category: "core",
  },
  {
    word: "Configure",
    translation: "Configurar / Ajustar parámetros de un sistema",
    example:
      "You need to configure the environment variables before running the app.",
    category: "core",
  },
  {
    word: "Confirm",
    translation: "Confirmar / Verificar que algo es correcto",
    example: "Please confirm that the staging environment matches production.",
    category: "core",
  },
  {
    word: "Connect",
    translation: "Conectar / Vincular dos sistemas o personas",
    example: "Connect the frontend to the backend API using fetch or Axios.",
    category: "core",
  },
  {
    word: "Constraint",
    translation: "Restricción / Limitación dentro de un sistema o proyecto",
    example:
      "Budget constraints forced us to choose a simpler hosting solution.",
    category: "core",
  },
  {
    word: "Construct",
    translation: "Construir / Armar / Elaborar algo",
    example: "We need to construct a proper error-handling layer for the API.",
    category: "core",
  },
  {
    word: "Consume",
    translation: "Consumir / Usar un recurso o una API",
    example: "The mobile app consumes the REST API to display vocabulary data.",
    category: "core",
  },
  {
    word: "Convert",
    translation: "Convertir / Transformar de un formato a otro",
    example:
      "We can convert audio files to text using the speech recognition API.",
    category: "core",
  },
  {
    word: "Coordinate",
    translation: "Coordinar / Organizar esfuerzos entre personas o equipos",
    example:
      "The project manager helps coordinate tasks across multiple teams.",
    category: "core",
  },
  {
    word: "Create",
    translation: "Crear / Generar algo nuevo",
    example: "Create a new branch before working on any new feature.",
    category: "core",
  },
  {
    word: "Critical",
    translation: "Crítico / De suma importancia o que puede causar un fallo",
    example:
      "Fixing the authentication bug is critical before the public launch.",
    category: "core",
  },
  {
    word: "Current",
    translation: "Actual / Presente / El que está vigente ahora",
    example:
      "The current version of the app has excellent performance metrics.",
    category: "core",
  },
  {
    word: "Data",
    translation: "Datos / Información estructurada",
    example: "All user data is stored securely in an encrypted local database.",
    category: "core",
  },
  {
    word: "Debug",
    translation: "Depurar / Encontrar y corregir errores en el código",
    example:
      "It took three hours to debug the infinite loop in the state manager.",
    category: "core",
  },
  {
    word: "Declare",
    translation: "Declarar / Definir formalmente una variable o función",
    example: "Always declare your TypeScript types at the top of the file.",
    category: "core",
  },
  {
    word: "Deliver",
    translation: "Entregar / Cumplir con la entrega de algo",
    example: "We committed to delivering the MVP by the end of this month.",
    category: "core",
  },
  {
    word: "Deploy",
    translation: "Desplegar / Lanzar una aplicación a un entorno",
    example: "We will deploy the hotfix to production tonight at midnight.",
    category: "core",
  },
  {
    word: "Describe",
    translation: "Describir / Explicar las características de algo",
    example: "Please describe the exact steps to reproduce the bug in detail.",
    category: "core",
  },
  {
    word: "Design",
    translation: "Diseñar / Planificar la estructura de algo",
    example:
      "Good database design prevents performance problems in the future.",
    category: "core",
  },
  {
    word: "Detect",
    translation: "Detectar / Identificar la presencia de algo",
    example:
      "The monitoring system can detect anomalies in server performance.",
    category: "core",
  },
  {
    word: "Develop",
    translation: "Desarrollar / Crear software o habilidades gradualmente",
    example: "We are developing a new onboarding experience for new users.",
    category: "core",
  },
  {
    word: "Differentiate",
    translation: "Diferenciar / Distinguir entre dos cosas",
    example:
      "It is important to differentiate between a warning and a critical error.",
    category: "core",
  },
  {
    word: "Directly",
    translation: "Directamente / Sin intermediarios",
    example:
      "Connect directly to the database using Prisma Studio for quick edits.",
    category: "core",
  },
  {
    word: "Display",
    translation: "Mostrar / Visualizar / Pantalla",
    example: "The app displays the user score after each vocabulary quiz.",
    category: "core",
  },
  {
    word: "Distribute",
    translation: "Distribuir / Repartir entre varios",
    example: "We distribute the workload evenly among all backend servers.",
    category: "core",
  },
  {
    word: "Document",
    translation: "Documentar / Registrar información escrita",
    example: "Always document your API endpoints with clear descriptions.",
    category: "core",
  },
  {
    word: "Effective",
    translation: "Efectivo / Que logra el resultado esperado",
    example:
      "Daily repetition is the most effective method for vocabulary retention.",
    category: "core",
  },
  {
    word: "Eliminate",
    translation: "Eliminar / Suprimir algo no deseado",
    example: "We need to eliminate all unused dependencies from the project.",
    category: "core",
  },
  {
    word: "Error",
    translation: "Error / Fallo / Equivocación",
    example:
      "The error log showed a null pointer exception in the auth module.",
    category: "core",
  },
  {
    word: "Execute",
    translation: "Ejecutar / Llevar a cabo una instrucción o acción",
    example: "Execute the migration script on the staging environment first.",
    category: "core",
  },
  {
    word: "Experience",
    translation: "Experiencia / Conocimiento adquirido con la práctica",
    example:
      "Years of experience make the difference between junior and senior devs.",
    category: "core",
  },
  {
    word: "Extract",
    translation: "Extraer / Obtener información de una fuente",
    example: "We extract the user ID from the JWT token on every request.",
    category: "core",
  },
  {
    word: "Facilitate",
    translation: "Facilitar / Hacer algo más fácil o posible",
    example:
      "Good documentation facilitates faster onboarding of new developers.",
    category: "core",
  },
  {
    word: "Failure",
    translation: "Fallo / Fracaso / Incapacidad de funcionar",
    example:
      "We analyzed the failure to understand what went wrong in production.",
    category: "core",
  },
  {
    word: "Format",
    translation: "Formato / Dar formato / Presentación de datos",
    example: "Always format your code with Prettier before committing changes.",
    category: "core",
  },
  {
    word: "Foundation",
    translation: "Base / Fundamento / Cimiento de un sistema",
    example: "A solid understanding of JavaScript is the foundation of React.",
    category: "core",
  },
  {
    word: "Framework (concept)",
    translation: "Marco de trabajo / Estructura que guía el desarrollo",
    example:
      "Choosing the right framework at the start saves months of rework.",
    category: "core",
  },
  {
    word: "Frequency",
    translation: "Frecuencia / Con qué regularidad ocurre algo",
    example:
      "Increase the frequency of your English practice sessions for faster results.",
    category: "core",
  },
  {
    word: "Guide",
    translation: "Guiar / Orientar / Manual de instrucciones",
    example:
      "This step-by-step guide will help you set up the development environment.",
    category: "core",
  },
  {
    word: "Handle",
    translation: "Manejar / Gestionar / Controlar",
    example:
      "The API route must handle errors gracefully and return clear messages.",
    category: "core",
  },
  {
    word: "Highlight",
    translation: "Destacar / Resaltar / Subrayar la importancia",
    example:
      "The quiz highlights words you consistently pronounce incorrectly.",
    category: "core",
  },
  {
    word: "Include",
    translation: "Incluir / Contener dentro de algo",
    example: "The seed file includes over two hundred vocabulary entries.",
    category: "core",
  },
  {
    word: "Inconsistent",
    translation: "Inconsistente / Que cambia o no sigue un patrón fijo",
    example:
      "Inconsistent naming conventions make the codebase hard to navigate.",
    category: "core",
  },
  {
    word: "Increase",
    translation: "Aumentar / Incrementar / Crecimiento",
    example: "We plan to increase the word database to five hundred entries.",
    category: "core",
  },
  {
    word: "Infrastructure",
    translation: "Infraestructura / Base técnica de un sistema digital",
    example: "Scalable infrastructure is essential for a growing SaaS product.",
    category: "core",
  },
  {
    word: "Input",
    translation: "Entrada / Dato proporcionado por el usuario o sistema",
    example: "Validate all user input before inserting it into the database.",
    category: "core",
  },
  {
    word: "Instance",
    translation: "Instancia / Ejemplo concreto / Copia de un proceso",
    example: "Each user creates a separate instance of the quiz state.",
    category: "core",
  },
  {
    word: "Integrate",
    translation: "Integrar / Unir partes de un sistema en un todo",
    example: "We plan to integrate Google Login in the next release.",
    category: "core",
  },
  {
    word: "Interpret",
    translation: "Interpretar / Dar significado a datos o instrucciones",
    example: "The AI model interprets the user's speech and returns a score.",
    category: "core",
  },
  {
    word: "Issue",
    translation: "Problema / Asunto / Ticket en un gestor de tareas",
    example: "Please open a GitHub issue describing the bug in detail.",
    category: "core",
  },
  {
    word: "Iterate",
    translation: "Iterar / Repetir un proceso mejorando en cada ciclo",
    example: "We iterate quickly on user feedback to ship better features.",
    category: "core",
  },
  {
    word: "Key",
    translation: "Clave / Fundamental / Llave o clave de acceso",
    example: "Consistent practice is the key to mastering a foreign language.",
    category: "core",
  },
  {
    word: "Knowledge",
    translation: "Conocimiento / Saber acumulado",
    example: "Deep knowledge of SQL is invaluable for backend development.",
    category: "core",
  },
  {
    word: "Layer",
    translation: "Capa / Nivel dentro de una arquitectura de software",
    example:
      "Each layer of the app has a specific responsibility and boundary.",
    category: "core",
  },
  {
    word: "Limit",
    translation: "Límite / Restricción / Limitar",
    example: "Free users have a limit of ten voice sessions per day.",
    category: "core",
  },
  {
    word: "Link",
    translation: "Enlace / Vincular / Conectar dos recursos",
    example: "Link the frontend component to the API route using a fetch call.",
    category: "core",
  },
  {
    word: "Logic",
    translation: "Lógica / Razonamiento / Flujo de decisiones en el código",
    example: "The business logic for billing should live in the server layer.",
    category: "core",
  },
  {
    word: "Manual",
    translation: "Manual / Hecho a mano / Sin automatización",
    example: "Manual testing is time-consuming; automate what you can.",
    category: "core",
  },
  {
    word: "Map",
    translation: "Mapa / Mapear / Asociar datos entre estructuras",
    example:
      "We use a map function to transform the vocabulary list for the quiz.",
    category: "core",
  },
  {
    word: "Merge",
    translation: "Fusionar / Combinar dos ramas de código en Git",
    example: "Merge the feature branch only after the code review is approved.",
    category: "core",
  },
  {
    word: "Migration",
    translation: "Migración / Traslado de datos o código a otra versión",
    example:
      "The database migration added three new columns to the user table.",
    category: "core",
  },
  {
    word: "Minimum",
    translation: "Mínimo / La menor cantidad o nivel aceptable",
    example:
      "The minimum viable product only includes the core learning features.",
    category: "core",
  },
  {
    word: "Mode",
    translation: "Modo / Forma de operación",
    example: "Switch to dark mode by toggling the theme selector in settings.",
    category: "core",
  },
  {
    word: "Model",
    translation: "Modelo / Representación estructurada de datos",
    example: "The User model contains name, email, level, and XP fields.",
    category: "core",
  },
  {
    word: "Network",
    translation: "Red / Conexión entre sistemas / Red profesional",
    example:
      "A slow network connection can increase API response times significantly.",
    category: "core",
  },
  {
    word: "Notify",
    translation: "Notificar / Avisar / Informar a alguien",
    example: "The system will notify you when the deployment is complete.",
    category: "core",
  },
  {
    word: "Output",
    translation: "Salida / Resultado producido por un sistema",
    example:
      "The output of the speech model is a confidence score from 0 to 100.",
    category: "core",
  },
  {
    word: "Pattern",
    translation: "Patrón / Diseño repetido / Modelo a seguir",
    example: "This design pattern helps keep the codebase clean and testable.",
    category: "core",
  },
  {
    word: "Performance",
    translation: "Rendimiento / Desempeño / Eficiencia de un sistema",
    example:
      "Excellent performance is a core requirement for any production app.",
    category: "core",
  },
  {
    word: "Permission",
    translation: "Permiso / Autorización para realizar una acción",
    example:
      "The app asks for microphone permission before starting speech recognition.",
    category: "core",
  },
  {
    word: "Persistent",
    translation: "Persistente / Que se mantiene en el tiempo o almacenamiento",
    example:
      "User progress data must be persistent across sessions and devices.",
    category: "core",
  },
  {
    word: "Platform",
    translation: "Plataforma / Entorno tecnológico sobre el que se desarrolla",
    example:
      "We are building the product as a cross-platform web and mobile app.",
    category: "core",
  },
  {
    word: "Process",
    translation: "Proceso / Procedimiento / Tratar datos",
    example: "The server processes all audio input before returning a score.",
    category: "core",
  },
  {
    word: "Profile",
    translation: "Perfil / Conjunto de datos que identifican a un usuario",
    example:
      "Each user profile stores individual vocabulary progress and stats.",
    category: "core",
  },
  {
    word: "Progress",
    translation: "Progreso / Avance hacia un objetivo",
    example: "Track your daily progress on the vocabulary dashboard.",
    category: "core",
  },
  {
    word: "Prompt",
    translation: "Indicación / Instrucción dada a una IA / Mensaje inicial",
    example: "A well-crafted prompt gives the AI model much better results.",
    category: "core",
  },
  {
    word: "Protocol",
    translation:
      "Protocolo / Conjunto de reglas de comunicación entre sistemas",
    example: "HTTPS is the standard protocol for secure web communication.",
    category: "core",
  },
  {
    word: "Provide",
    translation: "Proporcionar / Dar / Suministrar algo necesario",
    example:
      "The API must provide clear error messages for every failure case.",
    category: "core",
  },
  {
    word: "Publish",
    translation: "Publicar / Lanzar al público",
    example: "We will publish the app to the web after the final QA review.",
    category: "core",
  },
  {
    word: "Reduce",
    translation: "Reducir / Disminuir / Minimizar",
    example:
      "We reduced bundle size by removing unused libraries from the project.",
    category: "core",
  },
  {
    word: "Reliable",
    translation: "Confiable / Fiable / Que funciona de manera consistente",
    example:
      "A reliable CI pipeline is the backbone of good software delivery.",
    category: "core",
  },
  {
    word: "Represent",
    translation: "Representar / Ser el símbolo o imagen de algo",
    example: "This chart represents the user's weekly vocabulary progress.",
    category: "core",
  },
  {
    word: "Require",
    translation: "Requerir / Necesitar obligatoriamente",
    example:
      "This endpoint requires a valid JWT token in the authorization header.",
    category: "core",
  },
  {
    word: "Resource",
    translation: "Recurso / Material o herramienta disponible",
    example:
      "Memory and CPU are the primary computing resources we need to optimize.",
    category: "core",
  },
  {
    word: "Respond",
    translation: "Responder / Dar una respuesta a una petición",
    example: "The server should respond with a 200 status code on success.",
    category: "core",
  },
  {
    word: "Restore",
    translation: "Restaurar / Devolver a un estado anterior",
    example: "We had to restore the database from the last clean backup.",
    category: "core",
  },
  {
    word: "Review",
    translation: "Revisar / Evaluar / Análisis crítico",
    example: "Every pull request must go through a peer code review process.",
    category: "core",
  },
  {
    word: "Robust",
    translation: "Robusto / Sólido / Resistente a errores o fallos",
    example:
      "A robust error handling system prevents unexpected crashes in production.",
    category: "core",
  },
  {
    word: "Scalable",
    translation: "Escalable / Capaz de crecer sin perder rendimiento",
    example:
      "We need a scalable solution that handles millions of concurrent users.",
    category: "core",
  },
  {
    word: "Schedule",
    translation: "Programar / Agenda / Horario de trabajo o eventos",
    example: "The database backup is scheduled to run every night at 2 AM.",
    category: "core",
  },
  {
    word: "Secure",
    translation: "Seguro / Protegido de accesos no autorizados",
    example:
      "All sensitive user data must be stored in a secure encrypted format.",
    category: "core",
  },
  {
    word: "Simulate",
    translation: "Simular / Reproducir condiciones reales de forma artificial",
    example:
      "We use load testing tools to simulate thousands of concurrent users.",
    category: "core",
  },
  {
    word: "Solution",
    translation: "Solución / Respuesta efectiva a un problema",
    example:
      "The senior developer proposed an elegant solution to the caching issue.",
    category: "core",
  },
  {
    word: "Source",
    translation: "Fuente / Origen / Código fuente",
    example:
      "Always read from a reliable source when researching security practices.",
    category: "core",
  },
  {
    word: "Standard",
    translation: "Estándar / Norma / Nivel de referencia aceptado",
    example:
      "Follow the official coding standards to keep the project consistent.",
    category: "core",
  },
  {
    word: "Store",
    translation: "Almacenar / Guardar datos / Tienda",
    example: "We store all user preferences in a local SQLite database.",
    category: "core",
  },
  {
    word: "Structure",
    translation: "Estructura / Organización interna de datos o código",
    example:
      "A good folder structure makes large codebases much easier to navigate.",
    category: "core",
  },
  {
    word: "Summarize",
    translation: "Resumir / Condensar información en sus puntos clave",
    example:
      "The AI can summarize long grammar rules into easy-to-understand sentences.",
    category: "core",
  },
  {
    word: "Support",
    translation: "Soporte / Apoyo técnico / Soportar una función",
    example:
      "Our app supports both dark and light mode for better accessibility.",
    category: "core",
  },
  {
    word: "Syntax",
    translation:
      "Sintaxis / Reglas de escritura de un lenguaje de programación",
    example: "TypeScript syntax helps catch type errors before the code runs.",
    category: "core",
  },
  {
    word: "System",
    translation: "Sistema / Conjunto de componentes que trabajan juntos",
    example: "The speech recognition system uses the browser's Web Speech API.",
    category: "core",
  },
  {
    word: "Target",
    translation: "Objetivo / Audiencia meta / Apuntar hacia algo",
    example:
      "Our primary target audience is adult English learners in Latin America.",
    category: "core",
  },
  {
    word: "Task",
    translation: "Tarea / Trabajo asignado a completar",
    example:
      "Break down large features into smaller, manageable tasks in the backlog.",
    category: "core",
  },
  {
    word: "Template",
    translation: "Plantilla / Modelo reutilizable para crear algo nuevo",
    example:
      "Start from this component template and customize it for your use case.",
    category: "core",
  },
  {
    word: "Track",
    translation: "Seguir / Rastrear el progreso de algo",
    example:
      "We track user engagement metrics to understand what features to prioritize.",
    category: "core",
  },
  {
    word: "Transform",
    translation: "Transformar / Cambiar la forma o el formato de algo",
    example:
      "The middleware transforms the raw database results into clean JSON.",
    category: "core",
  },
  {
    word: "Trigger",
    translation: "Disparar / Activar / Causa que inicia un proceso",
    example: "A new user registration triggers an automatic welcome email.",
    category: "core",
  },
  {
    word: "Update",
    translation: "Actualizar / Modificar con información más reciente",
    example:
      "Always update your dependencies to avoid known security vulnerabilities.",
    category: "core",
  },
  {
    word: "Utilize",
    translation: "Utilizar / Hacer uso de algo disponible",
    example:
      "We utilize React Server Components to reduce client-side JavaScript.",
    category: "core",
  },
  {
    word: "Validate",
    translation: "Validar / Verificar que los datos cumplen los requisitos",
    example:
      "Always validate user input on the server side, never trust the client.",
    category: "core",
  },
  {
    word: "Variable",
    translation: "Variable / Dato que puede cambiar de valor en el tiempo",
    example:
      "Store your API key in an environment variable, never in the code.",
    category: "core",
  },
  {
    word: "Verify",
    translation: "Verificar / Confirmar que algo es correcto o verdadero",
    example: "Verify the user's email address before granting account access.",
    category: "core",
  },
  {
    word: "Version",
    translation: "Versión / Iteración específica de un software o documento",
    example: "We are currently running version 2.1.0 of the production API.",
    category: "core",
  },
  {
    word: "Workflow",
    translation:
      "Flujo de trabajo / Secuencia de pasos para completar una tarea",
    example: "We optimized the CI/CD workflow to cut build times in half.",
    category: "core",
  },

  // ================= ADDITIONAL BUSINESS & TECH (10) =================
  {
    word: "Authentication",
    translation: "Autenticación / Verificación de identidad",
    example: "The authentication system uses JWT tokens for security.",
    category: "business",
  },
  {
    word: "Authorization",
    translation: "Autorización / Permisos de acceso",
    example:
      "He passed authentication but failed authorization to view the admin panel.",
    category: "business",
  },
  {
    word: "Backend",
    translation: "Parte del servidor / Lógica detrás de escena",
    example: "Node.js and Prisma power the backend of our new application.",
    category: "business",
  },
  {
    word: "Frontend",
    translation: "Interfaz de usuario / Lado del cliente",
    example: "We built the frontend using React and modern CSS features.",
    category: "business",
  },
  {
    word: "Query",
    translation: "Consulta a una base de datos",
    example: "This Prisma query fetches all users who joined last week.",
    category: "business",
  },
  {
    word: "Responsive",
    translation: "Responsivo / Adaptable a diferentes pantallas",
    example: "A good UI must be fully responsive on both mobile and desktop.",
    category: "business",
  },
  {
    word: "State management",
    translation: "Gestión del estado de la aplicación",
    example: "React Context is a great tool for simple state management.",
    category: "business",
  },
  {
    word: "Version control",
    translation: "Control de versiones",
    example: "Git is the most popular version control system among developers.",
    category: "business",
  },
  {
    word: "Throughput",
    translation: "Tasa de transferencia / Rendimiento",
    example:
      "The server's throughput increased after we optimized the database queries.",
    category: "business",
  },
  {
    word: "Latency",
    translation: "Latencia / Retraso en la respuesta",
    example: "We need to reduce network latency to make the app feel faster.",
    category: "business",
  },

  // ================= ADDITIONAL CORE (16) =================
  {
    word: "Accomplish",
    translation: "Lograr / Llevar a cabo",
    example: "We can accomplish a lot if we work together as a team.",
    category: "core",
  },
  {
    word: "Algorithm",
    translation: "Algoritmo",
    example: "The search algorithm was optimized for better performance.",
    category: "core",
  },
  {
    word: "Brief",
    translation: "Breve / Conciso",
    example: "Please keep your status update brief during the daily meeting.",
    category: "core",
  },
  {
    word: "Cooperate",
    translation: "Cooperar / Trabajar en equipo",
    example: "The frontend and backend teams must cooperate closely.",
    category: "core",
  },
  {
    word: "Crucial",
    translation: "Crucial / Fundamental",
    example: "Testing is a crucial part of the software development lifecycle.",
    category: "core",
  },
  {
    word: "Demonstrate",
    translation: "Demostrar",
    example: "Let me demonstrate how the new speech recognition feature works.",
    category: "core",
  },
  {
    word: "Enormous",
    translation: "Enorme / Muy grande",
    example: "The application handles an enormous amount of data every day.",
    category: "core",
  },
  {
    word: "Familiar",
    translation: "Familiar / Conocido",
    example: "Are you familiar with the latest Next.js routing system?",
    category: "core",
  },
  {
    word: "Gather",
    translation: "Reunir / Recopilar",
    example: "We need to gather more user feedback before the next update.",
    category: "core",
  },
  {
    word: "Hesitate",
    translation: "Dudar / Vacilar",
    example: "Do not hesitate to ask for help if you are stuck on a bug.",
    category: "core",
  },
  {
    word: "Initiate",
    translation: "Iniciar / Comenzar",
    example: "The server will initiate a backup process at midnight.",
    category: "core",
  },
  {
    word: "Justify",
    translation: "Justificar",
    example: "Can you justify your decision to use SQLite instead of Postgres?",
    category: "core",
  },
  {
    word: "Launch",
    translation: "Lanzar / Lanzamiento",
    example:
      "The official launch of the platform is scheduled for next Monday.",
    category: "core",
  },
  {
    word: "Maximize",
    translation: "Maximizar",
    example: "We need to maximize our resources to finish the project on time.",
    category: "core",
  },
  {
    word: "Negotiate",
    translation: "Negociar",
    example: "We had to negotiate the deadline with the client.",
    category: "core",
  },
  {
    word: "Observe",
    translation: "Observar / Notar",
    example: "Did you observe any unusual behavior in the application logs?",
    category: "core",
  },
];

const grammarData = [
  // ================= VERB TENSES (6) =================
  {
    title: "1. Present Simple",
    category: "tenses",
    summary:
      "Se utiliza para describir rutinas, hábitos constantes, hechos científicos y verdades generales.",
    formula: "Sujeto + Verbo (infinitivo) [Añade -s/-es en He/She/It]",
    content:
      "El Present Simple es el tiempo verbal base. En las oraciones afirmativas, la tercera persona singular (he, she, it) añade una '-s' o '-es' al verbo (ej: 'she codes'). Para oraciones negativas y preguntas se utilizan los auxiliares 'do' y 'does' acompañados del verbo principal en infinitivo sin 'to' (ej: 'Does he practice English?').",
    examplesJson: JSON.stringify([
      {
        en: "He works as a full-stack engineer.",
        es: "Él trabaja como ingeniero de pila completa.",
        explain:
          "Se añade '-s' al verbo 'work' por tratarse de la tercera persona del singular ('he').",
      },
      {
        en: "Do they practice speaking English every day?",
        es: "¿Ellos practican hablar inglés todos los días?",
        explain:
          "Se usa el auxiliar 'do' para preguntas en plural con el pronombre 'they'.",
      },
      {
        en: "I do not agree with this software architecture.",
        es: "No estoy de acuerdo con esta arquitectura de software.",
        explain:
          "Uso de 'do not' ('don't') para negaciones en primera persona.",
      },
    ]),
    order: 1,
  },
  {
    title: "2. Present Continuous",
    category: "tenses",
    summary:
      "Describe acciones que están ocurriendo en el momento exacto del habla o situaciones temporales.",
    formula: "Sujeto + am/is/are + Verbo-ING",
    content:
      "El Present Continuous se utiliza para acciones en progreso activo. Requiere conjugar el verbo 'to be' en presente (am, is, are) seguido del verbo principal con el gerundio inglés '-ing'. También se usa para describir tendencias actuales o planes futuros muy confirmados (ej: 'I am moving next month').",
    examplesJson: JSON.stringify([
      {
        en: "I am writing a database migration right now.",
        es: "Estoy escribiendo una migración de base de datos justo ahora.",
        explain: "Acción continua que ocurre en el momento exacto del habla.",
      },
      {
        en: "Is she learning TypeScript these days?",
        es: "¿Ella está aprendiendo TypeScript estos días?",
        explain:
          "Acción temporal en progreso en este periodo de tiempo general.",
      },
      {
        en: "They are not working on the server this week.",
        es: "Ellos no están trabajando en el servidor esta semana.",
        explain: "Negación continua usando 'are not' ('aren't').",
      },
    ]),
    order: 2,
  },
  {
    title: "3. Past Simple",
    category: "tenses",
    summary:
      "Se utiliza para acciones concretas que ya finalizaron en un momento específico del pasado.",
    formula: "Sujeto + Verbo en Pasado [Regular -ed / Irregular]",
    content:
      "El Past Simple se refiere a eventos completados en el pasado. Los verbos regulares añaden '-ed' (ej: 'start' -> 'started'). Los verbos irregulares cambian de forma y deben memorizarse (ej: 'write' -> 'wrote', 'go' -> 'went'). Para formular negaciones e interrogaciones se usa el auxiliar universal 'did' y el verbo vuelve a su forma base (ej: 'Did you see?').",
    examplesJson: JSON.stringify([
      {
        en: "We deployed the new app version yesterday.",
        es: "Desplegamos la nueva versión de la aplicación ayer.",
        explain:
          "Acción completada en un punto de tiempo específico en el pasado ('yesterday').",
      },
      {
        en: "Did you push your latest commits to GitHub?",
        es: "¿Subiste tus últimos commits a GitHub?",
        explain:
          "Pregunta en pasado usando el auxiliar 'did' y el verbo 'push' en forma base.",
      },
      {
        en: "He did not write the API documentation.",
        es: "Él no escribió la documentación de la API.",
        explain:
          "Negación en pasado usando 'did not' ('didn't') y verbo base 'write'.",
      },
    ]),
    order: 3,
  },
  {
    title: "4. Past Continuous",
    category: "tenses",
    summary:
      "Describe acciones en progreso en un momento específico del pasado, frecuentemente interrumpidas por otra acción.",
    formula: "Sujeto + was/were + Verbo-ING",
    content:
      "El Past Continuous resalta la duración o continuidad de una acción en el pasado. Se forma con el pasado del verbo 'to be' (was para I/he/she/it, were para you/we/they) más el verbo terminado en '-ing'. A menudo se combina con el Past Simple para mostrar que un evento en progreso fue interrumpido por otro (utilizando conectores como 'when' o 'while').",
    examplesJson: JSON.stringify([
      {
        en: "I was debugging code when the power went out.",
        es: "Estaba depurando código cuando se cortó la energía.",
        explain:
          "La acción continua ('was debugging') es interrumpida por una acción puntual en pasado ('went out').",
      },
      {
        en: "Were they running tests during the system crash?",
        es: "¿Ellos estaban ejecutando pruebas durante la caída del sistema?",
        explain:
          "Pregunta en pasado continuo utilizando 'were' y el sujeto plural 'they'.",
      },
      {
        en: "She was not testing the API when the error occurred.",
        es: "Ella no estaba probando la API cuando ocurrió el error.",
        explain: "Negación utilizando 'was not' ('wasn't') y gerundio '-ing'.",
      },
    ]),
    order: 4,
  },
  {
    title: "5. Present Perfect",
    category: "tenses",
    summary:
      "Conecta el pasado con el presente. Se usa para experiencias de vida, cambios en el tiempo y acciones con impacto actual.",
    formula: "Sujeto + have/has + Verbo en Participio Pasado",
    content:
      "El Present Perfect se enfoca en el resultado actual de una acción pasada o en experiencias sin importar la fecha exacta. Se construye usando 'have' (o 'has' en tercera persona) y el verbo principal en participio pasado (regulares terminan en '-ed', irregulares varían, ej: 'seen', 'done'). Se acompaña comúnmente de adverbios como 'already' (ya), 'just' (acabar de) o 'yet' (aún).",
    examplesJson: JSON.stringify([
      {
        en: "I have just initialized the SQLite database.",
        es: "Acabo de inicializar la base de datos SQLite.",
        explain:
          "Acción recientemente completada usando 'have just' y participio 'initialized'.",
      },
      {
        en: "Has she already completed the vocabulary quiz?",
        es: "¿Ella ya completó el cuestionario de vocabulario?",
        explain:
          "Pregunta en presente perfecto utilizando el auxiliar 'has' por tratarse de 'she'.",
      },
      {
        en: "We have not resolved the database bug yet.",
        es: "Aún no hemos resuelto el fallo de la base de datos.",
        explain:
          "Negación con 'yet' al final de la oración indicando una expectativa no cumplida.",
      },
    ]),
    order: 5,
  },
  {
    title: "6. Future: Will vs. Going to",
    category: "tenses",
    summary:
      "Se utiliza para predecir, planear o tomar decisiones sobre eventos futuros.",
    formula:
      "A) Sujeto + will + V base | B) Sujeto + am/is/are + going to + V base",
    content:
      "Existen dos formas principales para el futuro: 'Will' se usa para decisiones espontáneas tomadas en el momento de hablar, promesas, predicciones sin evidencia clara u ofertas (ej: 'I will help you'). 'Going to' se usa para intenciones previas, planes planificados con antelación o predicciones basadas en evidencia física inmediata (ej: 'It is going to rain').",
    examplesJson: JSON.stringify([
      {
        en: "Don't worry, I will push the fixes now.",
        es: "No te preocupes, subiré las correcciones ahora.",
        explain:
          "Decisión espontánea tomada en el momento del habla utilizando 'will'.",
      },
      {
        en: "We are going to migrate the server next Friday.",
        es: "Vamos a migrar el servidor el próximo viernes.",
        explain: "Plan previo programado utilizando 'are going to'.",
      },
      {
        en: "Look at those logs, the database is going to crash.",
        es: "Mira esos registros, la base de datos se va a caer.",
        explain:
          "Predicción de futuro basada en evidencia física objetiva ('look at those logs').",
      },
    ]),
    order: 6,
  },

  // ================= QUANTIFIERS (3) =================
  {
    title: "7. Countable & Uncountable Nouns",
    category: "quantifiers",
    summary:
      "Esencial para distinguir entre sustantivos que se pueden contar uno por uno y los que se consideran como un todo.",
    formula:
      "Sustantivos Contables [Singular/Plural] vs. Incontables [Solo Singulares]",
    content:
      "Los sustantivos contables (Countable Nouns) representan cosas individuales que admiten plurales e ir precedidos de 'a/an' (ej: 'a server', 'two bugs'). Los sustantivos incontables (Uncountable Nouns) son conceptos, masas o líquidos indivisibles que no admiten plurales ni números directos, y se tratan siempre como singulares (ej: 'information', 'money', 'time', 'water').",
    examplesJson: JSON.stringify([
      {
        en: "We found five separate bugs in the React component.",
        es: "Encontramos cinco errores separados en el componente de React.",
        explain:
          "'Bug' es un sustantivo contable en plural ('bugs') precedido del número 'five'.",
      },
      {
        en: "I need some information about the Gemini API.",
        es: "Necesito algo de información sobre la API de Gemini.",
        explain:
          "'Information' es un sustantivo incontable. No se puede decir 'an information' ni 'informations'; se usa 'some'.",
      },
      {
        en: "Time is running out for our release deadline.",
        es: "El tiempo se está agotando para nuestra fecha límite de lanzamiento.",
        explain:
          "'Time' es un sustantivo incontable y conjuga el verbo en singular ('is').",
      },
    ]),
    order: 7,
  },
  {
    title: "8. Much vs. Many vs. A Lot Of",
    category: "quantifiers",
    summary:
      "Se usan para expresar grandes cantidades de sustantivos contables e incontables.",
    formula: "Many + Contable | Much + Incontable | A Lot Of + Ambos (General)",
    content:
      "'Many' se usa únicamente con sustantivos contables en plural y es común en oraciones negativas y preguntas (ej: 'many bugs'). 'Much' se usa exclusivamente con sustantivos incontables, también mayormente en preguntas y negaciones (ej: 'much time'). 'A lot of' (o 'lots of') es más informal y sirve para sustantivos contables e incontables, usándose principalmente en oraciones afirmativas.",
    examplesJson: JSON.stringify([
      {
        en: "There aren't many developers in this room.",
        es: "No hay muchos desarrolladores en esta sala.",
        explain:
          "Uso de 'many' con el sustantivo contable plural 'developers' en una oración negativa.",
      },
      {
        en: "How much data does the server store every day?",
        es: "¿Cuántos datos almacena el servidor todos los días?",
        explain:
          "Uso de 'much' con el sustantivo incontable 'data' en una pregunta.",
      },
      {
        en: "We have gained a lot of experience using Prisma.",
        es: "Hemos ganado mucha experiencia usando Prisma.",
        explain:
          "Uso de 'a lot of' con el sustantivo incontable 'experience' en una oración afirmativa.",
      },
    ]),
    order: 8,
  },
  {
    title: "9. Few vs. Little vs. Some vs. Any",
    category: "quantifiers",
    summary:
      "Expresan pequeñas cantidades o cantidades indefinidas con matices positivos o negativos.",
    formula: "Few/Some/Any + Contable | Little/Some/Any + Incontable",
    content:
      "'Few' (pocos/as) y 'Little' (poco/a) representan cantidades muy pequeñas con tono negativo. Si les agregamos el artículo 'a' ('a few', 'a little'), toman un sentido positivo de 'unos cuantos' o 'un poco'. 'Some' se usa en oraciones afirmativas para cantidades indefinidas. 'Any' se usa en negaciones y preguntas en general.",
    examplesJson: JSON.stringify([
      {
        en: "I have a few questions about the code.",
        es: "Tengo unas pocas preguntas sobre el código.",
        explain:
          "Uso de 'a few' con sustantivo contable plural para expresar una cantidad pequeña pero suficiente.",
      },
      {
        en: "We have little time to complete the deployment.",
        es: "Tenemos poco tiempo para completar el despliegue.",
        explain:
          "Uso de 'little' con sustantivo incontable ('time') con sentido negativo (insuficiente).",
      },
      {
        en: "Do you have any suggestions for this bug?",
        es: "¿Tienes alguna sugerencia para este error?",
        explain:
          "Uso de 'any' en una oración interrogativa para consultar por sugerencias contables plurals.",
      },
    ]),
    order: 9,
  },

  // ================= GENERAL RULES (3) =================
  {
    title: "10. Subject-Verb Agreement",
    category: "rules",
    summary:
      "La regla de oro: el sujeto y su correspondiente verbo siempre deben coincidir en número (singular o plural).",
    formula: "Sujeto Singular + Verbo Singular | Sujeto Plural + Verbo Plural",
    content:
      "Esta regla exige que el verbo se ajuste al número de su sujeto. En presente singular se añade '-s' al verbo principal (ej: 'the engineer codes'). Una trampa común son los sustantivos plurales irregulares o colectivos (como 'people' que siempre requiere verbo plural 'people are', o 'everybody' que requiere singular 'everybody is').",
    examplesJson: JSON.stringify([
      {
        en: "The code works perfectly after refactoring.",
        es: "El código funciona perfectamente después de refactorizar.",
        explain:
          "El sujeto singular 'the code' requiere que el verbo 'work' añada '-s' en presente.",
      },
      {
        en: "People are very happy with the modern UI design.",
        es: "La gente está muy contenta con el diseño moderno de la interfaz.",
        explain:
          "'People' es un sustantivo colectivo plural por lo que siempre requiere el verbo plural 'are'.",
      },
      {
        en: "Everybody has access to the local database.",
        es: "Todos tienen acceso a la base de datos local.",
        explain:
          "Pronombres indefinidos como 'everybody' o 'everyone' se consideran gramaticalmente singulares y usan 'has'.",
      },
    ]),
    order: 10,
  },
  {
    title: "11. Comparatives & Superlatives",
    category: "rules",
    summary:
      "Se utilizan para contrastar y comparar características de dos o más sustantivos.",
    formula:
      "Comparativo: adj + -er / more + adj | Superlativo: the + adj + -est / the most + adj",
    content:
      "Para adjetivos cortos (1 sílaba), se añade '-er' para comparar y '-est' para superlativos (ej: 'fast' -> 'faster', 'fastest'). Para adjetivos largos (2+ sílabas), se usa 'more' y 'the most' (ej: 'efficient' -> 'more efficient', 'the most efficient'). Los adjetivos irregulares cambian (ej: 'good' -> 'better' -> 'the best'; 'bad' -> 'worse' -> 'the worst').",
    examplesJson: JSON.stringify([
      {
        en: "SQLite is faster than PostgreSQL for local testing.",
        es: "SQLite es más rápido que PostgreSQL para pruebas locales.",
        explain:
          "Adjetivo corto ('fast') en su forma comparativa añadiendo '-er' seguido de 'than'.",
      },
      {
        en: "Next.js is one of the most efficient frameworks.",
        es: "Next.js es uno de los marcos de trabajo más eficientes.",
        explain:
          "Adjetivo largo ('efficient') en su forma superlativa usando 'the most'.",
      },
      {
        en: "This error is worse than the one we had yesterday.",
        es: "Este error es peor que el que tuvimos ayer.",
        explain: "Forma comparativa irregular del adjetivo 'bad' ('worse').",
      },
    ]),
    order: 11,
  },
  {
    title: "12. Relative Clauses",
    category: "rules",
    summary:
      "Se usan para conectar ideas y dar información adicional sobre una persona, cosa o lugar sin repetir palabras.",
    formula:
      "Who (personas) | Which (cosas/animales) | That (ambos - informal) | Where (lugares)",
    content:
      "Las Relative Clauses unen oraciones mediante pronombres relativos. 'Who' describe personas, 'which' describe objetos abstractos o físicos, 'where' lugares y 'whose' posesión. 'That' puede sustituir a 'who' o 'which' en cláusulas definitorias informales cotidianas (ej: 'the app that crashed').",
    examplesJson: JSON.stringify([
      {
        en: "The engineer who wrote this route is very smart.",
        es: "El ingeniero que escribió esta ruta es muy inteligente.",
        explain:
          "Uso de 'who' para conectar información sobre el sujeto humano ('the engineer').",
      },
      {
        en: "The database which holds the statistics is local.",
        es: "La base de datos que contiene las estadísticas es local.",
        explain:
          "Uso de 'which' para describir un objeto inanimado ('the database').",
      },
      {
        en: "This is the repository where we save our source code.",
        es: "Este es el repositorio donde guardamos nuestro código fuente.",
        explain:
          "Uso de 'where' para hacer referencia a una ubicación física o digital ('the repository').",
      },
    ]),
    order: 12,
  },

  // ================= CONDITIONALS (3) =================
  {
    title: "13. Zero & First Conditionals",
    category: "conditionals",
    summary:
      "Describen hechos absolutos y situaciones reales o muy probables con sus futuras consecuencias.",
    formula:
      "Cero: If + Presente Simple, Presente Simple | Primero: If + Presente Simple, Will + V base",
    content:
      "El condicional Cero (Zero Conditional) se usa para verdades universales, hechos científicos o leyes lógicas (si pasa A, siempre pasa B). El primer condicional (First Conditional) se utiliza para situaciones reales del futuro que tienen una probabilidad alta de suceder si se cumple la condición planteada.",
    examplesJson: JSON.stringify([
      {
        en: "If you push raw code without testing, bugs occur.",
        es: "Si subes código crudo sin probar, ocurren errores.",
        explain:
          "Condicional Cero que expresa una ley lógica causa-efecto en Presente Simple.",
      },
      {
        en: "If we complete the build today, we will deploy it.",
        es: "Si completamos la compilación hoy, la desplegaremos.",
        explain:
          "Primer condicional. Si la condición en presente ocurre, se ejecutará el futuro probable ('will deploy').",
      },
      {
        en: "She will pass the English test if she practices daily.",
        es: "Ella pasará el examen de inglés si practica a diario.",
        explain:
          "Primer condicional con el orden invertido (no se requiere coma entre cláusulas).",
      },
    ]),
    order: 13,
  },
  {
    title: "14. Second & Third Conditionals",
    category: "conditionals",
    summary:
      "Se usan para imaginar situaciones irreales en el presente o lamentarse de cosas imposibles del pasado.",
    formula:
      "Segundo: If + Pasado Simple, Would + V base | Tercero: If + Pasado Perfecto, Would have + Participio",
    content:
      "El segundo condicional (Second Conditional) es hipotético: describe sueños o situaciones imaginarias del presente (ej: 'si tuviera dinero...'). En la cláusula 'if', el verbo 'to be' en pasado suele conjugarse siempre como 'were' para todos los pronombres (ej: 'If I were you'). El tercer condicional (Third Conditional) se refiere al pasado: imagina cómo habrían cambiado las cosas si se hubiese tomado otra decisión (lamentos o hipótesis pasadas).",
    examplesJson: JSON.stringify([
      {
        en: "If I had more time, I would write automated tests.",
        es: "Si tuviera más tiempo, escribiría pruebas automatizadas.",
        explain:
          "Segundo condicional. Expresa una situación hipotética e irreal en el presente.",
      },
      {
        en: "If I were you, I would back up the database now.",
        es: "Si yo fuera tú, respaldaría la base de datos ahora.",
        explain:
          "Estructura típica de consejo utilizando 'were' para el sujeto en primera persona singular ('I').",
      },
      {
        en: "If we had run the seed script, we would have had data.",
        es: "Si hubiéramos ejecutado el script semillero, habríamos tenido datos.",
        explain:
          "Tercer condicional. Expresa una hipótesis imposible sobre el pasado que ya no se puede cambiar.",
      },
    ]),
    order: 14,
  },
  {
    title: "15. Passive Voice",
    category: "conditionals",
    summary:
      "Se utiliza para dar énfasis al objeto receptor de la acción y a la acción misma, en lugar de a quien la realiza.",
    formula: "Objeto + verbo TO BE (conjugado) + Verbo Principal en Participio",
    content:
      "La voz pasiva (Passive Voice) se forma conjugando el auxiliar 'to be' en el tiempo verbal correspondiente, seguido del participio pasado del verbo principal. Se usa en documentación técnica o científica donde el sujeto que hace la acción es obvio, irrelevante o desconocido. Si queremos mencionar al agente que realiza la acción, se introduce al final con la preposición 'by'.",
    examplesJson: JSON.stringify([
      {
        en: "The database is automatically managed by Prisma.",
        es: "La base de datos es gestionada automáticamente por Prisma.",
        explain:
          "Voz pasiva en presente simple. Resalta 'the database' como el objeto que recibe la acción.",
      },
      {
        en: "All code reviews were completed on schedule.",
        es: "Todas las revisiones de código fueron completadas a tiempo.",
        explain:
          "Voz pasiva en pasado simple. No se especifica quién realizó las revisiones porque lo importante es la acción.",
      },
      {
        en: "A new version of Aura will be released next week.",
        es: "Una nueva versión de Aura será lanzada la próxima semana.",
        explain:
          "Voz pasiva en futuro utilizando 'will be' seguido del participio pasado 'released'.",
      },
    ]),
    order: 15,
  },

  // ================= MODALS (2) =================
  {
    title: "16. Modal Verbs: Can, Could, Be able to",
    category: "modals",
    summary:
      "Se usan para expresar habilidad, posibilidad, permisos y solicitudes.",
    formula: "Sujeto + Modal + Verbo en forma base",
    content:
      "'Can' expresa habilidad en el presente o peticiones informales. 'Could' es el pasado de 'can' (habilidad pasada) o se usa para peticiones más formales y posibilidades hipotéticas. 'Be able to' no es un modal puro, pero se usa para expresar habilidad en todos los tiempos verbales (futuro, presente perfecto) donde 'can/could' no pueden conjugarse.",
    examplesJson: JSON.stringify([
      {
        en: "I can deploy this feature to production.",
        es: "Puedo desplegar esta característica a producción.",
        explain: "Uso de 'can' para expresar una habilidad en el presente.",
      },
      {
        en: "Could you please review my pull request?",
        es: "¿Podrías por favor revisar mi solicitud de extracción?",
        explain: "Uso de 'could' para hacer una petición formal y educada.",
      },
      {
        en: "We will be able to handle more traffic after the upgrade.",
        es: "Seremos capaces de manejar más tráfico después de la actualización.",
        explain:
          "Uso de 'be able to' en futuro ('will be able to') ya que 'can' no tiene futuro.",
      },
    ]),
    order: 16,
  },
  {
    title: "17. Modal Verbs: Must, Have to, Should",
    category: "modals",
    summary: "Expresan obligaciones, necesidades y consejos o recomendaciones.",
    formula: "Sujeto + Modal + Verbo en forma base",
    content:
      "'Must' expresa una obligación fuerte (a menudo impuesta por el hablante) o deducciones lógicas. 'Have to' expresa obligación externa (reglas, leyes). La forma negativa 'mustn\\'t' significa prohibición, mientras que 'don\\'t have to' significa falta de obligación (no es necesario). 'Should' se utiliza para dar consejos, recomendaciones u opiniones.",
    examplesJson: JSON.stringify([
      {
        en: "You must never hardcode passwords in the repository.",
        es: "Nunca debes escribir contraseñas en duro en el repositorio.",
        explain:
          "Uso de 'must' para expresar una obligación muy fuerte o regla irrompible.",
      },
      {
        en: "We have to use a VPN to access the internal database.",
        es: "Tenemos que usar una VPN para acceder a la base de datos interna.",
        explain:
          "Uso de 'have to' para una obligación externa (regla de la empresa).",
      },
      {
        en: "You should add more comments to this complex function.",
        es: "Deberías añadir más comentarios a esta función compleja.",
        explain:
          "Uso de 'should' para dar un consejo o sugerencia de buenas prácticas.",
      },
    ]),
    order: 17,
  },

  // ================= PREPOSITIONS (2) =================
  {
    title: "18. Prepositions of Time: In, On, At",
    category: "prepositions",
    summary:
      "Reglas fundamentales para el uso de in, on y at cuando hablamos de fechas y horarios.",
    formula:
      "In (meses/años/siglos) | On (días/fechas específicas) | At (horas exactas)",
    content:
      "Utilizamos 'In' para períodos largos e inespecíficos (meses, años, estaciones, siglos: in 2024, in summer, in October). Utilizamos 'On' para días y fechas específicas (on Monday, on May 5th, on New Year's Day). Utilizamos 'At' para tiempos muy específicos o exactos y festividades completas (at 5:00 PM, at noon, at midnight, at Christmas).",
    examplesJson: JSON.stringify([
      {
        en: "The server maintenance is scheduled at 3:00 AM.",
        es: "El mantenimiento del servidor está programado a las 3:00 AM.",
        explain: "Uso de 'at' para una hora específica.",
      },
      {
        en: "We will launch the new application on Friday.",
        es: "Lanzaremos la nueva aplicación el viernes.",
        explain: "Uso de 'on' para días de la semana.",
      },
      {
        en: "Next.js became very popular in 2022.",
        es: "Next.js se volvió muy popular en 2022.",
        explain: "Uso de 'in' para años y períodos más largos.",
      },
    ]),
    order: 18,
  },
  {
    title: "19. Prepositions of Place: In, On, At",
    category: "prepositions",
    summary: "Reglas fundamentales para expresar ubicación.",
    formula:
      "In (dentro de un espacio/volumen) | On (sobre una superficie) | At (punto específico/lugar)",
    content:
      "Utilizamos 'In' cuando algo está contenido dentro de límites o en espacios tridimensionales, ciudades o países (in the box, in London, in a file). Usamos 'On' para superficies (on the table, on the screen, on the wall). Utilizamos 'At' para puntos exactos o lugares específicos con una función (at the door, at the office, at the server room).",
    examplesJson: JSON.stringify([
      {
        en: "The logs are saved in the project directory.",
        es: "Los registros se guardan en el directorio del proyecto.",
        explain:
          "Uso de 'in' para algo contenido dentro de una carpeta o directorio.",
      },
      {
        en: "You can see the error message on the screen.",
        es: "Puedes ver el mensaje de error en la pantalla.",
        explain: "Uso de 'on' para algo ubicado en una superficie plana.",
      },
      {
        en: "I left my laptop at the office.",
        es: "Dejé mi portátil en la oficina.",
        explain:
          "Uso de 'at' para referirse a un lugar específico o punto físico.",
      },
    ]),
    order: 19,
  },

  // ================= ADVANCED RULES (3) =================
  {
    title: "20. Gerunds vs. Infinitives",
    category: "rules",
    summary:
      "Aprende cuándo usar un verbo terminado en -ing y cuándo usar 'to' + verbo.",
    formula: "Verbo + -ing (Gerund) | Verbo + to + base (Infinitive)",
    content:
      "Algunos verbos en inglés deben ir seguidos por un gerundio (-ing) y otros por un infinitivo (to + verbo). Los gerundios se usan después de verbos de preferencia (enjoy, avoid, mind) y preposiciones. Los infinitivos se usan después de verbos que indican intención o decisión (want, decide, hope, promise). Además, el gerundio se utiliza cuando el verbo funciona como el sujeto de la oración.",
    examplesJson: JSON.stringify([
      {
        en: "I enjoy writing clean and maintainable code.",
        es: "Disfruto escribiendo código limpio y mantenible.",
        explain:
          "El verbo 'enjoy' siempre requiere que el siguiente verbo sea un gerundio ('writing').",
      },
      {
        en: "We decided to migrate the database to PostgreSQL.",
        es: "Decidimos migrar la base de datos a PostgreSQL.",
        explain: "El verbo 'decide' requiere un infinitivo ('to migrate').",
      },
      {
        en: "Refactoring legacy code is always a challenge.",
        es: "Refactorizar código heredado siempre es un desafío.",
        explain:
          "El verbo 'refactoring' (gerundio) actúa como el sujeto de toda la oración.",
      },
    ]),
    order: 20,
  },
  {
    title: "21. Present Perfect Continuous",
    category: "tenses",
    summary:
      "Se utiliza para enfatizar la duración de una acción que empezó en el pasado y continúa hasta el presente.",
    formula: "Sujeto + have/has been + Verbo-ING",
    content:
      "El Present Perfect Continuous se enfoca en el proceso o duración prolongada de una acción que aún no ha terminado, o que acaba de terminar y tiene un efecto visible. Suele ir acompañado de 'for' (para periodos de tiempo) o 'since' (para un punto de inicio).",
    examplesJson: JSON.stringify([
      {
        en: "I have been trying to fix this bug for three hours.",
        es: "He estado intentando arreglar este error durante tres horas.",
        explain:
          "Enfatiza la duración ('for three hours') de una acción en progreso.",
      },
      {
        en: "She has been learning React since last year.",
        es: "Ella ha estado aprendiendo React desde el año pasado.",
        explain:
          "Indica una acción que empezó en el pasado ('since last year') y continúa.",
      },
      {
        en: "Why is the CPU so hot? Have you been training the AI?",
        es: "¿Por qué está tan caliente la CPU? ¿Has estado entrenando a la IA?",
        explain:
          "Pregunta sobre una acción que acaba de terminar pero deja evidencia (CPU caliente).",
      },
    ]),
    order: 21,
  },
  {
    title: "22. Reported Speech",
    category: "rules",
    summary:
      "Se usa para comunicar lo que otra persona dijo sin usar citas directas, generalmente cambiando el tiempo verbal al pasado.",
    formula: "Discurso directo (Presente) -> Reported Speech (Pasado)",
    content:
      "Al usar el Reported Speech, se cuenta lo que alguien dijo de forma indirecta. Por lo general, damos 'un paso atrás' en el tiempo verbal. Si la persona habló en presente simple, el discurso indirecto irá en pasado simple. El present continuous cambia a past continuous, y will cambia a would.",
    examplesJson: JSON.stringify([
      {
        en: "Direct: 'I need more RAM'. Reported: He said that he needed more RAM.",
        es: "Directo: 'Necesito más RAM'. Indirecto: Él dijo que necesitaba más RAM.",
        explain:
          "El presente simple ('need') cambia a pasado simple ('needed').",
      },
      {
        en: "Direct: 'We are deploying'. Reported: They told me they were deploying.",
        es: "Directo: 'Estamos desplegando'. Indirecto: Me dijeron que estaban desplegando.",
        explain:
          "El present continuous ('are deploying') cambia a past continuous ('were deploying').",
      },
      {
        en: "She said she would review the code later.",
        es: "Ella dijo que revisaría el código más tarde.",
        explain: "El futuro con 'will' cambia a 'would' en discurso indirecto.",
      },
    ]),
    order: 22,
  },
  {
    title: "23. Articles: A, An, The",
    category: "rules",
    summary:
      "Los artículos son palabras pequeñas que determinan si hablamos de algo específico o general.",
    formula: "A / An (artículo indefinido) | The (artículo definido)",
    content:
      "Se usa 'a' antes de palabras que empiezan con sonido consonántico y 'an' antes de sonido vocálico (a, e, i, o, u). Ambos son artículos indefinidos y refieren a algo por primera vez o de forma general (ej: 'a developer', 'an error'). 'The' es el artículo definido y se usa cuando ambas partes ya saben exactamente a qué cosa específica se refieren (ej: 'the database we created', 'the button on the left').",
    examplesJson: JSON.stringify([
      {
        en: "We need to hire a senior developer for the project.",
        es: "Necesitamos contratar a un desarrollador senior para el proyecto.",
        explain:
          "Uso de 'a' porque es la primera mención de un desarrollador no específico.",
      },
      {
        en: "She found an error in the authentication module.",
        es: "Ella encontró un error en el módulo de autenticación.",
        explain:
          "Uso de 'an' porque 'error' empieza con sonido vocálico. 'The' porque 'authentication module' ya es específico para ambos.",
      },
      {
        en: "The database crashed right before the demo.",
        es: "La base de datos se cayó justo antes de la demo.",
        explain:
          "Uso de 'the' para ambos sustantivos porque ambos son específicos y conocidos por ambas partes.",
      },
    ]),
    order: 23,
  },
  {
    title: "24. Question Tags",
    category: "rules",
    summary:
      "Las coletillas interrogativas se añaden al final de una oración para confirmar algo o buscar acuerdo.",
    formula:
      "Oración afirmativa + auxiliar negativo? | Oración negativa + auxiliar positivo?",
    content:
      "Las question tags (coletillas) convierten afirmaciones en preguntas de confirmación. La regla es: si la oración principal es afirmativa, la coletilla es negativa, y viceversa. El auxiliar de la coletilla debe coincidir con el tiempo verbal de la oración principal. Son muy comunes en inglés conversacional británico.",
    examplesJson: JSON.stringify([
      {
        en: "You have pushed the latest changes, haven't you?",
        es: "Ya subiste los últimos cambios, ¿verdad?",
        explain:
          "Oración afirmativa en Present Perfect → coletilla negativa ('haven't you').",
      },
      {
        en: "The server isn't running locally, is it?",
        es: "El servidor no está corriendo localmente, ¿verdad?",
        explain:
          "Oración negativa en Present Continuous → coletilla positiva ('is it').",
      },
      {
        en: "She can fix this bug before the meeting, can't she?",
        es: "Ella puede arreglar este bug antes de la reunión, ¿verdad?",
        explain:
          "Oración afirmativa con modal 'can' → coletilla negativa ('can't she').",
      },
    ]),
    order: 24,
  },
  {
    title: "25. Wishes & Regrets: Wish + Would / Past",
    category: "conditionals",
    summary:
      "Se usa 'wish' para expresar deseos sobre situaciones actuales o lamentarse de hechos del pasado.",
    formula:
      "Wish + Past Simple (presente irreal) | Wish + Past Perfect (pasado irreal)",
    content:
      "La estructura 'wish + past simple' expresa un deseo sobre la situación presente (algo que no es verdad ahora pero nos gustaría que lo fuera). La estructura 'wish + past perfect' expresa arrepentimiento sobre algo que ocurrió (o no ocurrió) en el pasado. 'Wish + would' expresa impaciencia o deseo de que alguien cambie su comportamiento.",
    examplesJson: JSON.stringify([
      {
        en: "I wish I knew more about cloud architecture.",
        es: "Ojalá supiera más sobre arquitectura en la nube.",
        explain:
          "Wish + past simple para expresar un deseo sobre la situación actual (no lo sé ahora).",
      },
      {
        en: "I wish we had backed up the database before the migration.",
        es: "Ojalá hubiéramos respaldado la base de datos antes de la migración.",
        explain:
          "Wish + past perfect para expresar arrepentimiento por algo que no se hizo en el pasado.",
      },
      {
        en: "I wish the client would stop changing the requirements.",
        es: "Ojalá el cliente dejara de cambiar los requisitos.",
        explain:
          "Wish + would para expresar impaciencia ante el comportamiento repetido de alguien.",
      },
    ]),
    order: 25,
  },
  {
    title: "26. Conjunctions: Coordinating & Subordinating",
    category: "rules",
    summary:
      "Las conjunciones enlazan palabras, frases u oraciones para expresar relaciones lógicas entre ideas.",
    formula:
      "FANBOYS (For, And, Nor, But, Or, Yet, So) | Because, Although, While, Unless, Since...",
    content:
      "Las conjunciones coordinantes (FANBOYS) unen dos cláusulas independientes de igual nivel. Las subordinantes introducen cláusulas dependientes y expresan relaciones de causa (because, since), contraste (although, even though), condición (unless, if) o tiempo (while, when, until). Las subordinantes pueden ir al inicio o al final de la oración.",
    examplesJson: JSON.stringify([
      {
        en: "The code is clean, but the performance is still poor.",
        es: "El código está limpio, pero el rendimiento sigue siendo pobre.",
        explain:
          "Conjunción coordinante 'but' que expresa contraste entre dos ideas independientes.",
      },
      {
        en: "Although we refactored the module, the bug persists.",
        es: "Aunque refactorizamos el módulo, el bug persiste.",
        explain:
          "Conjunción subordinante 'although' que introduce una idea contrastante.",
      },
      {
        en: "We cannot launch unless the security audit is passed.",
        es: "No podemos lanzar a menos que se supere la auditoría de seguridad.",
        explain:
          "Conjunción subordinante 'unless' que equivale a 'if not' y expresa una condición negativa.",
      },
    ]),
    order: 26,
  },
  {
    title: "27. Adverbs of Frequency",
    category: "rules",
    summary:
      "Los adverbios de frecuencia describen con qué regularidad ocurre una acción.",
    formula:
      "Posición: Sujeto + Adverbio + Verbo Principal | Verbo TO BE + Adverbio",
    content:
      "Los adverbios de frecuencia más comunes en inglés van de mayor a menor: always (siempre), usually (generalmente), often (frecuentemente), sometimes (a veces), rarely (raramente), never (nunca). Su posición habitual es antes del verbo principal, pero después del verbo 'to be'. Con verbos auxiliares o modales, van entre el auxiliar y el verbo principal.",
    examplesJson: JSON.stringify([
      {
        en: "I always run the test suite before merging a branch.",
        es: "Siempre ejecuto la suite de pruebas antes de fusionar una rama.",
        explain: "'Always' se coloca antes del verbo principal 'run'.",
      },
      {
        en: "The staging server is rarely unavailable.",
        es: "El servidor de staging rara vez está no disponible.",
        explain:
          "'Rarely' se coloca después del verbo 'to be' en su forma 'is'.",
      },
      {
        en: "We sometimes work on multiple features at the same time.",
        es: "A veces trabajamos en múltiples características al mismo tiempo.",
        explain:
          "'Sometimes' puede ir al inicio de la oración o antes del verbo principal.",
      },
    ]),
    order: 27,
  },
  {
    title: "28. Indirect Questions",
    category: "rules",
    summary:
      "Las preguntas indirectas son más formales y educadas; cambian el orden de la pregunta directa.",
    formula:
      "Could you tell me + where/what/how + Sujeto + Verbo? (orden afirmativo)",
    content:
      "Las preguntas indirectas se usan en contextos formales o corteses. A diferencia de las directas, el orden es como en una oración afirmativa (sujeto + verbo), sin inversión y sin auxiliar 'do/does/did'. Se introducen con frases como 'Could you tell me...', 'Do you know...', 'I was wondering...', 'I would like to know...'.",
    examplesJson: JSON.stringify([
      {
        en: "Could you tell me where the documentation is?",
        es: "¿Podría decirme dónde está la documentación?",
        explain:
          "Orden afirmativo ('the documentation is') en lugar del orden interrogativo directo.",
      },
      {
        en: "Do you know when the next deployment is scheduled?",
        es: "¿Sabes cuándo está programado el próximo despliegue?",
        explain:
          "Uso de 'when' seguido del orden normal de oración afirmativa.",
      },
      {
        en: "I was wondering if you could review my code.",
        es: "Me preguntaba si podrías revisar mi código.",
        explain:
          "Uso de 'if' en preguntas indirectas de tipo sí/no (sin pronombre interrogativo).",
      },
    ]),
    order: 28,
  },
  {
    title: "29. Causative Structures: Have / Get Something Done",
    category: "rules",
    summary:
      "Expresan que alguien más realiza una acción por nosotros, ya sea porque lo encargamos o pagamos.",
    formula:
      "Have + Objeto + Participio Pasado | Get + Objeto + Participio Pasado",
    content:
      "La estructura causativa 'have/get + object + past participle' indica que el sujeto no realiza la acción directamente, sino que la delega o encarga a otra persona. 'Have something done' es ligeramente más formal que 'get something done'. También pueden usarse en sentido negativo cuando algo malo le ocurre al sujeto (ej: 'I had my laptop stolen').",
    examplesJson: JSON.stringify([
      {
        en: "We had the server infrastructure upgraded last month.",
        es: "Hicimos actualizar la infraestructura del servidor el mes pasado.",
        explain:
          "La empresa no lo hizo directamente; lo encargó a un proveedor externo.",
      },
      {
        en: "You should get your code reviewed before merging it.",
        es: "Deberías hacer revisar tu código antes de fusionarlo.",
        explain:
          "'Get something done' para indicar que otra persona realizará la revisión.",
      },
      {
        en: "He had his API keys stolen in the data breach.",
        es: "Le robaron sus claves de API en la brecha de datos.",
        explain:
          "Uso negativo/pasivo: algo malo ocurrió al sujeto sin su intención.",
      },
    ]),
    order: 29,
  },
  {
    title: "30. Emphatic Structures: It is... that / What... is",
    category: "rules",
    summary:
      "Estructuras para poner énfasis en una parte específica de la oración, resaltando lo más importante.",
    formula:
      "It is/was + [énfasis] + that... | What + Sujeto + Verbo + is/was + [énfasis]",
    content:
      "Las estructuras enfáticas (cleft sentences) reorganizan la oración para destacar un elemento concreto. 'It is/was... that' enfatiza cualquier parte de la oración (sujeto, objeto, adverbio). 'What... is' pone énfasis en la información que sigue al verbo 'to be'. Son muy comunes en el inglés hablado para dar fuerza expresiva a partes clave del mensaje.",
    examplesJson: JSON.stringify([
      {
        en: "It was the missing semicolon that caused the crash.",
        es: "Fue el punto y coma que faltaba lo que causó el fallo.",
        explain:
          "Énfasis en 'the missing semicolon' como la causa exacta del problema.",
      },
      {
        en: "What we really need is a better error logging system.",
        es: "Lo que realmente necesitamos es un mejor sistema de registro de errores.",
        explain: "Énfasis en la solución 'a better error logging system'.",
      },
      {
        en: "It is daily practice that makes the real difference in fluency.",
        es: "Es la práctica diaria lo que marca la verdadera diferencia en la fluidez.",
        explain:
          "Énfasis en 'daily practice' como factor determinante del aprendizaje.",
      },
    ]),
    order: 30,
  },
  {
    title: "31. Discourse Markers & Connectors",
    category: "rules",
    summary:
      "Palabras y frases que dan cohesión al discurso, conectando ideas de forma lógica y fluida.",
    formula: "Addition | Contrast | Cause | Consequence | Sequence | Example",
    content:
      "Los marcadores del discurso organizan y enlazan ideas. Para añadir información: 'furthermore', 'moreover', 'in addition'. Para contrastar: 'however', 'nevertheless', 'on the other hand'. Para expresar causa: 'because of', 'due to'. Para consecuencias: 'therefore', 'as a result'. Para secuenciar: 'first', 'then', 'finally'. Para ejemplificar: 'for instance', 'such as', 'namely'.",
    examplesJson: JSON.stringify([
      {
        en: "The API is fast; however, it lacks proper error handling.",
        es: "La API es rápida; sin embargo, le falta un manejo de errores adecuado.",
        explain:
          "'However' introduce un contraste con la idea positiva anterior.",
      },
      {
        en: "The app crashed. As a result, we lost all unsaved user data.",
        es: "La app se cayó. Como resultado, perdimos todos los datos no guardados.",
        explain:
          "'As a result' conecta la causa (el crash) con su consecuencia.",
      },
      {
        en: "We will improve UX; for instance, we will add loading skeletons.",
        es: "Mejoraremos la UX; por ejemplo, añadiremos esqueletos de carga.",
        explain:
          "'For instance' introduce un ejemplo concreto de la mejora general mencionada.",
      },
    ]),
    order: 31,
  },
  {
    title: "32. Inversion for Emphasis",
    category: "rules",
    summary:
      "Inversión del sujeto y auxiliar para dar énfasis dramático, muy común en inglés formal y escrito.",
    formula:
      "Adverbio negativo/restrictivo + Auxiliar + Sujeto + Verbo principal",
    content:
      "La inversión ocurre cuando un adverbio negativo o restrictivo se coloca al inicio de la oración. Las palabras y frases que desencadenan la inversión incluyen: 'never', 'rarely', 'seldom', 'not only... but also', 'hardly... when', 'no sooner... than', 'under no circumstances', 'only then'. Este recurso es muy formal y dramático, frecuente en discursos, libros y textos avanzados.",
    examplesJson: JSON.stringify([
      {
        en: "Never have I seen such a poorly documented codebase.",
        es: "Nunca he visto una base de código tan mal documentada.",
        explain:
          "'Never' al inicio invierte el orden: auxiliar 'have' + sujeto 'I' + participio.",
      },
      {
        en: "Not only did we fix the bug, but we also improved performance.",
        es: "No solo arreglamos el bug, sino que también mejoramos el rendimiento.",
        explain:
          "'Not only' desencadena inversión con el auxiliar 'did' en la primera cláusula.",
      },
      {
        en: "Under no circumstances should you push directly to main.",
        es: "Bajo ninguna circunstancia debes hacer push directamente a main.",
        explain:
          "'Under no circumstances' desencadena inversión formal con el modal 'should'.",
      },
    ]),
    order: 32,
  },
];

async function main() {
  console.log("Iniciando semillero de Aura...");

  // 0. Limpieza en orden relacional (para evitar fallas de claves foráneas en PostgreSQL)
  console.log("Limpiando tablas de progreso y maestría de usuario...");
  await prisma.vocabularyMastery.deleteMany({});
  await prisma.grammarProgress.deleteMany({});
  await prisma.chatMessage.deleteMany({});
  await prisma.quizRecord.deleteMany({});

  console.log("Limpiando tabla de usuarios...");
  await prisma.user.deleteMany({});

  // 1. Sembrado de Vocabulario
  console.log("Limpiando tabla de vocabulario...");
  await prisma.vocabulary.deleteMany({});
  console.log("Base de datos de vocabulario limpiada con éxito.");

  let vocabCount = 0;
  for (const item of vocabularyData) {
    try {
      await prisma.vocabulary.create({
        data: item,
      });
      vocabCount++;
    } catch (err) {
      console.error(`Error al insertar palabra '${item.word}':`, err.message);
    }
  }
  console.log(
    `¡Semillero de vocabulario completado! Se han insertado con éxito ${vocabCount} palabras.`,
  );

  // 2. Sembrado de Lecciones de Gramática
  console.log("Limpiando tabla de lecciones de gramática...");
  await prisma.grammarLesson.deleteMany({});
  console.log("Tabla de lecciones de gramática limpiada con éxito.");

  let grammarCount = 0;
  for (const lesson of grammarData) {
    try {
      await prisma.grammarLesson.create({
        data: lesson,
      });
      grammarCount++;
    } catch (err) {
      console.error(
        `Error al insertar lección '${lesson.title}':`,
        err.message,
      );
    }
  }
  console.log(
    `¡Semillero de gramática completado! Se han insertado con éxito ${grammarCount} lecciones.`,
  );

  // 3. Sembrado de Usuario Administrador Pre-configurado
  console.log("Creando usuario administrador predeterminado...");
  await prisma.user.upsert({
    where: { email: "tonylex12@gmail.com" },
    update: {},
    create: {
      id: "admin-clerk-placeholder-id",
      email: "tonylex12@gmail.com",
      role: "ADMIN",
    },
  });
  console.log("¡Usuario administrador sembrado con éxito!");
}

main()
  .catch((e) => {
    console.error("Error durante el sembrado de datos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
