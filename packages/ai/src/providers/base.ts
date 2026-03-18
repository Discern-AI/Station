import type { ChatProviderInput, ChatProviderResponse } from "../types";

export interface ChatProvider {
  sendMessage(input: ChatProviderInput): Promise<ChatProviderResponse>;
}
