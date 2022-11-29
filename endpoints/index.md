# Mapeamento de endpoints

- [Membros](#membros)

  - [Buscar Membros de um Servidor](#buscar-membros-de-um-servidor)

- [Mensagens](#mensagens)

  - [Inserir Mensagem em Canal de Texto](#inserir-mensagem-em-canal)
  - [Ler Mensagens de um Canal de Texto](#buscar-mensagens-de-um-canal)
  - [Adicionar reação á uma mensagem](#adicionar-reação-à-uma-mensagem)
  - [Remover a reação de uma mensagem](#remover-reação-de-uma-mensagem)

- [Tópicos](#tópicos)

  - [Inserir Tópicos em Canal de Texto](#inserir-um-tópico)
  - [Ler Mensagens de um Tópico em um Canal de Texto](#ler-mensagens-de-um-tópico-em-um-canal-de-texto)
  - Ler Mensagens de Múltiplos Tópicos em um Canal de Texto // Loop
  - Ler Mensagens de um usuário em um ou Múltiplos Canais de Texto // Loop

- [Cargos](#cargos)

  - [Criar cargo](#criar-cargo)
  - [Adicionar cargo à um usuário](#adicionar-cargo-à-um-usuário)
  - [Remover cargo de um usuário](#remover-cargo-de-um-usuário)

- [Canais](#canais)
  - [Alterar Permissão de um Canal de Texto](#alterar-permissões-de-um-canal-de-texto)
  - [Adicionar/Remover Membro a Canal Privado](#adicionarremover-membro-a-canal-privado)
  - [Adicionar/Remover Cargo a Canal Privado](#alterar-permissões-de-um-canal-de-texto) // Ver **Alterar permissões de um canal de texto**
  - Listar permissões dos canais // Loop
  - [Listar canais dentro de uma categoria](#listar-canais-dentro-de-uma-categoria)

# BaseUrl: **`https://discord.com/api/v10`**

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

### Ler Mensagens de um Tópico em um Canal de Texto

**GET** `/channels/{topico}/messages`

---

## Cargos

### Criar cargo

**POST** `/guilds/{guild.id}/roles`

```js
{
  "name": "Role",
  "permissions": 1024,
  "color": "240",
  "hoist": false,
  "icon": null,
  "unicode_emoji": null,
  "mentionable": false
}
```

---

### Adicionar cargo à um usuário

**PUT** `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`

---

### Remover cargo de um usuário

**DELETE** `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`

---

## Canais

### Alterar permissões de um canal de texto

**PATCH** `/channels/{channel.id}`

```js
{
  "name": "Channel",
  "type": 0,
  "permission_overwrites": [
    {
      "id": "336169222902251521", // {user.id}
      "type": 1,
      "allow": "805307408", // {permissions}
      "deny": "0"
    }
  ],
}
```

---

### Adicionar/Remover Membro a Canal Privado

**PUT** `/channels/{channel.id}/permissions/{user.id}`

```js
{
  "type": 1,
  "allow": 3072
  "deny": 0
}
```

**DELETE** `/channels/{channel.id}/permissions/{user.id}`

---

### Listar canais dentro de uma categoria

**GET** `/guilds/{guild.id}/channels`

A chave `parent_id` representa a categoria onde o canal está localizado
