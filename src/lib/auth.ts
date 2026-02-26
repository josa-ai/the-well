const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const bytes = hex.match(/.{2}/g);
  if (!bytes) throw new Error("Invalid hex");
  return new Uint8Array(bytes.map((b) => parseInt(b, 16)));
}

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET env var is not set");
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(): Promise<string> {
  const key = await getKey();
  const iat = Date.now();
  const payload = `admin.${iat}`;
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  const sigHex = toHex(signature);
  return `${payload}.${sigHex}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const key = await getKey();
    // Token format: admin.{timestamp}.{sigHex}
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = `${parts[0]}.${parts[1]}`;
    const sigHex = parts[2];

    const sigBytes = fromHex(sigHex);

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as BufferSource,
      encoder.encode(payload)
    );

    if (!valid) return false;

    // Check token age (7 days max)
    const iat = parseInt(parts[1], 10);
    if (isNaN(iat)) return false;
    const age = Date.now() - iat;
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    return age < SEVEN_DAYS;
  } catch {
    return false;
  }
}
