export type ChatMessage = {
    content: string;
    role: "user" | "assistant";
    error?: string;
};

export type ChatResponse = { text: string };

export type MessageSuggestion = {
    text: string;
    color: string;
    bgColor: string;
};
