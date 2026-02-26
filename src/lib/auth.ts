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
  const payload = JSON.stringify({
    role: "admin",
    iat: Date.now(),
  });
  const payloadHex = toHex(encoder.encode(payload).buffer as ArrayBuffer);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  const sigHex = toHex(signature);
  // Token format: payloadHex.sigHex (all hex, cookie-safe)
  return `${payloadHex}.${sigHex}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const key = await getKey();
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const payloadHex = token.slice(0, dotIndex);
    const sigHex = token.slice(dotIndex + 1);

    const payloadBytes = fromHex(payloadHex);
    const sigBytes = fromHex(sigHex);

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as BufferSource,
      payloadBytes as BufferSource
    );

    if (!valid) return false;

    // Decode payload and check token age (7 days max)
    const payload = new TextDecoder().decode(payloadBytes);
    const data = JSON.parse(payload);
    const age = Date.now() - data.iat;
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    return age < SEVEN_DAYS;
  } catch {
    return false;
  }
}
