import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class Users { 
    constructor () {
        this.data=[]
        this.emitter=new EventEmitter()
    }

    async getOne(usernameText) {
        try {
            const response = await fetch(`${SERVER}/utilizatori/${usernameText}`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_USERNAME_SUCCESS')
            return this.data
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_USERNAME_ERROR')
        }
    }

    async getPrieteni(usernameP) {
        try {
            const response = await fetch(`${SERVER}/prieteni`)
            const data = await response.json()
            let dateBune = []
            for(let x of data){
                if(x.username === usernameP){
                    dateBune.push(x)
                }
            }
            this.data = dateBune
            return this.data
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_PRIETENI_ERROR')
        }
    }

    async addPrieten(prieten) {
        try {
            await fetch(`${SERVER}/prieteni`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prieten)
            })
            this.getPrieteni()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_PRIETEN_ERROR')
        }
    }

    async addAccount(account) {
        try {
            await fetch(`${SERVER}/utilizatori`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            })
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_ACCOUNT_ERROR')
        }
    }

    async getAll() {
        try{
            let response = await fetch(`${SERVER}/utilizatori`)
            let data = await response.json()
            
            return data
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_UTILIZATORI_ERROR')
        }
    }

}

const users = new Users()

export default users