import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function useSwagger(app: INestApplication) {
	const logger = new Logger('Swagger');
	const port = process.env.PORT || 3000;
	const path = 'docs';
	const config = new DocumentBuilder()
		.setTitle('NestJS Example')
		.setDescription('NestJS Example Documentation')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(path, app, document);
	logger.log(`Your documentation is running on http://localhost:${port}/${path}`);
}
