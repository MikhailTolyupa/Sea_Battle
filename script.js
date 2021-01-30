var isGameNow = false;
var gamersCount = 0; //счетчики
var computersCount = 0;
var countToWin = 20; // количество всех палуб

var gamersField = createBattleField();
var computersField = createBattleField();
//создадим враианты кораблей
var testShip1 = createShip(1);
var testShip2 = createShip(2);
var testShip3 = createShip(3);
var testShip4 = createShip(4);
//добавим корабли на поле
addShipToField(testShip1, gamersField);
addShipToField(testShip1, gamersField);
addShipToField(testShip1, gamersField);
addShipToField(testShip1, gamersField);
addShipToField(testShip2, gamersField);
addShipToField(testShip2, gamersField);
addShipToField(testShip2, gamersField);
addShipToField(testShip3, gamersField);
addShipToField(testShip3, gamersField);
addShipToField(testShip4, gamersField);

addShipToField(testShip1, computersField);
addShipToField(testShip1, computersField);
addShipToField(testShip1, computersField);
addShipToField(testShip1, computersField);
addShipToField(testShip2, computersField);
addShipToField(testShip2, computersField);
addShipToField(testShip2, computersField);
addShipToField(testShip3, computersField);
addShipToField(testShip3, computersField);
addShipToField(testShip4, computersField);

function createShip(decksNumber){ //функция создания корабля
    return{
        decksNumber,
        orientation: [random_0_or_1(), random_0_or_1()], // 0 - вертикально, 1 - горизонтально, 0 - влево/вниз строим, 1 вправо/вверх строим
        hitDecksNumber: decksNumber, // количество подбитых палуб
        isSunk: decksNumber - this.hitDecksNumber == 0 //подбит или нет
    }
}
function createBattleField(){ // создаём матрицу - поле боя и заполняем её нулями
    let battle_field = [];
    for (let i = 0; i < 10; i ++){
        battle_field[i] = [];
        for (let j = 0; j < 10; j ++){
            battle_field[i][j] = 0;
        }
    }
    return battle_field;
}

function addShipToField(ship, field){
    // функция добавления корабля на поле боя. Рассматриваем варианты рандомной расстановки
    let shipLength = ship.decksNumber;
    let isShipAdded = false;
    while (!isShipAdded){
        let i = randomInteger(0, 9);
        let j = randomInteger(0, 9);
        console.log(i);
        console.log(j);
        if (field[i][j] == 0){
            if (ship.orientation[0] == 1){
                if(ship.orientation[1] == 1){ //строим корабль вправо
                    console.log("right");
                    //проверяем наличие недоступной зоны
                    let isValidZone = true;
                    //узнаем, можно ли в выбранной точке [i][j] строить корабль в выбранном направлении
                    for (let k = i - 1; k <= i + 1; k++){ // со строки сверху до строки снизу
                        for (let l = j - 1; l <= j + shipLength; l++){ // со столбца слева от коробля до столбца справа от коробля
                            if((j + shipLength > 10) || k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] == 1) 
                                isValidZone = false;
                        }
                    }
                    if (isValidZone){ // если всё ок, то строим корабль (вправо) и недоступную зону вокруг него
                        for(let l = j; l < j + shipLength; l++){
                            field[i][l] = 1;
                        }
                        isShipAdded = true;
                        for (let k = i - 1; k <= i + 1; k++){ //опять идём по этим клеткам и расставляем 2 (недоступная зона)
                            for (let l = j - 1; l <= j + shipLength; l++){
                                k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] != 1 && (field[k][l] = 2);
                            }
                        }
                    }
                }
                else{ // строим корабль влево
                    console.log("left");
                    let isValidZone = true;
                    //узнаем, можно ли в выбранной точке [i][j] строить корабль в выбранном направлении
                    for (let k = i - 1; k <= i + 1; k++){ // со строки сверху до строки снизу
                        for (let l = j + 1; l >= j - shipLength; l--){ // со столбца справа от коробля до столбца слева от коробля
                            if((j - shipLength < 0) || k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] == 1)
                                isValidZone = false;
                        }
                    }
                    if (isValidZone){ // если всё ок, то строим корабль (влево) и недоступную зону вокруг него
                        for(let l = j; l > j - shipLength; l--){
                            field[i][l] = 1;
                        }
                        isShipAdded = true;
                        for (let k = i - 1; k <= i + 1; k++){ //опять идём по этим клеткам и расставляем 2 (недоступная зона)
                            for (let l = j + 1; l >= j - shipLength; l--){
                                k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] != 1 && (field[k][l] = 2);
                            }
                        }
                    }
                }
            }
            else{ // k - строка, l - столбец
                if(ship.orientation[1] == 0){ // строим корабль вниз
                    console.log("down");
                    let isValidZone = true;
                    //узнаем, можно ли в выбранной точке [i][j] строить корабль в выбранном направлении
                    for (let l = j - 1; l <= j + 1; l++){ // со столбца слева до столбца справа
                        for (let k = i - 1; k <= i + shipLength; k++){  // со строки сверху от корабля до строки снизу от корабля
                            if((i + shipLength > 10) || k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] == 1)
                                isValidZone = false;
                        }
                    }
                    if (isValidZone){ // если всё ок, то строим корабль (вниз) и недоступную зону вокруг него
                        for(let k = i; k < i + shipLength; k++){
                            field[k][j] = 1;
                        }
                        isShipAdded = true;
                        for (let l = j - 1; l <= j + 1; l++){
                            for (let k = i - 1; k <= i + shipLength; k++){ //опять идём по этим клеткам и расставляем 2 (недоступная зона)
                                k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] != 1 && (field[k][l] = 2);
                            }
                        }
                    }
                }
                else{ // k - строка, l - столбец
                    // строим корабль вверх
                    console.log("up");
                    let isValidZone = true;
                    //узнаем, можно ли в выбранной точке [i][j] строить корабль в выбранном направлении
                    for (let l = j - 1; l <= j + 1; l++){ // со столбца слева до столбца справа
                        for (let k = i + 1; k >= i - shipLength; k--){ 
                            if((i - shipLength < 0) || k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] == 1)
                                isValidZone = false;
                        }
                    }
                    if (isValidZone){ // если всё ок, то строим корабль (вверх) и недоступную зону вокруг него
                        for(let k = i; k > i - shipLength; k--){
                            field[k][j] = 1;
                        }
                        isShipAdded = true;
                        for (let l = j - 1; l <= j + 1; l++){ //опять идём по этим клеткам и расставляем 2 (недоступная зона)
                            for (let k = i + 1; k >= i - shipLength; k--){
                                k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] != 1 && (field[k][l] = 2);
                            }
                        }
                    }
                }
            }
        }
    }
}

