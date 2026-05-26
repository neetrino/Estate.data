type LogLevel = "info" | "warn" | "error";

type LogPayload = Record<string, unknown>;

function writeLog(level: LogLevel, event: string, payload?: LogPayload): void {
  const line = JSON.stringify({
    level,
    event,
    ts: new Date().toISOString(),
    ...payload,
  });

  process.stderr.write(`${line}\n`);
}

/** Structured stderr logger — no `console.log` in API routes. */
export const logger = {
  info(event: string, payload?: LogPayload): void {
    writeLog("info", event, payload);
  },
  warn(event: string, payload?: LogPayload): void {
    writeLog("warn", event, payload);
  },
  error(event: string, payload?: LogPayload): void {
    writeLog("error", event, payload);
  },
};
