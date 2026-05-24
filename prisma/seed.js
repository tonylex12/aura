const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const vocabularyData = [
  // ================= IDIOMS (40) =================
  { word: "Break a leg", translation: "Buena suerte", example: "You are going to do great on stage. Break a leg!", category: "idioms" },
  { word: "Bite the bullet", translation: "Aceptar una situación difícil con valor", example: "I have to bite the bullet and go to the dentist tomorrow.", category: "idioms" },
  { word: "Under the weather", translation: "Sentirse un poco enfermo/decaído", example: "I won't be able to come to work today. I'm feeling under the weather.", category: "idioms" },
  { word: "Spill the beans", translation: "Revelar un secreto accidentalmente", example: "Don't tell Sarah about the surprise party, she will spill the beans!", category: "idioms" },
  { word: "A piece of cake", translation: "Pan comido / Muy fácil", example: "Don't worry about the English exam. It's going to be a piece of cake.", category: "idioms" },
  { word: "Cost an arm and a leg", translation: "Costar un ojo de la cara / Muy caro", example: "I'd love to buy that new laptop, but it costs an arm and a leg.", category: "idioms" },
  { word: "Once in a blue moon", translation: "Casi nunca / Muy rara vez", example: "He visits his hometown once in a blue moon because he lives abroad.", category: "idioms" },
  { word: "Let the cat out of the bag", translation: "Revelar un secreto sin querer", example: "We wanted it to be a surprise, but John let the cat out of the bag.", category: "idioms" },
  { word: "Hit the nail on the head", translation: "Dar en el clavo / Acertar exactamente", example: "You hit the nail on the head when you identified the server bug.", category: "idioms" },
  { word: "Beat around the bush", translation: "Andarse con rodeos / Evitar el tema", example: "Stop beating around the bush and tell me what the problem is.", category: "idioms" },
  { word: "Blessing in disguise", translation: "No hay mal que por bien no venga", example: "Losing that job was a blessing in disguise; I found a much better one.", category: "idioms" },
  { word: "Cry over spilled milk", translation: "Lamentarse por cosas pasadas que no tienen solución", example: "The mistake is made, so let's fix it. No use crying over spilled milk.", category: "idioms" },
  { word: "Cut corners", translation: "Hacer las cosas rápido y mal para ahorrar dinero o tiempo", example: "They cut corners when building the server, and now it keeps crashing.", category: "idioms" },
  { word: "Devil's advocate", translation: "Abogado del diablo (presentar el lado contrario por debatir)", example: "I agree with you, but let me play devil's advocate for a moment.", category: "idioms" },
  { word: "Easier said than done", translation: "Fácil de decir, difícil de hacer", example: "Finding a new remote job is easier said than done in this market.", category: "idioms" },
  { word: "Get out of hand", translation: "Salirse de control", example: "The discussion got out of hand and people started shouting.", category: "idioms" },
  { word: "Go back to the drawing board", translation: "Empezar de nuevo desde el principio", example: "Our design was rejected, so we must go back to the drawing board.", category: "idioms" },
  { word: "Make a long story short", translation: "Para no hacer el cuento largo / En resumen", example: "To make a long story short, we got lost and missed the train.", category: "idioms" },
  { word: "Miss the boat", translation: "Perder la oportunidad", example: "If you don't apply for the scholarship today, you will miss the boat.", category: "idioms" },
  { word: "No pain, no gain", translation: "El que quiere celeste, que le cueste / Sin esfuerzo no hay recompensa", example: "Gym training is hard, but no pain, no gain!", category: "idioms" },
  { word: "Pull yourself together", translation: "Cálmate / Recupera el control de tus emociones", example: "I know you are stressed, but you need to pull yourself together for the meeting.", category: "idioms" },
  { word: "See eye to eye", translation: "Estar totalmente de acuerdo", example: "My boss and I don't always see eye to eye on scheduling.", category: "idioms" },
  { word: "Speak of the devil", translation: "Hablando del rey de Roma (cuando aparece de quien hablas)", example: "Did you hear what Alex did? Oh, speak of the devil, here he comes!", category: "idioms" },
  { word: "Take it with a grain of salt", translation: "Tomarlo con pinzas / No creerlo al pie de la letra", example: "He exaggerates, so take his stories with a grain of salt.", category: "idioms" },
  { word: "Through thick and thin", translation: "En las buenas y en las malas", example: "They have been best friends for twenty years through thick and thin.", category: "idioms" },
  { word: "The best of both worlds", translation: "Lo mejor de dos mundos / Disfrutar de dos oportunidades distintas a la vez", example: "Working remotely from the beach gives him the best of both worlds.", category: "idioms" },
  { word: "On thin ice", translation: "Estar en una situación muy arriesgada o delicada", example: "After missing three deadlines, he is on thin ice with his manager.", category: "idioms" },
  { word: "Barking up the wrong tree", translation: "Equivocar el camino / Buscar en el lugar equivocado", example: "If you think I'm responsible for this bug, you're barking up the wrong tree.", category: "idioms" },
  { word: "A penny for your thoughts", translation: "¿En qué estás pensando? / Conocer la opinión de alguien", example: "You've been quiet for a while. A penny for your thoughts?", category: "idioms" },
  { word: "Break the ice", translation: "Romper el hielo / Iniciar una conversación de forma amigable", example: "He told a joke at the beginning of the presentation to break the ice.", category: "idioms" },
  { word: "Burn bridges", translation: "Quemar puentes / Cortar lazos de forma irreversible", example: "Never burn bridges when leaving a company; you might work with them again.", category: "idioms" },
  { word: "Hit the sack", translation: "Irse a dormir / Irse a la cama", example: "I'm exhausted after coding all day, it's time for me to hit the sack.", category: "idioms" },
  { word: "Let someone off the hook", translation: "Dejar a alguien libre de culpa / Salvar a alguien de una situación difícil", example: "The manager decided to let him off the hook this time for forgetting the report.", category: "idioms" },
  { word: "Call it a day", translation: "Dar por terminado el día / Dejar de trabajar por hoy", example: "We have solved the main bugs, so let's call it a day.", category: "idioms" },
  { word: "Pull someone's leg", translation: "Tomarle el pelo a alguien / Bromear", example: "Don't worry, I didn't actually delete the production database; I was just pulling your leg!", category: "idioms" },
  { word: "Jump on the bandwagon", translation: "Subirse al carro / Unirse a una tendencia popular", example: "Many companies are jumping on the AI bandwagon without a clear strategy.", category: "idioms" },
  { word: "Burn the midnight oil", translation: "Trabajar o estudiar hasta muy tarde en la noche", example: "She has been burning the midnight oil to prepare for the product launch.", category: "idioms" },
  { word: "Keep your chin up", translation: "Mantener la frente en alto / Seguir adelante ante la adversidad", example: "Keep your chin up, I am sure you will find a better job opportunity soon.", category: "idioms" },
  { word: "Cry wolf", translation: "Mentir pidiendo ayuda de forma que nadie te crea cuando sea verdad", example: "If you keep crying wolf about system errors, nobody will believe you in a real emergency.", category: "idioms" },
  { word: "Face the music", translation: "Afrontar las consecuencias de tus actos", example: "After ignoring the warning signs, he had to face the music and explain the failure.", category: "idioms" },

  // ================= PHRASAL VERBS (40) =================
  { word: "Keep on", translation: "Continuar haciendo algo", example: "If you keep on practicing, your English will improve rapidly.", category: "phrasal" },
  { word: "Look forward to", translation: "Esperar algo con ansias y emoción", example: "I am really looking forward to our trip to London next month.", category: "phrasal" },
  { word: "Run out of", translation: "Quedarse sin algo", example: "We ran out of coffee, so I need to go to the supermarket.", category: "phrasal" },
  { word: "Give up", translation: "Rendirse / Abandonar un hábito", example: "Learning a language is hard, but you must never give up!", category: "phrasal" },
  { word: "Look up to", translation: "Admirar y respetar a alguien", example: "I have always looked up to my older sister because she is very smart.", category: "phrasal" },
  { word: "Bring up", translation: "Mencionar un tema en una conversación", example: "Please don't bring up politics during family dinner.", category: "phrasal" },
  { word: "Call off", translation: "Cancelar un evento o reunión", example: "They decided to call off the outdoor concert because of the heavy rain.", category: "phrasal" },
  { word: "Carry on", translation: "Continuar (especialmente ante dificultades)", example: "Keep calm and carry on with your tasks.", category: "phrasal" },
  { word: "Cheer up", translation: "Alegrarse / Consolar a alguien", example: "Here is a cup of hot chocolate to cheer you up.", category: "phrasal" },
  { word: "Come up with", translation: "Inventar / Idear una solución o idea", example: "We need to come up with a marketing strategy by tomorrow.", category: "phrasal" },
  { word: "Cut down on", translation: "Reducir el consumo de algo", example: "My doctor told me to cut down on sugar and processed food.", category: "phrasal" },
  { word: "End up", translation: "Terminar en una situación o lugar no planeado", example: "We took the wrong turn and ended up in a beautiful quiet village.", category: "phrasal" },
  { word: "Find out", translation: "Descubrir / Enterarse de algo", example: "I need to find out what time the museum opens.", category: "phrasal" },
  { word: "Get along with", translation: "Llevarse bien con alguien", example: "I get along with all my coworkers in the development team.", category: "phrasal" },
  { word: "Hold on", translation: "Esperar un momento (generalmente por teléfono o prisa)", example: "Hold on a minute, let me grab a pen to write this down.", category: "phrasal" },
  { word: "Look after", translation: "Cuidar de alguien o algo", example: "Could you look after my cat while I am on vacation next week?", category: "phrasal" },
  { word: "Look up", translation: "Buscar información (en un libro, diccionario o internet)", example: "If you don't know the definition, look it up in the dictionary.", category: "phrasal" },
  { word: "Make up", translation: "Inventar una historia / Reconciliarse", example: "He made up an excuse for being late to the morning standup.", category: "phrasal" },
  { word: "Put off", translation: "Posponer o retrasar una tarea", example: "Don't put off studying for your exam until the last night.", category: "phrasal" },
  { word: "Put up with", translation: "Tolerar o aguantar una situación molesta", example: "I cannot put up with this noisy air conditioner anymore.", category: "phrasal" },
  { word: "Set up", translation: "Instalar / Configurar un sistema o negocio", example: "It took me two hours to set up my new dual-monitor workstation.", category: "phrasal" },
  { word: "Take off", translation: "Despegar (avión) / Quitarse ropa / Tener éxito repentino", example: "The airplane took off exactly on schedule.", category: "phrasal" },
  { word: "Turn down", translation: "Rechazar una oferta / Bajar el volumen", example: "She turned down the job offer because the salary was too low.", category: "phrasal" },
  { word: "Wake up", translation: "Despertar / Despertarse", example: "I usually wake up at 7:00 AM without an alarm.", category: "phrasal" },
  { word: "Work out", translation: "Hacer ejercicio / Resolver un problema con éxito", example: "I hope everything works out well for your new business venture.", category: "phrasal" },
  { word: "Back up", translation: "Hacer una copia de seguridad / Respaldar a alguien", example: "Make sure you back up your files before running the operating system update.", category: "phrasal" },
  { word: "Bring about", translation: "Causar / Provocar que algo suceda", example: "The new policy brought about major changes in the corporate culture.", category: "phrasal" },
  { word: "Count on", translation: "Contar con alguien / Confiar en alguien", example: "You can always count on me to help you debug your code.", category: "phrasal" },
  { word: "Cut out", translation: "Eliminar / Recortar algo", example: "We need to cut out unnecessary features to release the app next week.", category: "phrasal" },
  { word: "Deal with", translation: "Lidiar con / Tratar de resolver un problema", example: "Our customer support team is trained to deal with difficult issues.", category: "phrasal" },
  { word: "Fall behind", translation: "Quedarse atrás / Retrasarse", example: "If we don't start coding today, we will fall behind schedule.", category: "phrasal" },
  { word: "Get over", translation: "Superar una enfermedad, pérdida o dificultad", example: "It took him a long time to get over the failure of his first startup.", category: "phrasal" },
  { word: "Go over", translation: "Revisar detalladamente", example: "Let's go over the presentation slides one more time before the demo.", category: "phrasal" },
  { word: "Look down on", translation: "Menospreciar / Mirar por encima del hombro", example: "You should never look down on junior developers; we were all beginners once.", category: "phrasal" },
  { word: "Point out", translation: "Señalar / Resaltar un detalle o información", example: "She pointed out a security vulnerability in our authentication system.", category: "phrasal" },
  { word: "Run into", translation: "Encontrarse con alguien o algo por casualidad", example: "I ran into my old colleague at the tech conference yesterday.", category: "phrasal" },
  { word: "Take over", translation: "Asumir el control o la responsabilidad de algo", example: "The senior engineer will take over the project leader role next month.", category: "phrasal" },
  { word: "Turn out", translation: "Resultar / Acabar siendo de una manera particular", example: "The backup plan turned out to be much better than the original one.", category: "phrasal" },
  { word: "Watch out", translation: "Tener cuidado / Prestar atención al peligro", example: "Watch out for outdated libraries when configuring your packages.", category: "phrasal" },
  { word: "Blow up", translation: "Explotar / Enojarse mucho repentinamente", example: "The server blew up because of the sudden influx of concurrent users.", category: "phrasal" },

  // ================= BUSINESS & TECH (50) =================
  { word: "Touch base", translation: "Ponerse en contacto brevemente", example: "Let's touch base next Monday to discuss the progress of the project.", category: "business" },
  { word: "Think outside the box", translation: "Pensar de forma creativa e innovadora", example: "To solve this architectural problem, we need to think outside the box.", category: "business" },
  { word: "On the same page", translation: "Estar de acuerdo o en sintonía", example: "Before we start, I want to make sure everyone is on the same page.", category: "business" },
  { word: "To wrap up", translation: "Concluir o finalizar una reunión o tarea", example: "Let's wrap up this meeting so we can get back to coding.", category: "business" },
  { word: "Feedback", translation: "Retroalimentación / Opiniones constructivas", example: "Your feedback on my pull request was extremely helpful.", category: "business" },
  { word: "Bandwidth", translation: "Capacidad de tiempo o recursos para hacer algo", example: "I don't have the bandwidth to take on another project this week.", category: "business" },
  { word: "Bottleneck", translation: "Cuello de botella / Punto que frena un proceso", example: "The manual database review is a major bottleneck in our deployment.", category: "business" },
  { word: "Leverage", translation: "Aprovechar / Utilizar algo para obtener ventaja", example: "We can leverage our existing React components to build this page faster.", category: "business" },
  { word: "Pivot", translation: "Cambiar de dirección o estrategia drásticamente", example: "The startup had to pivot its business model to survive.", category: "business" },
  { word: "Scale", translation: "Escalar / Crecer de forma estructurada", example: "Our server needs to scale automatically when user traffic increases.", category: "business" },
  { word: "Core competency", translation: "Competencia clave / Habilidad principal", example: "Writing clean TypeScript code is our team's core competency.", category: "business" },
  { word: "Deadline", translation: "Fecha límite de entrega", example: "The absolute deadline for completing the database migration is Friday.", category: "business" },
  { word: "Deliverable", translation: "Entregable / Producto final a presentar", example: "We have three main deliverables for the client this sprint.", category: "business" },
  { word: "Disruptive", translation: "Disruptivo / Que rompe los esquemas tradicionales", example: "Generative AI is a highly disruptive technology in our industry.", category: "business" },
  { word: "Empower", translation: "Empoderar / Dar autoridad o herramientas", example: "A good manager empowers their team to make architectural choices.", category: "business" },
  { word: "Benchmark", translation: "Punto de referencia / Estándar de comparación", example: "We ran a benchmark to compare SQLite performance against PostgreSQL.", category: "business" },
  { word: "Low-hanging fruit", translation: "Objetivos fáciles de alcanzar / Ganancias rápidas", example: "Optimizing image sizes is low-hanging fruit for page speed.", category: "business" },
  { word: "Mitigate", translation: "Mitigar / Reducir un impacto negativo o riesgo", example: "We wrote unit tests to mitigate the risk of introducing bugs.", category: "business" },
  { word: "Outsource", translation: "Subcontratar / Tercerizar", example: "We decided to outsource the graphic design work to a specialized agency.", category: "business" },
  { word: "Paradigm shift", translation: "Cambio de paradigma / Transformación de mentalidad", example: "Tailwind v4's CSS-first theme configuration represents a paradigm shift.", category: "business" },
  { word: "ROI (Return on Investment)", translation: "Retorno de inversión", example: "Refactoring this old code has a high ROI in terms of developer speed.", category: "business" },
  { word: "Stakeholder", translation: "Parte interesada / Cliente o socio involucrado", example: "We need to present our implementation plan to all stakeholders.", category: "business" },
  { word: "Streamline", translation: "Optimizar / Simplificar un proceso", example: "Prisma handles migrations to streamline database development.", category: "business" },
  { word: "Synergy", translation: "Sinergia / Cooperación que produce un resultado superior", example: "The synergy between our designers and frontend developers is excellent.", category: "business" },
  { word: "Takeaway", translation: "Punto clave / Conclusión a recordar", example: "The main takeaway from the post-mortem is that we need better monitoring.", category: "business" },
  { word: "Best practice", translation: "Buena práctica / Estándar recomendado", example: "Using clean singletons for database clients is a Next.js best practice.", category: "business" },
  { word: "Redundant", translation: "Redundante / Duplicado innecesario", example: "We removed the redundant API endpoints to clean up the backend.", category: "business" },
  { word: "Milestone", translation: "Hito / Logro importante en un proyecto", example: "Reaching 100 daily active users is a huge milestone for us.", category: "business" },
  { word: "Trade-off", translation: "Compromiso / Intercambio de ventajas y desventajas", example: "Choosing SQLite over PostgreSQL is a trade-off between simplicity and scale.", category: "business" },
  { word: "Actionable", translation: "Accionable / Que se puede poner en práctica directamente", example: "The feedback on my code was very clear and actionable.", category: "business" },
  { word: "Agile", translation: "Metodología de desarrollo rápido y adaptable", example: "Our software development team uses Agile methodology to release updates weekly.", category: "business" },
  { word: "Scalability", translation: "Escalabilidad / Capacidad de adaptación al crecimiento", example: "We designed the cloud backend with high scalability in mind.", category: "business" },
  { word: "Framework", translation: "Marco de trabajo / Entorno de desarrollo estructurado", example: "Next.js is the most popular framework for building modern React web apps.", category: "business" },
  { word: "Deployment", translation: "Despliegue / Lanzamiento a producción", example: "The deployment of the new software version was completed successfully without downtime.", category: "business" },
  { word: "Refactoring", translation: "Refactorización / Mejora interna del código sin alterar su comportamiento", example: "Code refactoring is necessary to keep our database logic clean and maintainable.", category: "business" },
  { word: "Repository", translation: "Repositorio / Almacén de código", example: "Please clone the GitHub repository and create a new branch for your feature.", category: "business" },
  { word: "Vulnerability", translation: "Vulnerabilidad / Punto débil en seguridad", example: "We patched a critical security vulnerability in the user login system.", category: "business" },
  { word: "KPI (Key Performance Indicator)", translation: "Indicador clave de rendimiento", example: "Our main KPI for this quarter is to reduce the application page load time.", category: "business" },
  { word: "Bootcamp", translation: "Curso intensivo y práctico", example: "He joined a coding bootcamp to switch his career path to web development.", category: "business" },
  { word: "API (Application Programming Interface)", translation: "Interfaz de programación de aplicaciones", example: "The speech recognition feature communicates with the Google Cloud Speech API.", category: "business" },
  { word: "Onboarding", translation: "Proceso de integración y capacitación de nuevos miembros", example: "The new developer onboarding process was very smooth and well-documented.", category: "business" },
  { word: "User experience (UX)", translation: "Experiencia de usuario", example: "Adding smooth animations significantly improves the app's user experience.", category: "business" },
  { word: "User interface (UI)", translation: "Interfaz de usuario", example: "Our UI has a beautiful glassmorphism design with harmonized HSL colors.", category: "business" },
  { word: "Churn rate", translation: "Tasa de cancelación o abandono de clientes", example: "We need to improve our premium features to reduce the subscriber churn rate.", category: "business" },
  { word: "Freemium", translation: "Modelo de negocio gratuito con opciones de pago", example: "Aura uses a freemium model where basic lessons are free, but voice tutor is premium.", category: "business" },
  { word: "Retention", translation: "Retención / Capacidad de mantener a los usuarios activos", example: "Gamifying the vocabulary practice is a powerful strategy to boost retention.", category: "business" },
  { word: "Technical debt", translation: "Deuda técnica / Costo acumulado por tomar atajos de desarrollo rápidos", example: "Ignoring clean code practices creates technical debt that slows down the team.", category: "business" },
  { word: "Monetization", translation: "Monetización / Proceso de convertir algo en dinero", example: "Adding a premium AI conversation tier is the next step in our monetization plan.", category: "business" },
  { word: "Sprint", translation: "Ciclo de desarrollo corto (usualmente de 2 semanas)", example: "We committed to completing the speech evaluation dashboard in this sprint.", category: "business" },
  { word: "SaaS (Software as a Service)", translation: "Software como servicio (modelo de distribución en la nube)", example: "Our goal is to launch the English learning platform as a scalable SaaS product.", category: "business" },
  { word: "Optimization", translation: "Optimización / Proceso de hacer algo lo más eficiente posible", example: "Database index optimization reduced search response time to less than ten milliseconds.", category: "business" },

  // ================= TRAVEL (40) =================
  { word: "Check in", translation: "Registrarse en un hotel o aeropuerto", example: "We need to check in at the hotel before 3:00 PM.", category: "travel" },
  { word: "Touch down", translation: "Aterrizar (un avión)", example: "Our flight is scheduled to touch down at 9:00 AM.", category: "travel" },
  { word: "Catch up", translation: "Alcanzar a alguien / Ponerse al día", example: "Go ahead, I will catch up with you at the museum entrance.", category: "travel" },
  { word: "On a budget", translation: "Con presupuesto ajustado", example: "We traveled around Europe on a budget, staying in hostels.", category: "travel" },
  { word: "Book in advance", translation: "Reservar con anticipación", example: "You should book the train tickets in advance to get a discount.", category: "travel" },
  { word: "Accommodation", translation: "Alojamiento / Hospedaje", example: "Finding affordable accommodation in Tokyo can be challenging.", category: "travel" },
  { word: "Boarding pass", translation: "Pase de abordar / Tarjeta de embarque", example: "Please have your boarding pass and passport ready at the gate.", category: "travel" },
  { word: "Customs", translation: "Aduana", example: "It took us forty minutes to pass through customs at the airport.", category: "travel" },
  { word: "Delayed", translation: "Demorado / Retrasado", example: "Our flight was delayed by two hours due to bad weather conditions.", category: "travel" },
  { word: "Departure", translation: "Salida / Partida", example: "Check the departure screen to find your flight's gate number.", category: "travel" },
  { word: "Destination", translation: "Destino", example: "Paris remains one of the most popular travel destinations in the world.", category: "travel" },
  { word: "Fare", translation: "Tarifa / Precio del pasaje (transporte)", example: "The subway fare in London is quite expensive.", category: "travel" },
  { word: "Itinerary", translation: "Itinerario / Plan de viaje detallado", example: "I have prepared a detailed itinerary for our trip to Rome.", category: "travel" },
  { word: "Layover", translation: "Escala / Parada técnica en un viaje", example: "We have a six-hour layover in Madrid before our flight to Miami.", category: "travel" },
  { word: "Luggage", translation: "Equipaje / Maletas", example: "Make sure to keep an eye on your luggage at the train station.", category: "travel" },
  { word: "One-way ticket", translation: "Boleto de ida", example: "I bought a one-way ticket because I don't know when I will return.", category: "travel" },
  { word: "Round-trip ticket", translation: "Boleto de ida y vuelta", example: "A round-trip ticket is usually cheaper than buying two single ones.", category: "travel" },
  { word: "Sightseeing", translation: "Turismo / Visita de lugares de interés", example: "We spent the whole afternoon sightseeing around the old town.", category: "travel" },
  { word: "Terminal", translation: "Terminal (de aeropuerto o autobús)", example: "International flights depart from Terminal 2.", category: "travel" },
  { word: "Tour guide", translation: "Guía turístico", example: "Our tour guide explained the history of the Colosseum beautifully.", category: "travel" },
  { word: "Travel agency", translation: "Agencia de viajes", example: "We booked our cruise vacation through a local travel agency.", category: "travel" },
  { word: "Unpack", translation: "Desempacar / Deshacer las maletas", example: "I want to unpack my bags as soon as we check in to our room.", category: "travel" },
  { word: "Voucher", translation: "Vale / Cupón de reserva", example: "Here is your hotel voucher; please present it at the reception.", category: "travel" },
  { word: "Youth hostel", translation: "Albergue juvenil", example: "Staying in a youth hostel is a great way to meet other travelers.", category: "travel" },
  { word: "Leisure", translation: "Ocio / Tiempo libre", example: "The hotel offers excellent facilities for both business and leisure.", category: "travel" },
  { word: "Broaden your horizons", translation: "Ampliar tus horizontes / Conocer nuevas culturas", example: "Traveling the world is one of the best ways to broaden your horizons.", category: "travel" },
  { word: "Jet lag", translation: "Fatiga por diferencia horaria tras un largo vuelo", example: "She suffered from terrible jet lag after her twelve-hour flight from Tokyo.", category: "travel" },
  { word: "Overbook", translation: "Sobrevender (vuelos o habitaciones de hotel)", example: "The airline had to overbook the flight, so they offered a free upgrade to first class.", category: "travel" },
  { word: "Breathtaking", translation: "Impresionante / Que te deja sin aliento", example: "The view from the top of the mountain was absolutely breathtaking.", category: "travel" },
  { word: "Hitchhike", translation: "Hacer autostop / Viajar 'a dedo'", example: "They decided to hitchhike across South America to save money and meet locals.", category: "travel" },
  { word: "Local custom", translation: "Costumbre local", example: "It is highly important to respect local customs when visiting another country.", category: "travel" },
  { word: "Touristic", translation: "Turístico / Muy concurrido por turistas", example: "We preferred exploring hidden villages rather than staying in highly touristic areas.", category: "travel" },
  { word: "Wanderlust", translation: "Pasión por viajar / Fuerte deseo de explorar el mundo", example: "Her wanderlust led her to visit over thirty different countries in five years.", category: "travel" },
  { word: "Check out", translation: "Hacer el registro de salida de un hotel", example: "We must check out of the room by noon, but we can leave our luggage at the reception.", category: "travel" },
  { word: "Backpacker", translation: "Mochilero / Viajero de bajo presupuesto con mochila", example: "He spent his summer traveling through Southeast Asia as a backpacker.", category: "travel" },
  { word: "Souvenir", translation: "Recuerdo de viaje", example: "I bought a beautiful handmade ceramic cup as a souvenir from the local market.", category: "travel" },
  { word: "Embassy", translation: "Embajada", example: "If you lose your passport abroad, you must contact your national embassy immediately.", category: "travel" },
  { word: "Foreign currency", translation: "Moneda extranjera / Divisa", example: "It is a good idea to exchange some foreign currency before traveling to remote areas.", category: "travel" },
  { word: "Off the beaten track", translation: "Fuera de la ruta turística habitual / Recóndito", example: "We love discovering local restaurants that are off the beaten track.", category: "travel" },
  { word: "Visa", translation: "Visado / Permiso de entrada a un país", example: "Make sure you apply for your tourist visa at least three weeks before your trip.", category: "travel" },

  // ================= CORE HIGH-FREQUENCY WORDS (100) =================
  { word: "Achieve", translation: "Lograr / Alcanzar un objetivo", example: "If you work hard, you can achieve your professional goals.", category: "core" },
  { word: "Acquire", translation: "Adquirir / Obtener", example: "Learning is the process by which we acquire new knowledge and skills.", category: "core" },
  { word: "Adapt", translation: "Adaptarse / Acomodarse", example: "Successful developers must adapt quickly to new technologies.", category: "core" },
  { word: "Analyze", translation: "Analizar", example: "We need to analyze the application logs to find the root cause of the error.", category: "core" },
  { word: "Approach", translation: "Enfoque / Aproximación / Acercamiento", example: "Our approach to learning English focuses on voice interaction.", category: "core" },
  { word: "Assess", translation: "Evaluar / Tasar / Valorar", example: "The Gemini tutor will assess your grammar in real time.", category: "core" },
  { word: "Assume", translation: "Asumir / Suponer", example: "Do not assume the user has a local database installed; handle errors gracefully.", category: "core" },
  { word: "Authority", translation: "Autoridad / Experto", example: "She is a leading authority on artificial intelligence research.", category: "core" },
  { word: "Available", translation: "Disponible", example: "The SQLite database is available immediately upon installation.", category: "core" },
  { word: "Benefit", translation: "Beneficio / Beneficiar", example: "Learning English will highly benefit your software engineering career.", category: "core" },
  { word: "Category", translation: "Categoría", example: "Our vocabulary flashcards are divided into five separate categories.", category: "core" },
  { word: "Challenge", translation: "Desafío / Reto", example: "Speaking a new language fluently is a challenging but rewarding task.", category: "core" },
  { word: "Clarify", translation: "Aclarar / Clarificar", example: "Could you clarify the requirements for this new feature?", category: "core" },
  { word: "Comply", translation: "Cumplir con / Acatar", example: "Our app must comply with Radix UI accessibility standards.", category: "core" },
  { word: "Consequence", translation: "Consecuencia", example: "Writing messy code has long-term consequences for product stability.", category: "core" },
  { word: "Consistent", translation: "Consistente / Constante", example: "Consistent practice is the key to mastering English pronunciation.", category: "core" },
  { word: "Constant", translation: "Constante / Continuo", example: "Technology undergoes constant change, requiring lifelong learning.", category: "core" },
  { word: "Consumer", translation: "Consumidor / Cliente", example: "We must focus on delivering value to our end consumers.", category: "core" },
  { word: "Context", translation: "Contexto", example: "Having the correct context helps the AI provide much better answers.", category: "core" },
  { word: "Criteria", translation: "Criterio / Criterios", example: "What are the criteria for scoring pronunciation accuracy?", category: "core" },
  { word: "Define", translation: "Definir", example: "We will define the database models inside the prisma schema file.", category: "core" },
  { word: "Derived", translation: "Derivado", example: "Many English words are derived from Latin and French.", category: "core" },
  { word: "Device", translation: "Dispositivo / Aparato", example: "Aura is responsive and works beautifully on any mobile device.", category: "core" },
  { word: "Distinction", translation: "Distinción / Diferencia", example: "It is important to understand the distinction between React and Next.js.", category: "core" },
  { word: "Diverse", translation: "Diverso / Variado", example: "Our seed list contains a diverse set of practical vocabulary terms.", category: "core" },
  { word: "Draft", translation: "Borrador / Redactar", example: "I will write a quick draft of our database migration plan.", category: "core" },
  { word: "Duration", translation: "Duración", example: "The duration of the audio clip is exactly five seconds.", category: "core" },
  { word: "Efficient", translation: "Eficiente", example: "Prisma query engine is highly efficient for SQLite databases.", category: "core" },
  { word: "Element", translation: "Elemento", example: "Hover effects and interactive cards are essential design elements.", category: "core" },
  { word: "Emphasize", translation: "Enfatizar / Destacar", example: "We emphasize practical conversation over grammar memorization.", category: "core" },
  { word: "Enable", translation: "Habilitar / Permitir", example: "Enabling speech recognition allows hands-free voice chats.", category: "core" },
  { word: "Encounter", translation: "Encontrar / Tropezar con / Suceso", example: "If you encounter a network error, check your system microphone.", category: "core" },
  { word: "Enhance", translation: "Mejorar / Realzar / Potenciar", example: "Using Sonner toasts will enhance the overall user experience.", category: "core" },
  { word: "Ensure", translation: "Asegurar / Garantizar", example: "Ensure the local dev server is running before opening the browser.", category: "core" },
  { word: "Environment", translation: "Entorno / Medio ambiente", example: "Configuring the environment variables is the first deployment step.", category: "core" },
  { word: "Equivalent", translation: "Equivalente", example: "SQLite is the local equivalent of a full scale cloud SQL database.", category: "core" },
  { word: "Establish", translation: "Establecer / Instaurar", example: "We want to establish Aura as a premium English companion app.", category: "core" },
  { word: "Estimate", translation: "Estimar / Presupuestar", example: "Can you estimate how long it will take to complete the migration?", category: "core" },
  { word: "Evaluate", translation: "Evaluar / Valorar", example: "The sandbox tokenizes spoken words to evaluate matching accuracy.", category: "core" },
  { word: "Evidence", translation: "Evidencia / Pruebas", example: "There is clear evidence that interactive learning improves retention.", category: "core" },
  { word: "Exceed", translation: "Exceder / Superar", example: "Your quiz score is so high, it exceeds the previous high score!", category: "core" },
  { word: "Exclude", translation: "Excluir", example: "We will exclude the node_modules folder from our source control.", category: "core" },
  { word: "Expand", translation: "Expandir / Ampliar", example: "We will expand the vocabulary list to over 150 terms dynamically.", category: "core" },
  { word: "Expert", translation: "Experto / Especialista", example: "Sarah is a database expert who helped design our schema.", category: "core" },
  { word: "Explicit", translation: "Explícito / Claro", example: "The user gave explicit approval to run the migration scripts.", category: "core" },
  { word: "Export", translation: "Exportar", example: "We can export the chat transcript to a text file for review.", category: "core" },
  { word: "Feature", translation: "Característica / Funcionalidad", example: "The speech-to-text dictation is the most premium feature of the app.", category: "core" },
  { word: "Flexible", translation: "Flexible / Adaptable", example: "SQLite offers a flexible database file that can be committed to Git.", category: "core" },
  { word: "Fluency", translation: "Fluidez", example: "Daily conversation simulation is key to gaining vocabulary and fluency.", category: "core" },
  { word: "Focus", translation: "Enfoque / Enfocarse", example: "Our primary focus is visual excellence and modern rich aesthetics.", category: "core" },
  { word: "Function", translation: "Función / Funcionar", example: "We wrote a helper function to calculate pronunciation similarity.", category: "core" },
  { word: "Generate", translation: "Generar", example: "Next.js will generate static HTML layouts on server-side compilation.", category: "core" },
  { word: "Goal", translation: "Meta / Objetivo", example: "Our ultimate goal is making English practice fun and affordable.", category: "core" },
  { word: "Identify", translation: "Identificar", example: "We can easily identify spelling mistakes in the user text.", category: "core" },
  { word: "Ignore", translation: "Ignorar", example: "You can ignore the lint warnings for unused variables temporarily.", category: "core" },
  { word: "Impact", translation: "Impacto / Impactar", example: "A sleek UI layout has a highly positive impact on user retention.", category: "core" },
  { word: "Implement", translation: "Implementar / Poner en marcha", example: "We will implement a clean postgres-ready SQLite database.", category: "core" },
  { word: "Imply", translation: "Implicar / Sugerir", example: "A 'no-speech' error does not imply your hardware microphone is broken.", category: "core" },
  { word: "Indicate", translation: "Indicar / Señalar", example: "Red highlights indicate words that were pronounced incorrectly.", category: "core" },
  { word: "Individual", translation: "Individual / Particular", example: "Every individual user profile stores its own local stats records.", category: "core" },
  { word: "Initial", translation: "Inicial", example: "The initial page load reads user data inside a safe useEffect block.", category: "core" },
  { word: "Interact", translation: "Interactuar", example: "Hover animations make it delightful to interact with the sidebar.", category: "core" },
  { word: "Investigate", translation: "Investigar / Indagar", example: "Let's investigate why the SpeechRecognition API failed to boot.", category: "core" },
  { word: "Job", translation: "Trabajo / Empleo", example: "Developing English fluency will help you secure a global developer job.", category: "core" },
  { word: "Locate", translation: "Localizar / Ubicar", example: "We need to locate the globals.css file to inject custom HSL tokens.", category: "core" },
  { word: "Maintain", translation: "Mantener / Conservar", example: "We must maintain clean separation between client and server components.", category: "core" },
  { word: "Method", translation: "Método / Procedimiento", example: "Fetching from dynamic database endpoints is our preferred method.", category: "core" },
  { word: "Modify", translation: "Modificar / Alterar", example: "We will modify the page routing to support the new Quiz view.", category: "core" },
  { word: "Monitor", translation: "Monitorear / Pantalla", example: "We will monitor the database performance during intensive queries.", category: "core" },
  { word: "Mutual", translation: "Mutuo", example: "Learning from an AI tutor is based on mutual engagement and curiosity.", category: "core" },
  { word: "Navigate", translation: "Navegar / Direccionar", example: "Clicking items in the sidebar will navigate between application panels.", category: "core" },
  { word: "Obvious", translation: "Obvio / Evidente", example: "It is obvious that learning grammar in context is highly effective.", category: "core" },
  { word: "Occur", translation: "Ocurrir / Suceder", example: "Hydration errors occur when the server HTML differs from the client.", category: "core" },
  { word: "Option", translation: "Opción", example: "Multiple-choice quizzes offer four options for each question.", category: "core" },
  { word: "Outcome", translation: "Resultado / Desenlace", example: "We are very excited about the positive outcome of our testing phase.", category: "core" },
  { word: "Advocate", translation: "Defensor / Abogar por", example: "The tutor acts as an advocate for your speech confidence and expression.", category: "core" },
  { word: "Alternative", translation: "Alternativa / Opción diferente", example: "Using a local database provides a reliable alternative to online cloud storage.", category: "core" },
  { word: "Appreciate", translation: "Apreciar / Valorar", example: "We highly appreciate constructive feedback to improve our application code.", category: "core" },
  { word: "Attribute", translation: "Atributo / Característica", example: "The user table has an attribute that indicates if they have premium access.", category: "core" },
  { word: "Capacity", translation: "Capacidad / Volumen máximo", example: "The database engine has a massive capacity to handle millions of records.", category: "core" },
  { word: "Complex", translation: "Complejo / Difícil", example: "Learning conversational English can be complex but highly engaging.", category: "core" },
  { word: "Component", translation: "Componente / Parte de un sistema", example: "React components allow us to reuse interactive UI elements across pages.", category: "core" },
  { word: "Contrast", translation: "Contraste / Contrastar", example: "The UI layout uses high-contrast HSL colors for excellent readability.", category: "core" },
  { word: "Contribution", translation: "Contribución / Aporte", example: "Every contribution to our open-source codebase is deeply valued.", category: "core" },
  { word: "Core", translation: "Núcleo / Parte central", example: "Clean state management is the core component of a responsive app.", category: "core" },
  { word: "Determine", translation: "Determinar / Establecer", example: "User choices during the quiz determine their final vocabulary level.", category: "core" },
  { word: "Diversity", translation: "Diversidad / Variedad", example: "Our seed list offers a rich diversity of words from different business areas.", category: "core" },
  { word: "Dynamic", translation: "Dinámico / En constante movimiento o cambio", example: "Animations create a dynamic user interface that reacts to hover actions.", category: "core" },
  { word: "Evolve", translation: "Evolucionar / Desarrollarse", example: "Web development standards evolve rapidly, requiring constant learning.", category: "core" },
  { word: "Fundamental", translation: "Fundamental / Esencial", example: "Consistent pronunciation practice is fundamental to gaining real confidence.", category: "core" },
  { word: "Generation", translation: "Generación / Acción de crear", example: "Automated seed generation populates the database tables with rich phrases.", category: "core" },
  { word: "Innovation", translation: "Innovación / Novedad", example: "Combining AI tutoring with voice chat is a major learning innovation.", category: "core" },
  { word: "Interaction", translation: "Interacción / Acción recíproca", example: "Voice interaction is the most engaging way to practice speaking skills.", category: "core" },
  { word: "Logical", translation: "Lógico / Coherente", example: "The code follows a highly logical structure that is easy to understand.", category: "core" },
  { word: "Mechanism", translation: "Mecanismo / Procedimiento", example: "The application has a robust mechanism to detect microphone failures.", category: "core" },
  { word: "Objective", translation: "Objetivo / Meta", example: "Our main objective is making language practice feel like a game.", category: "core" },
  { word: "Perspective", translation: "Perspectiva / Punto de vista", example: "Hearing stories from different perspectives deepens cultural understanding.", category: "core" },
  { word: "Precede", translation: "Preceder / Ir antes de", example: "A database schema update must precede running a new seed script.", category: "core" },
  { word: "Regulation", translation: "Regulación / Norma", example: "Data protection regulations require secure storage of user account data.", category: "core" },
  { word: "Scenario", translation: "Escenario / Situación hipotética", example: "The chat sandbox features several scenarios like ordering food or job interviews.", category: "core" },
  { word: "Significant", translation: "Significativo / Importante", example: "Daily habit builders lead to significant progress in vocabulary acquisition.", category: "core" },
  { word: "Sustainability", translation: "Sostenibilidad / Capacidad de mantenerse en el tiempo", example: "Clean architectural patterns ensure the long-term sustainability of the code.", category: "core" },
  { word: "Valid", translation: "Válido / Con fundamento", example: "Make sure you provide a valid email address during user registration.", category: "core" },

  // ================= ADDITIONAL BUSINESS & TECH (10) =================
  { word: "Authentication", translation: "Autenticación / Verificación de identidad", example: "The authentication system uses JWT tokens for security.", category: "business" },
  { word: "Authorization", translation: "Autorización / Permisos de acceso", example: "He passed authentication but failed authorization to view the admin panel.", category: "business" },
  { word: "Backend", translation: "Parte del servidor / Lógica detrás de escena", example: "Node.js and Prisma power the backend of our new application.", category: "business" },
  { word: "Frontend", translation: "Interfaz de usuario / Lado del cliente", example: "We built the frontend using React and modern CSS features.", category: "business" },
  { word: "Query", translation: "Consulta a una base de datos", example: "This Prisma query fetches all users who joined last week.", category: "business" },
  { word: "Responsive", translation: "Responsivo / Adaptable a diferentes pantallas", example: "A good UI must be fully responsive on both mobile and desktop.", category: "business" },
  { word: "State management", translation: "Gestión del estado de la aplicación", example: "React Context is a great tool for simple state management.", category: "business" },
  { word: "Version control", translation: "Control de versiones", example: "Git is the most popular version control system among developers.", category: "business" },
  { word: "Throughput", translation: "Tasa de transferencia / Rendimiento", example: "The server's throughput increased after we optimized the database queries.", category: "business" },
  { word: "Latency", translation: "Latencia / Retraso en la respuesta", example: "We need to reduce network latency to make the app feel faster.", category: "business" },

  // ================= ADDITIONAL CORE (16) =================
  { word: "Accomplish", translation: "Lograr / Llevar a cabo", example: "We can accomplish a lot if we work together as a team.", category: "core" },
  { word: "Algorithm", translation: "Algoritmo", example: "The search algorithm was optimized for better performance.", category: "core" },
  { word: "Brief", translation: "Breve / Conciso", example: "Please keep your status update brief during the daily meeting.", category: "core" },
  { word: "Cooperate", translation: "Cooperar / Trabajar en equipo", example: "The frontend and backend teams must cooperate closely.", category: "core" },
  { word: "Crucial", translation: "Crucial / Fundamental", example: "Testing is a crucial part of the software development lifecycle.", category: "core" },
  { word: "Demonstrate", translation: "Demostrar", example: "Let me demonstrate how the new speech recognition feature works.", category: "core" },
  { word: "Enormous", translation: "Enorme / Muy grande", example: "The application handles an enormous amount of data every day.", category: "core" },
  { word: "Familiar", translation: "Familiar / Conocido", example: "Are you familiar with the latest Next.js routing system?", category: "core" },
  { word: "Gather", translation: "Reunir / Recopilar", example: "We need to gather more user feedback before the next update.", category: "core" },
  { word: "Hesitate", translation: "Dudar / Vacilar", example: "Do not hesitate to ask for help if you are stuck on a bug.", category: "core" },
  { word: "Initiate", translation: "Iniciar / Comenzar", example: "The server will initiate a backup process at midnight.", category: "core" },
  { word: "Justify", translation: "Justificar", example: "Can you justify your decision to use SQLite instead of Postgres?", category: "core" },
  { word: "Launch", translation: "Lanzar / Lanzamiento", example: "The official launch of the platform is scheduled for next Monday.", category: "core" },
  { word: "Maximize", translation: "Maximizar", example: "We need to maximize our resources to finish the project on time.", category: "core" },
  { word: "Negotiate", translation: "Negociar", example: "We had to negotiate the deadline with the client.", category: "core" },
  { word: "Observe", translation: "Observar / Notar", example: "Did you observe any unusual behavior in the application logs?", category: "core" }
];

