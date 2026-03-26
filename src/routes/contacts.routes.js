const router = require('express').Router();

const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contacts.controller');

// GET /api/contacts
router.get('/', getAllContacts);

// POST /api/contacts
router.post('/', createContact);

// PUT /api/contacts/:id
router.put('/:id', updateContact);

// DELETE /api/contacts/:id
router.delete('/:id', deleteContact);

module.exports = router;

