import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    if (users) {
      return {
        EM: "Get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "No user found!",
        EC: "-1",
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with services",
      EC: "-1",
      DT: "",
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    return {
      EM: "fetch ok",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
  }
};

const createNewUser = async (data) => {
  try {
    await db.User.create({});
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: "1",
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      //update
      user.save({});
    } else {
      //not found
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await user.destroy();
      return {
        EM: "delete successfull",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exist",
        EC: "2",
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  getUserWithPagination,
  createNewUser,
  updateUser,
  deleteUser,
};
