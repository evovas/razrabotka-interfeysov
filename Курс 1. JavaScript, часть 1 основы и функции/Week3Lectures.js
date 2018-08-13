function date(date) {
    return {
        _value: new Date(date),
        get value() {
            var minutes = this._value.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            return this._value.getFullYear() + '-' + (this._value.getMonth() + 1) + '-' + this._value.getDate() + ' ' + this._value.getHours() + ':' + minutes;
        },
        add: function (count, param) {
            if (count < 0 || (param !== 'years' && param !== 'months' && param !== 'days' && param !== 'hours' && param !== 'minutes')) {
                throw new TypeError('Передано неверное значение');
            }
            if (param === 'years') {
                this._value.setFullYear(this._value.getFullYear() + count);
            } else if (param === 'months') {
                this._value.setMonth(this._value.getMonth() + count);
            } else if (param === 'days') {
                this._value.setDate(this._value.getDate() + count);
            } else if (param === 'hours') {
                this._value.setHours(this._value.getHours() + count);
            } else if (param === 'minutes') {
                this._value.setMinutes(this._value.getMinutes() + count);
            }
            return this;
        },
        subtract: function (count, param) {
            if (count < 0 || (param !== 'years' && param !== 'months' && param !== 'days' && param !== 'hours' && param !== 'minutes')) {
                throw new TypeError('Передано неверное значение');
            }
            if (param === 'years') {
                this._value.setFullYear(this._value.getFullYear() - count);
            } else if (param === 'months') {
                this._value.setMonth(this._value.getMonth() - count);
            } else if (param === 'days') {
                this._value.setDate(this._value.getDate() - count);
            } else if (param === 'hours') {
                this._value.setHours(this._value.getHours() - count);
            } else if (param === 'minutes') {
                this._value.setMinutes(this._value.getMinutes() - count);
            }
            return this;
        }
    }
}


var time = date('2017-05-16 13:45')
    .add(24, 'hours')
    .subtract(1, 'months')
    .add(3, 'days')
    .add(15, 'minutes');
console.log(time.value);