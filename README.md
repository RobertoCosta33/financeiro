# Sistema Financeiro

Um sistema completo para controle de gastos e orçamentos pessoais, desenvolvido com Next.js, TypeScript, Material UI e styled-components.

## 🚀 Funcionalidades

- **Gestão de Cartões**: Cadastre e gerencie cartões de crédito, débito e contas correntes
- **Limites de Orçamento**: Defina limites semanais e mensais para diferentes categorias
- **Controle Visual**: Sistema de cores para alertar sobre limites (verde, amarelo, laranja, vermelho)
- **Tema Escuro/Claro**: Interface adaptável com suporte a temas
- **Persistência na Nuvem**: Dados salvos no Supabase (gratuito) com sincronização automática
- **Autenticação Segura**: Login com email e senha
- **Fallback Local**: Funciona offline com localStorage
- **Responsivo**: Interface adaptável para diferentes tamanhos de tela

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Material UI** - Componentes de interface
- **Styled Components** - Estilização CSS-in-JS
- **Supabase** - Backend como serviço (banco de dados + autenticação)
- **Node.js 20** - Runtime JavaScript

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd financeiro
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Supabase (opcional):
   - Siga as instruções em [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Ou use apenas o localStorage (funciona offline)

4. Execute o projeto:
```bash
npm run dev
```

5. Acesse `http://localhost:3000`

## 🎯 Como Usar

### Cadastrando Cartões
1. Clique em "Adicionar Cartão"
2. Preencha as informações:
   - Nome do cartão
   - Limite disponível
   - Saldo atual
   - Tipo (crédito, débito ou conta corrente)
   - Dia de vencimento e fechamento
   - Cor personalizada

### Definindo Limites de Orçamento
1. Clique em "Adicionar Limite"
2. Configure:
   - Categoria (ex: Lazer, Alimentação)
   - Limite mensal ou semanal
   - Gasto atual
   - Cor da categoria

### Sistema de Alertas
- **Verde**: Abaixo de 50% do limite
- **Amarelo**: Entre 50% e 75% do limite
- **Laranja**: Entre 75% e 100% do limite
- **Vermelho**: Acima de 100% do limite

## 📁 Estrutura do Projeto

```
src/
├── app/                 # Páginas Next.js
├── components/          # Componentes React
│   ├── Auth/           # Componentes de autenticação
│   ├── BudgetForm/     # Formulário de orçamentos
│   ├── BudgetLimit/    # Card de limite de orçamento
│   ├── CardForm/       # Formulário de cartões
│   ├── CreditCard/     # Card de cartão de crédito
│   ├── Dashboard/      # Dashboard principal
│   └── Header/         # Cabeçalho da aplicação
├── hooks/              # Hooks personalizados
├── services/           # Serviços (Supabase)
├── templates/          # Templates e temas
├── types/              # Definições TypeScript
└── utils/              # Utilitários e funções
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter

## 💡 Exemplo de Uso

### Configuração Inicial
1. **Criar Conta**: Faça login ou crie uma conta para salvar dados na nuvem
2. **Renda Fixa**: Configure sua renda mensal de R$ 7.300
3. **Limite de Lazer**: Defina R$ 1.200/mês (R$ 300/semana)
4. **Cartões**: Cadastre seus cartões com limites e saldos atuais

### Monitoramento
- Acompanhe o uso dos cartões em tempo real
- Monitore os gastos por categoria
- Receba alertas visuais quando aproximar dos limites
- Acesse seus dados de qualquer dispositivo (quando logado)

## ☁️ Persistência na Nuvem

O sistema agora oferece duas opções de armazenamento:

### Com Supabase (Recomendado)
- ✅ Dados sincronizados entre dispositivos
- ✅ Backup automático na nuvem
- ✅ Autenticação segura
- ✅ Acesso de qualquer lugar
- ✅ Gratuito (plano generoso)

### Sem Supabase (Offline)
- ✅ Funciona completamente offline
- ✅ Dados salvos no navegador
- ✅ Sem necessidade de conta
- ✅ Privacidade total local

## 🎨 Personalização

O sistema suporta:
- Temas claro/escuro
- Cores personalizadas para cartões e categorias
- Interface responsiva
- Animações suaves

## 📱 Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis e desktop
- Node.js 20+

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ para controle financeiro pessoal
