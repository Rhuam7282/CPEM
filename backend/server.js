const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cpem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rotas
app.use('/noticias', require('./routes/noticias'));
app.use('/eventos', require('./routes/eventos'));
app.use('/encontros', require('./routes/encontros'));
app.use('/newsletter', require('./routes/newsletter'));

// Rota de saúde
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware de erro
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor CPEM rodando na porta ${PORT}`);
});