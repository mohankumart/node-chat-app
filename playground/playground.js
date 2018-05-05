var moment = require('moment')


var timestamp = moment().valueOf();
console.log(timestamp)
console.log(moment.utc(timestamp).format('h:mm'))


var timestamp2 = moment().valueOf();
console.log(timestamp2)
console.log(moment(timestamp2).format('h:mm'))

