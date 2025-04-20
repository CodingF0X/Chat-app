import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.schema';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: User, response: Response) {
    // here i set the expiry date of the cookie to start and expire in 1hr
    const expiresIn = new Date();
    expiresIn.setSeconds(
      Number(
        expiresIn.getSeconds() +
          this.configService.getOrThrow('JWT_EXPIRATION'),
      ),
    );

    const tokenPayload: JwtPayload = {
      _id: user._id.toHexString(), // or to.String() as both deliver the same performance
      email: user.email,
      imageURL: user.imageURL
    };

    // here we generete the token only upon http request, and not store it in the browser.
    const accessToken = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires: expiresIn,
    });
  }

  verifyWebSocket(request: Request): JwtPayload {
    const cookies: string[] = request.headers.cookie?.split('; ') || [];
    // console.log(request.headers)
    // cookies= [ 'Authentication=eyJhbGciOiJI....... ]
    const authCookie = cookies.find((cookie) => {
     return cookie.includes('Authentication');
    });
    const jwt = authCookie?.split('Authentication=')[1];
    if (!jwt) {
      throw new Error('JWT token is missing');
    }
    return this.jwtService.verify(jwt);
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
