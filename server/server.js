const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const express = require("express");
const { expressMiddleware } = require("./utils/auth");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");

const app = express();

const PORT = process.env.PORT || 3001;

//New Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, //middleware function
});

//Integrate Apollo Server with middleware
const startServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: authMiddleware,
        })
    );

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/dist")));

        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"));
        });
    }

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

// Call the async function to start the server
startApolloServer();
