const PLAYTIME_PATTERN =
  /^\s*(?:(\d+)\s*小时)?\s*(?:(\d+)\s*分钟)?\s*(?:(\d+)\s*秒)?\s*$/;

const joinParts = (parts: string[]) => parts.filter(Boolean).join(" ");

export const formatPlayTime = (value: string) => {
  if (!value) {
    return value;
  }

  const match = value.match(PLAYTIME_PATTERN);

  if (!match) {
    return value;
  }

  const [, hours, minutes, seconds] = match;

  return joinParts([
    hours ? `${hours}h` : "",
    minutes ? `${minutes}m` : "",
    seconds ? `${seconds}s` : "",
  ]);
};
