import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);

    /**
     * This runs BEFORE passport validates the token.
     * You can inspect the request, log details, or block suspicious traffic early.
     */
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            this.logger.warn('❌ Missing Authorization header');
            throw new UnauthorizedException('Authorization header is missing');
        }

        if (!authHeader.startsWith('Bearer ')) {
            this.logger.warn('❌ Invalid Authorization format');
            throw new UnauthorizedException('Invalid Authorization format');
        }

        this.logger.debug(`🔐 Checking token for ${request.method} ${request.url}`);
        /** allow passport-jwt to take over */
        return super.canActivate(context);
    }

    /**
     * This runs AFTER passport validates the token.
     * You can access the decoded user object here and do additional checks.
     */
    handleRequest(err: any, user: any, info: any) {

        if (err) {
            this.logger.error('❗ Error during token validation', err);
        }

        if (info) {
            this.logger.warn(`⚠️ Token validation issue: ${info.message}`);
        }

        if (err || !user) {
            throw err || new UnauthorizedException('Invalid or expired token');
        }

        // Optional: block inactive users
        // if (user.status === false) {
        //     this.logger.warn(`🚫 Inactive user tried to access: ${user.email}`);
        //     throw new UnauthorizedException('User account is deactivated');
        // }

        this.logger.log(`✅ Authenticated user: ${user.email}`);
        return user;
    }
}
