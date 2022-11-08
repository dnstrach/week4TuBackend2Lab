const houses = require('./db.json')
let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    deleteHouse: (req, res) => {
        let index = houses.findIndex(house => house.id === +req.params.id)
        //console.log(index) // shows in browser's console

        houses.splice(index, 1)

        res.sendStatus(200).send(houses)
    },

    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body 

        let newHouse = {
            id: globalId,
            address,
            price,
            imageURL
        }

        houses.push(newHouse)
        //console.log(req)

        res.status(200).send(newHouse)
        globalId++
    },

    updateHouse: (req, res) => {
        let {type} = req.body
        let {id} = req.params

        let index = houses.findIndex(house => house.id === +id)

        if(houses[index].price <= 10000 && type === 'minus') {
            houses[index].price = 0 
            res.status(200).send(houses)
        } else if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendstatus(400)
        }
    }
}