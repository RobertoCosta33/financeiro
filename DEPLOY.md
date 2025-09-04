# Deploy no GitHub Pages

Este guia te ajudará a fazer o deploy da aplicação no GitHub Pages.

## 🚀 **Passos para Deploy:**

### **1. Criar Repositório no GitHub**

1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"**
3. Nome: `financeiro`
4. Deixe público
5. Clique em **"Create repository"**

### **2. Enviar Código para o GitHub**

```bash
# Inicializar git (se ainda não fez)
git init

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Initial commit"

# Adicionar repositório remoto
git remote add origin https://github.com/SEU_USUARIO/financeiro.git

# Enviar para GitHub
git push -u origin main
```

### **3. Configurar GitHub Pages**

1. No repositório, vá em **"Settings"**
2. Role até **"Pages"** no menu lateral
3. Em **"Source"**, selecione **"GitHub Actions"**
4. Salve as configurações

### **4. Configurar Supabase para Produção**

1. No Supabase Dashboard, vá em **"Authentication" > "Settings"**
2. Em **"Site URL"**, adicione: `https://SEU_USUARIO.github.io`
3. Em **"Redirect URLs"**, adicione: `https://SEU_USUARIO.github.io`
4. Salve as configurações

### **5. Deploy Automático**

Após enviar o código para o GitHub:
1. O GitHub Actions fará o build automaticamente
2. A aplicação será publicada em: `https://SEU_USUARIO.github.io/financeiro`

## ✅ **O que funcionará:**

- ✅ **Autenticação completa**
- ✅ **Persistência na nuvem**
- ✅ **Sincronização de dados**
- ✅ **Interface responsiva**
- ✅ **Todas as funcionalidades**

## 🔧 **Troubleshooting:**

### **Se o deploy falhar:**
1. Verifique se o repositório é público
2. Confirme se o GitHub Actions está habilitado
3. Verifique os logs em **"Actions"** no repositório

### **Se a autenticação não funcionar:**
1. Confirme se as URLs do Supabase estão corretas
2. Aguarde alguns minutos para propagação

## 🎉 **Resultado Final:**

Sua aplicação estará disponível em:
`https://SEU_USUARIO.github.io/financeiro`

E seus dados continuarão sendo salvos no Supabase! 🚀
