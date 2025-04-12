import { Logger, Module, UnauthorizedException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './common/config/database.config';
import { validationSchema } from './common/config/validation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './common/config/mongoose.config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { DBMigrationService } from './common/database/db-migration.config';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { PubSubModule } from './common/pubsub/pubsub.module';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
      ignoreEnvFile: false,
      load: [databaseConfig],
      validationSchema: validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongooseConfig,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: join(process.cwd(), `src/schema/gqp`),
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: any) => {
              try {
                const request = context.extra.request;
                const user = authService.verifyWebSocket(request);
                context.user = user;
                console.log(context)
              } catch (error) {
                new Logger().error(error);
                throw new UnauthorizedException();
              }
            },
          },
        },
      }),
      imports: [AuthModule],
      inject: [AuthService],
    }),
    UsersModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            autoLogging: false,
          },
        },
      },
    }),
    AuthModule,
    ChatsModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService, DBMigrationService],
})
export class AppModule {}
