export interface Observer {
  update(event: string, data: Record<string, unknown>): void;
}

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(event: string, data: Record<string, unknown>): void;
}
