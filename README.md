# Ford Auto Intelligence

Aplicação multiplataforma desenvolvida para o desafio de **Inteligência Competitiva Automotiva Ford**, utilizando **React Native + Expo + TypeScript** no frontend e **Node.js + Express + TypeScript** no backend.

O objetivo da solução é transformar dados técnicos automotivos em uma plataforma de inteligência competitiva, permitindo visualizar especificações padronizadas, comparar diferentes versões de veículos, importar novos datasheets e utilizar Inteligência Artificial para auxiliar na análise das informações.

---

# Objetivo do Projeto

O mercado automotivo exige análises rápidas e precisas de informações como:

- Equipamentos
- Potência
- Torque
- Segurança
- Tecnologia embarcada
- Itens de conforto
- Capacidades do veículo
- Recursos Off-Road
- Diferenças entre versões

O **Ford Auto Intelligence** centraliza essas informações e apresenta os dados de maneira organizada e comparável.

A solução permite:

- Receber dados técnicos automotivos
- Padronizar informações
- Consultar detalhes dos veículos
- Comparar diferentes versões
- Destacar diferenças automaticamente
- Selecionar atributos específicos para comparação
- Importar novos veículos através de JSON
- Persistir dados localmente
- Realizar autenticação local de usuários
- Consultar um Assistente de Inteligência Artificial
- Executar em Web e Android
- Instalar o aplicativo através de APK

---

# Arquitetura da Solução

A aplicação está dividida em frontend e backend.

```text
Ford Auto Intelligence
        │
        ├── Mobile / Web
        │   React Native + Expo
        │
        │
        ├── API REST
        │   Node.js + Express
        │
        └── Assistente IA
            Google Gemini
```

O aplicativo mobile/web realiza requisições HTTP para a API REST hospedada publicamente.

A API é responsável por disponibilizar os veículos e intermediar as consultas realizadas ao modelo de Inteligência Artificial.

As informações importadas pelo usuário também podem ser armazenadas localmente através do AsyncStorage.

---

# Backend — ford-auto-intelligence-api

O backend é responsável por:

- Ler o dataset dos veículos
- Transformar e padronizar os dados
- Disponibilizar os veículos através de uma API REST
- Receber perguntas enviadas pelo aplicativo
- Enviar informações dos veículos para o Assistente IA
- Retornar as respostas da IA para o aplicativo

## Tecnologias

- Node.js
- Express
- TypeScript
- Google Gemini
- Google GenAI SDK
- CORS
- dotenv

O backend está hospedado publicamente, permitindo que o APK e a versão Web utilizem a mesma API sem depender de um servidor executado localmente.

---

# Frontend — ford-auto-intelligence-mobile

O frontend é responsável pela interface e interação do usuário com a plataforma.

## Tecnologias

- React Native
- Expo
- TypeScript
- Expo Router
- Axios
- AsyncStorage
- Expo File System

O projeto utiliza **Expo SDK 57**.

---

# Funcionalidades Implementadas

## Autenticação

O aplicativo possui fluxo de:

- Cadastro de usuário
- Login
- Validação dos campos
- Controle de sessão
- Logout

A sessão e os usuários são armazenados localmente utilizando AsyncStorage.

> A autenticação implementada possui finalidade acadêmica/demonstrativa. Em uma aplicação de produção, senhas e autenticação devem ser tratadas por um backend seguro.

---

## Visualização dos Veículos

A tela inicial apresenta os veículos disponíveis na plataforma.

O usuário pode selecionar uma versão para consultar suas especificações técnicas detalhadas.

Entre os veículos utilizados para validação estão versões da Ford Ranger.

---

## Detalhes Técnicos

Cada veículo possui uma tela de detalhes contendo suas especificações técnicas padronizadas.

Isso permite que diferentes veículos utilizem uma estrutura consistente de apresentação.

---

## Comparação Inteligente

O usuário pode selecionar:

- Veículo A
- Veículo B

O sistema apresenta as especificações lado a lado, facilitando a identificação das diferenças entre os veículos.

A mesma versão não pode ser selecionada simultaneamente nos dois lados da comparação.

---

## Busca de Especificações

A tela de comparação possui busca de atributos técnicos.

O usuário pode pesquisar características específicas do veículo e selecionar os atributos desejados para análise.

Exemplos:

- Potência
- Torque
- Bluetooth
- Segurança
- Tecnologia
- Recursos Off-Road

---

## Seleção Livre de Atributos

O usuário pode selecionar quais características deseja visualizar durante a comparação.

Exemplo:

```text
✓ Potência
✓ Torque
✓ Bluetooth
```

Dessa forma, a interface pode apresentar somente as informações relevantes para a análise desejada.

---

## Destaque de Diferenças

A aplicação consegue identificar valores diferentes entre os veículos selecionados e destacar essas diferenças durante a comparação.

Isso facilita a análise das características que diferenciam cada versão.

---

## Resumo Executivo

A tela de comparação apresenta um resumo das informações analisadas, facilitando a identificação dos principais diferenciais entre os veículos selecionados.

