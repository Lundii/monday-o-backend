import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async(req, res) => {
  res.send('Welcome to monday-o');
})
app.post('/login', async (req, res) => {

  const {email, password} = req.body;
  const  response = await fetch('https://qo7vrra66k.execute-api.eu-west-1.amazonaws.com/choco/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  })

  res.status(response.status);
  const data = await response.json();
  return res.json(data);
})

app.get('/products', async (req, res) => {

  const  response = await fetch(`https://qo7vrra66k.execute-api.eu-west-1.amazonaws.com/choco/products?token=${req.query.token}`)

  res.status(response.status);
  const data = await response.json();
  return res.json(data);
})

app.listen(process.env.PORT || 5000)