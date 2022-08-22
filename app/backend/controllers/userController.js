const { User, Activity } = require('../models');
const getCoordinates = require('../services/getCoordinates');
const ApiError = require('../errors/apiError')

const userController = {

  async getUser(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      throw new ApiError('Cet utilisateur n\'existe pas', 400)
    }

    res.json(user);
  },

  async updateUser(req, res, next) {
    const { id } = req.params;
    const {
      firstname, lastname, description, address, phone, avatar,
    } = req.body;

    const coordinates = await getCoordinates(address, 'housenumber', next);

    
    const user = await User.update({
      firstname,
      lastname,
      description,
      address,
      phone,
      avatar,
      lat: coordinates[0],
      long: coordinates[1],
    }, {
      where: {
        id,
      },
    });

    res.json(user);
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    const user = await User.destroy({
      where: {
        id,
      },
    });

    res.json(user);
  },

  async getUserActivities(req, res) {
    const { id } = req.params;
    const result = await User.findByPk(id, {
      include: ['activities'],
    });

    const user = result.get();

    const activities = user.activities.map((el) => el.get());

    const val = { ...user, activities };

    res.json(val);
  },

  async updateUserActivity(req, res) {
    const { activityId, userId } = req.params;
    const {
      name,
      description,
      date,
      address,
      city,
      lat,
      long,
    } = req.body;

    const userActivity = await Activity.update({
      name,
      description,
      date,
      address,
      city,
      lat,
      long,
    }, {
      where: {
        id: activityId,
        user_id: userId,
      },
    });

    res.json(userActivity);
  },

  async createActivity(req, res) {
    const { id } = req.params;

    const coordinates = await getCoordinates(res, `${req.body.address.split(' ').join('+')}+${req.body.city}`, 'street');

    const lat = coordinates[0];
    const long = coordinates[1];

    const newBody = {
      ...req.body, user_id: id, lat, long,
    };

    const activity = await Activity.create(newBody);

    res.json(activity);
  },

  deleteUserActivity(req, res) {
    const { userId, activityId } = req.params;

    Activity.destroy({
      where: {
        id: activityId,
        user_id: userId,
      },
    });

    res.status(201).json({ msg: 'Activité supprimer' });
  },

  async addBookmark(req, res) {
    const { userId } = req.params;
    const { activityId } = req.body;

    let user = await User.findByPk(userId, {
      include: ['bookmarks'],
    });

    const activity = await Activity.findByPk(activityId);

    await activity.addUser(user);

    user = await User.findByPk(userId, {
      include: ['bookmarks'],
    });

    res.json({ msg: 'activité ajouter au favori' });
  },

  async getUserBookmarks(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: ['bookmarks'],
    });

    res.json(user.get().bookmarks);
  },

  async deleteUserBookmark(req, res) {
    const { userId, activityId } = req.params;

    let user = await User.findByPk(userId, {
      include: ['bookmarks'],
    });

    const activity = await Activity.findByPk(activityId);

    await activity.removeUser(user);

    user = await User.findByPk(userId, {
      include: ['bookmarks'],
    });

    res.json({ msg: 'favori supprimer' });
  },

};

module.exports = userController;