const express = require('express');

// router instance from express
const router = express.Router();

const { getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson } = require('../controllers/people');

// method 1  
// router.get('/', getPeople)
// router.post('/', createPerson)
// router.post('/postman', createPersonPostman)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)

// route mrthod 2
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router




