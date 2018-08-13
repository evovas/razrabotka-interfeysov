var emitter = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        function Event() {
            this.subscribers = [];
            this.subscriberObjects = [];
        }
        function Subscriber() {
            this.handlers = [];
        }
        if (!this.hasOwnProperty(event)) {
            this[event] = new Event();
        }
        var ind = this[event].subscriberObjects.indexOf(subscriber);
        if (ind === -1) {
            ind = this[event].subscriberObjects.push(subscriber) - 1;
            this[event].subscribers.push(new Subscriber());
        }
        this[event].subscribers[ind].handlers.push(handler.bind(subscriber));
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (!this.hasOwnProperty(event)) {
            return this;
        }
        var ind = this[event].subscriberObjects.indexOf(subscriber);
        if (ind !== -1) {
            this[event].subscriberObjects.splice(ind, 1, null);
            this[event].subscribers.splice(ind, 1, null);
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (!this.hasOwnProperty(event)) {
            return this;
        }
        for (var i = 0; i < this[event].subscribers.length; i++) {
            if (this[event].subscribers[i] !== null) {
                for (var j = 0; j < this[event].subscribers[i].handlers.length; j++) {
                    this[event].subscribers[i].handlers[j]();
                }
            }
        }
        return this;
    }
};


// Определим объект для счетчика нотификаций
var notifications = {
    counter: 0,
    count: function () {
        this.counter++;
    }
};

// Определим для хранения логов
var logger = {
    logs: []
};


/*Проверка работы*/
// Подписываемся на событие new_notification и сразу оповещаем всех подписчиков
emitter
    .on('new_notification', notifications, notifications.count)
    .on('new_notification', logger, function () {
        this.logs.push('Произошло новое событие new_notification');
    })
    .on('new_notification', logger, function () {
        // this указывает на logger
        this.logs.push('Добавлена новая нотификация. Количество - ' + notifications.counter);
    })
    .emit('new_notification');
// Проверяем количество нотификаций
console.log(notifications.counter);
// В логе сохранено событие
// Так как обработчик notifications.count отработал первым,
//  в логах сохранено правильное количество нотификаций
console.log(logger.logs);
// На время отключаем логгирование, а затем снова включаем
emitter
    .off('new_notification', logger)
    .emit('new_notification')
    .on('new_notification', logger, function () {
        this.logs.push('Новое событие new_notification!');
    })
    .emit('new_notification');

// Проверяем количество нотификаций
console.log(notifications.counter);
// Проверяем, что логи были отключены, а затем снова подключены
console.log(logger.logs);