---

# Assistente de Inteligência Artificial

O Ford Auto Intelligence possui um Assistente IA integrado ao aplicativo.

O usuário pode realizar perguntas em linguagem natural sobre os veículos disponíveis.

Exemplos:

```text
Qual veículo possui maior potência?
```

```text
Compare a Ranger XLT com a Limited.
```

```text
Quais são as principais diferenças entre essas versões?
```

O aplicativo envia para o backend:

- Pergunta realizada pelo usuário
- Dados dos veículos disponíveis

O backend utiliza o **Google Gemini** para analisar essas informações e retornar uma resposta em português.

A IA é orientada a utilizar os dados fornecidos pela aplicação para responder perguntas sobre as especificações dos veículos, evitando inventar características não disponíveis no dataset.

A chave da API Gemini permanece exclusivamente no backend e não é armazenada no aplicativo mobile.

---

# Importação Dinâmica de JSON

Novos veículos podem ser adicionados através da opção:

```text
Importar Datasheet JSON
```

A funcionalidade está disponível tanto na versão Web quanto no Android.

O aplicativo permite selecionar um arquivo `.json`, processar suas informações e adicionar novos veículos sem necessidade de alterar o código-fonte.

Exemplo:

```json
[
  {
    "id": 99,
    "brand": "Toyota",
    "model": "Hilux",
    "version": "GR-S",
    "specifications": {
      "Potência": "204 cv",
      "Torque": "50,9 kgfm"
    }
  }
]
```

Um arquivo de exemplo para teste pode ser encontrado no projeto:

```text
ford-auto-intelligence-mobile/src/app/novo-veiculo.json
```

> Caso a localização do arquivo seja alterada no projeto, atualize este caminho no README.

---

# Persistência Local

O aplicativo utiliza **AsyncStorage** para armazenar informações localmente.

Entre os dados persistidos estão:

- Sessão do usuário
- Usuários cadastrados
- Veículos importados

Isso permite manter determinadas informações mesmo após fechar e abrir novamente o aplicativo.

---

# Tratamento de Dados Ausentes

Especificações que não possuem informação disponível são apresentadas como:

```text
N/A
```

São considerados indisponíveis valores como:

- `undefined`
- `null`
- string vazia
- `X`

O valor numérico `0` é considerado um valor válido e não é convertido automaticamente para `N/A`.

---

# API Pública

A versão final do aplicativo utiliza uma API hospedada publicamente.

Isso permite que o aplicativo Android instalado através do APK funcione sem depender do endereço IP do computador do desenvolvedor.

Arquivo responsável pela configuração:

```text
ford-auto-intelligence-mobile/services/api.ts
```

A URL pública do backend é configurada como `baseURL` do Axios.

---

# Como Executar o Projeto Localmente

## Pré-requisitos

Para executar o projeto é necessário possuir:

- Node.js
- npm
- Expo
- Navegador Web ou dispositivo Android

---

# Executando o Backend Localmente

Entre na pasta do backend:

```bash
cd ford-auto-intelligence-api
```

## Instalar todas as dependências

Como as dependências já estão registradas no `package.json`, basta executar:

```bash
npm install
```

## Dependências utilizadas no Backend

Caso seja necessário instalar as dependências individualmente:

### Express

```bash
npm install express
```

### CORS

```bash
npm install cors
```

### Variáveis de ambiente

```bash
npm install dotenv
```

### Google Gemini

```bash
npm install @google/genai
```

### Axios

```bash
npm install axios
```

### Manipulação de arquivos Excel

```bash
npm install xlsx
```

## Dependências de desenvolvimento

### TypeScript

```bash
npm install -D typescript
```

### ts-node-dev

```bash
npm install -D ts-node-dev
```

### Tipagens do Node.js

```bash
npm install -D @types/node
```

### Tipagens do Express

```bash
npm install -D @types/express
```

### Tipagens do CORS

```bash
npm install -D @types/cors
```

---

## Configuração do Gemini

Crie um arquivo:

```text
.env
```

dentro de:

```text
ford-auto-intelligence-api/
```

Utilize o arquivo `.env.example` como referência.

Exemplo:

```env
GEMINI_API_KEY=SUA_CHAVE_AQUI
```

> Nunca envie sua chave real para o GitHub. O arquivo `.env` deve permanecer no `.gitignore`.

---

## Executar o Backend

Modo de desenvolvimento:

```bash
npm run dev
```

Por padrão, o servidor local utiliza:

```text
http://localhost:3333
```

Também é possível gerar e executar a versão compilada:

```bash
npm run build
npm start
```

---

# Executando o Mobile

Entre na pasta:

```bash
cd ford-auto-intelligence-mobile
```

## Instalar todas as dependências

```bash
npm install
```

As dependências necessárias já estão registradas no `package.json`.

## Dependências Principais do Mobile

Caso seja necessário instalar alguma dependência individualmente, utilize os comandos abaixo.

### Expo Router

