import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => this.removeTimestamps(data)));
  }

  private removeTimestamps(data: any): any {
    if (Array.isArray(data)) {
      return data.map(item => this.removeTimestamps(item));
    } else if (data !== null && typeof data === 'object') {
      const {
        createdAt,
        updatedAt,
        deletedAt,
        createdById,
        updatedById,
        ...rest
      } = data;

      for (const key in rest) {
        if (typeof rest[key] === 'object') {
          rest[key] = this.removeTimestamps(rest[key]);
        }
      }

      return rest;
    }

    return data;
  }
}
