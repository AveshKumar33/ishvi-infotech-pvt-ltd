import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const requiredPermissions = this.reflector.get<string[]>('view', context.getHandler());
        if (!requiredPermissions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const userPermissions = user.role?.role_permissions?.map(rp => rp.permission.name) || [];

        return requiredPermissions.every(permission =>
            userPermissions.includes(permission),
        );
    }
}
