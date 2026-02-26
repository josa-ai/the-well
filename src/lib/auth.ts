const encoder = new TextEncoder();

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
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  const sigHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // Base64-encode the payload.sigHex so it's cookie-safe
  const token = btoa(`${payload}.${sigHex}`);
  return token;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const key = await getKey();
    const decoded = atob(token);
    const dotIndex = decoded.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const payload = decoded.slice(0, dotIndex);
    const sigHex = decoded.slice(dotIndex + 1);

    // Reconstruct signature bytes
    const sigBytes = new Uint8Array(
      sigHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(payload)
    );

    if (!valid) return false;

    // Check token age (7 days max)
    const data = JSON.parse(payload);
    const age = Date.now() - data.iat;
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    return age < SEVEN_DAYS;
  } catch {
    return false;
  }
}
