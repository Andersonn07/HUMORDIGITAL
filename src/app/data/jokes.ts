export interface Joke {
  id: string;
  content: {
    pt: string;
    en: string;
    es: string;
  };
  category: string;
  author?: string;
  mature?: boolean;
}

export const jokes: Joke[] = [
  // Anedotas Clássicas
  {
    id: '1',
    content: {
      pt: 'Por que o livro de matemática se suicidou? Porque tinha muitos problemas.',
      en: 'Why did the math book commit suicide? Because it had way too many problems.',
      es: '¿Por qué el libro de matemáticas se suicidó? Porque tenía demasiados problemas.',
    },
    category: 'anedotas',
  },
  {
    id: '2',
    content: {
      pt: 'O que o pato disse para a pata?\nPato: Vem Quá!',
      en: 'What did the duck say to his wife?\nDuck: "Quack is where it\'s at!"',
      es: '¿Qué le dijo el pato a la pata?\nPato: "¡Cuac-quiere cosa!"',
    },
    category: 'anedotas',
  },
  {
    id: '3',
    content: {
      pt: 'Qual é o animal que anda com as patas? Todos!',
      en: 'What animal walks with its feet? All of them!',
      es: '¿Qué animal camina con las patas? ¡Todos!',
    },
    category: 'anedotas',
  },
  {
    id: '4',
    content: {
      pt: 'Por que a galinha atravessou a rua? Para chegar ao outro lado!',
      en: 'Why did the chicken cross the road? To get to the other side!',
      es: '¿Por qué la gallina cruzó la calle? ¡Para llegar al otro lado!',
    },
    category: 'anedotas',
  },
  {
    id: '5',
    content: {
      pt: 'O que é um pontinho amarelo em cima do prédio? Um Fandangos suicida.',
      en: 'What is a yellow dot on top of a building? A suicidal Cheeto.',
      es: '¿Qué es una manchita amarilla encima de un edificio? ¡Un Dorito suicida!',
    },
    category: 'negro',
  },
  {
    id: '31',
    content: {
      pt: 'O que é um pontinho verde no canto da sala? Uma ervilha de castigo.',
      en: 'What is a little green dot in the corner? A grounded pea.',
      es: '¿Qué es un puntito verde en la esquina de la habitación? ¡Un guisante castigado!',
    },
    category: 'anedotas',
  },
  {
    id: '32',
    content: {
      pt: 'O que é um pontinho vermelho no meio do mar? Um jacaREI.',
      en: 'What is a red dot in the middle of the ocean? A cherry-fish!',
      es: '¿Qué es un puntito rojo en medio del mar? ¡Un jaca-REI!',
    },
    category: 'anedotas',
  },
  {
    id: '33',
    content: {
      pt: 'Por que o computador foi ao médico? Porque tinha um vírus!',
      en: 'Why did the computer go to the doctor? Because it had a virus!',
      es: '¿Por qué el ordenador fue al médico? ¡Porque tenía un virus!',
    },
    category: 'trocadilhos',
  },
  {
    id: '34',
    content: {
      pt: 'Impressora 1: O que a impressora disse para a outra?\nImpressora 2: Essa folha é sua ou é impressão minha?',
      en: 'Printer 1: What did one printer say to the other?\nPrinter 2: "Is that sheet yours or am I just imagining it?"',
      es: 'Impresora 1: ¿Qué le dijo una impresora a la otra?\nImpresora 2: "¿Esa hoja es tuya o es impresión mía?"',
    },
    category: 'trocadilhos',
  },
  {
    id: '35',
    content: {
      pt: 'Qual é o cúmulo da velocidade? Entrar numa padaria e comprar pão de ontem!',
      en: 'What’s the height of speed? Entering a bakery and buying yesterday\'s bread!',
      es: '¿Qué es el colmo de la velocidad? ¡Entrar en una panadería y comprar el pan de ayer!',
    },
    category: 'anedotas',
  },
  {
    id: '36',
    content: {
      pt: 'O que o zero disse para o oito?\nZero: Que cinto maneiro!',
      en: 'What did the zero say to the eight?\nZero: "Nice belt!"',
      es: '¿Qué le dijo el cero al ocho?\nCero: "¡Qué cinturón tan chulo!"',
    },
    category: 'trocadilhos',
  },
  {
    id: '37',
    content: {
      pt: 'Por que o astronauta não conseguia fazer ligações? Porque o espaço não tinha sinal!',
      en: 'Why couldn\'t the astronaut make any calls? Because space had no signal!',
      es: '¿Por qué el astronauta no podía hacer llamadas? ¡Porque el espacio no tenía señal!',
    },
    category: 'anedotas',
  },
  {
    id: '38',
    content: {
      pt: 'O que é um pontinho azul no céu? Um Urublue.',
      en: 'What is a blue dot in the sky? A Sky-vulture.',
      es: '¿Qué es un puntito azul en el cielo? ¡Un Urublue!',
    },
    category: 'anedotas',
  },

  // Piadas Secas
  {
    id: '6',
    content: {
      pt: 'Sabia que os disléxicos têm mais dificuldade para fazer piadas sobre anacronismos?',
      en: 'Did you know that dyslexics have a harder time making jokes about anachronisms?',
      es: '¿Sabías que los disléxicos tienen más dificultades para hacer bromas sobre anacronismos?',
    },
    category: 'secas',
  },
  {
    id: '7',
    content: {
      pt: 'Dois peixes num tanque.\nPeixe 1: Sabes conduzir isto?',
      en: 'Two fish in a tank.\nFish 1: Do you know how to drive this thing?',
      es: 'Dos peces en un tanque.\nPez 1: ¿Sabes conducir esto?',
    },
    category: 'secas',
  },
  {
    id: '8',
    content: {
      pt: 'Ontem roubaram todas as lâmpadas do meu prédio. Fiquei totalmente no escuro.',
      en: 'Yesterday they stole all the lightbulbs in my building. I was left completely in the dark.',
      es: 'Ayer robaron todas las bombillas de mi edificio. Me quedé totalmente a oscuras.',
    },
    category: 'secas',
  },
  {
    id: '9',
    content: {
      pt: 'Comprei sapatos a um traficante. Não sei com o que ele os cortou, mas tenho andado a viajar o dia todo.',
      en: 'I bought shoes from a drug dealer. I don\'t know what he laced them with, but I\'ve been tripping all day.',
      es: 'Le compré zapatos a un camello. No sé con qué los cortó, pero he estado viajando todo el día.',
    },
    category: 'secas',
  },
  {
    id: '10',
    content: {
      pt: 'Tenho uma piada sobre procrastinação, mas vou contar depois.',
      en: 'I have a joke about procrastination, but I\'ll tell it later.',
      es: 'Tengo un chiste sobre la procrastinación, pero te lo cuento luego.',
    },
    category: 'secas',
  },
  {
    id: '39',
    content: {
      pt: 'Morri. Mas melhorei.',
      en: 'I died. But I got better.',
      es: 'Me morí. Pero mejoré.',
    },
    category: 'secas',
  },
  {
    id: '40',
    content: {
      pt: 'Tenho uma piada sobre construção. Ainda estou a trabalhar nela.',
      en: 'I have a joke about construction. I\'m still working on it.',
      es: 'Tengo un chiste sobre construcción. Aún estoy trabajando en él.',
    },
    category: 'secas',
  },
  {
    id: '41',
    content: {
      pt: 'O meu cão não tem nariz. Como é que ele cheira? Mal.',
      en: 'My dog has no nose. How does he smell? Terrible.',
      es: 'Mi perro no tiene nariz. ¿Cómo huele? Fatal.',
    },
    category: 'secas',
  },
  {
    id: '42',
    content: {
      pt: 'Fui ao zoo ontem. Só tinha um cão. Era um shih tzu.',
      en: 'I went to the zoo yesterday. There was only one dog. It was a shih tzu.',
      es: 'Ayer fui al zoo. Solo había un perro. Era un shih tzu.',
    },
    category: 'secas',
  },
  {
    id: '43',
    content: {
      pt: 'Tentei apanhar algum nevoeiro. Falhei, mas vou tentar novamente com névoa.',
      en: 'I tried to catch some fog. I mist, but I\'ll try again with haze.',
      es: 'Intenté atrapar la niebla. Fallé, pero lo intentaré de nuevo con bruma.',
    },
    category: 'secas',
  },
  {
    id: '44',
    content: {
      pt: 'Estava maravilhado por a minha fritadeira não funcionar. Depois percebi que não estava ligada.',
      en: 'I was wondering why my fryer wasn\'t working. Then I realized it wasn\'t plugged in.',
      es: 'Me preguntaba por qué mi freidora no funcionaba. Luego me di cuenta de que no estaba enchufada.',
    },
    category: 'secas',
  },
  {
    id: '45',
    content: {
      pt: 'A minha esposa disse-me para parar de imitar um flamingo. Tive de pôr o pé no chão.',
      en: 'My wife told me to stop imitating a flamingo. I had to put my foot down.',
      es: 'Mi mujer me dijo que dejara de imitar a un flamenco. Tuve que poner los pies en la tierra.',
    },
    category: 'secas',
  },
  {
    id: '46',
    content: {
      pt: 'Eu: Parti a perna em dois sítios.\nMédico: Então pare de ir a esses sítios.',
      en: 'Me: I broke my leg in two places.\nDoctor: Then stop going to those places.',
      es: 'Yo: Me rompí la pierna en dos sitios.\nMédico: Entonces deja de ir a esos sitios.',
    },
    category: 'secas',
  },

  // Humor Negro
  {
    id: '12',
    content: {
      pt: 'Qual é a vantagem de ser órfão? Todos os filmes são adequados para toda a família.',
      en: 'What’s the advantage of being an orphan? Every movie is family-friendly.',
      es: '¿Cuál es la ventaja de ser huérfano? Todas las películas son aptas para toda la familia.',
    },
    category: 'negro',
  },
  {
    id: '13',
    content: {
      pt: 'Médico: Tenho boas e más notícias.\nPaciente: Diga as más primeiro.\nMédico: Você tem 24 horas de vida.\nPaciente: E as boas?\nMédico: Devia ter-lhe dito isso ontem.',
      en: 'Doctor: I have good and bad news.\nPatient: Give me the bad news first.\nDoctor: You have 24 hours to live.\nPatient: And the good news?\nDoctor: I should have told you yesterday.',
      es: 'Médico: Tengo buenas y malas noticias.\nPaciente: Dígame las malas primero.\nMédico: Le quedan 24 horas de vida.\nPaciente: ¿Y las buenas?\nMédico: Debería haberlo dicho ayer.',
    },
    category: 'negro',
  },
  {
    id: '48',
    content: {
      pt: 'O que é que obtens quando cruzas uma piada com uma pergunta retórica?',
      en: 'What do you get when you cross a joke with a rhetorical question?',
      es: '¿Qué obtienes cuando cruzas un chiste con una pregunta retórica?',
    },
    category: 'secas',
  },
  {
    id: '49',
    content: {
      pt: 'Qual é a melhor coisa sobre a Suíça? Não sei, mas a bandeira é uma grande vantagem.',
      en: 'What’s the best thing about Switzerland? I don\'t know, but the flag is a big plus.',
      es: '¿Qué es lo mejor de Suiza? No lo sé, pero su bandera es un gran punto a favor.',
    },
    category: 'trocadilhos',
  },
  {
    id: '50',
    content: {
      pt: 'Sempre disse ao meu filho para perseguir os seus sonhos. Ele quer ser zombi.',
      en: 'I always told my son to follow his dreams. Now he wants to be a zombie.',
      es: 'Siempre le dije a mi hijo que persiguiera sus sueños. Ahora quiere ser un zombi.',
    },
    category: 'negro',
  },
  {
    id: '51',
    content: {
      pt: 'O que tem quatro rodas e voa? Um camião do lixo. E o meu avô.',
      en: 'What has four wheels and flies? A garbage truck. And my grandpa.',
      es: '¿Qué tiene cuatro ruedas y vuela? Un camión de basura. Y mi abuelo.',
    },
    category: 'negro',
  },
  {
    id: '52',
    content: {
      pt: 'Médico: Tem consciência de que está a sofrer de paranoia?\nPaciente: Eu sabia que toda a gente estava a dizer isso!',
      en: 'Doctor: Are you aware that you are suffering from paranoia?\nPatient: I knew everyone was saying that!',
      es: 'Médico: ¿Es consciente de que sufre de paranoia?\nPaciente: ¡Sabía que todo el mundo decía eso!',
    },
    category: 'negro',
  },
  {
    id: '53',
    content: {
      pt: 'A minha mulher e eu ficámos felizes durante 10 anos. Depois conhecemo-nos.',
      en: 'My wife and I were happy for 20 years. Then we met.',
      es: 'Mi mujer y yo fuimos felices durante 20 años. Luego nos conocimos.',
    },
    category: 'negro',
  },
  {
    id: 'n01',
    content: {
      pt: 'Fui ao funeral do meu melhor amigo. Mas ele não apareceu. Que falta de respeito.',
      en: 'I went to my best friend\'s funeral. He didn\'t show up. How disrespectful.',
      es: 'Fui al funeral de mi mejor amigo. No apareció. Qué falta de respeto.',
    },
    category: 'negro',
  },
  {
    id: 'n02',
    content: {
      pt: 'Comprei um livro chamado "Como Viver até aos 100 Anos". Pena ter morrido antes de o terminar.',
      en: 'I bought a book called "How to Live to 100." Too bad I died before finishing it.',
      es: 'Compré un libro titulado "Cómo vivir hasta los 100 años". Lástima haber muerto antes de terminarlo.',
    },
    category: 'negro',
  },
  {
    id: 'n03',
    content: {
      pt: 'Liguei para a linha de apoio emocional. Puseram-me em espera. Comecei a sentir-me melhor — pelo menos tinha companhia.',
      en: 'I called the suicide prevention hotline. They put me on hold. I started feeling better — at least I had company.',
      es: 'Llamé a la línea de prevención del suicidio. Me pusieron en espera. Empecé a sentirme mejor; al menos tenía compañía.',
    },
    category: 'negro',
  },
  {
    id: 'n04',
    content: {
      pt: 'O meu avô dizia sempre: "É fácil parar de fumar." Ele provou-o 300 vezes.',
      en: 'My grandpa always said: "Quitting smoking is easy." He proved it 300 times.',
      es: 'Mi abuelo siempre decía: "Dejar de fumar es fácil". Lo demostró 300 veces.',
    },
    category: 'negro',
  },

  // Trocadilhos
  {
    id: '16',
    content: {
      pt: 'O que o tomate foi fazer no banco? Tirar extrato.',
      en: 'Why did the tomato go to the bank? To check its paste.',
      es: '¿Por qué el tomate fue al banco? A pedir un extracto.',
    },
    category: 'trocadilhos',
  },
  {
    id: '17',
    content: {
      pt: 'Por que o elefante não pega fogo? Porque ele já é cinza.',
      en: 'Why don\'t elephants catch fire? Because they’re already ash (gray).',
      es: '¿Por qué el elefante no se quema? Porque ya es ceniza (gris).',
    },
    category: 'trocadilhos',
  },
  {
    id: '18',
    content: {
      pt: 'O que o advogado do frango foi fazer na delegacia? Pedir a abaeas corpus.',
      en: 'What did the chicken\'s lawyer do at the police station? Filed for "egg-beas corpus".',
      es: '¿Qué fue a hacer el abogado del pollo a la comisaría? Pedir el "habeas croquetas".',
    },
    category: 'trocadilhos',
  },
  {
    id: '19',
    content: {
      pt: 'Qual é o doce preferido do átomo? Pão de Nêutron.',
      en: 'What is an atom\'s favorite snack? Neutron bread.',
      es: '¿Cuál es el dulce favorito del átomo? El pan de Neutrón.',
    },
    category: 'trocadilhos',
  },
  {
    id: '20',
    content: {
      pt: 'A esfera diz ao cubo:\nEsfera: Deixa de ser quadrado!',
      en: 'The sphere says to the cube:\nSphere: Stop being so square!',
      es: 'La esfera le dice al cubo:\nEsfera: ¡Deja de ser tan cuadrado!',
    },
    category: 'trocadilhos',
  },
  {
    id: '54',
    content: {
      pt: 'Por que o café foi à polícia? Porque foi muído!',
      en: 'Why did the coffee go to the police? Because it got grounded!',
      es: '¿Por qué el café fue a la policía? ¡Porque lo molieron!',
    },
    category: 'trocadilhos',
  },
  {
    id: '55',
    content: {
      pt: 'O que o astronauta comeu ao pequeno-almoço? Cereais com leite Via Láctea.',
      en: 'What did the astronaut have for breakfast? Milky Way cereals.',
      es: '¿Qué desayunó el astronauta? Cereales con leche de la Vía Láctea.',
    },
    category: 'trocadilhos',
  },
  {
    id: '56',
    content: {
      pt: 'Qual é o time de futebol mais perigoso? O Santa Cruz, porque tem 3 ponteiros!',
      en: 'Which is the most dangerous soccer team? The Sharp Shooters.',
      es: '¿Cuál es el equipo más peligroso? ¡El que tiene más artillería!',
    },
    category: 'trocadilhos',
  },
  {
    id: '57',
    content: {
      pt: 'Por que o peixe não gosta de jogar futebol? Porque tem medo da rede!',
      en: 'Why don\'t fish like playing soccer? Because they\'re afraid of the net!',
      es: '¿Por qué a los peces no les gusta el fútbol? ¡Porque tienen miedo a la red!',
    },
    category: 'trocadilhos',
  },
  {
    id: '58',
    content: {
      pt: 'O que acontece quando um anão acena? Ele diz microondas!',
      en: 'What happens when a dwarf waves at you? He gives you a microwave!',
      es: '¿Qué pasa cuando un enano saluda? ¡Que te manda una microonda!',
    },
    category: 'trocadilhos',
  },
  {
    id: '59',
    content: {
      pt: 'Por que a bicicleta não se sustenta sozinha? Porque está em duas rodas!',
      en: 'Why can\'t the bicycle stand on its own? It\'s two-tired!',
      es: '¿Por qué la bicicleta no se sostiene sola? ¡Porque está cansada (two-tired)!',
    },
    category: 'trocadilhos',
  },
  {
    id: '60',
    content: {
      pt: 'Qual é o cúmulo do otimismo? Formiga levando chiclete para casa.',
      en: 'What is the height of optimism? An ant carrying a piece of gum home.',
      es: '¿Qué es el colmo del optimismo? ¡Una hormiga llevando un chicle a casa!',
    },
    category: 'anedotas',
  },
  {
    id: '61',
    content: {
      pt: 'O que o ar condicionado disse quando ganhou um prêmio? Cool!',
      en: 'What did the air conditioner say when it won an award? Cool!',
      es: '¿Qué dijo el aire acondicionado cuando ganó un premio? ¡Cool!',
    },
    category: 'trocadilhos',
  },

  // Inteligentes
  {
    id: '21',
    content: {
      pt: 'Três tipos de pessoas no mundo: as que sabem contar e as que não sabem.',
      en: 'There are three types of people in the world: those who can count and those who can\'t.',
      es: 'Hay tres tipos de personas en el mundo: las que saben contar y las que no.',
    },
    category: 'inteligentes',
  },
  {
    id: '22',
    content: {
      pt: 'A inteligência artificial nunca será páreo para a estupidez natural.',
      en: 'Artificial intelligence will never be a match for natural stupidity.',
      es: 'La inteligencia artificial nunca será rival para la estupidez natural.',
    },
    category: 'inteligentes',
  },
  {
    id: '23',
    content: {
      pt: 'Polícia: Sabe a que velocidade ia?\nHeisenberg: Não, mas sei exatamente onde estou!',
      en: 'Police officer: Do you know how fast you were going?\nHeisenberg: No, but I know exactly where I am!',
      es: 'Policía: ¿Sabe a qué velocidad iba?\nHeisenberg: No, ¡pero sé exactamente dónde estoy!',
    },
    category: 'inteligentes',
  },
  {
    id: '24',
    content: {
      pt: 'Entrevistador: Queres café ou chá?\nProgramador: Sim.',
      en: 'Interviewer: Do you want coffee or tea?\nProgrammer: Yes.',
      es: 'Entrevistador: ¿Quieres café o té?\nProgramador: Sí.',
    },
    category: 'inteligentes',
  },
  {
    id: '25',
    content: {
      pt: 'Átomo 1: Acho que perdi um eletrão.\nÁtomo 2: Tens a certeza?\nÁtomo 1: Sim, estou positivo!',
      en: 'Atom 1: I think I lost an electron.\nAtom 2: Are you sure?\nAtom 1: Yes, I\'m positive!',
      es: 'Átomo 1: Creo que he perdido un electrón.\nÁtomo 2: ¿Estás seguro?\nÁtomo 1: ¡Sí, estoy positivo!',
    },
    category: 'inteligentes',
  },
  {
    id: '62',
    content: {
      pt: 'Uma consulta SQL entra num bar e aproxima-se de duas tabelas.\nConsulta SQL: Posso juntar-me a vocês?',
      en: 'An SQL query walks into a bar and approaches two tables.\nSQL query: Can I join you?',
      es: 'Una consulta SQL entra en un bar y se acerca a dos tablas.\nConsulta SQL: ¿Puedo unirme a vosotras?',
    },
    category: 'inteligentes',
  },
  {
    id: '63',
    content: {
      pt: 'Existem 10 tipos de pessoas no mundo: as que entendem binário e as que não entendem.',
      en: 'There are 10 types of people in the world: those who understand binary and those who don\'t.',
      es: 'Hay 10 tipos de personas en el mundo: las que entienden el binario y las que no.',
    },
    category: 'inteligentes',
  },
  {
    id: '64',
    content: {
      pt: 'Rececionista: Precisa de ajuda com a bagagem?\nFotão: Não, estou a viajar leve.',
      en: 'Bellhop: Can I help you with your luggage?\nPhoton: No, I\'m traveling light.',
      es: 'Recepcionista: ¿Necesita ayuda con el equipaje?\nFotón: No, viajo ligero.',
    },
    category: 'inteligentes',
  },
  {
    id: '65',
    content: {
      pt: 'Schrödinger entra num bar. Ou não.',
      en: 'Schrödinger walks into a bar. Or not.',
      es: 'Schrödinger entra en un bar. O no.',
    },
    category: 'inteligentes',
  },
  {
    id: '66',
    content: {
      pt: 'Pessimista: O copo está meio vazio.\nOtimista: O copo está meio cheio.\nEngenheiro: O copo é o dobro do tamanho necessário.',
      en: 'Pessimist: The glass is half empty.\nOptimist: The glass is half full.\nEngineer: The glass is twice as large as it needs to be.',
      es: 'Pesimista: El vaso está medio vacío.\nOptimista: El vaso está medio lleno.\nIngeniero: El vaso es el doble de grande de lo necesario.',
    },
    category: 'inteligentes',
  },
  {
    id: '67',
    content: {
      pt: 'Por que os programadores preferem o modo escuro? Porque a luz atrai bugs!',
      en: 'Why do programmers prefer dark mode? Because light attracts bugs!',
      es: '¿Por qué los programadores prefieren el modo oscuro? ¡Porque la luz atrae a los bichos (bugs)!',
    },
    category: 'inteligentes',
  },
  {
    id: '68',
    content: {
      pt: 'Um matemático, um físico e um engenheiro encontram um incêndio. O matemático calcula como apagá-lo. O físico mede o calor e a velocidade. O engenheiro pega na mangueira e apaga.',
      en: 'A mathematician, a physicist, and an engineer find a fire. The mathematician calculates how to put it out. The physicist measures heat and speed. The engineer grabs a hose and puts it out.',
      es: 'Un matemático, un físico y un ingeniero encuentran un incendio. El matemático calcula cómo apagarlo. El físico mide el calor y la velocidad. El ingeniero coge la manguera y lo apaga.',
    },
    category: 'inteligentes',
  },
  {
    id: '69',
    content: {
      pt: 'Por que 6 tinha medo de 7? Porque 7 8 9. Mas por que 7 comeu 9? Porque precisas comer 3² refeições por dia!',
      en: 'Why was 6 afraid of 7? Because 7 8 9 (7 ate 9). But why did 7 eat 9? Because you need to eat 3² meals a day!',
      es: '¿Por qué el 6 tenía miedo del 7? Porque "7 8 9". Pero, ¿por qué el 7 se comió al 9? ¡Porque hay que hacer 3² comidas al día!',
    },
    category: 'inteligentes',
  },

  // Observacionais
  {
    id: '26',
    content: {
      pt: 'Se conseguires ler isto, obrigado por não me bateres com o carro enquanto escrevo este SMS.',
      en: 'If you can read this, thank you for not hitting me with your car while I write this text.',
      es: 'Si puedes leer esto, gracias por no atropellarme con el coche mientras escribo este mensaje.',
    },
    category: 'observacionais',
  },
  {
    id: '27',
    content: {
      pt: 'Por que é que nunca vemos anúncios de bolas de cristal? Porque os vendedores já deviam saber que não ia funcionar.',
      en: 'Why do we never see ads for crystal balls? Because the sellers should have known it wasn\'t going to work.',
      es: '¿Por qué nunca vemos anuncios de bolas de cristal? Porque los vendedores ya deberían saber que no iba a funcionar.',
    },
    category: 'observacionais',
  },
  {
    id: '28',
    content: {
      pt: 'Fiz uma lista de coisas que não sou bom a fazer. Até agora tenho 1. Fazer listas 2. Contar',
      en: 'I made a list of things I\'m not good at. So far I have: 1. Making lists 2. Counting',
      es: 'He hecho una lista de cosas que no se me dan bien. De momento tengo: 1. Hacer listas 2. Contar',
    },
    category: 'observacionais',
  },
  {
    id: '29',
    content: {
      pt: 'O meu terapeuta disse que tenho um belo complexo de superioridade. O que é que ele sabe? Não é tão inteligente quanto eu.',
      en: 'My therapist said I have a beautiful superiority complex. What does he know? He\'s not as smart as me.',
      es: 'Mi terapeuta dice que tengo un complejo de superioridad precioso. ¿Él qué sabrá? No es tan inteligente como yo.',
    },
    category: 'observacionais',
  },
  {
    id: '30',
    content: {
      pt: 'Dizer "não faças dramas" quando alguém está chateado é como dizer "não fiques doente" quando alguém está com gripe.',
      en: 'Telling someone "don\'t be dramatic" when they\'re upset is like telling them "don\'t be sick" when they have the flu.',
      es: 'Decirle a alguien que "no haga dramas" cuando está molesto es como decirle que "no se ponga enfermo" cuando tiene gripe.',
    },
    category: 'observacionais',
  },
  {
    id: '70',
    content: {
      pt: 'Tenho um amigo que é vegano e faz crossfit. Não sei qual mencionar primeiro quando se apresenta.',
      en: 'I have a friend who is vegan and does crossfit. I don\'t know which one he mentions first when he introduces himself.',
      es: 'Tengo un amigo que es vegano y hace crossfit. No sé qué menciona primero cuando se presenta.',
    },
    category: 'observacionais',
  },
  {
    id: '71',
    content: {
      pt: 'A melhor parte sobre o trabalho de casa é que podes fazê-lo na cama. A pior parte é que depois não consegues dormir porque estás com ansiedade por não o teres feito.',
      en: 'The best part about homework is that you can do it in bed. The worst part is that you can\'t sleep afterward because of the anxiety of not having done it.',
      es: 'Lo mejor de los deberes es que puedes hacerlos en la cama. Lo peor es que luego no puedes dormir por la ansiedad de no haberlos hecho.',
    },
    category: 'observacionais',
  },
  {
    id: '72',
    content: {
      pt: 'Adoro quando as pessoas dizem "fiz isto com o meu tempo livre". Como se houvesse outro tipo de tempo para fazer coisas.',
      en: 'I love it when people say "I did this in my free time." As if there were any other kind of time to do things.',
      es: 'Me encanta cuando la gente dice "hice esto en mi tiempo libre". Como si hubiera otro tipo de tiempo para hacer cosas.',
    },
    category: 'observacionais',
  },
  {
    id: '73',
    content: {
      pt: 'A diferença entre "estou acordado" às 6h da manhã e às 6h da noite é astronómica.',
      en: 'The difference between being awake at 6 AM and 6 PM is astronomical.',
      es: 'La diferencia entre estar despierto a las 6 de la mañana y a las 6 de la tarde es astronómica.',
    },
    category: 'observacionais',
  },
  {
    id: '74',
    content: {
      pt: 'Por que é que quando vais ao médico tens de esperar uma hora, mas quando te atrasas 5 minutos perdes a consulta?',
      en: 'Why is it that when you go to the doctor you have to wait an hour, but if you\'re 5 minutes late you lose your appointment?',
      es: '¿Por qué cuando vas al médico tienes que esperar una hora, pero si te retrasas 5 minutos pierdes la cita?',
    },
    category: 'observacionais',
  },
  {
    id: '75',
    content: {
      pt: 'É estranho pensar que as tuas mãos nunca tocaram uma à outra, apenas os átomos delas se repelem.',
      en: 'It\'s weird to think that your hands have never actually touched each other; only their atoms are repelling.',
      es: 'Es raro pensar que tus manos nunca se han tocado realmente, solo sus átomos se repelen.',
    },
    category: 'inteligentes',
  },
  {
    id: '76',
    content: {
      pt: 'Se os restaurantes de fast food estão sempre a contratar, por que a fila é sempre tão longa?',
      en: 'If fast food restaurants are always hiring, why is the line always so long?',
      es: 'Si los restaurantes de comida rápida siempre están contratando, ¿por qué la cola siempre es tan larga?',
    },
    category: 'observacionais',
  },
  {
    id: '77',
    content: {
      pt: 'Dizem para viver cada dia como se fosse o último. Então hoje vou passar o dia deitado a chorar e a ligar aos meus amigos e família.',
      en: 'They say to live each day as if it were your last. So today I\'m going to spend the day lying down, crying, and calling my friends and family.',
      es: 'Dicen que vivas cada día como si fuera el último. Así que hoy voy a pasar el día tumbado llorando y llamando a mis amigos y familiares.',
    },
    category: 'negro',
  },

  // ============ CONTEÚDO +18 — ZONA CENSURADA (Sexualidade + Religião + Humor Negro Pesado) ============
  // --- Humor Negro Pesado (movido de negro) ---
  {
    id: '11',
    content: {
      pt: 'Qual a diferença entre uma pizza e um judeu? A pizza não grita no forno.',
      en: 'What\'s the difference between a pizza and a Jew? A pizza doesn\'t scream in the oven.',
      es: '¿Cuál es la diferencia entre una pizza y un judío? La pizza no grita en el horno.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: '14',
    content: {
      pt: 'Por que o menino deixou cair o sorvete? Porque foi atropelado por um autocarro.',
      en: 'Why did the boy drop his ice cream? Because he was hit by a bus.',
      es: '¿Por qué el niño dejó caer su helado? Porque lo atropelló un autobús.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: '15',
    content: {
      pt: 'Qual é a diferença entre Isaac Newton e o bebê que morreu no meu porão? Isaac Newton morreu virgem.',
      en: 'What\'s the difference between Isaac Newton and the baby that died in my basement? Isaac Newton died a virgin.',
      es: '¿Cuál es la diferencia entre Isaac Newton y el bebé que murió en mi sótano? Isaac Newton murió virgen.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: '47',
    content: {
      pt: 'Avó: A tua geração depende muito da tecnologia.\nNeto: Sem problema. (Desliguei o ventilador dela.)',
      en: 'Grandma: Your generation relies too much on technology.\nGrandchild: No problem. (I unplugged her life support.)',
      es: 'Abuela: Tu generación depende demasiado de la tecnología.\nNieto: No hay problema. (Le desenchufé el respirador.)',
    },
    category: 'censurado',
    mature: true,
  },
  // --- Sexualidade ---
  {
    id: 'a01',
    content: {
      pt: 'O que é que a cobra disse para o nudista?\nCobra: Como guardas todas essas coisas sem bolsos?',
      en: 'What did the snake say to the nudist?\nSnake: How do you keep all those things without pockets?',
      es: '¿Qué le dijo la serpiente al nudista?\nSerpiente: ¿Cómo guardas todas estas cosas sin bolsos?',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a02',
    content: {
      pt: 'O médico disse ao meu pai que ele devia ter mais sexo. Agora já não vem cá a casa.',
      en: 'The doctor told my dad he should have more sex. Now he doesn\'t come over anymore.',
      es: 'El médico le dijo a mi padre que debería tener más sexo. Ahora ya no viene por casa.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a03',
    content: {
      pt: 'O que é que um homem diz depois do sexo?\nHomem: Já posso ir para casa, amor?',
      en: 'What does a man say after sex?\nMan: Can I go home now, honey?',
      es: '¿Qué dice un hombre después del sexo?\nHombre: ¿Ya puedo irme a casa, cariño?',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a04',
    content: {
      pt: 'Por que é que os jogadores de xadrez são bons na cama? Porque conhecem todos os movimentos.',
      en: 'Why are chess players good in bed? Because they know all the right moves.',
      es: '¿Por qué los jugadores de ajedrez son buenos en la cama? Porque conocen todos los movimientos.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a05',
    content: {
      pt: 'Qual é a diferença entre um trampolim e um ginecologista? Um usa sapatos para saltar, o outro usa luvas.',
      en: 'What\'s the difference between a trampoline and a gynecologist? One uses shoes to jump, the other uses gloves.',
      es: '¿Cuál es la diferencia entre un trampolín y un ginecólogo? Uno usa zapatos para saltar, el otro usa guantes.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a06',
    content: {
      pt: 'O meu terapeuta diz que tenho problemas de intimidade. Ela não sabe nada — nunca a deixei entrar.',
      en: 'My therapist says I have intimacy issues. She doesn\'t know anything — I\'ve never let her in.',
      es: 'Mi terapeuta dice que tengo problemas de intimidad. No sabe nada: nunca la he dejado entrar.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a07',
    content: {
      pt: 'Qual é o cúmulo da confusão? Receber um convite de casamento de um ginecologista e não saber se é para a cerimónia ou para a consulta.',
      en: 'What is the height of confusion? Receiving a wedding invitation from a gynecologist and not knowing if it\'s for the ceremony or a checkup.',
      es: '¿Qué es el colmo de la confusión? Recibir una invitación de boda de un ginecólogo y no saber si es para la ceremonia o para la consulta.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a08',
    content: {
      pt: 'Porque é que os homens fantasiam em fazer sexo com três mulheres? Porque não conseguem lidar com mais de três reclamações ao mesmo tempo.',
      en: 'Why do men fantasy about having sex with three women? Because they can\'t handle more than three complaints at the same time.',
      es: '¿Por qué los hombres fantasean con tener sexo con tres mujeres? Porque no pueden manejar más de tres quejas al mismo tiempo.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a09',
    content: {
      pt: 'O que é que o vibrador disse para o óculo?\nVibrador: Pelo menos eu sei o que é vibrar!',
      en: 'What did the vibrator say to the glasses?\nVibrator: At least I know what it\'s like to vibrate!',
      es: '¿Qué le dijo el vibrador a las gafas?\nVibrador: ¡Al menos yo sé lo que es vibrar!',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a10',
    content: {
      pt: 'Qual a diferença entre um casamento e um preservativo? Um preservativo é mais seguro e mais fácil de tirar.',
      en: 'What\'s the difference between a marriage and a condom? A condom is safer and easier to take off.',
      es: '¿Cuál es la diferencia entre un matrimonio y un preservativo? Un preservativo es más seguro y más fácil de quitar.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a11',
    content: {
      pt: 'Eu: A minha namorada queria sentir-se especial no aniversário, por isso preparei um jantar à luz de velas.\nNamorada: A corrente foi abaixo, não foi?\nEu: Sim, mas o esforço foi genuíno.',
      en: 'Me: My girlfriend wanted to feel special on her birthday, so I made a candlelit dinner.\nGirlfriend: The power went out, didn\'t it?\nMe: Yes, but the effort was genuine.',
      es: 'Yo: Mi novia quería sentirse especial en su cumpleaños, así que preparé una cena a la luz de las velas.\nNovia: ¿Se ha ido la luz, verdad?\nYo: Sí, pero el esfuerzo fue genuino.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a12',
    content: {
      pt: 'O que é que um homem diz depois de fazer sexo pela primeira vez?\nHomem: Portanto é assim que se descodificam as instruções do IKEA.',
      en: 'What does a man say after having sex for the first time?\nMan: So that\'s how you decode IKEA instructions.',
      es: '¿Qué dice un hombre después de tener sexo por primera vez?\nHombre: Así que así es como se descifran las instrucciones de IKEA.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a13',
    content: {
      pt: 'Fui a uma sex shop pela primeira vez.\nEmpregado: Precisa de ajuda?\nCliente: Sim.\nEmpregado: Então não era para vir aqui.',
      en: 'I went to a sex shop for the first time.\nEmployee: Do you need help?\nCustomer: Yes.\nEmployee: Then you weren\'t supposed to come here.',
      es: 'Fui a una tienda erótica por primera vez.\nEmpleado: ¿Necesita ayuda?\nCliente: Sí.\nEmpleado: Entonces no deberías haber venido aquí.',
    },
    category: 'censurado',
    mature: true,
  },
  // --- Religião ---
  {
    id: 'r01',
    content: {
      pt: 'Um padre e um coelho entram num bar.\nCoelho: Acho que sou um typo!',
      en: 'A priest and a rabbit walk into a bar.\nRabbit: I think I\'m a typo!',
      es: 'Un cura y un conejo entran en un bar.\nConejo: ¡Creo que soy un error de imprenta (typo)!',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r02',
    content: {
      pt: 'Penitente: Padre, pequei.\nPadre: Diz, filho.\nPenitente: Tive pensamentos impuros.\nPadre: Quantas vezes?\nPenitente: Não sei, quantas vezes tem o Whatsapp de conversas não lidas?',
      en: 'Penitent: Father, I have sinned.\nPriest: Tell me, son.\nPenitent: I had impure thoughts.\nPriest: How many times?\nPenitent: I don\'t know, how many unread WhatsApp messages do you have?',
      es: 'Penitente: Padre, he pecado.\nSacerdote: Dime, hijo.\nPenitente: He tenido pensamientos impuros.\nSacerdote: ¿Cuántas veces?\nPenitente: No lo sé, ¿cuántos mensajes de WhatsApp sin leer tiene usted?',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r03',
    content: {
      pt: 'Deus criou o homem à sua imagem e semelhança. Os homens criaram Deus à deles. Alguém está a mentir — e não é Deus.',
      en: 'God created man in his image. Men created God in theirs. Someone is lying — and it\'s not God.',
      es: 'Dios creó al hombre a su imagen y semejanza. Los hombres crearon a Dios a la suya. Alguien miente, y no es Dios.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r04',
    content: {
      pt: 'Jesus transformou água em vinho. Eu tentei repetir o milagre no casamento da minha prima. Só consegui transformar dinheiro em ressaca.',
      en: 'Jesus turned water into wine. I tried to repeat the miracle at my cousin\'s wedding. I only managed to turn money into a hangover.',
      es: 'Jesús convirtió el agua en vino. Intenté repetir el milagro en la boda de mi prima. Solo conseguí convertir el dinero en resaca.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r05',
    content: {
      pt: 'O padre disse que Deus está em todo o lado. Então porque é que não está no trânsito da segunda-feira de manhã?',
      en: 'The priest said God is everywhere. Then why isn\'t He in Monday morning traffic?',
      es: 'El cura dijo que Dios está en todas partes. Entonces, ¿por qué no está en el tráfico de un lunes por la mañana?',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r06',
    content: {
      pt: 'Um ateu, um agnóstico e um crente entram num bar.\nAteu: Uma cerveja, por favor.\nAgnóstico: O que quer que seja.\nCrente: Água, para ver se acontece alguma coisa.',
      en: 'An atheist, an agnostic, and a believer walk into a bar.\nAtheist: A beer, please.\nAgnostic: Whatever.\nBeliever: Water, to see if anything happens.',
      es: 'Un ateo, un agnóstico y un creyente entran en un bar.\nAteo: Una cerveza, por favor.\nAgnóstico: Lo que sea.\nCreyente: Agua, para ver si pasa algo.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r07',
    content: {
      pt: 'Penitente: Padre, menti, roubei e traí.\nPadre: Qualquer coisa mais?\nPenitente: Não tenho tempo, padre, tenho uma reunião às 3.',
      en: 'Penitent: Father, I lied, stole, and cheated.\nPriest: Anything else?\nPenitent: I don\'t have time, Father, I have a meeting at 3.',
      es: 'Penitente: Padre, he mentido, robado y traicionado.\nSacerdote: ¿Algo más?\nPenitente: No tengo tiempo, padre, tengo una reunión a las 3.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r08',
    content: {
      pt: 'O Vaticano anunciou que vai aceitar pagamentos por MB Way. Agora os pecados perdoam-se com referência.',
      en: 'The Vatican announced it will accept mobile payments. Now sins are forgiven with a transaction ID.',
      es: 'El Vaticano ha anunciado que aceptará pagos móviles. Ahora los pecados se perdonan con un número de referencia.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r09',
    content: {
      pt: 'Deus: Que haja luz! (E houve luz.)\nDeus: Que haja internet! (E houve LENTIDÃO e anúncios.)',
      en: 'God: Let there be light! (And there was light.)\nGod: Let there be internet! (And there was LAG and ads.)',
      es: 'Dios: ¡Que se haga la luz! (Y se hizo la luz.)\nDios: ¡Que se haga el internet! (Y se hizo la LENTITUD y los anuncios.)',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r10',
    content: {
      pt: 'Um homem reza todos os dias para ganhar na lotaria. Após 40 anos, Deus aparece-lhe.\nDeus: Ajuda-me um bocado — compra bilhete!',
      en: 'A man prays every day to win the lottery. After 40 years, God appears to him.\nGod: Help me out here — buy a ticket!',
      es: 'Un hombre reza todos los días para ganar la lotería. Después de 40 años, Dios se le aparece.\nDios: ¡Ayúdame un poco, compra el billete!',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r11',
    content: {
      pt: 'Jesus chegou tarde à última ceia porque estava na fila do talho. Seria a primeira vez que pediu peixe e lhe disseram que já não havia.',
      en: 'Jesus arrived late to the Last Supper because he was in line at the butcher. It would be the first time he asked for fish and was told they were out.',
      es: 'Jesús llegó tarde a la Última Cena porque estaba en la cola de la carnicería. Sería la primera vez que pidió pescado y le dijeron que ya no quedaba.',
    },
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r12',
    content: {
      pt: 'Eu: Como lida com tantos pecados?\nPadre: É como gerir uma lista de espera num hospital — há sempre mais a chegar do que os que saem.',
      en: 'Me: How do you deal with so many sins?\nPriest: It\'s like managing a hospital waiting list — there are always more coming in than going out.',
      es: 'Yo: ¿Cómo lidia con tantos pecados?\nSacerdote: Es como gestionar una lista de espera en un hospital: siempre entran más de los que salen.',
    },
    category: 'censurado',
    mature: true,
  },
];

export const categories = [
  { id: 'todas', name: 'Todas', emoji: '😄', mature: false },
  { id: 'anedotas', name: 'Anedotas Clássicas', emoji: '😊', mature: false },
  { id: 'secas', name: 'Piadas Secas', emoji: '😐', mature: false },
  { id: 'negro', name: 'Humor Negro', emoji: '🖤', mature: false },
  { id: 'trocadilhos', name: 'Trocadilhos', emoji: '🤓', mature: false },
  { id: 'inteligentes', name: 'Inteligentes', emoji: '🧠', mature: false },
  { id: 'observacionais', name: 'Observacionais', emoji: '🤔', mature: false },
  { id: 'censurado', name: 'Zona +18', emoji: '🔞', mature: true },
];