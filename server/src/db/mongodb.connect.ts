import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/Bai_4";

class Database {
  private static instance: Database | null = null;

  private constructor() {
    this.connection();
    this.handlerExit();
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  connection() {
    mongoose
      .connect(connectionString)
      .then(() => {
        console.log("Connection mongoDB successfully!");
      })
      .catch((error) => {
        console.log("Connection mongoDB failed\n" + error);
      });
  }

  handlerExit() {
    process.on("SIGINT", async () => {
      console.log("The database is disconnecting...");
      await mongoose.connection.close();
      console.log("The database is disconnected! See you bro.");
      process.exit(0);
    });
  }
}

export default Database;
