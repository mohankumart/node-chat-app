const expect = require('expect')

const {Users} = require('./users')

describe('users', ()=>{
    var users;
    beforeEach(()=>{
        users = new Users()
        users.users = [{
            id: 1,
            name: 'kumar',
            room: 'hello'
        },{
            id: 2,
            name: 'Jen',
            room: 'hello'
        },
        {
            id: 3,
            name: 'Mike',
            room: 'hello'
        }]
    })
    
    it('should add new user', ()=>{
        var user = new Users()
        var user = {
            id: 123,
            name: 'mohan',
            room: 'Hello'    
        }
        
        var resUser = user.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])
    })
})