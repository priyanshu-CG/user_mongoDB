const Female = require("../models/Female");
const User = require("../models/User");

const createFemale = async (req, res) => {
  const { name, age, userId } = req.body;

  try {
    // Create a new female document
    const female = new Female({
      name,
      age,
      user: userId,
    });

    // Save the female document
    await female.save();

    // Associate the female with the user
    const user = await User.findById(userId);
    user.female = female._id;
    await user.save();

    res.status(201).json({ success: true, female });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createFemale,
};
