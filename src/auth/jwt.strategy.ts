import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "src/users/entities/user.entity"
import { DataSource, Repository } from "typeorm"
import { JwtPayload } from "./dto/jwt-payload.interface"
import { handleException } from "src/exceptions/exception-handler"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private usersRepository: Repository<User>

    constructor(
        private dataSource: DataSource,
        private configService: ConfigService
    ) {
        const jwtSecret = configService.get<string>("JWT_SECRET")
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in the environment variables.")
        }

        super({
            secretOrKey: jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        })

        this.usersRepository = this.dataSource.getRepository(User)
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email, sub } = payload

        try {
            const userInfo = await this.usersRepository
                .createQueryBuilder("user")
                .where("user.email = :email", { email })
                .andWhere("user.id = :sub", { sub })
                .leftJoinAndSelect("user.role", "role")
                .getOne()
            if (!userInfo) {
                throw new UnauthorizedException(`Unauthorized request`)
            }

            return userInfo
        } catch (error: unknown) {
            handleException(error, `Unauthorized request`)
            throw new UnauthorizedException()
        }
    }
}
