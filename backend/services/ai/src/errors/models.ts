export interface ErrorParams {
  code?: number;
  message?: string;
  context?: { [key: string]: any };
}
