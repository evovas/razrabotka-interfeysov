/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    //Клонируем исходную коллекцию
    var newCollection = [];
    for (var i = 0; i < collection.length; i++) {
        newCollection[i] = cloneObject(collection[i]);
    }

    //Если переданы функции создаем массив функций для работы с коллекцией
    //и сортируем его в порядке приоритетности выполнения
    function byPriority() {
        return function (a, b) {
            return a.priority > b.priority ? 1 : -1;
        }
    }
    if (arguments.length > 1) {
        var functions = [];
        for (i = 1; i < arguments.length; i++) {
            functions[i - 1] = arguments[i];
        }
        functions.sort(byPriority());
        for (i = 0; i < functions.length; i++) {
            newCollection = functions[i](newCollection);
        }
    }

    return newCollection;
}

/**
 * @params {String[]}
 */
function select() {
    var params = [];
    for (var i = 0; i < arguments.length; i++) {
        params[i] = arguments[i];
    }
    function select(collection) {
        var newCollection = [];
        for (var i = 0; i < collection.length; i++) {
            var newObject = {};
            for (var key in collection[i]) {
                if (isFoundInArray(params, key)) {
                    newObject[key] = collection[i][key];
                }
            }
            newCollection[i] = newObject;
        }

        return newCollection;
    }
    select.priority = 2;
    return select;
}


/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    var _property = property;
    var _values = values;
    function filterIn(collection) {
        var newCollection = [];
        var counter = 0;
        for (var i = 0; i < collection.length; i++) {
            if (isFoundInArray(_values, collection[i][_property])) {
                newCollection[counter] = cloneObject(collection[i]);
                counter++;
            }
        }
        return newCollection;
    }
    filterIn.priority = 1;
    return filterIn;
}

function cloneObject(item) {
    var newObject = {};
    for (var key in item) {
        newObject[key] = item[key];
    }
    return newObject;
}

function isFoundInArray(arr, target) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return true;
        }
    }
    return false;
}

var friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
];


var result = query(
    friends,
    select('name', 'gender', 'email'),
    filterIn('favoriteFruit', ['Яблоко', 'Картофель']));

/*var testFilterIn1 = filterIn('favoriteFruit', ['Картофель', 'Апельсин']);
var testFilterIn2 = filterIn('favoriteFruit', ['Банан', 'Апельсин']);
results = testFilterIn2(testFilterIn1(results));

var testSelect1 = select('name', 'gender');
var testSelect2 = select('test', 'gender');
results = testSelect2(testSelect1(results));*/
console.log(result);