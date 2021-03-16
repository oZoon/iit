import { GENERATOR } from '../../lib/constants';
import {
    generatorNumbers,
    generatorDates,
    generatorFullCompanyName,
    generatorCompanyName,
    ganeratorCompanyNamePrefix,
    generatorPhone,
    generatorPhrase,
    generatorATI
} from '../../lib/generators';

let init = {
    taskList: {
        state: false,
        data: [],
        columns: [],
    },
}
init.taskList.data = Array(GENERATOR.count).fill({}).map(() => {
    return {
        taskNumber: generatorNumbers(1).join(''),

        customerFull: generatorFullCompanyName(1).join(''),
        customer: generatorCompanyName(1).join(''),
        customerPrefix: ganeratorCompanyNamePrefix(1).join(''),

        supplierFull: generatorFullCompanyName(1).join(''),
        supplier: generatorCompanyName(1).join(''),
        supplierPrefix: ganeratorCompanyNamePrefix(1).join(''),

        supplierPhone: generatorPhone(1).join(''),
        comments: generatorPhrase(1).join(''),
        atiCode: generatorATI(1).join(''),
        taskDate: generatorDates(1).join(''),
    }
})

export default init;
