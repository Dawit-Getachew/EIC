import AES from 'crypto-js/aes'
import Utf8 from "crypto-js/enc-utf8"

export const encryptWithAES = (text: string) => {
  return AES.encrypt(text, String(process.env.AES_PRIVATE_KEY)).toString()
}

export const decryptWithAES = (ciphertext: string) => {
  const bytes = AES.decrypt(ciphertext, String(process.env.AES_PRIVATE_KEY))
  const originalText = bytes.toString(Utf8)
  return originalText
}