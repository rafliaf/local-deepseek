import Dexie, { Table } from "dexie";


export interface DEX_Thread {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface DEX_Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  thread_id: string;
  thought: string;
  created_at: Date;
}

class ChatDB extends Dexie {
  threads!: Table<DEX_Thread, string>;
  messages!: Table<DEX_Message, string>;

  constructor() {
    super("chatdb");

    this.version(1).stores({
      threads: "id, title, created_at, updated_at", // Ensure 'id' is always used
      messages: "id, role, content, thought, thread_id, created_at", // Ensure 'id' is always used
    });

    this.threads.hook("creating", (_key, obj) => {
      obj.created_at = new Date();
      obj.updated_at = new Date();
    });

    this.messages.hook("creating", (_key, obj) => {
      obj.created_at = new Date();
    });
  }

  async createThread(title: string) {
    const id = crypto.randomUUID();

    await this.threads.add({
      id,
      title,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return id
  }

  async getAllThreads() {
    return this.threads.reverse().sortBy("updated_at");
  }

  async createMessage(
    message: Pick<DEX_Message, "role" | "content" | "thread_id" | "thought">
  ) {
    const messageId = crypto.randomUUID();

    await this.transaction("rw", [this.messages, this.threads], async () => {
      await this.messages.add({
        ...message,
        id: messageId,
        created_at: new Date(),
      });

      await this.threads.update(message.thread_id, {
        updated_at: new Date(),
      });

    })

    return messageId
  }

  // get messages from threads
  async getMessagesForThread(threadId: string){
    return this.messages.where("thread_id").equals(threadId).sortBy("created_at")
  }

}

export const db = new ChatDB();