const express = require("express");
const cors = require("cors");
const db = require("./db/index.js");

const { InMemoryLRUCache } = require("@apollo/utils.keyvaluecache");
const {
  ApolloServer,
  gql,
  AuthenticationError,
} = require("apollo-server-express");

const schema = require("./endpoints/index");
const config = require("./config/config");
const port = config.port || 4000;

const app = express();

app.get("/", (req, res) => {
  res.sendStatus(200);
});

db.on("open", () => {
  console.log("DB connected successfully");
  ApolloServerAsync();
  app.listen(port, () => {
    console.log(`Server is running at http:://localhost:${port}/graphql`);
  });
});

db.on("error", (err) => {
  console.log("DB not connected", err);
});

app.use(
  cors({
    origin: "*",
  })
);

const ApolloServerAsync = async () => {
  const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
    cache: new InMemoryLRUCache(),

    //   context: async ({ req }) => {
    //     // get the user token from the headers
    //     const token = req.headers.authorization || "";

    //     if (token === "") {
    //       return;
    //     }

    //     const Token = await token.replace("Bearer", "").replace(/\s/g, "");
    //     const user = await userService.getUserByToken(Token);

    //     if (!user) throw new AuthenticationError("User not found");

    //     return { user };
    //   },
  });
  await server.start();
  server.applyMiddleware({ app });
};