Responsável pela navegação entre as telas:

```bash
npx expo install expo-router
```

### Axios

Responsável pelas requisições HTTP para o backend:

```bash
npm install axios
```

### AsyncStorage

Responsável pela persistência local de usuários, sessão e veículos:

```bash
npx expo install @react-native-async-storage/async-storage
```

### Expo File System

Utilizado na importação de arquivos JSON:

```bash
npx expo install expo-file-system
```

### Expo Document Picker

Utilizado para seleção de documentos/arquivos:

```bash
npx expo install expo-document-picker
```

### Expo Font

```bash
npx expo install expo-font
```

### Expo Image

```bash
npx expo install expo-image
```

### Expo Status Bar

```bash
npx expo install expo-status-bar
```

### Expo Web Browser

```bash
npx expo install expo-web-browser
```

---

## Verificar o Projeto

Antes de executar, é possível verificar se as dependências e configurações estão compatíveis:

```bash
npx expo-doctor
```

---

## Executar o Mobile

```bash
npx expo start
```

O Expo apresentará opções para executar o projeto no:

- Android
- Navegador Web
- Ambiente de desenvolvimento compatível

---

# Executando Localmente na Web

Entre na pasta do projeto mobile:

```bash
cd ford-auto-intelligence-mobile
```

Instale as dependências:

```bash
npm install
```

Execute diretamente em modo Web:

```bash
npx expo start --web
```

A aplicação será aberta no navegador.

Também é possível executar:

```bash
npx expo start
```

e selecionar a opção Web apresentada pelo Expo.

> A versão Web utiliza a API pública configurada em `services/api.ts`.

---

# Instalação do Aplicativo Android

A versão final Android foi gerada através do **EAS Build** no formato APK.

Isso permite instalar o Ford Auto Intelligence diretamente em um dispositivo Android compatível.

## Link para instalação

**Link do APK:**

```text
(https://expo.dev/accounts/roger0n/projects/ford-auto-intelligence-mobile/builds/ba08d67a-7435-44dd-b864-7faad4b416f6)
```

## QR Code

Escaneie o QR Code abaixo utilizando um dispositivo Android para acessar a instalação:


<img width="442" height="513" alt="image" src="https://github.com/user-attachments/assets/e7dd87ca-735e-4ac2-84d8-83f90ee922ac" />



---

# Demonstração do Aplicativo

## Login

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/da4fe553-9f6a-45c8-84f2-c1ec0fc43427" />

## Criar Conta

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/47b29585-ed26-4670-8f97-812576d7f331" />

## Home

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/03e2950e-8ff8-48ab-bced-822c56dd6935" />


## Detalhes do Veículo

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/6667fdc1-c1e4-40e6-9ec8-7ae9f72d8bd0" />

## Comparação de Veículos

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/fe61561c-4f6d-4884-b82f-d996eb4dc77a" />


## Importação de Datasheet JSON

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/76cac96e-b8d6-4b7a-9ed0-44e91a555c8c" />

## Assistente IA

<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/9213f12d-8c40-41ae-9fba-7a400235c294" />


---

# Estrutura do Projeto

```text
projeto/
│
├── ford-auto-intelligence-api/
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── .env.example
│
└── ford-auto-intelligence-mobile/
    ├── app/
    ├── assets/
    ├── services/
    ├── styles/
    ├── app.json
    ├── eas.json
    └── package.json
```

> Arquivos gerados durante build ou contendo informações sensíveis, como `dist`, `node_modules` e `.env`, não devem ser versionados quando estiverem configurados no `.gitignore`.

---

# Build Android

O projeto utiliza **EAS Build** para gerar a versão Android.

O perfil `preview` do arquivo `eas.json` está configurado para gerar um APK instalável:

```json
{
  "preview": {
    "distribution": "internal",
    "android": {
      "buildType": "apk"
    }
  }
}
```

Para gerar uma nova versão:

```bash
npx eas-cli build --platform android --profile preview
```

Após finalizar o processo, o EAS disponibiliza a versão gerada para instalação.

---

# Segurança

Informações sensíveis não são armazenadas diretamente no código-fonte.

A chave utilizada pelo Google Gemini é configurada no backend através da variável de ambiente:

```text
GEMINI_API_KEY
```

O arquivo `.env` não deve ser enviado para o GitHub.

O repositório disponibiliza apenas:

```text
.env.example
```

como referência para configuração.

---

# Tecnologias Utilizadas

## Frontend

- React Native
- Expo SDK 57
- TypeScript
- Expo Router
- Axios
- AsyncStorage
- Expo File System

## Backend

- Node.js
- Express
- TypeScript
- Google Gemini
- Google GenAI SDK
- CORS
- dotenv

## Infraestrutura

- API hospedada em ambiente Cloud
- EAS Build para geração do APK Android

---

# Integrantes

- 3ESA- Augusto Ferreira — RM 557709
- 3ESA- Heitor Prestes — RM 554823
- 3ESR- Lucca Ribeiro — RM 556668
