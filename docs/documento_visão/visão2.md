# [cite_start]Hopper - UnBilidade [cite: 1]
## [cite_start]VISÃO DO PRODUTO E DO PROJETO [cite: 2]
[cite_start]**Versão 0.9.5** [cite: 2]

### [cite_start]Integrantes do Grupo [cite: 3]

| Matrícula | Nome | Função (responsabilidade) | Pontos de participação na elaboração |
|---|---|---|---|
| 241025720 | Vitor Eduardo Araújo | Líder, Documentação e Scrum Master | [cite_start]10 [cite: 4] |
| 242028815 | Breno Elias de Carvalho Correia | Arquitetura e DevOps | [cite_start]10 [cite: 4] |
| 241038791 | Flavia de Melo Rebelato | Product Owner | [cite_start]10 [cite: 4] |
| 241012098 | Brenda Maria Cavalcante Chaves | Desenvolvedor Front-End | [cite_start]10 [cite: 4] |
| 251016045 | Thiago da Silva Borges | Desenvolvedor Back-End | [cite_start]10 [cite: 4] |
| 241025784 | João Paulo da Silva Pereira | Documentação e Requisitos | [cite_start]10 [cite: 4] |
| 241025819 | Pablo Antonio Martins de Sousa | Arquitetura e DevOps | [cite_start]10 [cite: 4] |
| 241041204 | PEDRO VICTOR TEIXEIRA SILVA | Desenvolvedor Back-End | [cite_start]10 [cite: 4] |
| 231011023 | Alexandre Vilar Valadares Fonseca | Desenvolvedor Front-End | [cite_start]10 [cite: 4] |
| 222006866 | João Vitor Tavares de Sá Lima | Arquitetura e DevOps | [cite_start]10 [cite: 4] |

### [cite_start]Histórico de Revisões [cite: 6]

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 23/04/26 | 0.1 | Primeira análise do documento e aquisição dos primeiros requisistos | [cite_start]Vitor Araújo, Flávia Rebelato e João Paulo [cite: 7] |
| 25/04/26 | 0.3 | Objetivos do produto, solução proposta e definição de tecnologias a serem ultilizadas | [cite_start]Araújo Vitor [cite: 7] |
| 30/04/26 | 0.6 | Backlog, criação dos perfis, planejamento, métricas, roteiro dos testes de software e referências | [cite_start]Vitor Araújo, João Paulo e Flávia Rebelato [cite: 7] |
| 04/05/26 | 0.9 | Inclusão de novo membro e finalização do documento2 | [cite_start]Vitor Araújo, João Paulo e Flávia Rebelato [cite: 7] |
| 05/05/26 | 0.9.5 | Métrica e medições, Teste de Software e Referências | [cite_start]João Paulo, Breno Elias [cite: 7] |

---

## [cite_start]1. Visão Geral do Produto [cite: 12]

### [cite_start]1.1 Contexto de Negócio [cite: 13]
[cite_start]O cenário operacional das clínicas de fisioterapia caracteriza-se por um fluxo constante de pacientes que demandam tratamentos recorrentes e sessões de longo prazo. [cite: 14] [cite_start]Essa natureza do serviço exige uma gestão de agenda extremamente precisa para garantir a continuidade terapêutica. [cite: 15] [cite_start]Entretanto, o modelo de atendimento atual é marcado pela descentralização, onde a marcação de consultas ocorre majoritariamente de forma manual através de redes sociais e aplicativos de mensagens instantâneas. [cite: 16] [cite_start]Esse ambiente de gestão, desprovido de ferramentas dedicadas, resulta em processos dependentes da memória humana ou de anotações físicas e digitais não integradas, dificultando o controle gerencial sobre a ocupação dos profissionais e a real disponibilidade da clínica. [cite: 17]

### [cite_start]1.2 Problema e Análise de Causa (Ishikawa) [cite: 18]
[cite_start]A carência de automação e de um controle centralizado acarreta gargalos operacionais e prejuízos financeiros diretos. [cite: 19] [cite_start]A falta de critérios sistêmicos para a gerência de urgências e a inexistência de notificações automáticas impedem que a clínica responda com agilidade às flutuações da demanda. [cite: 20] [cite_start]Esse cenário torna o fluxo de trabalho suscetível a erros humanos, comprometendo a segurança dos dados e a qualidade do serviço. [cite: 21]

[cite_start]*A Figura 1 do Documento (Ishikawa) demonstra os principais problemas identificados agrupados em MÉTODOS, MÃO DE OBRA, TECNOLOGIA e MEDIÇÃO.* [cite: 22, 23, 30, 31, 38]

[cite_start]O problema central não é apenas a falta de uma agenda, mas a fragmentação das causas. [cite: 40] [cite_start]A utilização de métodos informais (Métodos) aliada à falta de ferramentas específicas (Tecnologia) gera um ciclo de falhas humanas (Pessoas) e falta de dados para decisão (Medição), resultando inevitavelmente no overbooking e na evasão de horários. [cite: 41, 43]

