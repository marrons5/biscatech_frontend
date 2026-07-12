type Level = "debug" | "info" | "warn" | "error";

const colors: Record<Level, string> = {
  debug: "#888",
  info: "#00bcd4",
  warn: "#ff9800",
  error: "#f44336",
};

const emoji: Record<Level, string> = {
  debug: "\u{1F50D}",
  info: "\u{2139}\u{FE0F}",
  warn: "\u{26A0}\u{FE0F}",
  error: "\u{274C}",
};

const currentLevel: Level =
  (import.meta.env.VITE_LOG_LEVEL as Level) ?? "debug";

function shouldLog(level: Level): boolean {
  const order: Level[] = ["debug", "info", "warn", "error"];
  return order.indexOf(level) >= order.indexOf(currentLevel);
}

function fmt(data: unknown): string {
  if (data === undefined) return "";
  if (typeof data === "string") return data;
  if (data instanceof Error) return data.stack ?? data.message;
  try {
    return JSON.stringify(data, null, 0);
  } catch {
    return String(data);
  }
}

function write(level: Level, args: unknown[]) {
  if (!shouldLog(level)) return;

  const ts = new Date().toISOString();
  const style = `color:${colors[level]};font-weight:bold`;

  const argsCopy = [...args];

  if (argsCopy.length === 1 && typeof argsCopy[0] === "object" && argsCopy[0] !== null) {
    console.log(`%c${emoji[level]} ${ts}`, style, "", fmt(argsCopy[0]));
    return;
  }

  let context = "-";
  if (typeof argsCopy[0] === "string") context = argsCopy.shift() as string;

  const message = argsCopy.map((a) => (typeof a === "string" ? a : fmt(a))).join(" ");

  console.log(`%c${emoji[level]} ${ts} [${context}]`, style, message);
}

export const logger = {
  debug: (...args: unknown[]) => write("debug", args),
  info: (...args: unknown[]) => write("info", args),
  warn: (...args: unknown[]) => write("warn", args),
  error: (...args: unknown[]) => write("error", args),
};
