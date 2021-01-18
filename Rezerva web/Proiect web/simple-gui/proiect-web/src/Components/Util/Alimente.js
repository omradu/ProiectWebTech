import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class Aliments {
    constructor() {
        this.data=[]
        this.emitter=new EventEmitter()
    }

    async getAllCateg(categ, username) {
        try{
        const response = await fetch(`${SERVER}/alimente`)
        const data = await response.json()
        let dateBune = []
        for(let x of data){
            if(x.categorie === categ && x.username===username){
                dateBune.push(x)
            }
        }
        this.data=dateBune
        return this.data
    } catch(err) {
        console.warn(err)
        this.emitter.emit('GET_ALIMENTS_ERROR')
    }
    }

    async addAliment(al) {
        try {
            await fetch(`${SERVER}/alimente`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(al)
            })
            this.getAllCateg()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_ALIMENT_ERROR')
        }
    }

    async eatAliment(id) {
        try{
            await fetch(`${SERVER}/alimente/${id}`, {
                method: 'delete'
            })
            this.getAllCateg()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('EAT_ALIMENT_ERROR')
        }
    }

    async changeDisp(id) {
        try {
            const response = await fetch(`${SERVER}/alimente/${id}`)
            const al = await response.json()
            if(al.disponibil === true){
                al.disponibil = false
            } else {
                al.disponibil = true
            }
            await fetch(`${SERVER}/alimente/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(al)
            })
        } catch(err) {
            console.warn(err)
            this.emitter.emit('UPDATE_ALIMENT_ERROR')
        }
    }

    async getAlimenteByUsername(usernamep){
        try{
            const response = await fetch(`${SERVER}/alimente`)
            const data = await response.json()
            let dateBune = []
            for(let x of data){
                if(x.username === usernamep && x.disponibil === true){
                    dateBune.push(x)
                }
            }
            this.data = dateBune
            return this.data
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_PRIETEN_ALIMENTE_ERROR')
        }
    }

    async getAlimentePrieteni(username) {
        try {
            const response = await fetch(`${SERVER}/prieteni`)
            const data = await response.json()
            let dateBune = []
            for(let x of data) {
                if(x.username === username){
                    let al = await this.getAlimenteByUsername(x.usernamePrieten)
                    for(let y of al){
                        dateBune.push(y)
                    }
                }
            }
            this.data = dateBune
            return dateBune
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_ALIMENTE_PRIETENI_ERROR')
        }
    }

    async claimAliment(id, usernamep) {
        try {
            const response = await fetch(`${SERVER}/alimente/${id}`)
            const al2 = await response.json()
            this.addAliment({
                codAliment: Math.floor(Math.random() * 100000),
                username: usernamep,
                categorie: al2.categorie,
                denumire: al2.denumire,
                producator: al2.producator,
                calorii: al2.calorii,
                vegan: al2.vegan,
                dataExpirare: al2.dataExpirare,
                disponibil: false
            })
            this.eatAliment(al2.codAliment)
        } catch(err) {
            console.warn(err)
            this.emitter.emit('CLAIM_ALIMENT_ERROR')
        }
    }

}

const aliments = new Aliments()

export default aliments