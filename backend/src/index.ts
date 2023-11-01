import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/', eventRoutes);

const port: number = 3000;
const dbURI: string | undefined = process.env.MONGODB_URI;

if (!dbURI) {
	throw new Error(
		'A variável do ambiente MONGODB_URI não está definida ou correta no arquivo .env'
	);
}

mongoose.connect(dbURI);

const dbConnection = mongoose.connection;

dbConnection.on('error', (error: Error) => {
	console.error('Erro ao conectar no banco DB:', error);
});

dbConnection.once('open', () => {
	console.log('MongoDB conectado');
	app.listen(port, () => {
		console.log(`App rodando na porta: ${port}}`);
	});
});
