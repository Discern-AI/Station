export interface PersonaSummary {
  id: string;
  name: string;
  shortDescription?: string;
  visibility: "private" | "public";
}

export interface Conversation {
  id: string;
  personaId: string;
  title?: string;
  mode: "private" | "public";
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface MemoryItem {
  id: string;
  personaId: string;
  title?: string;
  content: string;
  summary?: string;
  sourceType: "chat" | "import" | "document" | "calibration" | "manual";
  relevanceWeight?: number;
  createdAt: string;
}

export interface CanonItem {
  id: string;
  personaId: string;
  title?: string;
  content: string;
  sourceType: "chat" | "import" | "document" | "calibration" | "manual";
  priority?: number;
  createdAt: string;
}

export interface PersonaFile {
  id: string;
  personaId: string;
  fileName: string;
  fileType?: string;
  storagePath: string;
  sourceType: "upload" | "import" | "calibration" | "generated";
  createdAt: string;
}

export interface ImportJob {
  id: string;
  personaId: string;
  kind: "file" | "chat";
  status: "queued" | "processing" | "completed" | "failed";
  sourceName: string;
  createdAt: string;
}


export interface CalibrationSession {
  id: string;
  ownerUserId: string;
  personaId?: string | null;
  sessionTitle?: string;
  transcript: string;
  extractedStyleNotes?: string;
  extractedPublicRules?: string;
  extractedPrivateRules?: string;
  extractedUncertaintyRules?: string;
  saveTarget: "persona" | "global" | "public_mode" | "other";
  createdAt: string;
  updatedAt: string;
}
