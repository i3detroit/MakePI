import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt-nodejs';

/**
 * BCrypt Hashing & Salting Service
 */
@Injectable()
export class BcryptService {
  /**
   * Compare Password to Hash
   *
   * @param data - Data to be compared
   * @param hash - Hash to be compared to
   * @returns - True if hash matches
   */
  compare(data: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(data, hash, (err: Error, result: boolean) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Generate Salt
   *
   * @param rounds - Number of rounds to process the data for
   * @returns - Generated salt
   */
  genSalt(rounds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(rounds, (err: Error, result: string) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Generate Hash from password and salt
   *
   * @param data - Data to be encrypted
   * @param salt - Salt to add to data
   * @returns - Salted, hashed password
   */
  hash(data: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(data, salt, null, (err: Error, result: string) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}