function random_0_or_1(){
    return Math.random() < 0.5 ? 0 : 1;
}
function randomInteger(min, max){
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    let result = Math.round(rand);
    (result == -0) && (result = 0);
    return result;
}

function setColor(id, i, j, field, isGamer){ // owner - флаг, true - поле игрока, false - компьютера. Функция, которая раскрашивает клетку, в зависимости от значения в матрице
    if(isGamer){ // определяем на чьём поле будем устанавливать цвета
        var elem = document.getElementById(id);
    }
    else{
        var elem = document.getElementById(id + '_comp');
    }
    switch (true) {
        case field[i][j] == 1: // корабль
            if(isGamer) elem.style.backgroundColor = 'blue';
            break;
        case field[i][j] == 3: // промах
            elem.style.backgroundColor = 'yellow';
            break;
        case field[i][j] == 4: //попадание
            elem.style.backgroundColor = 'red';
                break;
    }
}
function startGame(){ //функция начала игры
    var gamersName = prompt('Как вас зовут?');
    var computerssName = prompt('Как зовут вашего соперника?');
    isGameNow = true;
    gamersCount = 0; //счетчики
    computersCount = 0;
    // window.onload = function() {
    //     document.getElementById('gamer').innerHTML = gamersName;
    //     document.getElementById('computer').innerHTML = computerssName;
    // };
    setTimeout(() => {
        for (let i = 0; i < 10; i ++){  // расстановка кораблей Игрока
            for (let j = 0; j < 10; j ++){
                gamersField[i][j] == 1 && (setColor(String(i) + String(j), i, j, gamersField, true));
            }
        }
    }, 600);

    let isGamerFirst = random_0_or_1() == 1; //определяем, кто ходит первым
    if(isGamerFirst){
        alert('Вы ходите первым');
    }
    else{
        alert('Компьютер ходит первым');
        attackByComputer();
    }
    console.log('Игра началась');
}
function attack(elem){ //функция атаки Игроком (следом идёт атака Компьютером в этой же функции)
    if(isGameNow){ //проверяем идёт ли игра (если нет, то функция не выполняется)
        let id = elem.id;
        id_arr = id.split('');
        let i = id_arr[0]; //узнаем в какую клетку кликнул игрок
        let j = id_arr[1];
            if (computersField[i][j] == 0 || computersField[i][j] == 2){ // Пустые клетки
                computersField[i][j] = 3; // промах
                setColor(String(i) + String(j), i, j, computersField, false);
            }
            if (computersField[i][j] == 1){
                computersField[i][j] = 4; //  попадание
                setColor(String(i) + String(j), i, j, computersField, false);
                gamersCount += 1;
                if (gamersCount == 20){
                    isGameNow = false;
                    setTimeout(() => {
                        alert('Вы выиграли!');
                    }, 700);
                    
                }
            }
            if(computersField[i][j] != 4){ // если Игрок попал в палубу соперника, то компьютер не атакует на этом ходе
                attackByComputer();
                if (computersCount == 20){
                    isGameNow = false;
                    setTimeout(() => {
                        alert('Вы проиграли');
                    }, 400);
                }
            }
    }
    console.log('Прошла атака');
}

function attackByComputer(){ //функция атаки компьютером
    let isAttacked = false; // переменная, которая говорит о завершении хода (если компьютер попал, то стреляет ещё раз)
    while (!isAttacked){
        let i = randomInteger(0, 9);
        let j = randomInteger(0, 9);
        // если попали в тройку или четвёрку, то идём опять по циклу While
        if (gamersField[i][j] == 0 || gamersField[i][j] == 2){
            gamersField[i][j] = 3; // промах
            setColor(String(i) + String(j), i, j, gamersField, true);
            isAttacked = true;
        }
        if (gamersField[i][j] == 1){
            gamersField[i][j] = 4; //  попадание
            setColor(String(i) + String(j), i, j, gamersField, true);
            computersCount += 1;
        }
    }
}