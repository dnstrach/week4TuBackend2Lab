const houses = require('./db.json')
let globalId = 4

module.exports = {
    //get
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    //delete
    deleteHouse: (req, res) => {
        //console.log(req.params)
        //res.status(200)
        // { id: '1'}

        let index = houses.findIndex(house => house.id === +req.params.id)
        //console.log(index) 

        houses.splice(index, 1)

        res.status(200).send(houses)
    },

    //post
    createHouse: (req, res) => {
        //console.log(req.body)
        //missing id

        //destructure body to use keys
        const {address, price, imageURL} = req.body 

        let newHouse = {
            id: globalId,
            address,
            price,
            imageURL
        }

        houses.push(newHouse)

        res.status(200).send(newHouse)
        globalId++
    },

    //put
    updateHouse: (req, res) => {
        // console.log(req.body)
        // console.log(req.param)
      
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