# NETTORazze Quiz Funil - TODO

## Banco de Dados
- [x] Schema: tabela `quiz_leads` (nome, whatsapp, created_at)
- [x] Schema: tabela `quiz_sessions` (lead_id, answers JSON, recommended_service, score, completed_at)
- [x] Gerar migration e aplicar via webdev_execute_sql

## Backend (tRPC)
- [x] Procedure `quiz.saveLead` - salvar nome e whatsapp
- [x] Procedure `quiz.saveSession` - salvar respostas e recomendação
- [x] Procedure `quiz.getLeads` - listar leads (admin)
- [x] Notificação ao owner quando novo lead é capturado

## Frontend - Quiz
- [x] Landing page hero com CTA para iniciar quiz
- [x] Componente QuizFlow com fluxo condicional (8-10 perguntas)
- [x] Barra de progresso animada
- [x] Lógica de roteamento condicional por resposta
- [x] Formulário de captura (nome + WhatsApp) antes do resultado
- [x] Tela de resultado com serviço(s) recomendado(s)
- [x] CTA WhatsApp com mensagem pré-preenchida dinâmica
- [x] Animações de transição entre perguntas

## Design Premium NETTORazze
- [x] Tema dark: fundo preto (#000), verde neon (#AAFF00 / #00FF00)
- [x] Tipografia bold maiúsculas (Barlow Condensed ou Oswald)
- [x] Botões com borda neon e hover effects
- [x] Micro-animações nas opções de resposta
- [x] Layout responsivo mobile-first

## Testes
- [x] Vitest: teste do router quiz.saveLead
- [x] Vitest: teste do router quiz.saveSession
