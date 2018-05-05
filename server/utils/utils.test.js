var expect = require('expect')

var {generateMessage, generateLocationMessage} = require('./utils')

describe('generateMessage', ()=>{
    it('should generate correct message object', () => {
        var text = 'hello'
        var from = 'Mohan'
        var message = generateMessage(from, text)
        //expect(message.createdAt).toBe(createdAt)
    });
})

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        var from = 'Deb'
        var latitude = 15
        var longitude = 19

        var url = 'https://www.google.com/maps?q=15,19'

        var message = generateLocationMessage(from, latitude, longitude)

        expect(message).toInclude({from, url, createdAt})
    })
})
