import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS - allow multiple origins
  const allowedOrigins = [
    'http://localhost:3000',      // Vite default port
    'http://localhost:3001',      // TanStack Start port (localhost)
    'http://127.0.0.1:3001',      // TanStack Start port (IP address)
    'http://localhost:5173',      // Vite default dev server port
    'http://127.0.0.1:5173',      // Vite default dev server port (IP address)
    'http://localhost:4173',      // Vite preview port
    'http://127.0.0.1:4173',      // Vite preview port (IP address)
    'https://jsonwebcisc474.vercel.app',
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list or matches a Vercel preview URL
      if (allowedOrigins.includes(origin as string) || (typeof origin === 'string' && origin.endsWith('.vercel.app'))) {
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
