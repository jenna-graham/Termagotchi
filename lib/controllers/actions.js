const { Router } = require('express');
const Action = require('../models/Action');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const actions = await Action.getById(req.params.id);
      res.json(actions);
    } catch (e) {
      next(e);
    }
  });
