const server = require('fastify')();
const HOST = process.env.HOST || "127.0.0.1";
/* istanbul ignore next */
const PORT = process.env.PORT || 8000;
const Recipe = require('./recipe.js');

server.get('/', async (req, reply) => {
    return "Hello from distributed node";
});

server.get('/recipes/:id', async (req, reply) => {
    const recipe = new Recipe(req.params.id);
    await recipe.hydrate();
    return recipe;
});

(async () => {
    server.listen({
        host: HOST,
        port: PORT
    }, (err, address) => {
        /* istanbul ignore next */
        if (err) throw err;
        console.log(`server running at ${address}\n`);
    });
})();
