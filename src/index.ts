import 'dotenv/config.js'
import 'reflect-metadata'
import 'source-map-support/register.js'
import { resolvers } from '@generated/type-graphql'
import prisma from '@prisma/client'
import { ApolloServer } from 'apollo-server'
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import { PubSub } from 'graphql-subscriptions'
import { buildSchema } from 'type-graphql'

const isProduction = process.env.NODE_ENV === 'production'

const PORT = Number(process.env.PORT) || 8080
const HOST = process.env.HOST || '0.0.0.0'

await new ApolloServer({
  schema: await buildSchema({ resolvers }),
  context: {
    prisma: new prisma.PrismaClient(),
    pubsub: new PubSub(),
  },
  cors: true,
  plugins: [
    isProduction
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
}).listen({ port: PORT, host: HOST })

console.log(String.raw`
   _____      _                        _____                 _      ____  _                 _____ _____ 
  |  __ \    (_)                      / ____|               | |    / __ \| |          /\   |  __ \_   _|
  | |__) | __ _ ___ _ __ ___   __ _  | |  __ _ __ __ _ _ __ | |__ | |  | | |         /  \  | |__) || |  
  |  ___/ '__| / __| '_ ' _ \ / _' | | | |_ | '__/ _' | '_ \| '_ \| |  | | |        / /\ \ |  ___/ | |  
  | |   | |  | \__ \ | | | | | (_| | | |__| | | | (_| | |_) | | | | |__| | |____   / ____ \| |    _| |_ 
  |_|   |_|  |_|___/_| |_| |_|\__,_|  \_____|_|  \__,_| .__/|_| |_|\___\_\______| /_/    \_\_|   |_____|
                                                      | |                                               
                                                      |_|                                               
`)
