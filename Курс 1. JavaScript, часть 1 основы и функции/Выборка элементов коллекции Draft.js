/*При передаче функции в функцию передается результат выполнения передваемой функции*/
function main(num, func) {
    console.log('2');
    var out = func(num);
    console.log('4');
    console.log(out);
}

function second(str) {
    var _str = str;
    console.log('1');
    return function second(num) {
        console.log('3');
        return _str + num;
    }
}

main(2, second('abc'));

/*Проверка работы массивов функций*/
function makeFunc1() {
    var counter = 1;
    function func1() {
        return counter++;
    }
    func1.priority = 1;
    return func1;
}

function makeFunc2() {
    var counter = 101;
    function func2() {
        return counter++;
    }
    func2.priority = 2;
    return func2;
}

var f11 = makeFunc1();
var f12 = makeFunc1();
var f21 = makeFunc2();
var f22 = makeFunc2();

var funcs = [f11, f21, f12, f22];
console.log('Выполним функции до сортировки');
for (var i = 0; i < funcs.length; i++) {
    console.log(funcs[i]());
}

//Отсортируем функции в порядке приоритетности
function byPriority() {
    return function (a, b) {
        return a.priority > b.priority ? 1 : -1;
    }
}

funcs.sort(byPriority());
console.log('Выполним функции после сортировки');
for (var i = 0; i < funcs.length; i++) {
    console.log(funcs[i]());
}

/*Проверка как ведет себя передача по ссылке в замыканиях*/
console.log('Массив в замыканиях');
function funcWithArray(arr) {
    var closureArray = arr;
    return function () {
        for (var i = 0; i < closureArray.length; i++) {
            console.log(closureArray[i]);
        }
    }
}
var testFuncArr1 = funcWithArray([1, 2, 3]);
var testFuncArr2 = funcWithArray([4, 5, 6]);
testFuncArr1();
testFuncArr2();





