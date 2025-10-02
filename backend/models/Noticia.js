const mongoose = require('mongoose');

const NoticiaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    subtitulo: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    imagemCapa: String,
    texto: {
        type: String,
        required: true
    },
    imagens: [String],
    anexos: [String],
    ativo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Noticia', NoticiaSchema);