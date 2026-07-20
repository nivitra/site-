/** Plain phrases that scroll into the encryption beam */
export const PLAIN_PHRASES = [
  "Your Secure Password",
  "Your Private Data",
  "Customer Call Audio",
  "Transcripts Stay Private",
  "Data Encrypted End to End",
  "Maximum Privacy Mode",
];

/** Cipher alphabet for the right side of the beam */
export const CIPHER_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/@#$%";

export function toCipher(plain: string, seed = 7): string {
  let s = seed;
  return plain
    .split("")
    .map((ch) => {
      if (ch === " ") return " ";
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return CIPHER_CHARS[s % CIPHER_CHARS.length];
    })
    .join("");
}

/** Build a long looping stream of plain + cipher pairs (same length) */
export function buildStream(repeats = 4): { plain: string; cipher: string } {
  const gap = "     ·     ";
  const plain = Array.from({ length: repeats }, () =>
    PLAIN_PHRASES.join(gap),
  ).join(gap + gap);
  return { plain, cipher: toCipher(plain, 42) };
}

export const BADGE = "MAXIMUM PRIVACY";
export const HEADLINE = ["Your data.", "Encrypted."];
