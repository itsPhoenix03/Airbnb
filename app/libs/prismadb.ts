import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

// * Done to prevent making of many prisma clients due the next13 hot reloading
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
