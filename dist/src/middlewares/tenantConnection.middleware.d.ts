import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConnectionPoolService } from 'src/providers/connection-pool/connection-pool.service';
export declare class TenantPoolMiddleware implements NestMiddleware {
    private readonly connectionPoolService;
    constructor(connectionPoolService: ConnectionPoolService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
