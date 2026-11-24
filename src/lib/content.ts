export const WHATSAPP_NUMBER = '554388696363'

export const SECTIONS = ['comparativo', 'modulos', 'como-funciona', 'cases', 'depoimentos', 'duvidas', 'diagnostico'] as const
export type SectionKey = (typeof SECTIONS)[number]

export const NAV = [
  { href: '#comparativo', label: 'Comparativo' },
  { href: '#modulos', label: 'Módulos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#cases', label: 'Cases' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const

export const CTA_LABEL = 'Quero aproveitar a UBlack'
export const CTA_LABEL_DEFAULT = 'Quero meu diagnóstico gratuito'

export const UBLACK_ENDS_AT = '2026-11-30T23:59:59-03:00'

export type OfferIcon = 'globe' | 'cube' | 'wallet'

export const OFFERS: { id: string; icon: OfferIcon; tag: string; title: string; desc: string }[] = [
  { id: 'site-hospedagem', icon: 'globe', tag: 'Oferta 01', title: 'Site + 1 ano de hospedagem', desc: 'Contrate um site e ganhe um ano de hospedagem.' },
  { id: 'sistema-site', icon: 'cube', tag: 'Oferta 02', title: 'Sistema + site de brinde', desc: 'Feche um sistema e ganhe um site.' },
  { id: 'sem-entrada', icon: 'wallet', tag: 'Oferta 03', title: 'Projeto sem entrada', desc: 'Contrate seu projeto sem pagar entrada.' },
]

export const GUARANTEES = ['Reunião 100% online', 'Sem compromisso', 'Proposta em até 24h']

export const UBLACK_NOTE = 'Ofertas por tempo limitado, enquanto o contador estiver ativo.'

export const BENEFITS = [
  'Relatórios automáticos e confiáveis para decidir com segurança',
  'Fim do retrabalho e dos erros de digitação',
  'Sem mensalidade por usuário ou por módulo',
]

export const CLIENTS = [
  { name: 'Cacto Comunicação', src: '/clientes/cacto-comunicacao.webp', w: 450, h: 120 },
  { name: 'Clínica Ética', src: '/clientes/etica.webp', w: 279, h: 120 },
  { name: 'Nova AETA', src: '/clientes/nova-aeta.webp', w: 120, h: 120 },
  { name: 'Antônio Lima Advogados', src: '/clientes/antonio-lima.webp', w: 292, h: 120 },
  { name: 'P3 Agro', src: '/clientes/p3-agro.webp', w: 108, h: 120 },
  { name: 'Di Sorelle Semijoias', src: '/clientes/di-sorelle.webp', w: 193, h: 120 },
]

export type Mark = 'ok' | 'mid' | 'bad'
export interface Cell {
  mark: Mark
  text: string
}

export const COMPARE_COLS = ['Planilhas', 'ERP genérico', 'Sob medida Unect'] as const

export const COMPARE_ROWS: { criterion: string; cells: [Cell, Cell, Cell] }[] = [
  {
    criterion: 'Aderência ao processo',
    cells: [
      { mark: 'mid', text: 'Aceita tudo, mas sem regra' },
      { mark: 'bad', text: 'Sua empresa se adapta ao sistema' },
      { mark: 'ok', text: 'Desenhado a partir da rotina real da equipe' },
    ],
  },
  {
    criterion: 'Confiabilidade dos dados',
    cells: [
      { mark: 'bad', text: 'Fórmulas quebradas e versões duplicadas' },
      { mark: 'mid', text: 'Confiável, com muitos campos que ninguém usa' },
      { mark: 'ok', text: 'Banco de dados único, com validação em cada etapa' },
    ],
  },
  {
    criterion: 'Custo',
    cells: [
      { mark: 'mid', text: 'Parece grátis; o custo vem em horas perdidas' },
      { mark: 'bad', text: 'Mensalidade por usuário e por módulo, para sempre' },
      { mark: 'ok', text: 'Investimento de Empresa Júnior, sem cobrança por usuário' },
    ],
  },
  {
    criterion: 'Integração entre setores',
    cells: [
      { mark: 'bad', text: 'Cada setor com seu arquivo' },
      { mark: 'mid', text: 'Integra, se você pagar o módulo extra' },
      { mark: 'ok', text: 'Financeiro, estoque e OS ligados desde o início' },
    ],
  },
  {
    criterion: 'Curva de aprendizado',
    cells: [
      { mark: 'ok', text: 'Todos já conhecem' },
      { mark: 'bad', text: 'Meses de treinamento' },
      { mark: 'ok', text: 'Telas na linguagem da equipe, com treinamento incluso' },
    ],
  },
  {
    criterion: 'Evolução',
    cells: [
      { mark: 'bad', text: 'Depende de quem montou a planilha' },
      { mark: 'bad', text: 'Você espera o fornecedor priorizar' },
      { mark: 'ok', text: 'Cresce com a empresa, módulo a módulo' },
    ],
  },
]

export type ModuleIcon = 'finance' | 'orders' | 'stock' | 'dashboard' | 'automation' | 'users'

export const MODULES: {
  icon: ModuleIcon
  title: string
  desc: string
  includes: string[]
  result: string
}[] = [
  {
    icon: 'finance',
    title: 'Financeiro e DRE automático',
    desc: 'Contas a pagar e receber, fluxo de caixa e DRE gerados pelos lançamentos do dia a dia.',
    includes: ['Conciliação por centro de custo', 'DRE mensal sem fechamento manual', 'Alertas de vencimento e inadimplência'],
    result: 'Decisões com números reais',
  },
  {
    icon: 'orders',
    title: 'Ordens de serviço',
    desc: 'Responsável, prazo, materiais e status de cada OS, do pedido à entrega.',
    includes: ['Kanban por etapa e técnico', 'Histórico por cliente', 'Baixa automática no estoque'],
    result: 'Nenhuma OS esquecida',
  },
  {
    icon: 'stock',
    title: 'Estoque rastreado',
    desc: 'Entradas, saídas e transferências com registro de quem, quando e por quê.',
    includes: ['Alerta de estoque mínimo', 'Rastreio por lote e local', 'Inventário pelo celular'],
    result: 'Fim das compras duplicadas',
  },
  {
    icon: 'dashboard',
    title: 'Dashboard de indicadores',
    desc: 'Faturamento, margem, produtividade e gargalos num painel que se atualiza sozinho.',
    includes: ['KPIs definidos com a diretoria', 'Filtros por período, setor e responsável', 'Acesso pelo celular'],
    result: 'A saúde da empresa em 10 segundos',
  },
  {
    icon: 'automation',
    title: 'Automação de tarefas',
    desc: 'O que hoje alguém faz copiando e colando passa a acontecer sozinho, com registro.',
    includes: ['Documentos e relatórios automáticos', 'Notificações por e-mail', 'Importação das planilhas atuais'],
    result: 'Horas da equipe de volta',
  },
  {
    icon: 'users',
    title: 'Cadastros e acessos',
    desc: 'Clientes, fornecedores, produtos e usuários centralizados, com permissão por cargo.',
    includes: ['Perfis por função', 'Histórico de alterações', 'Backup automático em nuvem'],
    result: 'Cada um vê só o que precisa',
  },
]

export const STEPS = [
  { title: 'Diagnóstico gratuito', when: 'Semana 1', desc: 'Reunião online de 30 a 45 minutos para mapear processos, planilhas e gargalos.' },
  { title: 'Proposta técnica', when: 'Até 24h depois', desc: 'Escopo, cronograma e investimento por escrito, sem letras miúdas.' },
  { title: 'Desenvolvimento por módulos', when: 'Entregas contínuas', desc: 'Você testa cada parte enquanto ela é construída.' },
  { title: 'Implantação e treinamento', when: 'Go-live assistido', desc: 'Migração das planilhas, treinamento prático e suporte na virada.' },
]

export type CaseItem = {
  type: string
  name: string
  text: string
  logo?: string
  details?: string
  images?: string[]
}

const shots = (slug: string, names: string[]) => names.map((n) => `/cases/${slug}/${n}.webp`)

export const CASES: CaseItem[] = [
  { type: 'Aplicativo mobile', name: 'AETA', logo: 'Nova AETA', text: 'Carteirinha digital e controle de linhas e horários para estudantes.', images: shots('aeta', ['login', 'carteirinha']) },
  { type: 'Sistema de gestão', name: 'P3 Agro', logo: 'P3 Agro', text: 'Dados do campo, relatórios operacionais e rotinas administrativas num só lugar.', images: shots('p3-agro', ['login', 'dashboard', 'lista']) },
  { type: 'Sistema de gestão', name: 'Ficha Trans-Operatória', text: 'Fichas médicas e acompanhamento de dosagens e horários em tempo real.', images: shots('ficha-trans-operatoria', ['dashboard', 'cadastro-dados-clinicos', 'cadastro-dados-clinicos-2']) },
  {
    type: 'Sistema de gestão',
    name: 'Clínica Ética',
    logo: 'Clínica Ética',
    text: 'Agendamentos, controle de exames e relatórios do atendimento.',
    details: 'Plataforma completa de agendamentos diários, controle de exames e relatórios para gestão otimizada do fluxo de atendimento médico.',
    images: shots('clinica-etica', ['login-admin', 'lista-agendamentos', 'lista-procedimentos']),
  },
  { type: 'Site + blog', name: 'Antônio Lima Advogados', logo: 'Antônio Lima Advogados', text: 'Site com blog integrado e otimizado para busca, focado em servidores públicos.', images: shots('antonio-lima', ['home', 'artigo', 'editor']) },
  { type: 'Website', name: 'Cacto Comunicação EJ', logo: 'Cacto Comunicação', text: 'Site institucional responsivo para serviços de marketing.', images: shots('cacto', ['home', 'quem-somos']) },
]

export const TESTIMONIALS: { quote: string; name: string; project: string; avatar?: string }[] = [
  { quote: 'Sempre muito solícitos e com agilidade ao desenvolver o trabalho.', name: 'Di Sorelle Semijoias', project: 'Microssistema de gamificação', avatar: '/depoimentos/avatar-di-sorelle.webp' },
  { quote: 'Acompanhamento contínuo durante o projeto, modelo de gestão eficiente, cumprem o que é solicitado e entregam com qualidade.', name: 'Caio Henrique', project: 'Landing page' },
  { quote: 'Constatei trabalho em equipe. Dedicação. Compromisso.', name: 'Antonio Aparecido de Lima', project: 'Site + blog', avatar: '/depoimentos/avatar-antonio-lima.webp' },
]

export const FAQ = [
  { q: 'Como funcionam as ofertas da UBlack?', a: 'Você escolhe uma das três ofertas, fala com a gente pelo WhatsApp e recebe a proposta por escrito com todas as condições. As ofertas valem por tempo limitado, enquanto o contador da página estiver ativo.' },
  { q: 'Quanto custa um sistema sob medida?', a: 'Depende dos módulos e do tamanho da operação. Depois do diagnóstico você recebe, em até 24h, uma proposta por escrito com escopo, prazo e investimento. Não há mensalidade por usuário nem por módulo.' },
  { q: 'O diagnóstico é mesmo gratuito?', a: 'Sim. É uma reunião online de 30 a 45 minutos e não obriga a contratar. Você sai com um mapa dos gargalos mesmo que decida não seguir.' },
  { q: 'Vocês atendem fora de Cornélio Procópio?', a: 'Sim. Todo o atendimento é online, por videochamada e WhatsApp, para Cornélio Procópio e todo o Norte do Paraná.' },
  { q: 'Vou perder o que já está nas planilhas?', a: 'Não. A migração dos dados das planilhas faz parte da implantação.' },
  { q: 'Minha equipe vai conseguir usar?', a: 'As telas usam a linguagem da sua equipe e o treinamento prático está incluso na implantação.' },
  { q: 'Quanto tempo leva para ficar pronto?', a: 'O prazo depende dos módulos escolhidos e vem no cronograma da proposta. Como a entrega é por módulos, você começa a usar partes do sistema antes do fim do projeto.' },
  { q: 'O que é uma Empresa Júnior?', a: 'É uma empresa formada e gerida por estudantes universitários, no nosso caso da UTFPR Câmpus Cornélio Procópio, com orientação acadêmica. Por isso o investimento é menor que o de uma software house.' },
]

export const DELIVERABLES = [
  ['Mapa dos gargalos', 'onde o retrabalho e os erros manuais consomem horas da equipe'],
  ['Estimativa de horas recuperáveis', 'quanto tempo por mês a automação devolveria'],
  ['Arquitetura sugerida', 'por onde começar para ter retorno mais rápido'],
  ['Proposta em até 24h', 'escopo, prazo e investimento por escrito, no seu WhatsApp'],
] as const

export const CHALLENGES = ['Planilhas desorganizadas', 'Falta de DRE e relatórios', 'Retrabalho manual', 'ERP atual engessado', 'Outro']
export const SEGMENTS = ['Indústria', 'Distribuidora', 'Clínica/Saúde', 'Serviços', 'Comércio', 'Outro']
export const TEAM_SIZES = ['1 a 10', '11 a 50', '51 a 200', 'Mais de 200']

export const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/unectjr' },
  { label: 'Facebook', href: 'https://facebook.com/unectjr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/unectjr' },
]
