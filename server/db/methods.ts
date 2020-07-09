import User from './models/user';

// ADD A USER
const addUser = async (userObj) => {
  try {
    await User.create(userObj);
  } catch (err) {
    console.error(err);
  }
};

// RETRIEVE USER BY GOOGLEID
const getUser = async (googleId) => {
  try {
    const user = await User.findOne({where: { googleId } });
    return user;
  } catch (err) {
    console.error(err);
  }
};

// GET ALL A USER'S PARTIES, BY USERID
const getAllParties = async (id) => {
  try {
    // ****************************** to do: **************************************
    // we need to query our user/party join table and return all parties that match the user's id
    // TABLENAME.findAll({where: {USER_ID: id}})
      // .then((partyIds) => {
      //   PARTIES.findall({where: {id}});
      // })
      // .then((parties) => {
      //   return parties;
      // })
  } catch (err) {
    console.error(err);
  }
};

export {
  addUser,
  getUser,
  getAllParties,
};
