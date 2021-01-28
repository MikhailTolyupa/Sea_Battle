var shipsVariants = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
var gamersField = createBattleField();
var computersField = createBattleField();

shipsVariants.forEach(function(item){
    // addShipToField(createShip(item), gamersField);
});

var testShip1 = createShip(1);
var testShip11 = createShip(1);
var testShip111 = createShip(1);
var testShip1111 = createShip(1);
var testShip2 = createShip(2);
var testShip22 = createShip(2);
var testShip222 = createShip(2);
var testShip3 = createShip(3);
var testShip33 = createShip(3);
var testShip4 = createShip(4);

addShipToField(testShip1, gamersField);
addShipToField(testShip11, gamersField);
addShipToField(testShip111, gamersField);
addShipToField(testShip1111, gamersField);
addShipToField(testShip2, gamersField);
addShipToField(testShip22, gamersField);
addShipToField(testShip222, gamersField);
addShipToField(testShip3, gamersField);
addShipToField(testShip33, gamersField);
addShipToField(testShip4, gamersField);
console.log(gamersField);
let bb = document.getElementsByTagName('div');

// bb.forEach(function(item){
     // item.bgColor = 'blue';
// });
let aa = document.getElementById("ddd");
console.log(bb);
// document.getElementById('55').style.backgroundColor = '#FF0000';


function createShip(decksNumber){ 
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
    let shipLength = ship.decksNumber;
    let isShipAdded = false;
    while (!isShipAdded){
        let i = randomInteger(0, 9);
        let j = randomInteger(0, 9);
        console.log(i);
        console.log(j);
        if (field[i][j] == 0){
            if (ship.orientation[0] == 1){
                if(ship.orientation[1] == 1){ //вправо
                    console.log("right");
                    //проверяем наличие недоступной зоны
                    let isValidZone = true;
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
                                k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] != 1 && (field[k][l] = 2); // наверное проверку можно убрать
                            }
                        }
                    }
                }
                else{ // влево
                    console.log("left");
                    let isValidZone = true;
                    for (let k = i - 1; k <= i + 1; k++){ // со строки сверху до строки снизу
                        for (let l = j + 1; l >= j - shipLength; l--){ // со столбца справа от коробля до столбца слева от коробля
                            if((j - shipLength < 0) || k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] == 1)
                                isValidZone = false; //неоптимально, но некритично
                        }
                    }
                    if (isValidZone){ // если всё ок, то строим корабль (влево) и недоступную зону вокруг него
                        for(let l = j; l > j - shipLength; l--){
                            field[i][l] = 1;
                        }
                        isShipAdded = true;
                        for (let k = i - 1; k <= i + 1; k++){ //опять идём по этим клеткам и расставляем 2 (недоступная зона)
                            for (let l = j + 1; l >= j - shipLength; l--){
                                k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] != 1 && (field[k][l] = 2); // наверное проверку можно убрать
                            }
                        }
                    }
                }
            }
            else{ // k - строка, l - столбец
                if(ship.orientation[1] == 0){ // вниз
                    console.log("down");
                    let isValidZone = true;
                    for (let l = j - 1; l <= j + 1; l++){ // со столбца слева до столбца справа
                        for (let k = i - 1; k <= i + shipLength; k++){ 
                            if((i + shipLength > 10) || k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] == 1)
                                isValidZone = false; //неоптимально, но некритично
                        }
                    }
                    if (isValidZone){ // если всё ок, то строим корабль (вниз) и недоступную зону вокруг него
                        for(let k = i; k < i + shipLength; k++){
                            field[k][j] = 1;
                        }
                        isShipAdded = true;
                        for (let l = j - 1; l <= j + 1; l++){
                            for (let k = i - 1; k <= i + shipLength; k++){ //опять идём по этим клеткам и расставляем 2 (недоступная зона)
                                k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] != 1 && (field[k][l] = 2); // наверное проверку можно убрать
                            }
                        }
                    }
                }
                else{ // k - строка, l - столбец
                    // вверх
                    console.log("up");
                    let isValidZone = true;
                    for (let l = j - 1; l <= j + 1; l++){ // со столбца слева до столбца справа
                        for (let k = i + 1; k >= i - shipLength; k--){ 
                            if((i - shipLength < 0) || k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] == 1)
                                isValidZone = false; //неоптимально, но некритично
                        }
                    }
                    if (isValidZone){ // если всё ок, то строим корабль (вверх) и недоступную зону вокруг него
                        for(let k = i; k > i - shipLength; k--){
                            field[k][j] = 1;
                        }
                        isShipAdded = true;
                        for (let l = j - 1; l <= j + 1; l++){ //опять идём по этим клеткам и расставляем 2 (недоступная зона)
                            for (let k = i + 1; k >= i - shipLength; k--){
                                k >= 0 && l >= 0 && k < 10 && l < 10 && field[k][l] != 1 && (field[k][l] = 2); // наверное проверку можно убрать
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