import express from 'express';
import { getAllParties, getParty, createParty, getAllUsersInParty, deleteParty, updateParty, getUserInParty } from '../db/methods';

const partyRouter = express.Router();

// retrieve all the parties a user belongs to
partyRouter.get('/all/:id', (req, res) => {
  // user's id
  const { id } = req.params;
  getAllParties(id)
    .then((parties) => {
      res.send(parties);
    })
    .catch(err => console.error(err));
});

// retrieve all users in a specific party
partyRouter.get('/getUsers/:idParty', (req, res) => {
  const { idParty } = req.params;
  getAllUsersInParty(idParty)
    .then((users) => {
      res.send(users);
    })
    .catch(err => console.error(err));
});

// retrieve one entry from the userParty table
partyRouter.get('/:idUser/in/:idParty', (req, res) => {
  const { idUser, idParty } = req.params;
  getUserInParty(idUser, idParty)
    .then((entry) => {
      res.send(entry);
    })
    .catch(err => console.error(err));
});

// retrieve one party by its id,
partyRouter.get('/:id', (req, res) => {
  // party's id
  const { id } = req.params;
  getParty(id)
    .then((party) => {
      res.send(party);
    })
    .catch(err => console.error(err));
});

// create a party
partyRouter.post('/create', (req, res) => {
  // party object
  const party = req.body;
  createParty(party)
    .then((response) => {
      // to do: **************************************
      // make party.create send back a response?
      res.send(response);
    })
    .catch(err => console.error(err));
});

// delete a party
partyRouter.delete('/:idParty', (req, res) => {
  const { idParty } = req.params;
  deleteParty(idParty)
    .then(() => {
      res.send('party deleted');
    })
    .catch(err => console.error(err));
});

// update a party
partyRouter.put('/', (req, res) => {
  const { party } = req.body;
  updateParty(party)
    .then(() => {
      res.send('party updated');
    })
    .catch((err => console.error(err)));
});

export default partyRouter;
