import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import LoginRequest from "./dto/LoginRequest.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "username"
        });
    }

    validate(username: string, password: string): Promise<any> {
        const user = this.authService.authenticateUsernameAndPassword(username, password)

        if (!user){
            throw new UnauthorizedException('log in failed');
        }

        return user;
    }

    
}