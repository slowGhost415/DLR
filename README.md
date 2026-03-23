# Sistema Web de Análise Econômica

## 📊 Visão Geral

Sistema completo de análise econômica com autenticação, banco de dados SQLite, controle de acesso e interface moderna baseada em React + Node.js.

**Funcionalidades:**
- ✅ Autenticação completa (login/cadastro/logout)
- ✅ Controle de acesso com JWT
- ✅ Modal de bloqueio para usuários não logados
- ✅ Tracking de interações do usuário
- ✅ Interface moderna com layout dividido
- ✅ Backend RESTful com Express + Prisma
- ✅ Frontend React com Vite

## 🚀 Como Executar

### 1️⃣ Primeira Vez (Instalar Dependências)

```bash
cd backend
npm install

cd ../frontend
npm install

cd ..
```

### 2️⃣ Iniciar Sistema

Execute apenas UM comando:

```bash
python main.py
```

Espere até ver:
```
✅ Sistema iniciado com sucesso!
📍 Backend:  http://localhost:4000
📍 Frontend: http://localhost:5173
```

Abra o navegador em **http://localhost:5173**

### 3️⃣ Parar Sistema

Pressione **Ctrl+C** no terminal


**Causa:** O Node.js foi instalado, mas o PATH do sistema não foi atualizado.

**Soluções:**

#### Opção 1: Correção Automática (Recomendada)
```bash
.\setup.bat
```
Este script detecta e corrige automaticamente o PATH.

#### Opção 2: Correção Manual Rápida
```bash
.\fixpath.bat
python main.py
```
O `fixpath.bat` adiciona Node.js ao PATH da sessão atual.

#### Opção 3: Adicionar Manualmente ao PATH
1. Pressione `Win + R`, digite `sysdm.cpl`
2. Aba "Avançado" → "Variáveis de Ambiente"
3. Em "Variáveis do sistema", selecione "Path" → "Editar"
4. Adicione: `C:\Program Files\nodejs`
5. Reinicie o PowerShell/Terminal

### 1. Opção Recomendada: Script Python
```bash
python main.py
```
**Vantagens:**
- Verificações automáticas de dependências
- Tratamento de caminhos com espaços (OneDrive)
- Instalação sequencial de dependências
- Gerenciamento de processos robusto
- Fácil interrupção (Ctrl+C)

### 2. Opção Alternativa: Script Batch
```bash
.\main.bat
```
**Vantagens:**
- Abre janelas separadas para backend/frontend
- Visual de progresso
- Específico para Windows

### 3. Execução Manual (se scripts falharem)
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## 🔧 Correção de Problemas Comuns

### ❌ "Node.js não encontrado"
**Solução:**
1. Execute `.\setup.bat` (corrige automaticamente)
2. Ou execute `.\fixpath.bat` antes do `python main.py`
3. Ou adicione manualmente ao PATH: `C:\Program Files\nodejs`

### ❌ "O sistema não pode encontrar o caminho especificado"
**Causa:** Caminhos com espaços (OneDrive)
**Solução:**
- Use `python main.py` (compatível com espaços)
- Ou mova o projeto para caminho sem espaços

### ❌ Scripts não executam
**Solução:**
- Execute como Administrador
- Verifique permissões de execução
- Use PowerShell em vez de CMD

## 📁 Estrutura do Projeto

```
/project-root
├── main.py              # Script principal Python (recomendado)
├── main.bat             # Script alternativo Windows
├── setup.bat            # Verificação/correção de ambiente
├── fixpath.bat          # Correção rápida do PATH
├── backend/             # API Node.js + Express + Prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── services/
│   ├── prisma/
│   └── package.json
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
└── README.md
```

## 🌐 URLs de Acesso

Após executar:
- **Site Principal:** http://localhost:5173
- **API Backend:** http://localhost:4000

## 🔐 Funcionalidades de Autenticação

- **Cadastro:** Nome, email, senha (hash bcrypt)
- **Login:** JWT token persistido
- **Proteção:** Middleware em rotas protegidas
- **Modal:** Bloqueio automático para não-logados

## 📊 Sistema de Tracking

Registra automaticamente:
- Pesquisas realizadas
- Visualizações de gráficos
- Simulações executadas
- Timestamp e usuário associado

## 🛡️ Segurança Implementada

- Hash de senha (bcrypt)
- Validação de entrada no backend
- Sanitização de dados
- Proteção contra acesso não autorizado

## 📋 Requisitos do Sistema

- **Node.js:** 16+ (instalado automaticamente)
- **Python:** 3.6+ (para script main.py)
- **Navegador:** Moderno (Chrome, Firefox, Edge)
- **SO:** Windows 10+ (PowerShell)

## 🐛 Troubleshooting

### Backend não inicia
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Frontend não inicia
```bash
cd frontend
npm install
npm run dev
```

### Banco de dados
- Arquivo: `backend/prisma/dev.db`
- Reset: Delete o arquivo e execute `npm run prisma:migrate`

## 📞 Suporte

Se encontrar erros:
1. Execute `.\setup.bat` primeiro
2. Execute `.\fixpath.bat` se necessário
3. Teste `python main.py`
4. Verifique logs nos terminais
5. Reinicie o computador se necessário

---

**Status:** ✅ Sistema completo e funcional
**Última atualização:** Março 2026