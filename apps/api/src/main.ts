import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS - allow multiple origins
  const allowedOrigins = [
    'http://localhost:3001',
    'https://jsonwebcisc474.vercel.app',
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list or matches a Vercel preview URL
      if (allowedOrigins.includes(origin) || (typeof origin === 'string' && origin.endsWith('.vercel.app'))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  console.log(`API server starting on ${host ? host + ':' : ''}${port}`);
  console.log(`CORS enabled for origins: ${allowedOrigins.join(', ')} and *.vercel.app`);
  
  await app.listen(port, host);
}

void bootstrap();
