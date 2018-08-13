var phoneBook = {};

function phoneBookFunction(command) {
    var commands = command.split(' ');
    var commandName = commands[0];
    function addPhone(name, phones) {
        var splitPhones = phones.split(',');
        var startIndex = 0;
        if(!phoneBook.hasOwnProperty(name) || phoneBook[name] === '') {
            phoneBook[name] = splitPhones[0];
            startIndex = 1;
        }
        for (var i = startIndex; i < splitPhones.length; i++){
            phoneBook[name] = phoneBook[name] + ', ' + splitPhones[i];
        }
    }
    function showPhoneBook() {
        var contacts = [], names = Object.keys(phoneBook);
        for (var i = 0; i < names.length; i++) {
            if (phoneBook[names[i]] !== '') {
                contacts.push(names[i] + ': ' + phoneBook[names[i]]);
            }
        }
        return contacts.sort();
    }
    function removePhone(phone) {
        var names = Object.keys(phoneBook);
        for (var i = 0; i < names.length; i++) {
            var phones = phoneBook[names[i]].split(', ');
            function isFoundPhone(wantedPhone) {
                return wantedPhone === phone;
            }
            if (phones.some(isFoundPhone)) {
                var foundIndex = -1, counter = 0;
                while (foundIndex === -1){
                    foundIndex = phones[counter].indexOf(phone);
                    counter++;
                }
                phones.splice(counter - 1, 1);
                phoneBook[names[i]] = phones.join(', ');
                return true;
            }
        }
        return false;


        /*for (var i = 0; i < names.length; i++) {
            startIndex = phoneBook[names[i]].indexOf(phone);
            if (startIndex !== -1) {
                phoneBook[names[i]] = phoneBook[names[i]].slice(0, startIndex) +
                    phoneBook[names[i]].slice(startIndex + phone.length);
                if (phoneBook[names[i]].indexOf(', ') !== -1){
                    phoneBook[names[i]] = phoneBook[names[i]].slice(0, phoneBook[names[i]].indexOf(', ')) +
                        phoneBook[names[i]].slice(phoneBook[names[i]].indexOf(', ') + ', '.length);
                }
                return true;
            }
        }
        return false;*/
    }
    if (commandName === 'ADD') {
        return addPhone(commands[1], commands[2]);
    } else if (commandName === 'SHOW') {
        return showPhoneBook();
    } else if (commandName === 'REMOVE_PHONE') {
        return removePhone(commands[1]);
    }

}

phoneBookFunction('ADD Ivan 555-10-01,555-10-03');

console.log(phoneBookFunction('SHOW'));
console.log(phoneBookFunction('REMOVE_PHONE 555-10-03'));
console.log(phoneBookFunction('REMOVE_PHONE 555-10-01'));
phoneBookFunction('ADD Ivan 555-10-02');
phoneBookFunction('ADD Alex 555-20-01');

phoneBookFunction('ADD Ivan 555666');
console.log(phoneBookFunction('SHOW'));
console.log(phoneBookFunction('REMOVE_PHONE 66'));


console.log(phoneBookFunction('SHOW'));
console.log(phoneBookFunction('REMOVE_PHONE 555-20-01'));
console.log(phoneBookFunction('SHOW'));