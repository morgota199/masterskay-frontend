declare module 'http' {
  export interface IncomingMessage {
    session: string;
    selectedSession: string;
  }
}