### [cite_start]1.3 Solução Proposta e Justificativa [cite: 44]
[cite_start]A solução proposta consiste no desenvolvimento de uma plataforma web de gestão e automação de agendamento, que aborde justamente a solução dos problemas descritos. [cite: 45] [cite_start]O software atuará como um sistema centralizado de controle operacional, eliminando a dependência de processos manuais e informais, auxiliando a equipe operacional da clínica em seu dia a dia. [cite: 46] [cite_start]Ao garantir a segurança e a conformidade dos dados clínicos em um ambiente dedicado, o software visa converter processos manuais fragmentados em um fluxo de trabalho seguro e eficiente, proporcionando sustentabilidade financeira à clínica e uma experiência de atendimento superior tanto para os profissionais quanto para os pacientes. [cite: 47]

### [cite_start]1.4 Declaração de Posição do Produto [cite: 48]
[cite_start]O produto que estamos propondo, é um sistema web especializado em gestão ativa de agenda. [cite: 49] [cite_start]Diferente de uma agenda digital passiva, o software atua como um motor de busca de eficiência, integrando a interface do paciente com a visão administrativa do gestor para garantir que a capacidade operacional da clínica seja sempre maximizada. [cite: 50] [cite_start]Enquanto concorrentes exigem que a secretária identifique um horário vago e entre em contato manual com o próximo paciente, o Hopper automatiza esse "casamento" entre a vaga disponível e a lista de espera, reduzindo drasticamente o tempo de resposta e o erro humano. [cite: 51]

[cite_start]**Usuários-alvo e Clientes:** [cite: 52]
* Gestores e Fisioterapeutas que buscam previsibilidade financeira e organização. [cite_start]O produto é importante para eles pois reduz o prejuízo causado por janelas vazias e libera a equipe de tarefas repetitivas de chat. [cite: 53]
* Para os pacientes, que buscam autonomia e clareza. [cite_start]São pessoas que preferem resolver o agendamento de forma assíncrona, sem a necessidade de ligações ou espera em filas de WhatsApp, valorizando a segurança de seus dados. [cite: 54]

[cite_start]**Por que os clientes deveriam utilizar este produto?** A principal motivação é a proteção da lucratividade. [cite: 55] Uma clínica de fisioterapia vende "tempo de atendimento". [cite_start]Cada hora vaga é um produto que perece. [cite: 56] [cite_start]O nosso sistema é desenhado para garantir que, caso ocorra um cancelamento, o sistema trabalhe para preencher aquela vaga em minutos através de algoritmos de notificação inteligente, algo que as ferramentas genéricas de redes sociais ou agendas estáticas não oferecem. [cite: 57]

| Tópico | Descrição |
|---|---|
| **Para:** | [cite_start]Gestores de clínicas de fisioterapia e seus pacientes [cite: 59] |
| **Necessidade:** | Organizar, automatizar, centralizar, integrar e facilitar OS agendamentos de uma clínica de fisioterapia em um sistema único. [cite_start]Sofrem com ociosidade da agenda, cancelamentos e ineficiência no atendimento via redes sociais. [cite: 59] |
| **O (nome do produto):** | [cite_start]UnBilidade [cite: 59] |
| **Que:** | [cite_start]Automatiza o ciclo de agendamentos e a ocupação imediata de lacunas deixadas por desistências. [cite: 59] |
| **Ao contrário:** | [cite_start]Softwares ERP genéricos ou robustos demasiadamente, como o ZenFisio, que focam numa gestão administrativa. [cite: 59] |
| **Nosso produto:** | [cite_start]Prioriza a recuperação de receita e experiência de agendamento pelo próprio usuário. [cite: 59] |

### [cite_start]1.5 Objetivos do Produto [cite: 60]
[cite_start]O projeto tem o objetivo de aumentar a eficiência nos agendamentos de clínicas de fisioterapia por meio de uma plataforma web limpa e objetiva, com esquema de cores acessíveis para todas as idades, com interfaces tanto para paciente, tanto para secretário/médico, promovendo um menor número de desmarcações nas consultas por mudanças de horários e centralizando a informação em um sistema único. [cite: 61]

### [cite_start]1.6 Tecnologias a serem utilizadas [cite: 62]
* [cite_start]**Front-end:** React.js com o framework Next.js (TypeScript) [cite: 63, 64]
* [cite_start]**Back-end:** Next.js API Routes (TypeScript), Validação com lib Zod, Vercel Cron, Resend (e-mails) [cite: 65, 66, 67, 68, 69]
* [cite_start]**Testes:** Vitest + Supertest [cite: 70, 71]
* [cite_start]**Banco de dados:** Supabase (PostgreSQL gerenciado) [cite: 72, 73]
* [cite_start]**Hospedagem e Deploy:** Vercel [cite: 75, 76]
* [cite_start]**Ambiente de desenvolvimento:** VSCode (Visual Studio Code) [cite: 77, 78]
* [cite_start]**Ferramentas adicionais:** GitHub (versionamento), GitHub Pages (documentação), Jira (backlog), WhatsApp, Microsoft Teams, Discord. [cite: 79, 81, 82, 83]

