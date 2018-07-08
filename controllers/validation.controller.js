import validations from 'validation-lib';
import logger from '../core/logger/app-logger'

const controller = {};

function exec(validationInput) {
    return validations
    .get(validationInput.fnName)
    .apply(null, validationInput.arg)
    .then((resp) => {
        if(resp === true){
           return {
                fieldName: validationInput.fieldName,
                pass: resp
           } 
        } else {
            return {
                fieldName: validationInput.fieldName,
                fail: resp
            }
        }
    });
}

controller.validate = async (req, res) => {
    try {
        console.log(req.body);
        const promises = req.body.validationList.map(i => exec(i));
        const response = await Promise.all(promises);
        logger.info('validating all...');
        res.send(response);
    }
    catch(err) {
        logger.error('Error in validate ' + err);
        res.send('Got error in validate');
    }
}

export default controller;