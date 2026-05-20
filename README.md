# Ford Auto Intelligence 🚘

Aplicação mobile desenvolvida para o desafio de **Inteligência Competitiva Automotiva Ford**, utilizando **React Native + Expo + TypeScript** no frontend e **Node.js + Express + TypeScript** no backend.

O objetivo da solução é transformar dados técnicos automotivos em uma plataforma de comparação inteligente, permitindo visualizar especificações padronizadas, comparar versões e receber novos dados técnicos dinamicamente.

---

# Objetivo do Projeto

O mercado automotivo exige análises rápidas e precisas sobre:

- Equipamentos
- Potência
- Torque
- Segurança
- Tecnologia embarcada
- Itens de conforto
- Diferenciais entre versões

A solução desenvolvida permite:

✅ Receber dados técnicos automotivos

✅ Padronizar informações

✅ Comparar veículos

✅ Destacar diferenças automaticamente

✅ Persistir dados localmente

✅ Adicionar novos veículos sem alterar código

---

# Backend — ford-auto-intelligence-api

Responsável por:

- Ler dataset JSON
- Padronizar veículos
- Gerar API REST
- Servir dados ao aplicativo mobile

Tecnologias:

- Node.js
- Express
- TypeScript

---

# Frontend — ford-auto-intelligence-mobile

Responsável por:

- Interface visual
- Comparação entre veículos
- Filtros
- Busca
- Upload JSON
- Persistência local

Tecnologias:

- React Native
- Expo
- TypeScript
- Expo Router
- Axios
- AsyncStorage

# Funcionalidades Implementadas

### Comparação Inteligente

Usuário escolhe:

Veículo A

Veículo B

O sistema:

- destaca diferenças
- organiza por categoria
- padroniza visualização

### Dashboard Executivo

Resumo automático:

Tecnologia → Melhor veículo

Segurança → Melhor veículo

Motor → Melhor veículo

### Busca de Especificações

Permite Filtrar dinamicamente atributos técnicos.

### Seleção Livre de Atributos

Usuário escolhe:

- ✓ Potência

- ✓ Torque

- ✓ Bluetooth

Mostrando apenas itens desejados.

### Upload Dinâmico JSON

Novos veículos podem ser importados:

- Importar Datasheet JSON

- Sem necessidade de alterar código.

Exemplo:
```json
[
{
"id":99,
"brand":"Toyota",
"model":"Hilux",
"version":"GR-S",
"specifications":{}
}
]
```
na pasta ford-auto-intelligence-mobile\src\app\novo-veiculo.json 
você encontrara o arquivo novo-veiculo.json, onde vc pode fazer o teste do import se desejar


### Persistência Local (AsyncStorage)

Dados importados permanecem salvos.

### Tratamento de Dados Ausentes

Valores ausentes:

- undefined

- null

- 0

São exibidos como:

- N/A

### Configuração do IP Local

Para permitir que o aplicativo mobile consuma a API local, foi configurado o endereço IP da máquina.

Arquivo:

ford-auto-intelligence-mobile/services/api.ts

Configuração:

import axios from "axios";

export default axios.create({
baseURL:"http://SEU_IP_LOCAL:3333/api"
});

Exemplo:

- baseURL:"http://192.168.0.20:3333/api"

### Como descobrir IP local

Windows:

Prompt de Comando:

- ipconfig

- Procurar:

- IPv4 Address

Exemplo:

- 192.168.0.20

---

# Como Rodar Backend

Entrar:
cd ford-auto-intelligence-api

Instalar dependências:

```bash
npm install
```

Dependências utilizadas:

### Produção

```bash
npm install express
npm install cors
```

### Desenvolvimento

```bash
npm install -D typescript
npm install -D ts-node-dev
npm install -D @types/node
npm install -D @types/express
npm install -D @types/cors
```

Executar:
```bash
 npm run dev
```

Servidor:

http://localhost:3333

# Como Rodar Mobile

Entrar:

- cd ford-auto-intelligence-mobile

Instalar dependências:

```bash
npm install
```

Dependências utilizadas:

### Navegação

```bash
npx expo install expo-router
```

---

### Requisições HTTP

```bash
npm install axios
```

---

### Persistência Local

```bash
npx expo install @react-native-async-storage/async-storage
```

---

### Expo

```bash
npx expo install expo-font
```

---

### Dependências principais do projeto

```bash
npx expo install expo
```

---

# Caso ocorra erro de compatibilidade

Atualizar versões:

```bash
npx expo install \
@react-native-async-storage/async-storage@2.2.0 \
expo@~55.0.25 \
expo-font@~55.0.8 \
expo-router@~55.0.15 \
expo-symbols@~55.0.9
```

Limpar cache:

```bash
npx expo start --clear
```


Executar:
```bash
npx expo start
```

Abrir:

- Android
- iOS
- Navegador

---

# Tecnologias

# Backend:

- Node.js
- Express
- TypeScript

# Frontend:

- React Native
- Expo
- Expo Router
- Axios
- AsyncStorage

---

# Integrantes

- Augusto Ferreira Rogel de Souza / RM 557709
- Heitor Prestes / RM 554823
- Lucca Ribeiro / RM 556668
