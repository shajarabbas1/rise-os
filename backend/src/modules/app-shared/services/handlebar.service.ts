import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export default class HandlebarService {
  compile(template: string, context: Record<string, any>): string {
    const compiled = Handlebars.compile(template);
    return compiled(context);
  }
}
