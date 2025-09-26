import { serve } from '@hono/node-server'
import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { createHonoHandler } from '@zenstackhq/server/hono';
import { type Context, Hono } from 'hono';
import { auth } from './lib/auth.ts'
import { cors } from "hono/cors";
import { RestApiHandler } from '@zenstackhq/server/api';
import { swaggerUI } from '@hono/swagger-ui'
import openApiDoc from '../mind-spark-api.json' with { type: 'json' }



const prisma = new PrismaClient();
const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null
	}
}>();

app.use(
	"/api/*", // or replace with "*" to enable cors for all routes
	cors({
		origin: ["http://localhost:5173", "http://localhost:3000", process.env.SERVICE_URL_FRONTEND || 'http://w4cg8kow84ww884884oo8g08.146.235.223.8.sslip.io'], // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS", "UPDATE", "PUT"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);
app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
  	if (!session) {
    	c.set("user", null);
    	c.set("session", null);
    	return next();
  	}
  	c.set("user", session.user);
  	c.set("session", session.session);
    // console.log('yes auth server', session);
  	return next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));


app.use(
    '/api/model/*',
    createHonoHandler({
        getPrisma: (ctx) => {
          const user = ctx.get('user');
          return enhance(prisma, { user: user });
        },
        handler: RestApiHandler({ endpoint: `${ process.env.SERVICE_URL_BACKEND || "http://localhost:3000" }/api/model` })  
    })
);

app.get('/hello', (c) => {
  return c.text('Hello Hono!')
})

app.get('/openapi.json', (c) => c.json({...openApiDoc,  servers: [
      {
        url: '/api/model', // 👈 el endpoint base de ZenStack
        description: 'ZenStack default endpoint'
      }
    ]}))

app.get('/api/docs', swaggerUI({
    url: '/openapi.json', // Swagger UI buscará aquí el spec
  }))

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
