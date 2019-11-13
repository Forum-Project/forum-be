const mongoose = require('mongoose')

const catergoriesSchema = new mongoose.Schema({
    category_name: String
})

const Categories = new mongoose.model('Categories', catergoriesSchema)

module.exports = Categories
