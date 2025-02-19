import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "cc5829be819aaf997a52eaebe2d6f89dd882f00e586985db3bbab0f00f61a8e0"

export function decryptMessage(encryptedText: string): string {
  try {
    const parts = encryptedText.split(":");
    if (parts.length !== 2) return encryptedText; // Return as-is if not encrypted properly

    const iv = CryptoJS.enc.Hex.parse(parts[0]); // Extract IV
    const encrypted = CryptoJS.enc.Hex.parse(parts[1]); // Extract encrypted content

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encrypted },
      CryptoJS.enc.Hex.parse(ENCRYPTION_KEY),
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8) || "Decryption Error";
  } catch (error) {
    console.error("Decryption failed:", error);
    return "Error decrypting message";
  }
}
