import { GENERATOR } from './constants';

export const generatorNumbers = count => {
    return Array(count).fill(0).map(() => { return Math.floor(GENERATOR.numberTaskMin) + Math.floor(Math.random() * (GENERATOR.numberTaskMax - GENERATOR.numberTaskMin)) });
};

export const generatorDates = count => {
    return Array(count).fill(0).map(() => Math.floor(strToTS(GENERATOR.dateStart) + Math.random() * (strToTS(GENERATOR.dateEnd) - strToTS(GENERATOR.dateStart))));
};

export const generatorFullCompanyName = count => {
    return Array(count).fill('').map(() => `${getPrefix()} "${getCompanyName()}"`);
};

export const ganeratorCompanyNamePrefix = count => {
    return Array(count).fill('').map(() => getPrefix());
}

export const generatorCompanyName = count => {
    return Array(count).fill('').map(() => getCompanyName());
};

export const generatorPhone = count => {
    return Array(count).fill('').map(() => `+79${getPhone()}`);
}

export const generatorPhrase = count => {
    return Array(count).fill('').map(() => getPhrase());
}

export const generatorATI = count => {
    return Array(count).fill('').map(() => getNum(5));
}


const strToTS = strDate => + new Date(strDate.split('.')[2], (strDate.split('.')[1] - 1), strDate.split('.')[0]);

const getPrefix = () => GENERATOR.prefix[Math.floor(Math.random() * GENERATOR.prefix.length)];
const getCompanyName = () => {
    const count = GENERATOR.countInFinal[0] + Math.floor(1 + Math.random() * (GENERATOR.countInFinal[1] - GENERATOR.countInFinal[0]));
    return Array(count).fill('').map(() => GENERATOR.namePartWords[Math.floor(Math.random() * GENERATOR.namePartWords.length)]).join('');
}
const getPhone = () => getNum(9);
const getNum = count => Array(count).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
const getPhrase = () =>
    Array(Math.floor(GENERATOR.wordCount[0] + Math.random() * (GENERATOR.wordCount[1] - GENERATOR.wordCount[0])))
        .fill('')
        .map(() => Array(Math.floor(GENERATOR.wordLength[0] + Math.random() * (GENERATOR.wordLength[1] - GENERATOR.wordLength[0])))
            .fill('')
            .map(() => GENERATOR.letters[Math.floor(Math.random() * GENERATOR.letters.length)])
            .join(''))
        .join(' ');
















/*

export const taskNumber = (count, min, max) => {
    return Array(count).fill(Math.floor(min) + Math.floor(Math.random() * Math.floor(max - min)))
}

export default function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}


export default assignPropTypes({
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
}, {
    style: {},
    onClick: noop,
}, {
    theme: PropTypes.object,
})
    (({ children, style, onClick }) => (<button
        className={theme.btn}
        style={style}
        onClick={onClick}
    >
        {children}
    </button>));
*/
