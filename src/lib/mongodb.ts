import mongoose from "mongoose";
import dns from "dns";

// Fix Node.js DNS resolution issues on Windows
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (error) {
  console.error("Failed to set DNS servers:", error);
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local",
  );
}

// Extend the NodeJS global type to cache the mongoose connection
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
