function getHashTags (tweet) {
    var hashTagIndex = 0, hashTagIndexes = [], spaceIndex = 0, spaceIndexes = [];
    while (hashTagIndex !== -1) {
        hashTagIndex = tweet.indexOf('#', hashTagIndex);
        if (hashTagIndex !== -1) {
            hashTagIndexes.push(hashTagIndex);
            spaceIndex = tweet.indexOf(' ', hashTagIndex);
            if (spaceIndex !== -1) {
                spaceIndexes.push(spaceIndex);
            } else {
                spaceIndexes.push(tweet.length);
            }
            hashTagIndex++;
        }
    }
    var hashTags = [];
    for (var i = 0; i < hashTagIndexes.length; i++) {
        hashTags.push(tweet.slice(hashTagIndexes[i] + 1, spaceIndexes[i]));
    }
    return hashTags;

    //Эталонное решение от разработчиков курса
    /*
    var words = tweet.split(' ');
    var hashTags = [];
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word[0] === '#') {
            hashTags.push(word.slice(1));
        }
    }
    return hashTags;
    */
}

console.log(getHashTags('Прохожу курс на #coursera по #javascript'));
console.log(getHashTags('Прохожу курс на coursera по #javascript'));
console.log(getHashTags('Прохожу курс на #coursera по javascript'));
console.log(getHashTags('Прохожу курс на coursera по javascript'));