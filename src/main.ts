import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { useSwagger } from './app/app.swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		snapshot: true
	});

	app.setGlobalPrefix('api');
	app.enableCors({
		origin: '*'
	});
	useSwagger(app);

	const port = process.env.PORT || 3000;
	await app.listen(port);
}
bootstrap();
