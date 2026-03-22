export interface Joke {
  id: string;
  content: string;
  category: string;
  author?: string;
  mature?: boolean;
}

export const jokes: Joke[] = [
  // Anedotas Clássicas
  {
    id: '1',
    content: 'Por que o livro de matemática se suicidou? Porque tinha muitos problemas.',
    category: 'anedotas',
  },
  {
    id: '2',
    content: 'O que o pato disse para a pata? Vem Quá!',
    category: 'anedotas',
  },
  {
    id: '3',
    content: 'Qual é o animal que anda com as patas? Todos!',
    category: 'anedotas',
  },
  {
    id: '4',
    content: 'Por que a galinha atravessou a rua? Para chegar ao outro lado!',
    category: 'anedotas',
  },
  {
    id: '5',
    content: 'O que é um pontinho amarelo em cima do prédio? Um Fandangos suicida.',
    category: 'anedotas',
  },
  {
    id: '31',
    content: 'O que é um pontinho verde no canto da sala? Uma ervilha de castigo.',
    category: 'anedotas',
  },
  {
    id: '32',
    content: 'O que é um pontinho vermelho no meio do mar? Um jacaREI.',
    category: 'anedotas',
  },
  {
    id: '33',
    content: 'Por que o computador foi ao médico? Porque tinha um vírus!',
    category: 'anedotas',
  },
  {
    id: '34',
    content: 'O que a impressora disse para a outra? Essa folha é sua ou é impressão minha?',
    category: 'anedotas',
  },
  {
    id: '35',
    content: 'Qual é o cúmulo da velocidade? Entrar numa padaria e comprar pão de ontem!',
    category: 'anedotas',
  },
  {
    id: '36',
    content: 'O que o zero disse para o oito? Que cinto maneiro!',
    category: 'anedotas',
  },
  {
    id: '37',
    content: 'Por que o astronauta não conseguia fazer ligações? Porque o espaço não tinha sinal!',
    category: 'anedotas',
  },
  {
    id: '38',
    content: 'O que é um pontinho azul no céu? Um Urublue.',
    category: 'anedotas',
  },

  // Piadas Secas
  {
    id: '6',
    content: 'Sabia que os disléxicos têm mais dificuldade para fazer piadas sobre anacronismos?',
    category: 'secas',
  },
  {
    id: '7',
    content: 'Dois peixes num tanque. Um diz para o outro: "Sabes conduzir isto?"',
    category: 'secas',
  },
  {
    id: '8',
    content: 'Ontem roubaram todas as lâmpadas do meu prédio. Fiquei totalmente no escuro.',
    category: 'secas',
  },
  {
    id: '9',
    content: 'Comprei sapatos a um traficante. Não sei com o que ele os cortou, mas tenho andado a viajar o dia todo.',
    category: 'secas',
  },
  {
    id: '10',
    content: 'Tenho uma piada sobre procrastinação, mas vou contar depois.',
    category: 'secas',
  },
  {
    id: '39',
    content: 'Morri. Mas melhorei.',
    category: 'secas',
  },
  {
    id: '40',
    content: 'Tenho uma piada sobre construção. Ainda estou a trabalhar nela.',
    category: 'secas',
  },
  {
    id: '41',
    content: 'O meu cão não tem nariz. Como é que ele cheira? Mal.',
    category: 'secas',
  },
  {
    id: '42',
    content: 'Fui ao zoo ontem. Só tinha um cão. Era um shih tzu.',
    category: 'secas',
  },
  {
    id: '43',
    content: 'Tentei apanhar algum nevoeiro. Falhei, mas vou tentar novamente com névoa.',
    category: 'secas',
  },
  {
    id: '44',
    content: 'Estava maravilhado por a minha fritadeira não funcionar. Depois percebi que não estava ligada.',
    category: 'secas',
  },
  {
    id: '45',
    content: 'A minha esposa disse-me para parar de imitar um flamingo. Tive de pôr o pé no chão.',
    category: 'secas',
  },
  {
    id: '46',
    content: 'Disse ao médico que parti a perna em dois sítios. Ele disse-me para parar de ir a esses sítios.',
    category: 'secas',
  },

  // Humor Negro
  {
    id: '12',
    content: 'Qual é a vantagem de ser órfão? Todos os filmes são adequados para toda a família.',
    category: 'negro',
  },
  {
    id: '13',
    content: 'Médico: "Tenho boas e más notícias." Paciente: "Diga as más primeiro." Médico: "Você tem 24 horas de vida." Paciente: "E as boas?" Médico: "Devia ter-lhe dito isso ontem."',
    category: 'negro',
  },
  {
    id: '48',
    content: 'O que é que obtens quando cruzas uma piada com uma pergunta retórica?',
    category: 'negro',
  },
  {
    id: '49',
    content: 'Qual é a melhor coisa sobre a Suíça? Não sei, mas a bandeira é uma grande vantagem.',
    category: 'negro',
  },
  {
    id: '50',
    content: 'Sempre disse ao meu filho para perseguir os seus sonhos. Ele quer ser zombi.',
    category: 'negro',
  },
  {
    id: '51',
    content: 'O que tem quatro rodas e voa? Um camião do lixo. E o meu avô.',
    category: 'negro',
  },
  {
    id: '52',
    content: 'Médico: "Tem consciência de que está a sofrer de paranoia?" Paciente: "Eu sabia que toda a gente estava a dizer isso!"',
    category: 'negro',
  },
  {
    id: '53',
    content: 'A minha mulher e eu ficámos felizes durante 20 anos. Depois conhecemo-nos.',
    category: 'negro',
  },
  {
    id: 'n01',
    content: 'Fui ao funeral do meu melhor amigo. Mas ele não apareceu. Que falta de respeito.',
    category: 'negro',
  },
  {
    id: 'n02',
    content: 'Comprei um livro chamado "Como Viver até aos 100 Anos". Pena ter morrido antes de o terminar.',
    category: 'negro',
  },
  {
    id: 'n03',
    content: 'Liguei para a linha de apoio emocional. Puseram-me em espera. Comecei a sentir-me melhor — pelo menos tinha companhia.',
    category: 'negro',
  },
  {
    id: 'n04',
    content: 'O meu avô dizia sempre: "É fácil parar de fumar." Ele provou-o 300 vezes.',
    category: 'negro',
  },

  // Trocadilhos
  {
    id: '16',
    content: 'O que o tomate foi fazer no banco? Tirar extrato.',
    category: 'trocadilhos',
  },
  {
    id: '17',
    content: 'Por que o elefante não pega fogo? Porque ele já é cinza.',
    category: 'trocadilhos',
  },
  {
    id: '18',
    content: 'O que o advogado do frango foi fazer na delegacia? Pedir a abaeas corpus.',
    category: 'trocadilhos',
  },
  {
    id: '19',
    content: 'Qual é o doce preferido do átomo? Pão de Nêutron.',
    category: 'trocadilhos',
  },
  {
    id: '20',
    content: 'O que a esfera disse para o cubo? Deixa de ser quadrado!',
    category: 'trocadilhos',
  },
  {
    id: '54',
    content: 'Por que o café foi à polícia? Porque foi muído!',
    category: 'trocadilhos',
  },
  {
    id: '55',
    content: 'O que o astronauta comeu ao pequeno-almoço? Cereais com leite Via Láctea.',
    category: 'trocadilhos',
  },
  {
    id: '56',
    content: 'Qual é o time de futebol mais perigoso? O Santa Cruz, porque tem 3 ponteiros!',
    category: 'trocadilhos',
  },
  {
    id: '57',
    content: 'Por que o peixe não gosta de jogar futebol? Porque tem medo da rede!',
    category: 'trocadilhos',
  },
  {
    id: '58',
    content: 'O que acontece quando um anão acena? Ele diz microondas!',
    category: 'trocadilhos',
  },
  {
    id: '59',
    content: 'Por que a bicicleta não se sustenta sozinha? Porque está em duas rodas!',
    category: 'trocadilhos',
  },
  {
    id: '60',
    content: 'Qual é o cúmulo do otimismo? Formiga levando chiclete para casa.',
    category: 'trocadilhos',
  },
  {
    id: '61',
    content: 'O que o ar condicionado disse quando ganhou um prêmio? Cool!',
    category: 'trocadilhos',
  },

  // Inteligentes
  {
    id: '21',
    content: 'Três tipos de pessoas no mundo: as que sabem contar e as que não sabem.',
    category: 'inteligentes',
  },
  {
    id: '22',
    content: 'A inteligência artificial nunca será páreo para a estupidez natural.',
    category: 'inteligentes',
  },
  {
    id: '23',
    content: 'Heisenberg está a conduzir na autoestrada e é parado pela polícia. O polícia pergunta: "Sabe a que velocidade ia?" Heisenberg responde: "Não, mas sei exatamente onde estou!"',
    category: 'inteligentes',
  },
  {
    id: '24',
    content: 'Perguntaram a um programador: "Queres café ou chá?" Ele respondeu: "Sim."',
    category: 'inteligentes',
  },
  {
    id: '25',
    content: 'Dois átomos estão a caminhar. Um diz: "Acho que perdi um eletrão." O outro pergunta: "Tens a certeza?" O primeiro responde: "Sim, estou positivo!"',
    category: 'inteligentes',
  },
  {
    id: '62',
    content: 'Um SQL query entra num bar, aproxima-se de duas tabelas e pergunta: "Posso juntar-me a vocês?"',
    category: 'inteligentes',
  },
  {
    id: '63',
    content: 'Existem 10 tipos de pessoas no mundo: as que entendem binário e as que não entendem.',
    category: 'inteligentes',
  },
  {
    id: '64',
    content: 'Um fotão entra num hotel. O rececionista pergunta: "Precisa de ajuda com a bagagem?" O fotão responde: "Não, estou a viajar leve."',
    category: 'inteligentes',
  },
  {
    id: '65',
    content: 'Schrödinger entra num bar. Ou não.',
    category: 'inteligentes',
  },
  {
    id: '66',
    content: 'Pessimista: "O copo está meio vazio." Otimista: "O copo está meio cheio." Engenheiro: "O copo é o dobro do tamanho necessário."',
    category: 'inteligentes',
  },
  {
    id: '67',
    content: 'Por que os programadores preferem o modo escuro? Porque a luz atrai bugs!',
    category: 'inteligentes',
  },
  {
    id: '68',
    content: 'Um matemático, um físico e um engenheiro encontram um incêndio. O matemático calcula como apagá-lo. O físico mede o calor e a velocidade. O engenheiro pega na mangueira e apaga.',
    category: 'inteligentes',
  },
  {
    id: '69',
    content: 'Por que 6 tinha medo de 7? Porque 7 8 9. Mas por que 7 comeu 9? Porque precisas comer 3² refeições por dia!',
    category: 'inteligentes',
  },

  // Observacionais
  {
    id: '26',
    content: 'Se conseguires ler isto, obrigado por não me bateres com o carro enquanto escrevo este SMS.',
    category: 'observacionais',
  },
  {
    id: '27',
    content: 'Por que é que nunca vemos anúncios de bolas de cristal? Porque os vendedores já deviam saber que não ia funcionar.',
    category: 'observacionais',
  },
  {
    id: '28',
    content: 'Fiz uma lista de coisas que não sou bom a fazer. Até agora tenho 1. Fazer listas 2. Contar',
    category: 'observacionais',
  },
  {
    id: '29',
    content: 'O meu terapeuta disse que tenho um belo complexo de superioridade. O que é que ele sabe? Não é tão inteligente quanto eu.',
    category: 'observacionais',
  },
  {
    id: '30',
    content: 'Dizer "não faças dramas" quando alguém está chateado é como dizer "não fiques doente" quando alguém está com gripe.',
    category: 'observacionais',
  },
  {
    id: '70',
    content: 'Tenho um amigo que é vegano e faz crossfit. Não sei qual mencionar primeiro quando se apresenta.',
    category: 'observacionais',
  },
  {
    id: '71',
    content: 'A melhor parte sobre o trabalho de casa é que podes fazê-lo na cama. A pior parte é que depois não consegues dormir porque estás com ansiedade por não o teres feito.',
    category: 'observacionais',
  },
  {
    id: '72',
    content: 'Adoro quando as pessoas dizem "fiz isto com o meu tempo livre". Como se houvesse outro tipo de tempo para fazer coisas.',
    category: 'observacionais',
  },
  {
    id: '73',
    content: 'A diferença entre "estou acordado" às 6h da manhã e às 6h da noite é astronómica.',
    category: 'observacionais',
  },
  {
    id: '74',
    content: 'Por que é que quando vais ao médico tens de esperar uma hora, mas quando te atrasas 5 minutos perdes a consulta?',
    category: 'observacionais',
  },
  {
    id: '75',
    content: 'É estranho pensar que as tuas mãos nunca tocaram uma à outra, apenas os átomos delas se repelem.',
    category: 'observacionais',
  },
  {
    id: '76',
    content: 'Se os restaurantes de fast food estão sempre a contratar, por que a fila é sempre tão longa?',
    category: 'observacionais',
  },
  {
    id: '77',
    content: 'Dizem para viver cada dia como se fosse o último. Então hoje vou passar o dia deitado a chorar e a ligar aos meus amigos e família.',
    category: 'observacionais',
  },

  // ============ CONTEÚDO +18 — ZONA CENSURADA (Sexualidade + Religião + Humor Negro Pesado) ============
  // --- Humor Negro Pesado (movido de negro) ---
  {
    id: '11',
    content: 'Qual a diferença entre uma pizza e um judeu? A pizza não grita no forno.',
    category: 'censurado',
    mature: true,
  },
  {
    id: '14',
    content: 'Por que o menino deixou cair o sorvete? Porque foi atropelado por um autocarro.',
    category: 'censurado',
    mature: true,
  },
  {
    id: '15',
    content: 'Qual é a diferença entre Isaac Newton e o bebê que morreu no meu porão? Isaac Newton morreu virgem.',
    category: 'censurado',
    mature: true,
  },
  {
    id: '47',
    content: 'A minha avó disse: "A tua geração depende muito da tecnologia." Eu respondi: "Sem problema" e desliguei o ventilador dela.',
    category: 'censurado',
    mature: true,
  },
  // --- Sexualidade ---
  {
    id: 'a01',
    content: 'O que é que a cobra disse para o nudista? "Como guardas todas essas coisas sem bolsos?"',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a02',
    content: 'O médico disse ao meu pai que ele devia ter mais sexo. Agora já não vem cá a casa.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a03',
    content: 'O que é que um homem diz depois do sexo? "Já posso ir para casa, amor?"',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a04',
    content: 'Por que é que os jogadores de xadrez são bons na cama? Porque conhecem todos os movimentos.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a05',
    content: 'Qual é a diferença entre um trampolim e um ginecologista? Um usa sapatos para saltar, o outro usa luvas.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a06',
    content: 'O meu terapeuta diz que tenho problemas de intimidade. Ela não sabe nada — nunca a deixei entrar.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a07',
    content: 'Qual é o cúmulo da confusão? Receber um convite de casamento de um ginecologista e não saber se é para a cerimónia ou para a consulta.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a08',
    content: 'Porque é que os homens fantasiam em fazer sexo com três mulheres? Porque não conseguem lidar com mais de três reclamações ao mesmo tempo.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a09',
    content: 'O que é que o vibrador disse para o óculo? "Pelo menos eu sei o que é vibrar!"',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a10',
    content: 'Qual a diferença entre um casamento e um preservativo? Um preservativo é mais seguro e mais fácil de tirar.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a11',
    content: 'A minha namorada disse que queria sentir-se especial no aniversário. Fiz um jantar à luz de velas. Ela disse: "A corrente foi abaixo, não foi?" Sim, mas o esforço foi genuíno.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a12',
    content: 'O que é que um homem diz depois de fazer sexo pela primeira vez? "Portanto é assim que se descodificam as instruções do IKEA."',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'a13',
    content: 'Fui a uma sex shop pela primeira vez. O empregado perguntou se precisava de ajuda. Disse que sim. Ele respondeu: "Então não era para vir aqui."',
    category: 'censurado',
    mature: true,
  },
  // --- Religião ---
  {
    id: 'r01',
    content: 'Um padre e um coelho entram num bar. O coelho diz: "Acho que sou um typo!"',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r02',
    content: 'Na confissão: "Padre, pequei." "Diz, filho." "Tive pensamentos impuros." "Quantas vezes?" "Não sei, quantas vezes tem o Whatsapp de conversas não lidas?"',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r03',
    content: 'Deus criou o homem à sua imagem e semelhança. Os homens criaram Deus à deles. Alguém está a mentir — e não é Deus.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r04',
    content: 'Jesus transformou água em vinho. Eu tentei repetir o milagre no casamento da minha prima. Só consegui transformar dinheiro em ressaca.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r05',
    content: 'O padre disse que Deus está em todo o lado. Então porque é que não está no trânsito da segunda-feira de manhã?',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r06',
    content: 'Um ateu, um agnóstico e um crente entram num bar. O ateu pede uma cerveja, o agnóstico pede "o que quer que seja", e o crente pede água para ver se acontece alguma coisa.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r07',
    content: 'Na confissão: "Padre, menti, roubei e traí." "Qualquer coisa mais?" "Não tenho tempo, padre, tenho uma reunião às 3."',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r08',
    content: 'O Vaticano anunciou que vai aceitar pagamentos por MB Way. Agora os pecados perdoam-se com referência.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r09',
    content: 'Deus disse "que haja luz" e houve luz. Deus disse "que haja internet" e houve LENTIDÃO e anúncios.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r10',
    content: 'Um homem reza todos os dias para ganhar na lotaria. Depois de 40 anos, Deus aparece-lhe e diz: "Ajuda-me um bocado — compra bilhete!"',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r11',
    content: 'Jesus chegou tarde à última ceia porque estava na fila do talho. Seria a primeira vez que pediu peixe e lhe disseram que já não havia.',
    category: 'censurado',
    mature: true,
  },
  {
    id: 'r12',
    content: 'Perguntei ao padre como lidava com tantos pecados. Ele disse: "É como gerir uma lista de espera num hospital — há sempre mais a chegar do que os que saem."',
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