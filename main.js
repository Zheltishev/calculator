const app = document.querySelector('.app');
const inputFielf = document.querySelector('.input-field');
const stateToggle = document.querySelector('.state-toggle');
const buttonsDifficult = document.querySelector('.buttons-difficult');
const buttonsUsual = document.querySelector('.buttons-usual');
const values = document.querySelector('.values');
const usual = '( ) ← C 7 8 9 / 4 5 6 * 1 2 3 - 0 . = +';
const difficult = 'RM M+ M- CM ±';
let resetValue = false;
let memoryValue = 0;
let temp;

difficult.split(' ').forEach(e => {
    buttonsDifficult.insertAdjacentHTML('beforeend', `<button class='btn''>${e}</button>`)
})

usual.split(' ').forEach(e => {
    buttonsUsual.insertAdjacentHTML('beforeend', `<button class='btn'>${e}</button>`)
})

stateToggle.addEventListener('click', () => {
    if (buttonsDifficult.classList.contains('hide')) {
        buttonsDifficult.classList.remove('hide');
        app.classList.add('big');
        values.classList.add('big');

        return
    }

    buttonsDifficult.classList.add('hide');
    app.classList.remove('big');
    values.classList.remove('big');
})

app.addEventListener('click', e => {
    if (!e.target.classList.contains('btn')) {
        return
    }

    switch (e.target.textContent) {
        case 'C': 
            values.value = '';
            break;
        case '←': 
            temp = values.value.split('').slice(0, -1).join('');
            values.value = temp;
            break;
        case '=': 
            resetValue = true;
            values.value = eval(values.value);
            break;
        case '±': 
            temp = values.value;
            temp[0] == '-' ? values.value = temp.slice(1) : values.value = '-' + temp;
            break;
        case 'RM': 
            values.value = memoryValue;
            break;
        case 'M+': 
            memoryValue += Number(values.value);
            break;
        case 'M-': 
            memoryValue -= Number(values.value);
            break;
        case 'CM': 
            memoryValue = 0;
            break;
        case (usual + difficult).match(/[0-9\(\)\.\+\-\*\/]/g).join().includes(e.target.textContent) ? e.target.textContent : false : 
            if (resetValue == true && usual.match(/[0-9\(\)]/g).join().includes(e.target.textContent)) {
                values.value = '';
                resetValue = false;
            } else {
                resetValue = false;
            }

            values.value += e.target.textContent;
            break;
    }
})
