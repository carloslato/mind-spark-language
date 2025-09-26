import { serve } from "bknd/adapter/node";
import { createApp, em, entity, text, number } from "bknd";
// Actually, all it takes is the following line:
// serve();



const schema = em(
  {
    posts: entity("posts", {
      // "id" is automatically added
      title: text().required(),
      slug: text().required(),
      content: text(),
      views: number(),
    }),
    comments: entity("comments", {
      content: text(),
    }),

    // relations and indices are defined separately.
    // the first argument are the helper functions, the second the entities.
  },
  ({ relation, index }, { posts, comments }) => {
    relation(comments).manyToOne(posts);
    // relation as well as index can be chained!
    index(posts).on(["title"]).on(["slug"], true);
  },
);

// to get a type from your schema, use:
// type Database = (typeof schema)["DB"];


// this is optional, if omitted, it uses an in-memory database
/** @type {import("bknd/adapter/node").NodeBkndConfig} */
const config = {
   connection: {
      url: "file:data.db",
   },
   initialConfig: {
      data: schema.toJSON(),
      auth: {
         enabled: true,
         basepath: "/api/auth",
         entity_name: "users",
         allow_register: true,
         jwt: {
            secret: "9e9e620d86ca525ed5990948c3d7196c",
            alg: "HS256",
            fields: ["id", "email", "role"]
         },
      },
      media: {
         enabled: true,
         adapter: {
            type: "local",
            config: {
               path: "./uploads",
            },
         },
      },
   },
};

serve(config);
