import { ZodError, ZodObject } from 'zod';
import { serveUnprocessableEntity } from '../errorHandlers/error';

const getErrorPhrase = (error: ZodError) => {
    const path = error.issues[0].path[0];
    const message = error.issues[0].message;
    return `${path}: ${message}`;
};

const validateSchema = (c: any, schema: ZodObject<any>, value: any) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
        return serveUnprocessableEntity(c, getErrorPhrase(parsed.error));
    }
    return parsed.data;
};

export { getErrorPhrase, validateSchema };
