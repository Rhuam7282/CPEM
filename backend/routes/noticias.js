const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');

// GET /noticias - Lista paginada de notícias
router.get('/', async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = parseInt(req.query.limite) || 10;
        const inicio = (pagina - 1) * limite;

        const noticias = await Noticia.find({ ativo: true })
            .sort({ data: -1 })
            .limit(limite)
            .skip(inicio);

        const total = await Noticia.countDocuments({ ativo: true });

        res.json({
            noticias,
            paginaAtual: pagina,
            totalPaginas: Math.ceil(total / limite),
            totalNoticias: total
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar notícias' });
    }
});

// GET /noticias/:id - Notícia específica
router.get('/:id', async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);
        
        if (!noticia || !noticia.ativo) {
            return res.status(404).json({ erro: 'Notícia não encontrada' });
        }

        res.json(noticia);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar notícia' });
    }
});

module.exports = router;