---

## [cite_start]2. Visão Geral do Projeto [cite: 85]

### [cite_start]2.1 Ciclo de Vida do Projeto de Desenvolvimento de Software [cite: 86]
[cite_start]A figura abaixo apresenta o ciclo de vida usando o framework Scrum adotado no desenvolvimento do Unbilidade. [cite: 87] [cite_start]Para o desenvolvimento do projeto UnBilidade, será adotada a metodologia ágil adaptada, utilizando uma abordagem híbrida que combina os frameworks Scrum e XP (Extreme Programming). [cite: 103] [cite_start]A adoção desse framework se justifica pela natureza e proposição do projeto que necessita de entrega contínua de valor ao cliente final. [cite: 104]

[cite_start]A aplicação do Scrum possibilita a organização do trabalho em sprints curtos, com entregas incrementais, o que facilita a adaptação contínua às necessidades dos usuários. [cite: 105] [cite_start]Já o XP será adotado com ênfase em práticas de engenharia de software que elevam a qualidade do código e fortalecem a colaboração da equipe, incluindo pair programming, refatoração contínua, feedback rápido e integração contínua. [cite: 106]

### [cite_start]2.2 Organização do Projeto [cite: 107]
[cite_start]O projeto UnBilidade foi organizado a partir de uma distribuição clara de papéis e responsabilidades, sem vínculos hierárquicos entre os integrantes. [cite: 108] [cite_start]Todos os membros são vistos como igualmente fundamentais para o êxito da iniciativa, contribuindo de acordo com suas competências técnicas, experiência e disponibilidade. [cite: 109] [cite_start]A equipe está distribuída em papéis claros de forma que cada membro tenha uma função específica, mas não se limitando a ela. [cite: 110]

| Papel | Atribuições | Responsável | Participantes |
|---|---|---|---|
| Desenvolvedor Front-End | Idealizar design do produto, codificar a interface, codificar testes unitários, realizar refatoração, gerar análise de usuários, construir plano de implementação, documentar | Vitor Araújo | [cite_start]Brenda Chaves, Alexandre Vilar [cite: 111] |
| Desenvolvedor Back-End | Modelar e codificar banco de dados, codificar testes unitários, realizar refatoração, documentar | Vitor Araújo | [cite_start]Pedro Silva, Thiago Borges [cite: 111] |
| Desenvolvedor DevOps | Integrar back-end e front-end, codificar testes unitários, realizar refatoração, documentar, distribuir produto, manter infraestrutura através de monitoramento | Vitor Araújo | [cite_start]João Vitor, Pablo Antônio, Breno Elias [cite: 111] |
| Dono do Produto | Atualizar o escopo do produto, organizar o escopo das sprints, validar as entregas | Vitor Araújo | [cite_start]Flávia Rebelato [cite: 111] |
| Analista de Qualidade | Garantir a qualidade do produto, garantir o cumprimento do conceito de pronto, realizar inspeções de código | Flávia Rebelato, Vitor Araújo | [cite_start]Flávia Rebelato, Vitor Araújo [cite: 111] |
| Cliente | Validar os requisitos do sistema, fornecer feedback sobre as funcionalidades, avaliar se 0 produto atende às necessidades esperadas e participar das homologações e testes de aceitação. | [cite_start]Flávia Rebelato |  [cite: 111] |

### [cite_start]2.3 Planejamento das Fases e/ou Iterações do Projeto [cite: 115]
[cite_start]O desenvolvimento do UnBilidade será estruturado em sprints com entregas graduais e incrementais ao longo do período estipulado com entrega continua de valor, seguindo a metodologia Scrum+XP. [cite: 116] [cite_start]O planejamento será atualizado conforme necessidade do grupo durante o desenvolvimento. [cite: 117]

| Sprint | Produto (Entrega) | Data Início | Entregável(eis) | Data Fim | Responsáveis | % conclusão |
|---|---|---|---|---|---|---|
| Sprint 1 | Definição do Produto e Visão de Projeto | 23/04/26 | Documento de Visão De Projeto e Produto | 02/05/26 | Vitor Araújo, Flávia Rebelato, João Paulo | [cite_start]100% [cite: 118] |
| Sprint 2 | MVP e Arquitetura | 02/05/26 | Documento de Arquitetura v1.0; definição do ambiente de desenvolvimento; repositório configurado no GitHub | 16/05/26 | Pablo Antônio, João Vitor, Vitor Araújo | [cite_start]30% [cite: 118] |
| Sprint 3 | Funcionalidades A, B, C, D | 16/05/26 | RF01, RF02, RF03 (Cadastro, Autenticação e Calendário) | 23/05/26 | [cite_start]Brenda, Alexandre, Pedro, Thiago | [cite: 118] |
| Sprint 4 | Funcionalidades E, F e G | 23/05/26 | RF04 a RF07 (Agendamento, Lembretes e Cancelamento); Inspeções | 30/05/26 | [cite_start]Brenda, Alexandre, Pedro, Thiago | [cite: 118] |
| Sprint 5 | Funcionalidades H, I e J | 30/05/26 | RF08 a RF16 (Upload, Histórico, Evolução, Admin); Reparos | 20/06/26 | [cite_start]Time completo | [cite: 118] |

