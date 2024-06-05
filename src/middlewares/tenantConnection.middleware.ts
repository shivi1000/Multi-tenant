import { HttpException, HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConnectionPoolService } from 'src/providers/connection-pool/connection-pool.service';

@Injectable()
export class TenantPoolMiddleware implements NestMiddleware {
  constructor (private readonly connectionPoolService: ConnectionPoolService) {

  }
  async use(req: Request, res: Response, next: NextFunction) {
    try{
    if(!req.headers.tenantid) {
      throw new UnauthorizedException(`tenantId not found`);
    } 
      const tenantConnection = await this.connectionPoolService.getTenantConnection(req.headers["tenantid"] as string);
      if (!tenantConnection) {
        throw new UnauthorizedException(`No connection found for tenantId ${req.headers.tenantid}`);
      } 
      res.locals.tenantPool = tenantConnection;
      next();
    } catch (error) {
      console.log("error", error);
      throw new UnauthorizedException(error);
    }
  }
}