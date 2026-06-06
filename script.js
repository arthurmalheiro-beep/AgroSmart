/* ========================================
   AgroSmart — script.js
   Quiz interativo + efeitos de scroll
======================================== */

// ---- PERGUNTAS DO QUIZ ----
const perguntas = [
  {
    texto: "O que é rotação de culturas?",
    opcoes: [
      "Plantar a mesma cultura por muitos anos seguidos",
      "Alternar diferentes culturas na mesma área ao longo do tempo",
      "Usar máquinas para girar o solo",
      "Plantar apenas em solos arenosos"
    ],
    correta: 1,
    explicacao: "A rotação de culturas consiste em plantar diferentes espécies vegetais alternadamente em um mesmo terreno, o que mantém a saúde do solo e quebra ciclos de pragas."
  },
  {
    texto: "Qual das práticas a seguir ajuda a economizar água na agricultura?",
    opcoes: [
      "Irrigação por inundação",
      "Deixar o solo nu e exposto",
      "Irrigação por gotejamento",
      "Uso de agrotóxicos em excesso"
    ],
    correta: 2,
    explicacao: "A irrigação por gotejamento leva a água diretamente às raízes das plantas, reduzindo o desperdício em até 50% comparado à irrigação convencional."
  },
  {
    texto: "O que é compostagem?",
    opcoes: [
      "Processo de fabricar fertilizantes químicos",
      "Técnica de irrigação por aspersão",
      "Transformação de resíduos orgânicos em adubo natural",
      "Plantio de árvores em áreas degradadas"
    ],
    correta: 2,
    explicacao: "A compostagem é o processo de decomposição controlada de materiais orgânicos (cascas, folhas, restos de comida) que resulta em um adubo natural rico em nutrientes."
  },
  {
    texto: "Qual é o principal benefício da agrofloresta?",
    opcoes: [
      "Eliminar todos os animais da propriedade",
      "Aumentar o uso de agrotóxicos",
      "Integrar árvores, culturas e criação animal de forma sustentável",
      "Concentrar a produção em monoculturas"
    ],
    correta: 2,
    explicacao: "A agrofloresta imita a estrutura da floresta natural, combinando árvores, cultivos e animais, promovendo biodiversidade e fertilidade do solo de forma sustentável."
  },
  {
    texto: "Por que a biodiversidade é importante para a agricultura?",
    opcoes: [
      "Aumenta o custo da produção sem benefícios",
      "Garante a polinização natural e o controle de pragas",
      "Reduz a quantidade de plantas úteis",
      "Impede o crescimento de árvores frutíferas"
    ],
    correta: 1,
    explicacao: "A biodiversidade garante a presença de polinizadores como abelhas, predadores naturais de pragas e microrganismos benéficos, essenciais para uma agricultura saudável."
  },
  {
    texto: "O que significa agricultura orgânica?",
    opcoes: [
      "Agricultura que usa máquinas a diesel",
      "Cultivo sem o uso de agrotóxicos e fertilizantes químicos sintéticos",
      "Plantio realizado apenas em regiões frias",
      "Produção em grande escala com monocultura"
    ],
    correta: 1,
    explicacao: "A agricultura orgânica prioriza o uso de insumos naturais, sem agrotóxicos ou fertilizantes sintéticos, respeitando o meio ambiente e produzindo alimentos mais saudáveis."
  },
  {
    texto: "Qual prática ajuda a prevenir a erosão do solo?",
    opcoes: [
      "Deixar o terreno exposto sem vegetação",
      "Usar somente tratores pesados",
      "Plantar cobertura vegetal e fazer curvas de nível",
      "Irrigar com excesso de água"
    ],
    correta: 2,
    explicacao: "A cobertura vegetal protege o solo da chuva e do vento, enquanto as curvas de nível controlam o escoamento da água, prevenindo a erosão."
  },
  {
    texto: "O que é controle biológico de pragas?",
    opcoes: [
      "Uso intensivo de inseticidas químicos",
      "Queima de resíduos agrícolas",
      "Uso de seres vivos naturais para controlar pragas",
      "Construção de cercas para proteger lavouras"
    ],
    correta: 2,
    explicacao: "O controle biológico utiliza predadores naturais (como joaninhas e vespinhas parasitoides), fungos ou vírus específicos para controlar populações de pragas sem químicos."
  },
  {
    texto: "Como a captação de água da chuva beneficia a agricultura?",
    opcoes: [
      "Aumenta o consumo de água potável",
      "Reduz a disponibilidade de água para as cidades",
      "Armazena água para irrigar em períodos de seca, economizando recursos",
      "Não tem nenhum benefício para o campo"
    ],
    correta: 2,
    explicacao: "Sistemas de captação armazenam a água da chuva em cisternas ou açudes, garantindo reservas para irrigação durante períodos de estiagem e aliviando a pressão sobre rios e poços."
  },
  {
    texto: "Qual é o principal objetivo da agricultura sustentável?",
    opcoes: [
      "Produzir o máximo de alimentos possível sem se preocupar com o ambiente",
      "Usar a maior quantidade de agrotóxicos para garantir colheitas",
      "Equilibrar a produção de alimentos com a preservação ambiental e o bem-estar social",
      "Substituir toda a vegetação nativa por lavouras"
    ],
    correta: 2,
    explicacao: "A agricultura sustentável busca produzir alimentos de forma responsável, preservando os recursos naturais (solo, água, biodiversidade) e garantindo qualidade de vida para agricultores e consumidores."
  }
];

