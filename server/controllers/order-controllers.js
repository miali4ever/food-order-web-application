const Order = require("../models/order");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const getOrders = async (req, res, next) => {
  const userId = req.params.userId;

  let userwithOrders;
  try {
    userwithOrders = await User.findById(userId).populate({
      path: "orders",
      options: { sort: { createdAt: -1 } },
    });
    // .populate("orders")
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userwithOrders || userwithOrders.orders.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  console.log("get order from DB successfully!");
  res.json({
    orders: userwithOrders.orders.map((order) =>
      order.toObject({ getters: true })
    ),
  });
};
// {
//   _id: new ObjectId("6260e9dfe31793d938d6399c"),
//   creator: new ObjectId("6260e8b9e6176dc71d2b66fd"),
//   delivery: [
//     {
//       name: '1',
//       street: '1',
//       city: '1',
//       postalCode: 11111,
//       _id: new ObjectId("6260e9dfe31793d938d6399d"),
//       id: '6260e9dfe31793d938d6399d'
//     }
//   ],
//   order: [
//     {
//       id: '0',
//       name: 'Beef Bowl',
//       amount: 1,
//       price: 22.99,
//       _id: new ObjectId("6260e9dfe31793d938d6399e")
//     },
//     {
//       id: '1',
//       name: 'Sushi',
//       amount: 1,
//       price: 13.49,
//       _id: new ObjectId("6260e9dfe31793d938d6399f")
//     }
//   ],
//   createdAt: 2022-04-21T05:21:35.645Z,
//   updatedAt: 2022-04-21T05:21:35.645Z,
//   __v: 0,
//   id: '6260e9dfe31793d938d6399c'
// }

const postOrders = async (req, res, next) => {
  //console.log(req.body);

  // {
  //   userName: 'mia',
  //   userEmail: 'mia1112@mail.com',
  //   deliveryInformation: { name: '1', street: '1', city: '1', postalCode: '11111' },
  //   orderedItems: [
  //     { id: '0', name: 'Beef Bowl', amount: 1, price: 22.99 },
  //     { id: '1', name: 'Sushi', amount: 1, price: 13.49 },
  //     { id: '2', name: 'Roasted Salmon', amount: 1, price: 12.99 }
  //   ]
  // }

  const { userId, deliveryInformation, orderedItems } = req.body;

  const createOrder = new Order({ creator: userId });

  createOrder.delivery.push(deliveryInformation);
  orderedItems.forEach((item) => {
    createOrder.order.push(item);
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Find user failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  result = "success!";

  try {
    await createOrder.save();

    console.log("saved createOrder");

    user.orders.push(createOrder);
    await user.save();
    console.log("saved user's order");
    console.log(user);
  } catch (err) {
    console.log(err);
    // const error = new HttpError(
    //   "Save Order failed, please try again later.",
    //   500
    // );

    result = "fail";
  }

  console.log(result);
  res.status(201).json(result);
};

exports.getOrders = getOrders;
exports.postOrders = postOrders;
