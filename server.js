const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/process_form', (req, res) => {
  const { name, email, message } = req.body;

  // Запись для простоты в джсон
  res.json({ name, email, message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});