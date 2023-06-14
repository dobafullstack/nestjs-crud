import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Global()
@Module({
	imports: [JwtModule.register({})],
	providers: [JwtService],
	exports: [JwtService]
})
export class JWTModule {}
