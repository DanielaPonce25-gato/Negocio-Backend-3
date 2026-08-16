
import multer from "multer";
import path from "path";

import { createError } from "../utils/apiResponse.js";

const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];

const documentTypes = [
    "application/pdf"
];


const storage = multer.diskStorage({

    destination: (req, file, callback) => {

        if (file.fieldname === "images") {
            return callback(null, "uploads/");
        }

        if (file.fieldname === "document") {
            return callback(null, "uploads/documents/");
        }

        if (file.fieldname === "proof") {
            return callback(null, "uploads/proof/");
        }

        return callback(
            createError("INVALID_FILE_TYPE")
        );
    },

    filename: (req, file, callback) => {

        const uniqueName =
            `${Date.now()}-${file.originalname}`;

        callback(null, uniqueName);
    }

});


const fileFilter = (req, file, callback) => {

    if (file.fieldname === "images") {

        if (!imageTypes.includes(file.mimetype)) {
            return callback(
                createError("INVALID_FILE_TYPE")
            );
        }

        return callback(null, true);
    }


    if (file.fieldname === "document") {

        if (!documentTypes.includes(file.mimetype)) {
            return callback(
                createError("INVALID_DOCUMENT_TYPE")
            );
        }

        return callback(null, true);
    }


    if (file.fieldname === "proof") {

        if (!documentTypes.includes(file.mimetype)) {
            return callback(
                createError("INVALID_DOCUMENT_TYPE")
            );
        }

        return callback(null, true);
    }


    return callback(
        createError("INVALID_FILE_TYPE")
    );
};



const multerUpload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 2
    }

});



const uploads = (req, res, next) => {

    multerUpload.fields([
        {
            name: "images",
            maxCount: 1
        },
        {
            name: "document",
            maxCount: 1
        }
    ])(req, res, (error) => {

        if (error) {

            if (error.code === "LIMIT_FILE_SIZE") {
                return next(
                    createError("FILE_TOO_LARGE")
                );
            }

            if (
                error.code === "LIMIT_UNEXPECTED_FILE" &&
                error.field === "images"
            ) {
                return next(
                    createError("TOO_MANY_IMAGES")
                );
            }

            return next(error);
        }


        const hasDocument =
            req.files?.document?.length > 0;


        // Documento obligatorio
        if (!hasDocument) {

            return next(
                createError("DOCUMENT_REQUIRED")
            );
        }


        next();
    });
};



const uploadDocument = (req, res, next) => {

    multerUpload.single("document")(
        req,
        res,
        (error) => {

            if (error) {

                if (error.code === "LIMIT_FILE_SIZE") {
                    return next(
                        createError("FILE_TOO_LARGE")
                    );
                }

                return next(error);
            }


            if (!req.file) {

                return next(
                    createError("FILE_REQUIRED")
                );
            }


            next();
        }
    );
};


const uploadOptional = (req, res, next) => {

    multerUpload.fields([
        {
            name: "images",
            maxCount: 1
        },
        {
            name: "document",
            maxCount: 1
        }
    ])(req, res, (error) => {

        if (error) {

            if (error.code === "LIMIT_FILE_SIZE") {
                return next(
                    createError("FILE_TOO_LARGE")
                );
            }

            if (
                error.code === "LIMIT_UNEXPECTED_FILE" &&
                error.field === "images"
            ) {
                return next(
                    createError("TOO_MANY_IMAGES")
                );
            }

            return next(error);
        }


        next();
    });
};


// COMPROBANTE DE PAGO 
const uploadProof = (req, res, next) => { 
    
    multerUpload.single("proof")( 
        req, 
        res, 
        (error) => { 
            
            if (error) { 
                
                if (error.code === "LIMIT_FILE_SIZE") { 
                    return next( 
                        createError("FILE_TOO_LARGE") 
                    ); 
                } 

                return next(error); 
            
            } 
            
            if (!req.file) { 
                
                return next( 
                    createError("FILE_REQUIRED") 
                ); 
            } 
            
            next(); 
        } 
    ); 
};

export {
    uploadDocument,
    uploadOptional,
    uploadProof
};

export default uploads;

