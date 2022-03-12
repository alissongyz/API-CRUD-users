const router = require('express').Router()

const User = require('../models/User');

// rotas
router.post('/', async (req, res) => {
    const { name } = req.body
    const { email } = req.body

    try 
    {
        if(!name)
        {
            return res.status(400).send({ message : "Campo obrigatório" })
        }

        if(!email)
        {
            return res.status(400).send({ message : "Campo obrigatório" })
        }

        if (await User.findOne({ email }))
        {
            return res.status(400).send({ message: "E-mail already exists."})
        }

        const createUser = await User.create(req.body)
  
        return res.send({ createUser })
    } catch (error) {
      res.status(500).json({ message: "Algo deu errado, tente novamente mais tarde." })
    }
})

router.get('/', async (req, res) => {
    try
    {
        const user = await User.find()

        res.status(200).send(user)
    }
    catch (err)
    {
        res.status(404).send({ message : "Algo deu errado, tente novamente mais tarde."})
    }
})

router.get('/:id', async (req, res) => {
    
    const id = req.params.id
    
    try
    {
        const user = await User.findOne({ _id: id })

        if(!user)
        {
            res.status(404).send( { message: "Usuário não encontrado"} )
            return
        }

        res.status(200).send(user)
    }
    catch (err)
    {
        res.status(404).send({ error : "Algo deu errado, tente novamente mais tarde."})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, email } = req.body

    const user = {
        name,
        email,
    }

    try
    {
        if(!name)
        {
            return res.status(400).send({ message : "Campo obrigatório" })
        }

        if(!email)
        {
            return res.status(400).send({ message : "Campo obrigatório" })
        }

        const updateUser = await User.updateOne({ _id: id }, user)

        if(updateUser.matchedCount === 0)
        {
            res.status(404).send( { message: "Usuário não atualizado"} )
            return
        }

        res.status(200).send(user)
    }
    catch (err)
    {
        res.status(500).send({ error : "Algo deu errado, tente novamente mais tarde."})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ _id: id })

    if(!user)
    {
        res.status(404).send( { message: "Não foi possivel concluir a operação, pois o usuário não encontrado."} )
        return
    }

    try
    {
        await User.deleteOne({_id: id})

        res.status(200).send({ message : "Usuário removido com sucesso!" })
    }
    catch (err)
    {
        res.status(500).send({ error : "Algo deu errado, tente novamente mais tarde." })
    }
})

module.exports = router