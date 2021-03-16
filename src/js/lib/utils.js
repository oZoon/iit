export const timestampToDate = (timestamp) => {
    const timeDate = new Date(timestamp / 1);
    const day = leadingZero(timeDate.getDate());
    const month = leadingZero(timeDate.getMonth() + 1);
    const year = timeDate.getFullYear();
    return day + '.' + month + '.' + year;
}
export const timestampToDateTime = (timestamp) => {
    const timeDate = new Date(timestamp / 1);
    const day = leadingZero(timeDate.getDate());
    const month = leadingZero(timeDate.getMonth() + 1);
    const year = timeDate.getFullYear();
    const hours = leadingZero(timeDate.getHours());
    const minutes = leadingZero(timeDate.getMinutes());
    const seconds = leadingZero(timeDate.getSeconds());
    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}
const leadingZero = (n) => {
    return n < 10 ? '0' + n : n;
}

export const dateToTimeStamp = data => {
    console.log(data);
    const day = data.split(' ')[0].split('.')[0];
    const month = data.split(' ')[0].split('.')[1] - 1;
    const year = data.split(' ')[0].split('.')[2];
    const hours = data.split(' ')[1].split(':')[0];
    const minutes = data.split(' ')[1].split(':')[1];
    const seconds = data.split(' ')[1].split(':')[2];
    return + new Date(year, month, day, hours, minutes, seconds, 0);
}
export const getNewNumber = taskList => {
    let result = 0;
    for (let i = 0; i < taskList.list.length; i++) {
        if (taskList.list[i].taskNumber > result) {
            result = taskList.list[i].taskNumber;
        }
    }
    return (result + 1);
}

export const getTaskData = (taskList, index, arrKeys) => {
    const obj = taskList.list[index];
    let result = [];
    for (let key in obj) {
        for (let i = 0; i < arrKeys.length; i++) {
            if (key == arrKeys[i]) {
                result.push(obj[key]);
            }
        }
    }
    return result;
}

export const formatPhone = value => {
    return `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10, 12)}`
}

export const randomID = length => {
    const allowSymbols = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('');
    return Array(length).fill('').map(() => allowSymbols[(Math.floor(Math.random() * allowSymbols.length))]).join('');
}
