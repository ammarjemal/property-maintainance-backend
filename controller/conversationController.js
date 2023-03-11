const { Conversation, validateConversation } = require("../model/conversationModel");

const addConversation = async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
};
  
// get conversation of a user
const getConversations = async (req, res) => {
    console.log(req.params.userId);
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      console.log(conversation);
      res.status(200).json({conversations: conversation});
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
};
  

// get conv includes two userId
const getConversation = async (req, res) => {
// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    console.log(req.params.userId1, req.params.userId2);
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.userId1, req.params.userId2] },
      });
      console.log(conversation);
      res.status(200).json({conversation: conversation})
    } catch (err) {
      res.status(500).json(err);
    }
};

module.exports = { addConversation, getConversation, getConversations};
