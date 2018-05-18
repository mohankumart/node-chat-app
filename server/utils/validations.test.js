const expect = require('expect')

const {isRealString} = require('./validations')

describe('valid isRealSTring methid', () => {

    it('should reject non-string', () => {
        var response = isRealString(98)
        expect(response).toBe(false)
    })

    it('should reject string with only spaces', function(){
        var response = isRealString('   ')
        expect(response).toBe(false)
    })

    it('should allow string with spaces', function(){
        var response = isRealString('s sd  ')
        expect(response).toBe(true)
    })

})