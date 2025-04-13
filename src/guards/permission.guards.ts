import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    mixin,
    Type,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';

export function PermissionGuard(...requiredPermissions: string[]): Type<CanActivate> {
    @Injectable()
    class MixinPermissionGuard implements CanActivate {
        constructor(private dataSource: DataSource, private reflector: Reflector) { }

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const request = context.switchToHttp().getRequest();
            const user: User = request.user;

            if (!user) throw new ForbiddenException('User not found');

            // ✅ Admin bypass
            if (user.is_default) return true;

            if (!user.role?.id) {
                throw new ForbiddenException('User role is missing');
            }

            const role = await this.dataSource.getRepository('roles').findOne({
                where: { id: user.role.id },
                relations: ['role_permissions', 'role_permissions.permission'],
            });

            if (!role) throw new ForbiddenException('Role not found');

            const userPermissions = role.role_permissions.map(rp => rp.permission.name);

            const hasAll = requiredPermissions.every(p => userPermissions.includes(p));

            if (!hasAll) throw new ForbiddenException('permission denied');

            return true;
        }
    }

    return mixin(MixinPermissionGuard);
}
