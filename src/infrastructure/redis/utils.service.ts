import { Injectable } from '@nestjs/common';

/**
 * TODO: into a separate modulee
 */
/**
 * TODO: use other instead of JSON
 */
@Injectable()
export class UtilsService {
  serialize<T = any>(value: T): string {
    return JSON.stringify(value);
  }

  deserialize<T = any>(value: string): T {
    return JSON.parse(value);
  }
}
