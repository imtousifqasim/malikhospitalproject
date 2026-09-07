import crypto from "crypto";

// Base32 RFC 4648 alphabet
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32ToBuffer(base32: string): Buffer {
  const clean = base32.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < clean.length; i++) {
    const val = BASE32_ALPHABET.indexOf(clean[i]);
    if (val === -1) continue;

    value = (value << 5) | val;
    bits += 5;

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

function generateHotp(secretBuffer: Buffer, counter: number): string {
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(counter));

  const hmac = crypto.createHmac("sha1", secretBuffer);
  hmac.update(counterBuffer);
  const digest = hmac.digest();

  // Dynamic truncation (RFC 4226)
  const offset = digest[digest.length - 1] & 0xf;
  const codeInt =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const code = (codeInt % 1000000).toString().padStart(6, "0");
  return code;
}

/**
 * Verifies a 6-digit TOTP code against a base32 secret with a ±1 step (90 second) window.
 */
export function verifyTotp(token: string, secret: string, windowSteps = 1): boolean {
  if (!token || !secret || token.length !== 6) return false;

  try {
    const secretBuffer = base32ToBuffer(secret);
    const currentStep = Math.floor(Date.now() / 1000 / 30);

    for (let step = currentStep - windowSteps; step <= currentStep + windowSteps; step++) {
      const generated = generateHotp(secretBuffer, step);
      if (generated === token) {
        return true;
      }
    }
  } catch (err) {
    console.error("TOTP verification error:", err);
  }

  return false;
}
