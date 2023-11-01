"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', eventRoutes_1.default);
const port = 3000;
const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
    throw new Error('A variável do ambiente MONGODB_URI não está definida ou correta no arquivo .env');
}
mongoose_1.default.connect(dbURI);
const dbConnection = mongoose_1.default.connection;
dbConnection.on('error', (error) => {
    console.error('Erro ao conectar no banco DB:', error);
});
dbConnection.once('open', () => {
    console.log('MongoDB conectado');
    app.listen(port, () => {
        console.log(`App rodando na porta: ${port}}`);
    });
});
