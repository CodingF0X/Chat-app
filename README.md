# Chat Web Application

In this project, I demonstrate how to build a **scalable**, **maintainable** chat application using **NestJS** with a Clean-Architecture mindset. The goal is to show how Nest’s module system, built-in dependency injection, and clear separation of concerns let you compose robust real-time features with GraphQL and WebSockets.

---

## Application Functionality

- **Real-time messaging**  
  Users can send and receive text messages in real time via GraphQL subscriptions over WebSockets (using the [graphql-ws](https://github.com/enisdenjo/graphql-ws) package).  
- **GraphQL API**  
  I chose GraphQL over REST because:
  - **Single endpoint**: simplifies client-server communication.  
  - **Type safety**: strong typing of queries/mutations which will make sure fewer runtime errors.  
  - **Subscriptions**: first-class support for real-time data push.  
- **Authentication & Authorization**  
  Users sign in via a **local** (email/password) strategy, receive a JWT in an HTTP-only cookie, and subsequent requests (including GraphQL and WebSocket connections) are guarded by JWT-based guards.

---

## Architecture Design

I follow a **four-layer Clean Architecture**:

1. **Domain Layer**  
   - **Entities** (`User`, `Chat`, `Message`, `JwtPayload`)  
2. **Application Layer (Use Cases)**  
   - **Services** (`UsersService`, `ChatsService`, `MessagesService`, `AuthService`) encapsulate business rules and logic (e.g. hashing passwords, publishing events, composing MongoDB aggregation pipelines are a few to mention).  
3. **Interface Adapters**  
   - **Resolvers** (GraphQL) and **Controllers** (REST endpoints for file upload, auth functionality and count APIs).  
   - **Guards** (`JwtAuthGuard`, `GqlAuthGuard`, `LocalAuthGuard`) and **Passport Strategies** (`JwtStrategy`, `LocalStrategy`) translate framework inputs into calls to the Application layer to authenticate and authorize the user to make the right API call.  
4. **Infrastructure Layer**  
   - **Nest Modules** (`UsersModule`, `ChatsModule`, `MessagesModule`, `AuthModule`) wire everything together.  
   - **Repositories** (`UserRepository`, `ChatRepository`) extend an abstract MongoDB repository; **Mongoose Schemas** (`UserDocument`, `ChatDocument`, `MessageDocument`) define persistence models.  
   - **Third-party services**: AWS S3 for profile image storage (`S3Service`), in-memory PubSub for GraphQL subscriptions, and Nest’s `JwtModule`/`ConfigService` for secrets management.

This separation makes sure that the core logic remains framework-agnostic and testable, while NestJS simply wires the pieces using dependency injection.
### UML Class Diagram
**Chat Module** 

![Chat-class-uml](https://github.com/user-attachments/assets/38091729-61ee-4e76-abec-5d7e55c21454)

**User Module** 

![mmea](https://github.com/user-attachments/assets/026be6a2-4c32-4dd4-9c8f-bc5ed15897b4)

**Auth Module**

![auth-class-uml](https://github.com/user-attachments/assets/e42ca55e-1391-4b7e-b6a0-1f0dae18d231)

---

## Data Modeling

- **MongoDB / Mongoose**  
  - **AbstractEntity**: base schema with `_id: ObjectId` and `createdAt` / `updatedAt` from `AbstractEntity`.  
  - **UserDocument** → persisted user data (email, hashed password) + `User` domain entity returned to clients.  
  - **ChatDocument** → each chat has a `userId` owner, a `name`, and an array of embedded `MessageDocument` subdocuments.  
  - **MessageDocument** → stores `content`, `sender` (ObjectId), and `createdAt`; transformed into a `Message` GraphQL object type on the way out.  
- **GraphQL Types & Inputs**  
  - **Object Types** (`User`, `Chat`, `Message`) mirror the domain entities.  
  - **Input Types** (`CreateUserInput`, `UpdateUserInput`, `CreateChatInput`, `UpdateChatInput`, `CreateMessageInput`) enforce validation via `class-validator`.  
  - **Args Types** (`PaginationArgs`, `GetMessagesArgs`, `MessageCreatedArgs`) support cursor-style pagination and subscription filters.

  ### DB worklolad: 

  ![Chat App - Workload](https://github.com/user-attachments/assets/2d763072-353f-4d89-8909-979dab4761e8)


  ### Conceptual Data Model

![Chat App - Conceptual Model](https://github.com/user-attachments/assets/e1c609b5-0fcf-4038-9f81-e28e5292f296)

---

## Implementation

### Technical Overview
![Chat App - Technical Overview](https://github.com/user-attachments/assets/59191a80-21b1-488b-bf33-357aed4338f3)

### Technologies

**Backend**  
- **Framework**: NestJS v11 (modules, DI, pipes, guards, interceptors)  
- **API**:  
  - Apollo GraphQL (`@nestjs/graphql`, `@apollo/server`)  
  - WebSocket Subscriptions via `graphql-ws` & `graphql-subscriptions`  
- **Database**: MongoDB with Mongoose (`@nestjs/mongoose`)  
- **Auth**: Passport.js strategies (`local`, `jwt`), JWT in HTTP-only cookies  
- **File Storage**: AWS S3 (`@aws-sdk/client-s3`) for user profile images  
- **Logging**: Pino (`nestjs-pino`)  
- **Validation**: `class-validator` & `joi` for request payloads  
- **Migrations**: `migrate-mongo`  
- **Testing**: Jest, Supertest  

**Frontend**

- **Framework**: React v19, Vite

- **GraphQL** Client: Apollo Client (@apollo/client)

- **Real-time**: graphql-ws for subscriptions over WebSockets

- **Styling**: MUI (Material UI), styled-components

- **Routing**: React Router v7

- **State & Caching**: Apollo’s in-memory cache, localForage for offline caching

- **Tooling**: ESLint, Prettier, GraphQL Codegen 

```bash
# key NPM scripts to run the server: 

npm run start:dev       # start in watch mode
npm run build            # compile to dist/
npm run test             # run unit tests
npm run test:e2e         # run end-to-end tests

# Key NPM scripts to run the React APP
npm run dev           # start Vite development server
npm run build         # production build
npm run codegen       # generate GraphQL types/hooks
