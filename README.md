# CRM-ZAP: Gestão de Clientes para WhatsApp

CRM-ZAP é uma aplicação web de gestão de relacionamento com o cliente (CRM) criada para se integrar perfeitamente com o WhatsApp. Utilizando a [Evolution API](https://doc.evolution-api.com/), esta plataforma permite que as equipas de vendas e suporte comuniquem, administrem contactos e automatizem conversas de forma centralizada.

## ✨ Funcionalidades Principais

- **Gestão de Múltiplas Contas**: Conecte e gira vários números de WhatsApp como canais de comunicação.
- **Interface de Utilizador Moderna**: Construída com [shadcn/ui](https://ui.shadcn.com/) e [Tailwind CSS](https://tailwindcss.com/) para uma experiência de utilização limpa e reativa.
- **Autenticação Segura**: Sistema de utilizadores implementado com [NextAuth.js](https://next-auth.js.org/).
- **Base de Dados Robusta**: Interage com uma base de dados PostgreSQL através do [Drizzle ORM](https://orm.drizzle.team/), garantindo segurança e performance.
- **Validação de Dados**: Formulários com validação robusta no frontend e backend utilizando [Zod](https://zod.dev/) e [React Hook Form](https://react-hook-form.com/).
- **Comunicação em Tempo Real**: Integração com a Evolution API para criar instâncias, verificar o estado e enviar mensagens.

## 🚀 Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) (com Turbopack)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) e [shadcn/ui](https://ui.shadcn.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Base de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Autenticação**: [NextAuth.js](https://next-auth.js.org/)
- **API WhatsApp**: [Evolution API](https://doc.evolution-api.com/)
- **Gestão de Estado de API**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Validação**: [Zod](https://zod.dev/) e [React Hook Form](https://react-hook-form.com/)
- **Containerização**: [Docker](https://www.docker.com/)

## ⚙️ Pré-requisitos

Para executar este projeto localmente, vai precisar de:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Um gestor de pacotes como [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/get-started)

```bash
git clone [https://github.com/seu-utilizador/crm-zap.git](https://github.com/seu-utilizador/crm-zap.git)
cd crm-zap