### [cite_start]2.4 Matriz de Comunicação [cite: 121]
[cite_start]A comunicação do grupo Hopper está organizada de forma com que o grupo tenha um bom desempenho, com acompanhamento de riscos, acompanhamento das atividades, validação das entregas e alinhamento entre os membros da equipe. [cite: 122] As formas de comunicação ficaram da seguinte forma:
[cite_start]A equipe realizará uma reunião semanal, com a presença mandatória de todos os membros, incluindo o Scrum Master, PO e os outros membros. [cite: 124] [cite_start]Para uma comunicação mais direta e em tempo real usaremos as ferramentas disponíveis como o WhatsApp, Microsoft Teams e Discord. [cite: 125]

| Descrição | Área/ Envolvidos | Periodicidade | Produtos Gerados |
|---|---|---|---|
| Reunião geral de acompanhamento | Equipe Completa | Semanal | [cite_start]Ata de reunião Atualização de status [cite: 128] |
| Comunicação com o monitor | Scrum Master, PO | Conforme necessidade | [cite_start]Relatório de status do projeto e esclarecimento de impedimentos [cite: 128] |
| Alinhamento sobre critérios de aceite | PO, Scrum Master, desenvolvedores | Ao final de cada sprint | [cite_start]Critérios definidos e documentados [cite: 128] |
| Atualizações internas rápidas | Toda a equipe | Contínua (WhatsApp) | [cite_start]Notificações, lembretes, decisões rápidas [cite: 128] |

### [cite_start]2.5 Gerenciamento de Riscos [cite: 129]
[cite_start]O gerenciamento de riscos do projeto Unbilidade tem como objetivo identificar antecipadamente situações que possam comprometer o andamento do desenvolvimento, a qualidade das entregas ou a experiência dos usuários finais pacientes e profissionais da clínica. [cite: 130] [cite_start]A equipe adotou uma abordagem preventiva, mapeando os principais riscos e definindo estratégias de mitigação (para evitar que ocorram) e de contingência (para o caso de se concretizarem). [cite: 131] [cite_start]A lista de riscos será revisada a cada sprint, sendo atualizada conforme novos riscos forem identificados ou o contexto do projeto evoluir. [cite: 132]

### [cite_start]2.6 Critérios de Replanejamento [cite: 133]
[cite_start]O replanejamento no projeto Unbilidade será realizado sempre que houver fatores que comprometam o andamento da sprint, a qualidade das entregas ou a aderência aos objetivos definidos no backlog. [cite: 134] [cite_start]A equipe utilizará como base o acompanhamento semanal, as revisões de sprint e a análise contínua dos riscos mapeados na seção 2.5 para identificar a necessidade de ajustes. [cite: 135]

A seguir, são definidos os principais critérios que podem justificar um replanejamento:
* [cite_start]Desistência, afastamento ou baixo engajamento de membros da equipe, impactando diretamente a capacidade de execução das tarefas planejadas para a sprint. [cite: 137]
* [cite_start]Atrasos críticos na entrega de funcionalidades prioritárias, especialmente aquelas das quais outras partes do sistema dependem, como autenticação, calendário de agendamento e integração com o Supabase. [cite: 138]
* [cite_start]Mudanças significativas no escopo propostas pelo Product Owner que afetem entregas em andamento ou já definidas para a sprint atual. [cite: 139]
* [cite_start]Problemas técnicos ou de integração entre Next.js e Supabase que impeçam o avanço do desenvolvimento conforme previsto na arquitetura do sistema. [cite: 140]
* [cite_start]Validações negativas durante testes, indicando que funcionalidades entregues não atendem aos critérios de aceite definidos junto ao Product Owner. [cite: 141]
* [cite_start]Resultado insatisfatório nas inspeções de código realizadas pelo monitor, exigindo refatoração significativa que comprometa o cronograma das sprints seguintes. [cite: 142]

#### [cite_start]2.6.1 Avaliando grau de riscos [cite: 145]
[cite_start]O grau de risco atribuído — baixo, médio ou alto — é definido por análise qualitativa, considerando a combinação entre a probabilidade de ocorrência e o impacto potencial caso o risco se concretize. [cite: 145] [cite_start]A avaliação é realizada por consenso entre os membros da equipe ao início de cada sprint, levando em conta o histórico de entregas, a complexidade das funcionalidades planejadas e a disponibilidade dos integrantes. [cite: 146]

