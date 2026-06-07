# Pokémon Counter Bot

Bot para Discord que analisa Pokémon e responde diretamente no chat utilizando IA local.

## 1. Criar o Bot no Discord

1. Acesse o Discord Developer Portal.
2. Clique em **New Application**.
3. Escolha um nome para o bot.
4. Abra a aba **Bot**.
5. Clique em **Add Bot**.

---

## 2. Habilitar Permissões Necessárias

Na aba **Bot**, ative:

* Message Content Intent

Salve as alterações.

---

## 3. Copiar o Token

Ainda na aba **Bot**:

1. Clique em **Reset Token** (se necessário).
2. Copie o token gerado.

---

## 4. Configurar o Projeto

Abra o arquivo:

```env
.env
```

Substitua pelo token do seu bot:

```env
DISCORD_TOKEN=COLE_SEU_TOKEN_AQUI
```

Salve o arquivo.

---

## 5. Adicionar o Bot ao Seu Servidor

Abra a aba:

**OAuth2 → URL Generator**

Marque:

### Scopes

* bot

### Bot Permissions

* View Channels
* Send Messages
* Read Message History

Copie a URL gerada.

Abra a URL no navegador e adicione o bot ao seu servidor.

---

## 6. Subir o Projeto

Na pasta do projeto execute:

```bash
docker compose up -d
```

Na primeira execução o Docker irá:

* baixar o Ollama
* baixar o modelo de IA
* iniciar o bot automaticamente

A primeira inicialização pode levar alguns minutos dependendo da velocidade da internet.

---

## 7. Verificar se Está Online

Execute:

```bash
docker compose logs -f
```

Você deverá ver uma mensagem semelhante a:

```text
Bot online: MeuBot#1234
```

---

## 8. Testar

No canal onde o bot possui acesso, envie:

```text
!counter pikachu
```

Outros exemplos:

```text
!counter charizard
```

```text
!counter mewtwo
```

```text
!counter gengar
```

O bot responderá diretamente no canal com a análise.

---

## Atualizando o Projeto

Após atualizar os arquivos:

```bash
docker compose down
docker compose up -d --build
```

---

## Parando o Bot

```bash
docker compose down
```

---

## Suporte

Se o bot não responder:

1. Verifique se o token está correto no arquivo `.env`
2. Verifique se o bot foi adicionado ao servidor
3. Confirme que o **Message Content Intent** está habilitado
4. Verifique os logs:

```bash
docker compose logs -f
```
