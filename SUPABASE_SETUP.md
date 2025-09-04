# Configuração do Supabase

Este projeto agora usa o Supabase para persistir dados na nuvem. Siga os passos abaixo para configurar:

## 1. Criar conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou crie uma conta
4. Clique em "New Project"

## 2. Configurar o projeto

1. Escolha um nome para seu projeto (ex: "financeiro-app")
2. Escolha uma senha forte para o banco de dados
3. Escolha uma região próxima (ex: São Paulo)
4. Clique em "Create new project"

## 3. Obter as credenciais

1. No dashboard do Supabase, vá em "Settings" > "API"
2. Copie a "URL" e a "anon public" key
3. Crie um arquivo `.env.local` na raiz do projeto
4. Adicione as credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

## 4. Criar a tabela no banco de dados

1. No dashboard do Supabase, vá em "SQL Editor"
2. Execute o seguinte SQL:

```sql
-- Criar tabela para dados financeiros
CREATE TABLE financial_data (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhor performance
CREATE INDEX idx_financial_data_user_id ON financial_data(user_id);

-- Criar política de segurança (RLS)
ALTER TABLE financial_data ENABLE ROW LEVEL SECURITY;

-- Política para usuários só verem seus próprios dados
CREATE POLICY "Users can only access their own data" ON financial_data
  FOR ALL USING (auth.uid() = user_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_financial_data_updated_at 
  BEFORE UPDATE ON financial_data 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

## 5. Configurar autenticação

1. No dashboard do Supabase, vá em "Authentication" > "Settings"
2. Em "Site URL", adicione: `http://localhost:3000`
3. Em "Redirect URLs", adicione: `http://localhost:3000`
4. Salve as configurações

## 6. Testar a aplicação

1. Execute `npm run dev`
2. Acesse `http://localhost:3000`
3. Crie uma conta ou faça login
4. Seus dados agora serão salvos na nuvem!

## Benefícios da integração com Supabase

✅ **Persistência na nuvem**: Seus dados ficam seguros e acessíveis de qualquer lugar
✅ **Sincronização automática**: Dados sincronizados entre dispositivos
✅ **Autenticação segura**: Login com email e senha
✅ **Backup automático**: Dados sempre seguros
✅ **API REST automática**: Sem necessidade de backend
✅ **Real-time**: Atualizações em tempo real
✅ **Gratuito**: Plano gratuito generoso

## Estrutura dos dados

Os dados são salvos em JSON no banco de dados, mantendo a mesma estrutura que você já usa:

```json
{
  "monthlySalary": 5000,
  "balances": [...],
  "cards": [...],
  "debts": [...],
  "incomes": [...],
  "expenses": [...],
  "budgetLimits": [...],
  "theme": {
    "mode": "light",
    "primaryColor": "#1976d2",
    "secondaryColor": "#dc004e"
  }
}
```

## Fallback para localStorage

Se o usuário não estiver logado, a aplicação continua funcionando com localStorage como antes, garantindo que não perca funcionalidade.
