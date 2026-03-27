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
- [X]  O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [X]  Deve ser possível criar uma transação
- [X]  Deve ser possível deletar uma transação
- [X]  Deve ser possível editar uma transação
- [X]  Deve ser possível listar todas as transações
- [X]  Deve ser possível criar uma categoria
- [X]  Deve ser possível deletar uma categoria
- [X]  Deve ser possível editar uma categoria
- [X]  Deve ser possível listar todas as categorias

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