| Risco | Grau | Mitigação (Plano A) | Contingência (Plano B) |
|---|---|---|---|
| Desistência ou afastamento de membro da equipe | Alto | [cite_start]Distribuição equilibrada de responsabilidades desde o início; nenhum módulo crítico com responsável único [cite: 151] | [cite_start]Redistribuir tarefas entre os membros ativos; acionar o Scrum Master para replanejamento imediato da sprint [cite: 151] |
| Atraso na entrega do documento de visão comprometendo o kick off | Alto | [cite_start]Divisão clara das seções entre os responsáveis desde a Sprint 1; revisões incrementais antes do prazo [cite: 152, 153] | [cite_start]Priorizar as seções obrigatórias para entrega mínima no prazo e complementar na Sprint 2 [cite: 153] |
| Falta de comunicação entre front-end, back end e DevOp | Médio | Daily assíncrona via canal do grupo; reunião semanal com ata registrada; [cite_start]Scrum Master como facilitador [cite: 154] | [cite_start]Intervenção direta do Scrum Master para realinhar as equipes e revisar o plano da sprint em andamento [cite: 154] |
| Atraso na entrega do back-end | Alto | [cite_start]Divisão clara por partes, versionamento incremental [cite: 154] | [cite_start]Reduzir escopo ou mover funcionalidades para sprint futura [cite: 154] |
| Alteração tardia de requisitos pelo Product Owner | Alto | [cite_start]Backlog refinado e priorizado antes de cada sprint com validação da PO; mudanças somente entre sprints [cite: 155] | [cite_start]Repriorizar o backlog junto à PO, negociando o que entra e sai do escopo da sprint corrente [cite: 155] |

---

## [cite_start]3. Processo de Desenvolvimento de Software [cite: 155]
[cite_start]O processo de desenvolvimento do projeto Hopper será guiado por uma abordagem ágil, fundamentada nos princípios do Scrum e nas práticas do Extreme Programming (XP). [cite: 155] [cite_start]A equipe adota a metodologia ScrumXP, combinação das práticas de gerenciamento do Scrum com as práticas técnicas do XP. [cite: 156] [cite_start]Essa escolha se justifica pelo contexto do projeto: equipe pequena, escopo dinâmico, prazo semestral definido e necessidade de entregas incrementais de valor a cada ciclo. [cite: 157]

### [cite_start]3.1 Scrum Adaptado [cite: 159]
[cite_start]O framework Scrum foi escolhido como base para a organização das atividades, com ajustes conforme a dinâmica da equipe. [cite: 159] [cite_start]Os papéis clássicos estão representados, mas exercidos de forma colaborativa. [cite: 160] [cite_start]O processo se organiza em três macrofases encadeadas: pré-sprint, sprint e pós sprint. [cite: 161] 

[cite_start]Na fase de pré-sprint, a equipe realiza o planejamento da iteração a partir do Product Backlog priorizado pela PO. [cite: 162] [cite_start]Durante a sprint, o desenvolvimento segue as práticas do XP. [cite: 166] [cite_start]O Daily Scrum é realizado de forma assíncrona pelo canal da equipe. [cite: 167] [cite_start]Na fase de pós-sprint, a equipe realiza a Sprint Review com demonstração do incremento entregue para validação da PO, seguida da Retrospectiva. [cite: 169]

### [cite_start]3.2 Práticas de XP Incorporadas [cite: 171]
Foram incorporadas práticas do Extreme Programming (XP) para garantir qualidade técnica e eficiência no desenvolvimento:
* [cite_start]**Desenvolvimento incremental:** cada funcionalidade será implementada em partes pequenas e entregues gradualmente. [cite: 171]
* [cite_start]**Programação em pares:** tarefas de maior complexidade técnica serão desenvolvidas em dupla. [cite: 172]
* [cite_start]**Refatoração contínua:** o código será melhorado conforme surgirem oportunidades. [cite: 173]
* [cite_start]**Integração contínua:** o repositório no GitHub será atualizado frequentemente. [cite: 174]
* [cite_start]**Feedback estruturado:** a cada entrega de funcionalidade, o time realiza validações internas. [cite: 175]
* [cite_start]**Participação coletiva na documentação:** os membros colaboram com a construção e atualização dos artefatos. [cite: 176]

---

## [cite_start]4. Declaração de Escopo do Projeto [cite: 180]

[cite_start]O backlog do produto é uma lista de requisitos e funcionalidades que serão trabalhados pelo time. [cite: 180] [cite_start]Os requisitos e funcionalidades deverão ser entregues e validados de forma incremental. [cite: 181] [cite_start]Tendo em vista que o projeto Hopper tem como contexto uma clínica fictícia, o Product Owner e o Scrum Master desempenham juntos o papel de representantes do cliente. [cite: 182] 

