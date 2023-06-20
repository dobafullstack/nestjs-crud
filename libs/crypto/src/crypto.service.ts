import { Injectable, NotAcceptableException } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';

@Injectable()
export class CryptoService {
	get() {
		const secretKey = process.env.SECRET_KEY as string;
		const secretIV = process.env.SECRET_KEY_IV as string;
		const key = createHash('sha512').update(secretKey).digest('hex').substring(0, 32);
		const encryptionIV = createHash('sha512').update(secretIV).digest('hex').substring(0, 16);
		return {
			key,
			encryptionIV
		};
	}

	encryptData(data: string): string {
		const { key, encryptionIV } = this.get();
		const cipher = createCipheriv('aes256', key, encryptionIV);
		return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString(
			'base64'
		); // Encrypts data and converts to hex and base64
	}

	decryptData(token: string) {
		const buff = Buffer.from(token, 'base64');
		const { key, encryptionIV } = this.get();
		const decipher = createDecipheriv('aes256', key, encryptionIV);
		try {
			// Decrypts data and converts to utf8
			const decryptData =
				decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
			return decryptData;
		} catch (error) {
			throw new NotAcceptableException('Not acceptable');
		}
	}
}