// ---- ESTADO DO QUIZ ----
let questaoAtual = 0;
let pontuacao = 0;
let respondeu = false;

// ---- INICIAR QUIZ ----
function startQuiz() {
  questaoAtual = 0;
  pontuacao = 0;
  respondeu = false;

  mostrarTela('quizQuestion');
  mostrarQuestao();
}

// ---- MOSTRAR TELA ----
function mostrarTela(idTela) {
  const telas = ['quizStart', 'quizQuestion', 'quizResult'];
  telas.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === idTela) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });
}

// ---- MOSTRAR QUESTÃO ----
function mostrarQuestao() {
  respondeu = false;
  const q = perguntas[questaoAtual];

  // Progresso
  const progressPct = ((questaoAtual) / perguntas.length) * 100;
  document.getElementById('progressBar').style.width = progressPct + '%';
  document.getElementById('progressLabel').textContent =
    `Pergunta ${questaoAtual + 1} de ${perguntas.length}`;

  // Texto da questão
  document.getElementById('questionText').textContent = q.texto;

  // Opções
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  q.opcoes.forEach((opcao, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opcao;
    btn.addEventListener('click', () => responder(i));
    grid.appendChild(btn);
  });

  // Ocultar feedback e botão próximo
  const feedback = document.getElementById('quizFeedback');
  feedback.classList.add('hidden');
  feedback.classList.remove('errada-fb');
  document.getElementById('btnNext').classList.add('hidden');
}

// ---- RESPONDER ----
function responder(indice) {
  if (respondeu) return;
  respondeu = true;

  const q = perguntas[questaoAtual];
  const botoes = document.querySelectorAll('.option-btn');
  const feedback = document.getElementById('quizFeedback');

  // Desabilitar todos os botões
  botoes.forEach(btn => btn.disabled = true);

  // Marcar certa/errada
  botoes[q.correta].classList.add('correta');

  if (indice === q.correta) {
    pontuacao++;
    feedback.textContent = '✅ Correto! ' + q.explicacao;
    feedback.classList.remove('errada-fb');
  } else {
    botoes[indice].classList.add('errada');
    feedback.textContent = '❌ Incorreto. ' + q.explicacao;
    feedback.classList.add('errada-fb');
  }

  feedback.classList.remove('hidden');
  document.getElementById('btnNext').classList.remove('hidden');
}

// ---- PRÓXIMA QUESTÃO ----
function nextQuestion() {
  questaoAtual++;

  if (questaoAtual >= perguntas.length) {
    mostrarResultado();
  } else {
    mostrarQuestao();
  }
}

// ---- RESULTADO ----
function mostrarResultado() {
  mostrarTela('quizResult');

  document.getElementById('resultScore').textContent = pontuacao;

  // Progresso final
  const pct = (pontuacao / perguntas.length) * 100;
  setTimeout(() => {
    document.getElementById('resultBar').style.width = pct + '%';
  }, 100);

  // Mensagem de acordo com a pontuação
  let emoji, titulo, msg;
  if (pontuacao <= 4) {
    emoji = '🌱';
    titulo = 'Ainda há muito para aprender!';
    msg = 'Não desanime! A jornada pelo conhecimento sustentável está apenas começando. Revise as seções do site e tente de novo!';
  } else if (pontuacao <= 7) {
    emoji = '🌿';
    titulo = 'Bom trabalho!';
    msg = 'Você já conhece bastante sobre agricultura sustentável! Com mais estudo, chegará ao topo. Continue explorando!';
  } else {
    emoji = '🏆';
    titulo = 'Você é um verdadeiro guardião da Terra!';
    msg = 'Incrível! Seu conhecimento sobre sustentabilidade agrícola é excelente. O futuro do planeta agradece!';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = titulo;
  document.getElementById('resultMsg').textContent = msg;
}

// ---- REINICIAR QUIZ ----
function restartQuiz() {
  mostrarTela('quizStart');
}

// ---- HEADER SCROLL ----
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ---- REVEAL AO ROLAR ----
function setupReveal() {
  const elementos = document.querySelectorAll('.reveal');
  if (!elementos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Atraso escalonado para cards na mesma seção
        const delay = (i % 6) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elementos.forEach(el => observer.observe(el));
}

// ---- MENU MOBILE ----
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
}

// ---- INICIALIZAÇÃO ----
document.addEventListener('DOMContentLoaded', () => {
  setupReveal();
});
