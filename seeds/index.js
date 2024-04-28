const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelpcamp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            //YOUR USER ID
            author: '662524f2b3147874d2cac619',
            location: `${cities[random1000].city},${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/user/wsanter',
            description: 'lorem epsum',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dd76gukvn/image/upload/v1714309487/YelpCamp/foyheqeaqpqdsvcnti8v.jpg',
                    filename: 'YelpCamp/foyheqeaqpqdsvcnti8v',

                },
                {
                    url: 'https://res.cloudinary.com/dd76gukvn/image/upload/v1714309487/YelpCamp/hly853owb9mgmnxxmjqs.jpg',
                    filename: 'YelpCamp/hly853owb9mgmnxxmjqs',

                }
            ]
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})
