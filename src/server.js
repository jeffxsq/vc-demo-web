const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const mockVC = {
  kycStatus: 'verified',
  dateOfBirth: '1990-05-15',
  nationality: 'SGP',
  languages: ['English', 'Mandarin']
};

app.get('/', (req, res) => {
  res.render('index', { vc: null, vp: null, verification: null });
});

app.post('/issue', async (req, res) => {
  const verification = true;
  res.render('index', { vc: mockVC, vp: null, verification });
});

app.post('/disclose', async (req, res) => {
  const { all, fields, over18 } = req.body;
  let vp = {};
  if (all) vp = mockVC;
  else if (fields) vp = { [fields]: mockVC[fields] };
  else if (over18) vp = { over18: true };
  const verification = true;
  res.render('index', { vc: mockVC, vp, verification });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));