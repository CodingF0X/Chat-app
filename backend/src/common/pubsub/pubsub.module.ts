import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { InjectionTokens } from '../constants/injection.token';

@Module({
  imports: [],
  providers: [
    {
      provide: InjectionTokens.PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [InjectionTokens.PUB_SUB],
})
export class PubSubModule {}