### [cite_start]4.1 Perfis [cite: 204]
[cite_start]Os perfis de acesso do Hopper foram definidos a partir de alinhamento entre os membros do grupo. [cite: 204] O sistema conta com quatro perfis principais:
* **Pacientes:** Paciente com alguma necessidade de fisioterapia, que queira marcar uma consulta. [cite_start]Pode marcar, consultar prontuário, editar informações, cancelar, remarcar. [cite: 211]
* **Secretária:** Responsável por deixar o retorno de pacientes marcado. [cite_start]Pode marcar, excluir, remarcar e consultar lista do dia. [cite: 212]
* **Médico/Fisioterapeuta:** Informação de especialidade, breve biografia. [cite_start]Pode editar informações, consultar pacientes, remarcar. [cite: 212]
* [cite_start]**Administrador:** Responsável por manter perfis, criar usuários, monitorar uso e gerenciar configurações. [cite: 211]

### [cite_start]4.2 Cenários [cite: 213]
[cite_start]Os cenários funcionais definidos cobrem desde a configuração inicial até as operações do dia a dia. [cite: 213]

| Numeração | Nome do cenário | Sprints (Descrição) |
|---|---|---|
| 1 | Autenticação e Cadastro | [cite_start]Gestão de acesso para pacientes, fisioterapeutas e secretária, incluindo o formulário de novos pacientes. [cite: 220] |
| 2 | Fluxo de Agendamento | [cite_start]Visualização de calendário, escolha de tipo de atendimento, profissional e reserva temporária de 5 minutos. [cite: 221] |
| 3 | Comunicação e Alertas | [cite_start]Sistema automatizado de envio de e-mails para confirmação imediata e lembretes de 24 horas. [cite: 222] |
| 4 | Gestão de Consultas | [cite_start]Controle de cancelamentos (mínimo 24h), remarcações e prevenção de choque de horários. [cite: 223] |
| 5 | Registro Clínico | [cite_start]Funcionalidade de upload de laudos (PDF/JPG) e registro de evolução diária pelo fisioterapeuta. [cite: 224] |
| 6 | Administração e Suporte | [cite_start]Painel da secretária para gerir intervalos/folgas e seção de Perguntas Frequentes (FAQ). [cite: 225] |

### [cite_start]4.3 Tabela de Backlog do produto [cite: 226]

| ID | Sprint | Nome do Requisito | Tipo | Priorização | Descrição Suscinta | User Stories Associadas |
|---|---|---|---|---|---|---|
| RNF01 | 2 | Segurança de Dados | Não Funcional | Must | Garantir segurança e conformidade dos dados clínicos. | [cite_start]- [cite: 226] |
| RNF02 | 2 | Usabilidade | Não Funcional | Must | Interface limpa, objetiva e com cores acessíveis. | [cite_start]- [cite: 227] |
| RNF03 | 2 | Disponibilidade | Não Funcional | Should | Disponível via navegador web (Chrome, Firefox, Edge, Safari). | [cite_start]- [cite: 228] |
| RNF04 | 2 | Desempenho | Não Funcional | Should | Tempo de resposta de operações chave < 3 segundos. | [cite_start]- [cite: 229] |
| RNF05 | 2 | Deploy Contínuo | Não Funcional | Must | Integração pipeline de deploy contínuo Vercel e GitHub Actions. | [cite_start]- [cite: 230] |
| RF01 | 3 | Cadastro de Paciente | Funcional | Must | Permitir cadastro com dados obrigatórios e opcionais. | [cite_start]US01 [cite: 231, 232] |
| RF02 | 3 | Autenticação de Usuários | Funcional | Must | Autenticar por e-mail e senha, com sessão segura. | [cite_start]US02 [cite: 233, 234] |
| RF03 | 3 | Calendário Interativo | Funcional | Must | Exibir calendário com horários por serviço/profissional. | [cite_start]US03 [cite: 235, 236] |
| RF04 | 4 | Agendamento de Consultas | Funcional | Must | Agendamento de consultas presenciais/domiciliares em até 5 etapas. | [cite_start]US04 [cite: 237, 238] |
| RF05 | 4 | Fluxo de Primeira Consulta | Funcional | Must | Diferenciar agendamento para primeira consulta com dados extras. | [cite_start]US05 [cite: 239, 240] |
| RF06 | 4 | Cancelamento e Remarcação | Funcional | Must | Permitir cancelamento/remarcação com >24h de antecedência. | [cite_start]US06 [cite: 241, 242] |
| RF07 | 4 | Lembrete Automático por E-mail | Funcional | Must | Enviar lembrete 24h antes da consulta. | [cite_start]US07 [cite: 243, 244, 245] |
| RF08 | 5 | Upload de Documentos | Funcional | Should | Permitir upload de laudos (PDF, JPG, PNG) até 10MB. | [cite_start]US08 [cite: 247, 248] |
| RF09 | 5 | Histórico de Consultas | Funcional | Must | Exibir histórico de consultas na área do paciente. | [cite_start]US09 [cite: 249, 250] |
| RF10 | 5 | Relatório de Evolução | Funcional | Should | Fisioterapeuta registra evolução clínica após sessão. | [cite_start]US10 [cite: 251, 252] |
| RF11 | 5 | Exibição de Serviços | Funcional | Must | Exibir serviços prestados (nome, descrição, indicações). | [cite_start]US11 [cite: 253, 254] |
| RF12 | 5 | Exibição do Corpo Clínico | Funcional | Should | Exibir profissionais (foto, CREFITO, especialidades). | [cite_start]US12 [cite: 255, 256] |
| RF13 | 5 | Gestão de Horários (Admin) | Funcional | Must | Secretária/Admin cadastra e edita horários de profissionais. | [cite_start]US13 [cite: 257, 258] |
| RF14 | 5 | Preferência de Profissional | Funcional | Should | Paciente indica preferência ou atribuição automática. | [cite_start]US14 [cite: 259, 260] |
| RF15 | 5 | Aviso de Encaminhamento | Funcional | Should | Aviso sobre encaminhamento para convênios. | [cite_start]US15 [cite: 261, 262] |
| RF16 | 5 | Reserva Temporária | Funcional | Must | Reservar horário selecionado por até 5 min durante agendamento. | [cite_start]US16 [cite: 263, 264, 265] |
| RF17 | 5 | FAQ de Dúvidas Frequentes | Funcional | Could | Exibir FAQ. | [cite_start]US17 [cite: 266, 267] |

