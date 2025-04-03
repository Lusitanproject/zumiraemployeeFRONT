export type ChatMessage = {
  content: string;
  role: "user" | "assistant";
  error?: string;
};

export type ChatResponse = { text: string };

export type Feedback = {
  id: string;
  text: string;
  assessment: {
    title: string;
    summary: string;
    description: string;
  };
};

export type GetFeedback =
  | {
      status: "SUCCESS";
      data: {
        items: Feedback[];
      };
    }
  | { status: "ERROR"; message: string };

export type ChatContext = {
  username: string;
  feedbacks: Feedback[];
};
