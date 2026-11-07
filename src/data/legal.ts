export type LegalSection = { title: string; paragraphs: string[] };

export const privacySections: LegalSection[] = [
  {
    title: "Quem apresenta este site",
    paragraphs: [
      "Este site institucional apresenta a Maranata Auto Center, em Porto Alegre, e seus canais de atendimento. Esta política descreve o funcionamento desta aplicação. Os dados cadastrais completos da empresa e a identificação formal do responsável pelo tratamento devem ser confirmados pela Maranata antes da publicação definitiva.",
    ],
  },
  {
    title: "Dados que você informa e sua finalidade",
    paragraphs: [
      "O formulário solicita nome, telefone com DDD e uma descrição da necessidade do veículo para preparar uma solicitação de atendimento. Evite informar documentos, dados bancários, informações sensíveis ou dados de outras pessoas.",
      "O preenchimento e a validação acontecem no navegador. O site não possui um banco de dados de contatos nem envia os campos a um endpoint próprio. O conteúdo permanece na memória da página enquanto ela estiver aberta.",
    ],
  },
  {
    title: "Como funciona o WhatsApp",
    paragraphs: [
      "Ao selecionar “Continuar no WhatsApp”, o site abre um endereço do WhatsApp que contém os campos preenchidos na mensagem preparada. Esses dados são transmitidos ao serviço ao abrir o link, antes da confirmação de envio. Você revisa a mensagem e confirma o envio no aplicativo.",
      "A conversa e o tratamento posterior das informações ficam sujeitos às práticas da Maranata e às políticas do WhatsApp/Meta. O atendimento pode utilizar os dados para responder ao pedido, esclarecer dúvidas e dar continuidade à solicitação.",
    ],
  },
  {
    title: "Mapa e avaliações do Google",
    paragraphs: [
      "O mapa incorporado fica desativado até você permitir seu carregamento. Depois da autorização, o navegador se conecta ao Google, que pode receber IP, informações do navegador e cookies associados ao serviço. A autorização pode ser revista em “Configurações de privacidade” no rodapé.",
      "Os depoimentos são transcritos de capturas de avaliações do Google fornecidas pela Maranata. Exibimos apenas nome público, classificação e comentário, com avatares genéricos. Não coletamos fotografias de perfil ou datas e não consultamos serviços externos para obter esses comentários. A seleção não é sincronizada em tempo real.",
    ],
  },
  {
    title: "Armazenamento e serviços técnicos",
    paragraphs: [
      "Não há ferramentas de publicidade ou medição de audiência instaladas nesta versão. O site guarda no armazenamento local do navegador apenas a escolha sobre o mapa, quando você a manifesta. Consulte a Política de Cookies para os detalhes.",
      "A entrega de páginas e arquivos envolve dados técnicos, como IP e informações da requisição. O provedor de hospedagem poderá manter registros técnicos conforme sua configuração. O provedor efetivo, os acessos a esses registros e os critérios de retenção devem ser confirmados antes da publicação.",
    ],
  },
  {
    title: "Retenção e proteção",
    paragraphs: [
      "Os campos do formulário não são persistidos pela aplicação. A escolha do mapa permanece neste navegador até ser alterada ou apagada. Os depoimentos fornecidos pela Maranata fazem parte do conteúdo institucional mantido no site.",
      "A retenção de mensagens recebidas no WhatsApp e de eventuais registros operacionais da empresa depende da finalidade do atendimento e das obrigações aplicáveis. A empresa deve confirmar e documentar esses critérios; esta página não estabelece um prazo ainda não aprovado.",
      "A aplicação não solicita acesso à câmera, ao microfone ou à geolocalização. A publicação deve utilizar HTTPS, controle de acesso à infraestrutura e práticas de manutenção compatíveis com o tratamento efetivo.",
    ],
  },
  {
    title: "Seus direitos e como entrar em contato",
    paragraphs: [
      "Conforme a LGPD e as condições aplicáveis ao tratamento, você pode solicitar confirmação e acesso aos dados, correção, informações sobre compartilhamento, portabilidade e anonimização, bloqueio ou eliminação quando cabíveis. Também pode revogar consentimento e apresentar oposição nas hipóteses legais.",
      "Para tratar de privacidade, utilize o canal oficial de atendimento indicado nesta página, identificando o assunto como “Privacidade”. A empresa deve confirmar a identificação do responsável e eventual canal específico para essas solicitações. Você também pode consultar as orientações e os canais de atendimento da ANPD.",
    ],
  },
  {
    title: "Atualizações",
    paragraphs: [
      "Este texto deve acompanhar alterações nas integrações e nas práticas de atendimento. A estrutura técnica e os textos preparados não substituem a revisão das informações institucionais e das bases legais pela empresa.",
    ],
  },
];

