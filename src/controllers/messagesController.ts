import User from "../models/User";
import { Message } from "../models/Message";

// @access Private // @route GET /messages // @desc Get all messages
export const getAllMessages = async (req, res) => {
  // Get all messages from MongoDB
  const messages = await Message.find().lean();

  // If no messages
  if (!messages?.length) {
    return res.status(400).json({ message: "No messages found" });
  }

  // Add username to each message before sending the response
  const messagesWithUser = await Promise.all(
    messages.map(async (messages) => {
      const user = await User.findById(messages.user).lean().exec();
      return {
        ...messages,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    })
  );

  res.json(messagesWithUser);
};

// @access Private // @route POST /messages // @desc Create new messages
export const createNewMessages = async (req, res) => {
  const { user, title, message } = req.body;
  // console.log(user, title, message);

  // Confirm data
  if (!user || !title || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check for duplicate title
  const duplicate = await Message.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate message title" });
  }

  // Create and store the new user
  const messages = await Message.create({ user, title, message });
  console.log(messages, "messages");

  if (messages) {
    // Created
    return res.status(201).json({ message: "New message created" });
  } else {
    return res.status(400).json({ message: "Invalid message data received" });
  }
};

// @access Private // @route PATCH /messages // @desc Update a message
export const updateMessage = async (req, res) => {
  const { id, user, title, message } = req.body;

  // Confirm data
  if (!id || !user || !title || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm messages exists to update
  const messages = await Message.findById(id).exec();

  if (!messages) {
    return res.status(400).json({ message: "Message not found" });
  }

  // Check for duplicate title
  const duplicate = await Message.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original messages
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate message title" });
  }

  messages.title = title;
  messages.message = message;

  const updatedMessage = await messages.save();

  res.json(`'${updatedMessage.title}' updated`);
};

// @access Private // @route DELETE /message // @desc Delete a message
export const deleteMessage = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Message ID required" });
  }

  // Confirm messages exists to delete
  const message = await Message.findById(id).exec();

  if (!message) {
    return res.status(400).json({ message: "Message not found" });
  }

  const result = await message.deleteOne();

  const reply = `Message '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
};