---

## [cite_start]5. Métricas e Medições [cite: 268]
[cite_start]As métricas e medições do projeto UnBilidade seguirão o método GQM (Goal Question-Metric). [cite: 268] [cite_start]Essa abordagem torna a visualização dos objetivos e o atingimento das métricas explícitos e rastreáveis. [cite: 269]

* [cite_start]**Objetivo (Goal):** Identificar proativamente situações que indicam a necessidade de replanejamento durante o desenvolvimento do UnBilidade. [cite: 270]
* **Perguntas (Questions):** Participação balanceada? (Q1) Qualidade das entregas? (Q2) Distribuição de trabalho? (Q3) Entregas correspondem ao backlog? (Q4) [cite_start][cite: 271, 272, 273, 274]
* **Métricas:** M1 (Presença, cumprimento de tarefas); M2 (Aceitação de testes, débito técnico); M3 (Distribuição de commits, tipo de atividade); [cite_start]M4 (Velocidade, Histórias não concluídas). [cite: 276-283]
* [cite_start]**Coleta de Dados:** Ocorrerá através do GitHub, Jira, Vitest/Supertest e Atas de Reunião, sob responsabilidade do Scrum Master. [cite: 284-288]

---

## [cite_start]6. Testes de Software [cite: 293]
[cite_start]O plano de testes do projeto UnBilidade é fundamental para garantir a confiabilidade, segurança e a excepcional experiência de usuário prometida. [cite: 293]

### [cite_start]6.1 Estratégia de Testes [cite: 295]
[cite_start]A estratégia adotada combina pirâmide de testes clássica com a realidade de um projeto full-stack em Next.js. [cite: 295] [cite_start]O foco será em testes automatizados para acelerar o feedback e garantir a robustez do sistema. [cite: 296]
* [cite_start]Automação Prioritária (agendamento, cancelamento). [cite: 297]
* [cite_start]Ambiente Isolado (banco Supabase de homologação). [cite: 298]
* [cite_start]Dados Controlados. [cite: 299]
* [cite_start]Cobertura Mínima de 80%. [cite: 300]
* [cite_start]Feedback Rápido (Pull Requests). [cite: 301]

### [cite_start]6.2 Níveis e Tipos de Teste [cite: 302]

| Nível | Descrição | Ferramenta | Exemplo no UnBilidade |
|---|---|---|---|
| Unitário | Validam funções e métodos isolados. | Vitest | [cite_start]Verificar se a regra de "cancelamento com 24h" retorna true/false. [cite: 302, 303] |
| Integração | Validam a interação entre módulos (API Routes, Supabase). | Supertest + Vitest | [cite_start]Testar se rota valida horário ocupado. [cite: 304, 305] |
| Sistema (E2E) | Simulam o fluxo completo do usuário no navegador. | Playwright ou Cypress | [cite_start]"Paciente" loga, agenda, recebe email. [cite: 306, 307] |
| Segurança | Validam controle de acesso e proteção (LGPD). | Manuais + Supertest | [cite_start]Garantir que paciente não acesse histórico de outro. [cite: 308, 309] |

### [cite_start]6.3 Roteiro de Testes (Exemplo para a Sprint 3) [cite: 310]

[cite_start]**Roteiro de Testes para Funcionalidades Core** [cite: 311]

