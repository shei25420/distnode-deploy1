const server = require('fastify')();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;
const Recipe = require('recipe.js');

server.get('/', async (req, reply) => {
    return "Hello from distributed node";
});

server.get('/recipes/:id', async (req, reply) => {
    const recipe = new Recipe(req.params.id);
    await recipe.hydrate();
    return recipe;
});

(async () => {
    await server.listen({
        host: HOST,
        port: PORT
    });
    console.log(`Server running at ${HOST}:${PORT}\n`);
})();
