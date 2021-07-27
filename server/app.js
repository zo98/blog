const Koa = require("koa");
const app = new Koa();
const koa_body = require("koa-body");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const next_app = next({ dev });
const handler = next_app.getRequestHandler();

// router
const articleRouter = require("./router/articleRouter");
const classifyRouter = require("./router/classifyRouter");
const userRouter = require("./router/userRouter");

app.use(koa_body());

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(articleRouter.routes(), articleRouter.allowedMethods());
app.use(classifyRouter.routes(), classifyRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());

next_app.prepare().then(() => {
  app.use(async (ctx, next) => {
    await handler(ctx.req, ctx.res);
    ctx.respond = false;
  });
  app.listen(3000, () => {
    console.log("http://localhost:3000");
  });
});
