const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')


const sequelize = new Sequelize('proiectweb', 'root', '', {
    dialect: 'mysql'
  })
   

  const Aliment = sequelize.define('aliment',{
      codAliment: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          validate: {
              len: 5
          }

      },
        username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
      },
      categorie: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              len: [2, 10]
          }
      },
      denumire: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              len: [2, 10]
          }
      },
      producator: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              len: [2, 10]
          }
      },
      calorii: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
              min: 0
          }
      },
      vegan: {
          type: Sequelize.BOOLEAN
      },
      dataExpirare: {
          type: Sequelize.DATE,
          allowNull: false
      }
      ,
      disponibil: {
          type: Sequelize.BOOLEAN
      }
  })

  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/create', async(req, res, next) => {
      try{
          await sequelize.sync({force: true})
          res.status(201).json({message: 'created'})
      } catch(err){
          next(err)
      }
  })

  app.get('/alimente', async(req, res, next) => {
      try{
          const alimente = await Aliment.findAll()
          res.status(200).json(alimente)
      } catch(err) {
          next(err)
      }
  })

  app.post('/alimente', async (req, res, next) => {
      try{ 
          await Aliment.create(req.body)
          res.status(201).json({ message: 'created' })
      } catch(err) {
          next(err)
      }
  })

  app.get('/alimente/:aid', async(req, res, next) => {
      try{
          const aliment = await Aliment.findByPk(req.params.aid)
          if(aliment){
              res.status(200).json(aliment)
          } else{
              res.status(404).json({ message: 'not found' })
          }
      } catch(err){
          next(err)
      }
  })

  app.get('/alimente', async(req, res, next) => {
      const query = {
          where: {}
      }

      if(req.query.filter){
          query.where.username = {
              [Op.like]: `%${req.query.filter}%`
          }
      }

      try{
        const aliment = await Aliment.findAll(query)
        res.status(200).json(aliment)
        
      } catch(err){
          next(err)
      }
  })

  app.put('/alimente/:aid', async (req, res, next) => {
      try{
          const aliment = await Aliment.findByPk(req.params.aid)
          if(aliment) {
              await aliment.update(req.body)
              res.status(202).json({ message: 'accepted' })
          } else{
              res.status(404).json({ message: 'not found'})
          }
      } catch(err) {
          next(err)
      }
  })

  app.delete('/alimente/:aid', async (req, res, next) => {
      try{
          const aliment = await Aliment.findByPk(req.params.aid)
          if(aliment) {
              await aliment.destroy()
              res.status(202).json({ message: 'accepted' })
          } else {
              res.status(404).json({ message: 'not found' })
          }
      } catch (err) {
          next(err)
      }
  })

  const Utilizator = sequelize.define('utilizator',{
      nume: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              len: [2, 20]
          }
      },
      prenume: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 20]
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            len: [2, 30]
        }
      },
      parola: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              len: [8, 30]
          }
      },
      judet: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 15]
        }
      },
      oras: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 15]
        }
      },
      vegan: {
        type: Sequelize.BOOLEAN
    }
  })

  app.get('/utilizatori', async(req, res, next) => {
      try{
        const utilizatori = await Utilizator.findAll()
        res.status(200).json(utilizatori)
    } catch(err) {
        next(err)
    }
  })

  app.post('/utilizatori', async (req, res, next) => {
    try{
        await Utilizator.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch(err) {
        next(err)
    }
})

    app.get('/utilizatori/:uid', async(req, res, next) => {
        try{
            const utilizator = await Utilizator.findByPk(req.params.uid)
            if(utilizator){
                res.status(200).json(utilizator)
            } else{
                res.status(404).json({ message: 'not found' })
            }
        } catch(err){
            next(err)
        }
})

app.put('/utilizatori/:uid', async (req, res, next) => {
    try{
        const utilizator = await Utilizator.findByPk(req.params.uid)
        if(utilizator) {
            await utilizator.update(req.body)
            res.status(202).json({ message: 'accepted' })
        } else{
            res.status(404).json({ message: 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.delete('/utilizatori/:uid', async (req, res, next) => {
    try{
        const utilizator = await Utilizator.findByPk(req.params.uid)
        if(utilizator) {
            await utilizator.destroy()
            res.status(202).json({ message: 'accepted' })
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
    }
})

Utilizator.hasMany(Aliment, { as: "Alimente", foreignKey: "username"})
Aliment.belongsTo(Utilizator, { foreignKey: "username"})

const Prieten = sequelize.define('prieten',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
            min: 0
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    usernamePrieten: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    caracteristica: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

app.get('/prieteni', async(req, res, next) => {
    try{
        const prieteni = await Prieten.findAll()
        res.status(200).json(prieteni)
    } catch(err) {
        next(err)
    }
})

app.post('/prieteni', async (req, res, next) => {
    try {
        await Prieten.create(req.body)
        res.status(201).json({message: 'created'})
    } catch(err) {
        next(err)
    }
})

app.get('/prieteni/:pid', async(req, res, next) => {
    try{
        const prieten = await Prieten.findByPk(req.params.pid)
        if(prieten){
            res.status(200).json(prieten)
        } else {
            res.status(404).json({message: 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.put('/prieteni/:pid', async(req, res, next) => {
    try {
        const prieten = await Prieten.findByPk(req.params.pid)
        if(prieten) {
            await prieten.update(req.body)
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({message: 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.delete('/prieteni/:pid', async (req, res, next) => {
    try {
        const prieteni = await Prieten.findByPk(req.params.pid)
        if(prieteni) {
            await prieteni.destroy()
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({message: 'not found'})
        }
        } catch(err) {
            next(err)
    }
})

Utilizator.hasMany(Prieten, {as: "Prieteni", foreignKey: "username" })
Prieten.belongsTo(Utilizator, {foreignKey: "username"})

  app.use((err, req, res, next) => {
      console.warn(err)
      res.status(500).json({ message: 'server error' })
  })

  app.listen(8080)