const grammarData = [
  // ================= VERB TENSES (6) =================
  {
    title: "1. Present Simple",
    category: "tenses",
    summary: "Se utiliza para describir rutinas, hábitos constantes, hechos científicos y verdades generales.",
    formula: "Sujeto + Verbo (infinitivo) [Añade -s/-es en He/She/It]",
    content: "El Present Simple es el tiempo verbal base. En las oraciones afirmativas, la tercera persona singular (he, she, it) añade una '-s' o '-es' al verbo (ej: 'she codes'). Para oraciones negativas y preguntas se utilizan los auxiliares 'do' y 'does' acompañados del verbo principal en infinitivo sin 'to' (ej: 'Does he practice English?').",
    examplesJson: JSON.stringify([
      { en: "He works as a full-stack engineer.", es: "Él trabaja como ingeniero de pila completa.", explain: "Se añade '-s' al verbo 'work' por tratarse de la tercera persona del singular ('he')." },
      { en: "Do they practice speaking English every day?", es: "¿Ellos practican hablar inglés todos los días?", explain: "Se usa el auxiliar 'do' para preguntas en plural con el pronombre 'they'." },
      { en: "I do not agree with this software architecture.", es: "No estoy de acuerdo con esta arquitectura de software.", explain: "Uso de 'do not' ('don't') para negaciones en primera persona." }
    ]),
    order: 1
  },
  {
    title: "2. Present Continuous",
    category: "tenses",
    summary: "Describe acciones que están ocurriendo en el momento exacto del habla o situaciones temporales.",
    formula: "Sujeto + am/is/are + Verbo-ING",
    content: "El Present Continuous se utiliza para acciones en progreso activo. Requiere conjugar el verbo 'to be' en presente (am, is, are) seguido del verbo principal con el gerundio inglés '-ing'. También se usa para describir tendencias actuales o planes futuros muy confirmados (ej: 'I am moving next month').",
    examplesJson: JSON.stringify([
      { en: "I am writing a database migration right now.", es: "Estoy escribiendo una migración de base de datos justo ahora.", explain: "Acción continua que ocurre en el momento exacto del habla." },
      { en: "Is she learning TypeScript these days?", es: "¿Ella está aprendiendo TypeScript estos días?", explain: "Acción temporal en progreso en este periodo de tiempo general." },
      { en: "They are not working on the server this week.", es: "Ellos no están trabajando en el servidor esta semana.", explain: "Negación continua usando 'are not' ('aren't')." }
    ]),
    order: 2
  },
  {
    title: "3. Past Simple",
    category: "tenses",
    summary: "Se utiliza para acciones concretas que ya finalizaron en un momento específico del pasado.",
    formula: "Sujeto + Verbo en Pasado [Regular -ed / Irregular]",
    content: "El Past Simple se refiere a eventos completados en el pasado. Los verbos regulares añaden '-ed' (ej: 'start' -> 'started'). Los verbos irregulares cambian de forma y deben memorizarse (ej: 'write' -> 'wrote', 'go' -> 'went'). Para formular negaciones e interrogaciones se usa el auxiliar universal 'did' y el verbo vuelve a su forma base (ej: 'Did you see?').",
    examplesJson: JSON.stringify([
      { en: "We deployed the new app version yesterday.", es: "Desplegamos la nueva versión de la aplicación ayer.", explain: "Acción completada en un punto de tiempo específico en el pasado ('yesterday')." },
      { en: "Did you push your latest commits to GitHub?", es: "¿Subiste tus últimos commits a GitHub?", explain: "Pregunta en pasado usando el auxiliar 'did' y el verbo 'push' en forma base." },
      { en: "He did not write the API documentation.", es: "Él no escribió la documentación de la API.", explain: "Negación en pasado usando 'did not' ('didn't') y verbo base 'write'." }
    ]),
    order: 3
  },
  {
    title: "4. Past Continuous",
    category: "tenses",
    summary: "Describe acciones en progreso en un momento específico del pasado, frecuentemente interrumpidas por otra acción.",
    formula: "Sujeto + was/were + Verbo-ING",
    content: "El Past Continuous resalta la duración o continuidad de una acción en el pasado. Se forma con el pasado del verbo 'to be' (was para I/he/she/it, were para you/we/they) más el verbo terminado en '-ing'. A menudo se combina con el Past Simple para mostrar que un evento en progreso fue interrumpido por otro (utilizando conectores como 'when' o 'while').",
    examplesJson: JSON.stringify([
      { en: "I was debugging code when the power went out.", es: "Estaba depurando código cuando se cortó la energía.", explain: "La acción continua ('was debugging') es interrumpida por una acción puntual en pasado ('went out')." },
      { en: "Were they running tests during the system crash?", es: "¿Ellos estaban ejecutando pruebas durante la caída del sistema?", explain: "Pregunta en pasado continuo utilizando 'were' y el sujeto plural 'they'." },
      { en: "She was not testing the API when the error occurred.", es: "Ella no estaba probando la API cuando ocurrió el error.", explain: "Negación utilizando 'was not' ('wasn't') y gerundio '-ing'." }
    ]),
    order: 4
  },
  {
    title: "5. Present Perfect",
    category: "tenses",
    summary: "Conecta el pasado con el presente. Se usa para experiencias de vida, cambios en el tiempo y acciones con impacto actual.",
    formula: "Sujeto + have/has + Verbo en Participio Pasado",
    content: "El Present Perfect se enfoca en el resultado actual de una acción pasada o en experiencias sin importar la fecha exacta. Se construye usando 'have' (o 'has' en tercera persona) y el verbo principal en participio pasado (regulares terminan en '-ed', irregulares varían, ej: 'seen', 'done'). Se acompaña comúnmente de adverbios como 'already' (ya), 'just' (acabar de) o 'yet' (aún).",
    examplesJson: JSON.stringify([
      { en: "I have just initialized the SQLite database.", es: "Acabo de inicializar la base de datos SQLite.", explain: "Acción recientemente completada usando 'have just' y participio 'initialized'." },
      { en: "Has she already completed the vocabulary quiz?", es: "¿Ella ya completó el cuestionario de vocabulario?", explain: "Pregunta en presente perfecto utilizando el auxiliar 'has' por tratarse de 'she'." },
      { en: "We have not resolved the database bug yet.", es: "Aún no hemos resuelto el fallo de la base de datos.", explain: "Negación con 'yet' al final de la oración indicando una expectativa no cumplida." }
    ]),
    order: 5
  },
  {
    title: "6. Future: Will vs. Going to",
    category: "tenses",
    summary: "Se utiliza para predecir, planear o tomar decisiones sobre eventos futuros.",
    formula: "A) Sujeto + will + V base | B) Sujeto + am/is/are + going to + V base",
    content: "Existen dos formas principales para el futuro: 'Will' se usa para decisiones espontáneas tomadas en el momento de hablar, promesas, predicciones sin evidencia clara u ofertas (ej: 'I will help you'). 'Going to' se usa para intenciones previas, planes planificados con antelación o predicciones basadas en evidencia física inmediata (ej: 'It is going to rain').",
    examplesJson: JSON.stringify([
      { en: "Don't worry, I will push the fixes now.", es: "No te preocupes, subiré las correcciones ahora.", explain: "Decisión espontánea tomada en el momento del habla utilizando 'will'." },
      { en: "We are going to migrate the server next Friday.", es: "Vamos a migrar el servidor el próximo viernes.", explain: "Plan previo programado utilizando 'are going to'." },
      { en: "Look at those logs, the database is going to crash.", es: "Mira esos registros, la base de datos se va a caer.", explain: "Predicción de futuro basada en evidencia física objetiva ('look at those logs')." }
    ]),
    order: 6
  },

  // ================= QUANTIFIERS (3) =================
  {
    title: "7. Countable & Uncountable Nouns",
    category: "quantifiers",
    summary: "Esencial para distinguir entre sustantivos que se pueden contar uno por uno y los que se consideran como un todo.",
    formula: "Sustantivos Contables [Singular/Plural] vs. Incontables [Solo Singulares]",
    content: "Los sustantivos contables (Countable Nouns) representan cosas individuales que admiten plurales e ir precedidos de 'a/an' (ej: 'a server', 'two bugs'). Los sustantivos incontables (Uncountable Nouns) son conceptos, masas o líquidos indivisibles que no admiten plurales ni números directos, y se tratan siempre como singulares (ej: 'information', 'money', 'time', 'water').",
    examplesJson: JSON.stringify([
      { en: "We found five separate bugs in the React component.", es: "Encontramos cinco errores separados en el componente de React.", explain: "'Bug' es un sustantivo contable en plural ('bugs') precedido del número 'five'." },
      { en: "I need some information about the Gemini API.", es: "Necesito algo de información sobre la API de Gemini.", explain: "'Information' es un sustantivo incontable. No se puede decir 'an information' ni 'informations'; se usa 'some'." },
      { en: "Time is running out for our release deadline.", es: "El tiempo se está agotando para nuestra fecha límite de lanzamiento.", explain: "'Time' es un sustantivo incontable y conjuga el verbo en singular ('is')." }
    ]),
    order: 7
  },
  {
    title: "8. Much vs. Many vs. A Lot Of",
    category: "quantifiers",
    summary: "Se usan para expresar grandes cantidades de sustantivos contables e incontables.",
    formula: "Many + Contable | Much + Incontable | A Lot Of + Ambos (General)",
    content: "'Many' se usa únicamente con sustantivos contables en plural y es común en oraciones negativas y preguntas (ej: 'many bugs'). 'Much' se usa exclusivamente con sustantivos incontables, también mayormente en preguntas y negaciones (ej: 'much time'). 'A lot of' (o 'lots of') es más informal y sirve para sustantivos contables e incontables, usándose principalmente en oraciones afirmativas.",
    examplesJson: JSON.stringify([
      { en: "There aren't many developers in this room.", es: "No hay muchos desarrolladores en esta sala.", explain: "Uso de 'many' con el sustantivo contable plural 'developers' en una oración negativa." },
      { en: "How much data does the server store every day?", es: "¿Cuántos datos almacena el servidor todos los días?", explain: "Uso de 'much' con el sustantivo incontable 'data' en una pregunta." },
      { en: "We have gained a lot of experience using Prisma.", es: "Hemos ganado mucha experiencia usando Prisma.", explain: "Uso de 'a lot of' con el sustantivo incontable 'experience' en una oración afirmativa." }
    ]),
    order: 8
  },
  {
    title: "9. Few vs. Little vs. Some vs. Any",
    category: "quantifiers",
    summary: "Expresan pequeñas cantidades o cantidades indefinidas con matices positivos o negativos.",
    formula: "Few/Some/Any + Contable | Little/Some/Any + Incontable",
    content: "'Few' (pocos/as) y 'Little' (poco/a) representan cantidades muy pequeñas con tono negativo. Si les agregamos el artículo 'a' ('a few', 'a little'), toman un sentido positivo de 'unos cuantos' o 'un poco'. 'Some' se usa en oraciones afirmativas para cantidades indefinidas. 'Any' se usa en negaciones y preguntas en general.",
    examplesJson: JSON.stringify([
      { en: "I have a few questions about the code.", es: "Tengo unas pocas preguntas sobre el código.", explain: "Uso de 'a few' con sustantivo contable plural para expresar una cantidad pequeña pero suficiente." },
      { en: "We have little time to complete the deployment.", es: "Tenemos poco tiempo para completar el despliegue.", explain: "Uso de 'little' con sustantivo incontable ('time') con sentido negativo (insuficiente)." },
      { en: "Do you have any suggestions for this bug?", es: "¿Tienes alguna sugerencia para este error?", explain: "Uso de 'any' en una oración interrogativa para consultar por sugerencias contables plurals." }
    ]),
    order: 9
  },

  // ================= GENERAL RULES (3) =================
  {
    title: "10. Subject-Verb Agreement",
    category: "rules",
    summary: "La regla de oro: el sujeto y su correspondiente verbo siempre deben coincidir en número (singular o plural).",
    formula: "Sujeto Singular + Verbo Singular | Sujeto Plural + Verbo Plural",
    content: "Esta regla exige que el verbo se ajuste al número de su sujeto. En presente singular se añade '-s' al verbo principal (ej: 'the engineer codes'). Una trampa común son los sustantivos plurales irregulares o colectivos (como 'people' que siempre requiere verbo plural 'people are', o 'everybody' que requiere singular 'everybody is').",
    examplesJson: JSON.stringify([
      { en: "The code works perfectly after refactoring.", es: "El código funciona perfectamente después de refactorizar.", explain: "El sujeto singular 'the code' requiere que el verbo 'work' añada '-s' en presente." },
      { en: "People are very happy with the modern UI design.", es: "La gente está muy contenta con el diseño moderno de la interfaz.", explain: "'People' es un sustantivo colectivo plural por lo que siempre requiere el verbo plural 'are'." },
      { en: "Everybody has access to the local database.", es: "Todos tienen acceso a la base de datos local.", explain: "Pronombres indefinidos como 'everybody' o 'everyone' se consideran gramaticalmente singulares y usan 'has'." }
    ]),
    order: 10
  },
  {
    title: "11. Comparatives & Superlatives",
    category: "rules",
    summary: "Se utilizan para contrastar y comparar características de dos o más sustantivos.",
    formula: "Comparativo: adj + -er / more + adj | Superlativo: the + adj + -est / the most + adj",
    content: "Para adjetivos cortos (1 sílaba), se añade '-er' para comparar y '-est' para superlativos (ej: 'fast' -> 'faster', 'fastest'). Para adjetivos largos (2+ sílabas), se usa 'more' y 'the most' (ej: 'efficient' -> 'more efficient', 'the most efficient'). Los adjetivos irregulares cambian (ej: 'good' -> 'better' -> 'the best'; 'bad' -> 'worse' -> 'the worst').",
    examplesJson: JSON.stringify([
      { en: "SQLite is faster than PostgreSQL for local testing.", es: "SQLite es más rápido que PostgreSQL para pruebas locales.", explain: "Adjetivo corto ('fast') en su forma comparativa añadiendo '-er' seguido de 'than'." },
      { en: "Next.js is one of the most efficient frameworks.", es: "Next.js es uno de los marcos de trabajo más eficientes.", explain: "Adjetivo largo ('efficient') en su forma superlativa usando 'the most'." },
      { en: "This error is worse than the one we had yesterday.", es: "Este error es peor que el que tuvimos ayer.", explain: "Forma comparativa irregular del adjetivo 'bad' ('worse')." }
    ]),
    order: 11
  },
  {
    title: "12. Relative Clauses",
    category: "rules",
    summary: "Se usan para conectar ideas y dar información adicional sobre una persona, cosa o lugar sin repetir palabras.",
    formula: "Who (personas) | Which (cosas/animales) | That (ambos - informal) | Where (lugares)",
    content: "Las Relative Clauses unen oraciones mediante pronombres relativos. 'Who' describe personas, 'which' describe objetos abstractos o físicos, 'where' lugares y 'whose' posesión. 'That' puede sustituir a 'who' o 'which' en cláusulas definitorias informales cotidianas (ej: 'the app that crashed').",
    examplesJson: JSON.stringify([
      { en: "The engineer who wrote this route is very smart.", es: "El ingeniero que escribió esta ruta es muy inteligente.", explain: "Uso de 'who' para conectar información sobre el sujeto humano ('the engineer')." },
      { en: "The database which holds the statistics is local.", es: "La base de datos que contiene las estadísticas es local.", explain: "Uso de 'which' para describir un objeto inanimado ('the database')." },
      { en: "This is the repository where we save our source code.", es: "Este es el repositorio donde guardamos nuestro código fuente.", explain: "Uso de 'where' para hacer referencia a una ubicación física o digital ('the repository')." }
    ]),
    order: 12
  },

  // ================= CONDITIONALS (3) =================
  {
    title: "13. Zero & First Conditionals",
    category: "conditionals",
    summary: "Describen hechos absolutos y situaciones reales o muy probables con sus futuras consecuencias.",
    formula: "Cero: If + Presente Simple, Presente Simple | Primero: If + Presente Simple, Will + V base",
    content: "El condicional Cero (Zero Conditional) se usa para verdades universales, hechos científicos o leyes lógicas (si pasa A, siempre pasa B). El primer condicional (First Conditional) se utiliza para situaciones reales del futuro que tienen una probabilidad alta de suceder si se cumple la condición planteada.",
    examplesJson: JSON.stringify([
      { en: "If you push raw code without testing, bugs occur.", es: "Si subes código crudo sin probar, ocurren errores.", explain: "Condicional Cero que expresa una ley lógica causa-efecto en Presente Simple." },
      { en: "If we complete the build today, we will deploy it.", es: "Si completamos la compilación hoy, la desplegaremos.", explain: "Primer condicional. Si la condición en presente ocurre, se ejecutará el futuro probable ('will deploy')." },
      { en: "She will pass the English test if she practices daily.", es: "Ella pasará el examen de inglés si practica a diario.", explain: "Primer condicional con el orden invertido (no se requiere coma entre cláusulas)." }
    ]),
    order: 13
  },
  {
    title: "14. Second & Third Conditionals",
    category: "conditionals",
    summary: "Se usan para imaginar situaciones irreales en el presente o lamentarse de cosas imposibles del pasado.",
    formula: "Segundo: If + Pasado Simple, Would + V base | Tercero: If + Pasado Perfecto, Would have + Participio",
    content: "El segundo condicional (Second Conditional) es hipotético: describe sueños o situaciones imaginarias del presente (ej: 'si tuviera dinero...'). En la cláusula 'if', el verbo 'to be' en pasado suele conjugarse siempre como 'were' para todos los pronombres (ej: 'If I were you'). El tercer condicional (Third Conditional) se refiere al pasado: imagina cómo habrían cambiado las cosas si se hubiese tomado otra decisión (lamentos o hipótesis pasadas).",
    examplesJson: JSON.stringify([
      { en: "If I had more time, I would write automated tests.", es: "Si tuviera más tiempo, escribiría pruebas automatizadas.", explain: "Segundo condicional. Expresa una situación hipotética e irreal en el presente." },
      { en: "If I were you, I would back up the database now.", es: "Si yo fuera tú, respaldaría la base de datos ahora.", explain: "Estructura típica de consejo utilizando 'were' para el sujeto en primera persona singular ('I')." },
      { en: "If we had run the seed script, we would have had data.", es: "Si hubiéramos ejecutado el script semillero, habríamos tenido datos.", explain: "Tercer condicional. Expresa una hipótesis imposible sobre el pasado que ya no se puede cambiar." }
    ]),
    order: 14
  },
  {
    title: "15. Passive Voice",
    category: "conditionals",
    summary: "Se utiliza para dar énfasis al objeto receptor de la acción y a la acción misma, en lugar de a quien la realiza.",
    formula: "Objeto + verbo TO BE (conjugado) + Verbo Principal en Participio",
    content: "La voz pasiva (Passive Voice) se forma conjugando el auxiliar 'to be' en el tiempo verbal correspondiente, seguido del participio pasado del verbo principal. Se usa en documentación técnica o científica donde el sujeto que hace la acción es obvio, irrelevante o desconocido. Si queremos mencionar al agente que realiza la acción, se introduce al final con la preposición 'by'.",
    examplesJson: JSON.stringify([
      { en: "The database is automatically managed by Prisma.", es: "La base de datos es gestionada automáticamente por Prisma.", explain: "Voz pasiva en presente simple. Resalta 'the database' como el objeto que recibe la acción." },
      { en: "All code reviews were completed on schedule.", es: "Todas las revisiones de código fueron completadas a tiempo.", explain: "Voz pasiva en pasado simple. No se especifica quién realizó las revisiones porque lo importante es la acción." },
      { en: "A new version of Aura will be released next week.", es: "Una nueva versión de Aura será lanzada la próxima semana.", explain: "Voz pasiva en futuro utilizando 'will be' seguido del participio pasado 'released'." }
    ]),
    order: 15
  },

  // ================= MODALS (2) =================
  {
    title: "16. Modal Verbs: Can, Could, Be able to",
    category: "modals",
    summary: "Se usan para expresar habilidad, posibilidad, permisos y solicitudes.",
    formula: "Sujeto + Modal + Verbo en forma base",
    content: "'Can' expresa habilidad en el presente o peticiones informales. 'Could' es el pasado de 'can' (habilidad pasada) o se usa para peticiones más formales y posibilidades hipotéticas. 'Be able to' no es un modal puro, pero se usa para expresar habilidad en todos los tiempos verbales (futuro, presente perfecto) donde 'can/could' no pueden conjugarse.",
    examplesJson: JSON.stringify([
      { en: "I can deploy this feature to production.", es: "Puedo desplegar esta característica a producción.", explain: "Uso de 'can' para expresar una habilidad en el presente." },
      { en: "Could you please review my pull request?", es: "¿Podrías por favor revisar mi solicitud de extracción?", explain: "Uso de 'could' para hacer una petición formal y educada." },
      { en: "We will be able to handle more traffic after the upgrade.", es: "Seremos capaces de manejar más tráfico después de la actualización.", explain: "Uso de 'be able to' en futuro ('will be able to') ya que 'can' no tiene futuro." }
    ]),
    order: 16
  },
  {
    title: "17. Modal Verbs: Must, Have to, Should",
    category: "modals",
    summary: "Expresan obligaciones, necesidades y consejos o recomendaciones.",
    formula: "Sujeto + Modal + Verbo en forma base",
    content: "'Must' expresa una obligación fuerte (a menudo impuesta por el hablante) o deducciones lógicas. 'Have to' expresa obligación externa (reglas, leyes). La forma negativa 'mustn\\'t' significa prohibición, mientras que 'don\\'t have to' significa falta de obligación (no es necesario). 'Should' se utiliza para dar consejos, recomendaciones u opiniones.",
    examplesJson: JSON.stringify([
      { en: "You must never hardcode passwords in the repository.", es: "Nunca debes escribir contraseñas en duro en el repositorio.", explain: "Uso de 'must' para expresar una obligación muy fuerte o regla irrompible." },
      { en: "We have to use a VPN to access the internal database.", es: "Tenemos que usar una VPN para acceder a la base de datos interna.", explain: "Uso de 'have to' para una obligación externa (regla de la empresa)." },
      { en: "You should add more comments to this complex function.", es: "Deberías añadir más comentarios a esta función compleja.", explain: "Uso de 'should' para dar un consejo o sugerencia de buenas prácticas." }
    ]),
    order: 17
  },

  // ================= PREPOSITIONS (2) =================
  {
    title: "18. Prepositions of Time: In, On, At",
    category: "prepositions",
    summary: "Reglas fundamentales para el uso de in, on y at cuando hablamos de fechas y horarios.",
    formula: "In (meses/años/siglos) | On (días/fechas específicas) | At (horas exactas)",
    content: "Utilizamos 'In' para períodos largos e inespecíficos (meses, años, estaciones, siglos: in 2024, in summer, in October). Utilizamos 'On' para días y fechas específicas (on Monday, on May 5th, on New Year's Day). Utilizamos 'At' para tiempos muy específicos o exactos y festividades completas (at 5:00 PM, at noon, at midnight, at Christmas).",
    examplesJson: JSON.stringify([
      { en: "The server maintenance is scheduled at 3:00 AM.", es: "El mantenimiento del servidor está programado a las 3:00 AM.", explain: "Uso de 'at' para una hora específica." },
      { en: "We will launch the new application on Friday.", es: "Lanzaremos la nueva aplicación el viernes.", explain: "Uso de 'on' para días de la semana." },
      { en: "Next.js became very popular in 2022.", es: "Next.js se volvió muy popular en 2022.", explain: "Uso de 'in' para años y períodos más largos." }
    ]),
    order: 18
  },
  {
    title: "19. Prepositions of Place: In, On, At",
    category: "prepositions",
    summary: "Reglas fundamentales para expresar ubicación.",
    formula: "In (dentro de un espacio/volumen) | On (sobre una superficie) | At (punto específico/lugar)",
    content: "Utilizamos 'In' cuando algo está contenido dentro de límites o en espacios tridimensionales, ciudades o países (in the box, in London, in a file). Usamos 'On' para superficies (on the table, on the screen, on the wall). Utilizamos 'At' para puntos exactos o lugares específicos con una función (at the door, at the office, at the server room).",
    examplesJson: JSON.stringify([
      { en: "The logs are saved in the project directory.", es: "Los registros se guardan en el directorio del proyecto.", explain: "Uso de 'in' para algo contenido dentro de una carpeta o directorio." },
      { en: "You can see the error message on the screen.", es: "Puedes ver el mensaje de error en la pantalla.", explain: "Uso de 'on' para algo ubicado en una superficie plana." },
      { en: "I left my laptop at the office.", es: "Dejé mi portátil en la oficina.", explain: "Uso de 'at' para referirse a un lugar específico o punto físico." }
    ]),
    order: 19
  },

  // ================= ADVANCED RULES (3) =================
  {
    title: "20. Gerunds vs. Infinitives",
    category: "rules",
    summary: "Aprende cuándo usar un verbo terminado en -ing y cuándo usar 'to' + verbo.",
    formula: "Verbo + -ing (Gerund) | Verbo + to + base (Infinitive)",
    content: "Algunos verbos en inglés deben ir seguidos por un gerundio (-ing) y otros por un infinitivo (to + verbo). Los gerundios se usan después de verbos de preferencia (enjoy, avoid, mind) y preposiciones. Los infinitivos se usan después de verbos que indican intención o decisión (want, decide, hope, promise). Además, el gerundio se utiliza cuando el verbo funciona como el sujeto de la oración.",
    examplesJson: JSON.stringify([
      { en: "I enjoy writing clean and maintainable code.", es: "Disfruto escribiendo código limpio y mantenible.", explain: "El verbo 'enjoy' siempre requiere que el siguiente verbo sea un gerundio ('writing')." },
      { en: "We decided to migrate the database to PostgreSQL.", es: "Decidimos migrar la base de datos a PostgreSQL.", explain: "El verbo 'decide' requiere un infinitivo ('to migrate')." },
      { en: "Refactoring legacy code is always a challenge.", es: "Refactorizar código heredado siempre es un desafío.", explain: "El verbo 'refactoring' (gerundio) actúa como el sujeto de toda la oración." }
    ]),
    order: 20
  },
  {
    title: "21. Present Perfect Continuous",
    category: "tenses",
    summary: "Se utiliza para enfatizar la duración de una acción que empezó en el pasado y continúa hasta el presente.",
    formula: "Sujeto + have/has been + Verbo-ING",
    content: "El Present Perfect Continuous se enfoca en el proceso o duración prolongada de una acción que aún no ha terminado, o que acaba de terminar y tiene un efecto visible. Suele ir acompañado de 'for' (para periodos de tiempo) o 'since' (para un punto de inicio).",
    examplesJson: JSON.stringify([
      { en: "I have been trying to fix this bug for three hours.", es: "He estado intentando arreglar este error durante tres horas.", explain: "Enfatiza la duración ('for three hours') de una acción en progreso." },
      { en: "She has been learning React since last year.", es: "Ella ha estado aprendiendo React desde el año pasado.", explain: "Indica una acción que empezó en el pasado ('since last year') y continúa." },
      { en: "Why is the CPU so hot? Have you been training the AI?", es: "¿Por qué está tan caliente la CPU? ¿Has estado entrenando a la IA?", explain: "Pregunta sobre una acción que acaba de terminar pero deja evidencia (CPU caliente)." }
    ]),
    order: 21
  },
  {
    title: "22. Reported Speech",
    category: "rules",
    summary: "Se usa para comunicar lo que otra persona dijo sin usar citas directas, generalmente cambiando el tiempo verbal al pasado.",
    formula: "Discurso directo (Presente) -> Reported Speech (Pasado)",
    content: "Al usar el Reported Speech, se cuenta lo que alguien dijo de forma indirecta. Por lo general, damos 'un paso atrás' en el tiempo verbal. Si la persona habló en presente simple, el discurso indirecto irá en pasado simple. El present continuous cambia a past continuous, y will cambia a would.",
    examplesJson: JSON.stringify([
      { en: "Direct: 'I need more RAM'. Reported: He said that he needed more RAM.", es: "Directo: 'Necesito más RAM'. Indirecto: Él dijo que necesitaba más RAM.", explain: "El presente simple ('need') cambia a pasado simple ('needed')." },
      { en: "Direct: 'We are deploying'. Reported: They told me they were deploying.", es: "Directo: 'Estamos desplegando'. Indirecto: Me dijeron que estaban desplegando.", explain: "El present continuous ('are deploying') cambia a past continuous ('were deploying')." },
      { en: "She said she would review the code later.", es: "Ella dijo que revisaría el código más tarde.", explain: "El futuro con 'will' cambia a 'would' en discurso indirecto." }
    ]),
    order: 22
  }
];
async function main() {
  console.log("Iniciando semillero de Aura...");
  
  // 1. Sembrado de Vocabulario
  console.log("Limpiando tabla de vocabulario...");
  await prisma.vocabulary.deleteMany({});
  console.log("Base de datos de vocabulario limpiada con éxito.");

  let vocabCount = 0;
  for (const item of vocabularyData) {
    try {
      await prisma.vocabulary.create({
        data: item
      });
      vocabCount++;
    } catch (err) {
      console.error(`Error al insertar palabra '${item.word}':`, err.message);
    }
  }
  console.log(`¡Semillero de vocabulario completado! Se han insertado con éxito ${vocabCount} palabras.`);

  // 2. Sembrado de Lecciones de Gramática
  console.log("Limpiando tabla de lecciones de gramática...");
  await prisma.grammarLesson.deleteMany({});
  console.log("Tabla de lecciones de gramática limpiada con éxito.");

  let grammarCount = 0;
  for (const lesson of grammarData) {
    try {
      await prisma.grammarLesson.create({
        data: lesson
      });
      grammarCount++;
    } catch (err) {
      console.error(`Error al insertar lección '${lesson.title}':`, err.message);
    }
  }
  console.log(`¡Semillero de gramática completado! Se han insertado con éxito ${grammarCount} lecciones.`);
}

main()
  .catch((e) => {
    console.error("Error durante el sembrado de datos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
