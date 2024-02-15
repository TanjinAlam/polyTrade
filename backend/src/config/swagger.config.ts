import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
    .setTitle('polyTrade')
    .setDescription('This is the collection of PolyTrade Backend APIs.')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build()
