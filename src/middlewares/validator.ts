import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
This middleware collects the errors from the validations made by the express-validator
*/
const validator = (req: Request<any>, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

export default validator;
