import User from "../models/User";
import { Message } from "../models/Message";
import bcrypt from "bcrypt";

// @access Private // @route GET /users // @desc Get all users
export const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

// @access Private // @route POST /users // @desc Create new user
export const createNewUser = async (req, res) => {
  const { firstName, lastName, phone, email, password, roles } = req.body;

  // Confirm data
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate email
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { firstName, lastName, phone, email, password: hashedPwd }
      : { firstName, lastName, phone, email, password: hashedPwd, roles };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res
      .status(201)
      .json({ message: `New user ${firstName} ${lastName} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

// @access Private // @route PATCH /users // @desc Update a user
export const updateUser = async (req, res) => {
  const { id, firstName, lastName, phone, email, roles, active, password } =
    req.body;

  // Confirm data
  if (
    !id ||
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.phone = phone;
  user.email = email;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({
    message: `${updatedUser.firstName} ${updatedUser.lastName} updated`,
  });
};

// @access Private // @route DELETE /users // @desc Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user still have assigned notes?
  const message = await Message.findOne({ user: id }).lean().exec();
  if (message) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.firstName}${result.lastName} with ID ${result._id} deleted`;

  res.json(reply);
};
