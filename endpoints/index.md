# Mapeamento de endpoints

-   Membros

    -   Buscar Membros de um Servidor _ok_

-   Mensagens

    -   Inserir Mensagem em Canal de Texto _ok_
    -   Ler Mensagens de um Canal de Texto _ok_
    -   Adicionar reação á uma mensagem _ok_
    -   Remover a reação de uma mensagem _ok_

-   Tópicos

    -   Inserir Tópicos em Canal de Texto _ok_
    -   Ler Mensagens de um Tópico em um Canal de Texto
    -   Ler Mensagens de Múltiplos Tópicos em um Canal de Texto
    -   Ler Mensagens de um usuário em um ou Múltiplos Canais de Texto

-   Permissões

    -   Cargos

        -   Criar cargo
        -   Adicionar cargo á um usuário
        -   Remover cargo de um usuário

    -   Canais
        -   Alterar Permissão de um Canal de Texto
        -   Adicionar/Remover Membro a Canal Privado
        -   Adicionar/Remover Cargo a Canal Privado
        -   Listar permissões dos canais

-   Outros
    -   Buscar canais dentro de uma categoria

# Endpoints

## Membros

### Buscar Membros de um Servidor

**GET** `/guilds/{guild.id}/members`

---

## Mensagens

### Inserir mensagem em canal

**POST** `/channels/{channel.id}/messages`

```js
{
    "content": "Hello World!",
    "tts": true
}
```

O parâmetro `"message_reference": { "message_id": _id_mensagem_ }` pode ser passado para enviar a mensagem como uma resposta

---

### Buscar mensagens de um canal

**GET** `/channels/{channel.id}/messages?limit={limit}&before={message.id}`

O máximo de mensagens listadas é 100. Para pegar as mensagens antes disso, é necessário passar o id da última mensagem.

---

### Adicionar reação à uma mensagem

**PUT** `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`

---

### Remover reação de uma mensagem

**DELETE** `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`

---

## Tópicos

### Inserir um tópico

**POST** `/channels/{channel.id}/threads`

```js
{
    "name": "Hello World!",
    "type": 11
}
```

---
