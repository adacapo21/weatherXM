import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  error(error: Error | string, ...args) {
    if (error instanceof Error) {
      super.error(error.message, error.stack, this.context);
    } else {
      super.error(error, ...args);
    }
  }
}
