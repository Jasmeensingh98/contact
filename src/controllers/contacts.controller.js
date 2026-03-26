const Contact = require('../models/Contact');

const pickContactFields = (body) => {
  const picked = {};
  ['name', 'phone', 'email'].forEach((field) => {
    if (body[field] !== undefined) picked[field] = body[field];
  });
  return picked;
};

// GET /api/contacts
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (err) {
    return next(err);
  }
};

// POST /api/contacts
const createContact = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    const created = await Contact.create({ name, phone, email });
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
};

// PUT /api/contacts/:id
const updateContact = async (req, res, next) => {
  try {
    const updates = pickContactFields(req.body);

    const updated = await Contact.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    return next(err);
  }
};

// DELETE /api/contacts/:id
const deleteContact = async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.status(200).json({ message: 'Contact deleted', id: deleted._id });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};

