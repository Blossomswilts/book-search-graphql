const express = require("express");
const path = require("path");
const db = require("./config/connection");
// const routes = require("./routes"); // routes replaced by Apollo Server

const app = express();
const PORT = process.env.PORT || 3001;

//Add Apollo Server
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");

//New Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, //middleware function
});

//Integrate Apollo Server with middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
    //catch all route
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
    app.listen(PORT, () => {
        //Shows where server is running
        console.log(`API server running on port ${PORT}!`);
        //log where we can go to test our GQL API
        console.log(
            `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
        );
    });
});
