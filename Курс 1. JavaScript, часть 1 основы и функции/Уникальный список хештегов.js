function normalizeHashTags(hashtags) {
    /*var hashtagsString = hashtags.join('-').toLowerCase(), hashtagsStat;
    hashtagsStat = hashtags.reduce(getHashtagsStats, {});
    return Object.keys(hashtagsStat).join(', ');*/
    var tagsMap = {}, tagsList = [];
    for (var i = 0; i < hashtags.length; i++) {
        var hashtag = hashtags[i].toLowerCase();
        if (!tagsMap.hasOwnProperty(hashtag)) {
            tagsMap[hashtag] = true;
            tagsList.push(hashtag);
        }
    }
    return tagsList.join(', ');
}

/*function getHashtagsStats(acc, item) {
    var key = item.toLowerCase();
    if(!acc.hasOwnProperty(key)) {
        acc[key] = 0;
    }
    acc[key]++;
    return acc;
}*/

console.log(normalizeHashTags(['web', 'coursera', 'JavaScript', 'Coursera', 'script', 'programming', 'Java']));
console.log(normalizeHashTags([]));