import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "crypto";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(currentDirectory, "..", "..", "productos-imgs"));
    }
    , filename: (req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const nombreFichero = randomUUID() + ext;
        callback(null, nombreFichero);
    }
});

const fileFilterConfig = (req, file, callback) => {
    const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg"];
    const tipo = file.mimetype;
    if (tiposPermitidos.includes(tipo)) {
        callback(null, true);
    } else {
        callback(new Error("Tipo de Archivo No Permitido"));
    }
}

export const multerUploader = multer(
    {
        storage: storageConfig
        , limits: { fileSize: 5 * 1024 * 1024 } //10MB
        , fileFilter: fileFilterConfig
    }
);