export const cookieSections: LegalSection[] = [
  {
    title: "Tecnologias utilizadas nesta versão",
    paragraphs: [
      "Esta aplicação não define cookies próprios de publicidade ou análise e não utiliza pixels de rastreamento, Google Analytics ou ferramentas semelhantes. Os campos do formulário não são gravados em Local Storage ou Session Storage.",
    ],
  },
  {
    title: "Sua preferência neste navegador",
    paragraphs: [
      "Após uma escolha explícita, utilizamos Local Storage com a chave maranata.privacy.v1. Ela contém somente a versão da preferência e se o mapa externo está autorizado. A finalidade é lembrar sua escolha; esse registro não identifica você, não mede visitas e não é enviado ao servidor como um cookie.",
      "A preferência permanece até ser alterada ou removida pelos controles do navegador. Se o armazenamento estiver bloqueado, a escolha vale apenas para a página aberta. Não persistimos autorização por padrão.",
    ],
  },
  {
    title: "Google Maps: recurso opcional",
    paragraphs: [
      "Antes da autorização, o iframe do Google Maps não é criado e o mapa não recebe requisições do navegador. Os links “Como chegar” e “Abrir no Google Maps” continuam disponíveis para abrir o serviço externo por sua iniciativa.",
      "Ao permitir o mapa, o Google pode utilizar cookies e outras tecnologias próprias e receber dados técnicos da conexão. Os cookies efetivamente utilizados variam conforme as configurações do navegador e da sua conta Google; este site não os controla nem presume uma lista fixa de nomes ou prazos.",
    ],
  },
  {
    title: "Como alterar ou retirar sua escolha",
    paragraphs: [
      "Na primeira visita sem escolha válida, o banner permite aceitar ou rejeitar o recurso opcional, ou personalizar a preferência. Para revisar depois, abra “Configurações de privacidade” no rodapé. Você pode permitir Google Maps e salvar, ou rejeitar opcionais. Rejeitar mantém a navegação, os serviços, o formulário e o contato funcionando.",
      "A retirada da autorização remove o mapa desta página e impede novos carregamentos incorporados enquanto a preferência estiver desativada. Ela não apaga cookies que o Google já tenha criado. Para removê-los, utilize os controles de cookies e dados de sites do navegador ou da sua conta Google.",
    ],
  },
  {
    title: "Avaliações, links externos e recursos futuros",
    paragraphs: [
      "Os depoimentos ficam cadastrados localmente no site e sua exibição não faz requisições ao Google. Ao abrir o perfil do estabelecimento no Google ou o WhatsApp, você acessa serviços externos com suas próprias práticas.",
      "Qualquer ferramenta futura de medição, publicidade ou rastreamento deve passar por nova avaliação técnica e jurídica. Esta configuração não autoriza automaticamente ferramentas que ainda não existem no site.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "Finalidade institucional",
    paragraphs: [
      "O site apresenta informações sobre a Maranata Auto Center e permite iniciar uma conversa pelos canais oficiais. As informações não substituem uma avaliação do veículo, um orçamento individual ou a confirmação de disponibilidade pela empresa.",
    ],
  },
  {
    title: "Contato e informações comerciais",
    paragraphs: [
      "O formulário prepara uma mensagem para o WhatsApp. Ele não realiza contratação, pagamento ou agendamento automático. Valores, condições, prazos, busca e entrega e demais conveniências devem ser confirmados diretamente com a Maranata para cada atendimento.",
    ],
  },
  {
    title: "Conteúdo e referências visuais",
    paragraphs: [
      "As marcas de fabricantes são utilizadas como referência de identificação e pertencem aos respectivos titulares. Sua presença não indica parceria, certificação ou autorização específica. As imagens identificadas como ilustrativas não representam as instalações ou serviços reais da oficina.",
    ],
  },
  {
    title: "Serviços e avaliações de terceiros",
    paragraphs: [
      "Google Maps e WhatsApp são serviços independentes. Seus termos e políticas se aplicam ao acesso e uso desses serviços. Ao utilizar conteúdo do Google Maps disponibilizado por esta aplicação, aplicam-se também os Termos de Serviço do Google Maps/Google Earth e a Política de Privacidade do Google, acessíveis abaixo.",
      "Os depoimentos exibidos são uma seleção de avaliações transcritas de capturas fornecidas pela Maranata, preservando nomes públicos, estrelas e comentários. Não representam todas as avaliações nem uma média calculada pelo site. Não há sincronização automática com o Google. O link da seção permite abrir o perfil do estabelecimento no Google.",
    ],
  },
  {
    title: "Privacidade e solicitações",
    paragraphs: [
      "A Política de Privacidade e a Política de Cookies explicam o funcionamento do formulário e dos recursos externos. Para dúvidas sobre informações publicadas ou solicitações relacionadas ao site, utilize o canal oficial de atendimento. Estes termos não acrescentam condições comerciais que ainda não tenham sido confirmadas pela empresa.",
    ],
  },
];
