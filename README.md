# Tutorial: Como Utilizar a Evolution API

Este documento serve como um guia rápido para realizar as operações básicas com a sua instância da Evolution API, como criar uma nova instância, obter o QR Code e enviar mensagens.

## Pré-requisitos

- A sua instância da **Evolution API** deve estar em execução no Docker.
- A sua aplicação **CRM-ZAP** deve estar em execução (`npm run dev`).
- O seu ficheiro `.env` deve estar configurado corretamente com `EVOLUTION_API_URL` e `EVOLUTION_API_KEY`.

---

## 1. Criar uma Nova Instância e Obter o QR Code

A forma mais simples de criar uma nova instância é através da própria aplicação CRM-ZAP.

1.  **Abra a Aplicação**: Navegue para `http://localhost:3000` no seu navegador.
2.  **Clique em "Criar instância"**: Isto abrirá uma caixa de diálogo.
3.  **Preencha o Formulário**:
    - **Nome da Instância**: Um nome único para a sua conexão (ex: `vendas-principal`).
    - **Número (Telefone)**: O número de telefone que será associado, em formato internacional (ex: `+5511999998888`).
4.  **Clique em "Criar Instância e Gerar QR Code"**.
5.  **Escaneie o QR Code**: Se a comunicação com a API for bem-sucedida, um QR Code será exibido. Utilize a aplicação WhatsApp no seu telemóvel para o escanear e conectar a sua conta.

Este processo irá chamar o endpoint `/api/instances` da sua aplicação, que por sua vez comunica com a Evolution API para criar a instância e retornar o QR Code.

---

## 2. Enviar uma Mensagem de Texto

Depois de uma instância estar conectada, pode enviar mensagens através de endpoints da Evolution API. O exemplo abaixo mostra como enviar uma mensagem de texto simples.

Pode utilizar ferramentas como `curl`, Postman ou Insomnia para fazer esta requisição diretamente à sua Evolution API.

### Exemplo com `curl`

Substitua os valores `nome-da-sua-instancia`, `sua-chave-secreta-para-evolution` e `numero-destino` pelos valores corretos.

```bash
curl --location 'http://localhost:8080/message/sendText/nome-da-sua-instancia' \
--header 'apikey: sua-chave-secreta-para-evolution' \
--header 'Content-Type: application/json' \
--data '{
    "number": "numero-destino",
    "options": {
        "delay": 1200,
        "presence": "composing"
    },
    "textMessage": {
        "text": "Olá! Esta é uma mensagem de teste enviada através da Evolution API."
    }
}'