| Código | Nome do Teste | Tipo | Nível | RF Associado |
|---|---|---|---|---|
| TU-01 | Validação de e-mail e CPF | Negativo | Unitário | [cite_start]RF01, RF02 [cite: 312] |
| TU-02 | Cálculo de horário de lembrete | Funcional | Unitário | [cite_start]RF07 [cite: 312] |
| TI-01 | Cadastro de paciente com dados válidos | Funcional | Integração | [cite_start]RF01 [cite: 312] |
| TI-02 | Cadastro com e-mail duplicado | Negativo | Integração | [cite_start]RF01 [cite: 313] |
| TI-03 | Login com credenciais corretas | Funcional | Integração | [cite_start]RF02 [cite: 313] |
| TI-04 | Reserva de horário por 5 minutos | Funcional | Integração | [cite_start]RF16 [cite: 313] |
| TA-01 | Fluxo de agendamento de primeira consulta | Funcional | Sistema (E2E) | [cite_start]RF04, RF05 [cite: 313] |
| TA-02 | Cancelamento com antecedência < 24h | Negativo | Sistema (E2E) | [cite_start]RF06 [cite: 314] |

**Critérios de Aceitação dos Testes**

| Código | Funcionalidade Associada | Critério de Aceitação (Condição de Sucesso) |
|---|---|---|
| TU-01 | Validação de Cadastro | [cite_start]O sistema deve rejeitar CPF inválido e e-mail sem formato correto, exibindo mensagem de erro amigável. [cite: 314, 315] |
| TU-02 | Lembrete Automático | [cite_start]A função que calcula a data/hora do envio deve retornar "24h antes" para agendamentos futuros, e "enviar agora" para < 24h. [cite: 315] |
| TI-01 | Cadastro de Paciente | [cite_start]O sistema deve retornar status 201 (Criado) e o novo paciente deve persistir no Supabase. [cite: 316] |
| TI-02 | Prevenção de Duplicidade | [cite_start]O sistema deve retornar status 409 (Conflito) com a mensagem "E-mail já cadastrado". [cite: 317] |
| TI-03 | Autenticação | [cite_start]O sistema deve retornar status 200 e um token de sessão (JWT ou similar) válido. [cite: 318] |
| TI-04 | Reserva de Horário | [cite_start]Após a requisição, o horário deve ficar como "reservado" no banco de dados por 5 minutos. [cite: 319] |
| TA-01 | Agendamento Completo | [cite_start]Ao final do fluxo de 5 etapas, a consulta deve ser criada, e-mail de confirmação enviado, horário vai para "confirmado". [cite: 320] |
| TA-02 | Cancelamento Restrito | [cite_start]O sistema deve impedir o cancelamento, retornar erro visível e manter a consulta ativa. [cite: 321] |

---

## [cite_start]7. Referências Bibliográficas [cite: 322]
* BECK, Kent. Extreme Programming Explained: Embrace Change. 2. ed. [cite_start]Boston: Addison Wesley, 2004. [cite: 322]
* BRASIL. [cite_start]Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD). [cite: 323]
* COHN, Mike. User Stories Applied: For Agile Software Development. [cite_start]Boston: Addison-Wesley, 2004. [cite: 324, 325]
* CONSELHO FEDERAL DE FISIOTERAPIA E TERAPIA OCUPACIONAL (COFFITO). [cite_start]Resolução nº 424. [cite: 325, 326]
* FOWLER, Martin. Refactoring: Improving the Design of Existing Code. 2. ed. [cite_start]Boston: Addison Wesley, 2018. [cite: 327, 328]
* GRUMAN, Galen. A Guide to Agile Development. [cite_start]InfoWorld, São Francisco, 2009. [cite: 328, 329]
* KITCHENHAM, Barbara; PFLEEGER, Shari Lawrence. [cite_start]Principles of Survey Research: Part 1. [cite: 329, 330]
* NIELSEN, Jakob; LORANGER, Hoa. Prioritizing Web Usability. [cite_start]Berkeley: New Riders, 2006. [cite: 331, 332]
* O'BRIEN, James A.; [cite_start]MARAKAS, George M. Administração de Sistemas de Informação. [cite: 332, 333]
* PRESSMAN, Roger S.; [cite_start]MAXIM, Bruce R. Engenharia de Software: Uma Abordagem Profissional. [cite: 333, 334]
* REZENDE, Denis Alcides. [cite_start]Planejamento de Sistemas de Informação e Informática. [cite: 334, 335]
* SCHWABER, Ken; SUTHERLAND, Jeff. [cite_start]The Scrum Guide. [cite: 335, 336]
* SOMMERVILLE, Ian. Engenharia de Software. 10. [cite_start]ed. [cite: 336, 337]
* WAZLAWICK, Raul Sidnei. Engenharia de Software: Conceitos e Práticas. [cite_start]Rio de Janeiro: Elsevier, 2013. [cite: 337]