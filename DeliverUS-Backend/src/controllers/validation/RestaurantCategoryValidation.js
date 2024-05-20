import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'

const checkCategoryExists = async (value, { req }) => {
  try {
    const restaurantCategory = await RestaurantCategory.findOne({ where: { name: req.body.name } })
    if (restaurantCategory) {
      return Promise.reject(new Error('The category ' + req.body.name + ' already exists.'))
    }
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [
  check('name').exists().isString().isLength({ min: 1, max: 50 }).custom(checkCategoryExists)
]

export { create }
