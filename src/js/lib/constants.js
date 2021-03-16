let url_site = 'http://localhost:8080';
const hostname = window && window.location && window.location.hostname;
if(hostname != 'localhost'){
    url_site = `http://${hostname}`;
}
export const URL_SITE = url_site;

import packageJson from '../../../package.json';
export const VERSION = packageJson.version;

export const MODAL_CREATE_TASK = 'MODAL_CREATE_TASK';
export const MODAL_DETAIL_TASK = 'MODAL_DETAIL_TASK';
export const MODAL_EDIT_TASK = 'MODAL_EDIT_TASK';

export const SAVE_DATA_START = 'SAVE_DATA_START';
export const SAVE_DATA_EXECUTE = 'SAVE_DATA_EXECUTE';
export const SAVE_DATA_FINISH = 'SAVE_DATA_FINISH';

export const TASK_DELETE_START = 'TASK_DELETE_START';
export const TASK_DELETE_EXECUTE = 'TASK_DELETE_EXECUTE';
export const TASK_DELETE_FINISH = 'TASK_DELETE_FINISH';

export const GENERATOR = {
    count: 100,
    numberTaskMin: 3202,
    numberTaskMax: 17240,
    dateStart: '23.03.2020',
    dateEnd: '17.11.2020',
    prefix: ['ООО', 'ЗАО', 'АО', 'ОАО', 'ПАО', 'ПК'],
    namePartWords: ['Газ', 'Нефть', 'Спец', 'Строй', 'Маш', 'Рем', 'Транс', 'Сбер', 'Откат', 'Замут', 'Кидалово', 'Монтаж', 'Груп', 'Пром', 'Урал', 'Юж', 'Восток', 'Сервис', 'Курск', 'Орел', 'Мос', 'Инвест', 'Финанс'],
    countInFinal: [1, 2],
    wordLength: [1, 7],
    wordCount: [3, 9],
    // letters: 'йцукенгшщзхъёфывапролджэячсмитьбю',
    letters: 'уеёыаоэяию',
}

export const FILTER_NUMBER_RANGE = 'FILTER_NUMBER_RANGE';
export const FILTER_NUMBER_SINGLE = 'FILTER_NUMBER_SINGLE';
export const FILTER_NUMBER_PHONE = 'FILTER_NUMBER_PHONE';
export const FILTER_STRING_SINGLE = 'FILTER_STRING_SINGLE';
export const FILTER_DATE_RANGE = 'FILTER_DATE_RANGE';
export const FILTER_DATE_SINGLE = 'FILTER_DATE_SINGLE';
