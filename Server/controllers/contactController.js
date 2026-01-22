exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    // You can save to DB here if needed
    console.log("Contact message:", { name, email, message });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};
