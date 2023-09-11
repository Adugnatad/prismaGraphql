import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const typeDefs = `#graphql
  type Query {
    products: [Product]
    product(id: ID!): Product
  }
  type Product {
    id: ID!
    name: String!
    price: Int!
    available_quantity: Int!
    picture: String
    order: [Order!]
  }
  type Order {
    id: ID!
    order_amount: ID!
    product_id: ID!
    product: Product!
  }
  type Mutation {
    addProduct(product: AddProductInput!): Product
  }
  input AddProductInput {
    name: String!
    price: Int!
    available_quantity: Int!
    picture: String
  }

`;

export const resolvers = {
  Query: {
    products() {
      return prisma.product.findMany();
    },
    product(_: any, args: any) {
      return prisma.product.findUnique({
        where: {
          id: parseInt(args.id),
        },
      });
    },
  },
  Mutation: {
    addProduct(_: any, args: any) {
      let product = {
        ...args.product,
      };
      const createdProduct = prisma.product.create({
        data: product,
      });
      return createdProduct;
    },
  },
};
