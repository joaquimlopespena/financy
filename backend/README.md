finance-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── server.ts
│   ├── app.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   └── database.ts
│   │
│   ├── graphql/
│   │   ├── schema.ts
│   │   ├── context.ts
│   │   └── scalars/
│   │       └── date.scalar.ts
│   │
│   ├── modules/
│   │   ├── users/
│   │   │   ├── dto/
│   │   │   │   ├── create-user.input.ts
│   │   │   │   └── login.input.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.resolver.ts
│   │   │   └── user.types.ts
│   │   │
│   │   ├── categories/
│   │   │   ├── dto/
│   │   │   │   ├── create-category.input.ts
│   │   │   │   └── update-category.input.ts
│   │   │   ├── category.service.ts
│   │   │   ├── category.resolver.ts
│   │   │   └── category.types.ts
│   │   │
│   │   └── transactions/
│   │       ├── dto/
│   │       │   ├── create-transaction.input.ts
│   │       │   └── update-transaction.input.ts
│   │       ├── transaction.service.ts
│   │       ├── transaction.resolver.ts
│   │       └── transaction.types.ts
│   │
│   ├── shared/
│   │   ├── errors/
│   │   │   ├── app-error.ts
│   │   │   ├── auth-error.ts
│   │   │   └── validation-error.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── hash.ts
│   │   │   ├── jwt.ts
│   │   │   └── format-date.ts
│   │   │
│   │   └── types/
│   │       └── auth-user.ts
│   │
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   │
│   └── lib/
│       └── prisma.ts
│
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md