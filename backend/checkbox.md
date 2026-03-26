## Tabelas Criadas

    - users
        - id
        - name
        - email
        - password
        - createdAt
        - updatedAt

    - categories
        - id
        - name
        - userId
        - createdAt
        - updatedAt
    
    - transactions
        - id
        - title
        - amount
        - type (INCOME ou EXPENSE)
        - description opcional
        - transactionDate
        - userId
        - categoryId
        - createdAt
        - updatedAt
    

## Funcionalidades e Regras

- [X]  O usuário pode criar uma conta e fazer login
- [ ]  O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [ ]  Deve ser possível criar uma transação
- [ ]  Deve ser possível deletar uma transação
- [ ]  Deve ser possível editar uma transação
- [ ]  Deve ser possível listar todas as transações
- [ ]  Deve ser possível criar uma categoria
- [ ]  Deve ser possível deletar uma categoria
- [ ]  Deve ser possível editar uma categoria
- [ ]  Deve ser possível listar todas as categorias

---

## Ferramentas

É obrigatório o uso de:

- TypeScript
- GraphQL
- Prisma
- SQLite

## Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. 
Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. 
Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias.

```
JWT_SECRET=
DATABASE_URL=
```

Caso adicione variáveis adicionais, lembre-se de incluí-las no `.env.example`. 

##