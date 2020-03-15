import express from 'express';
import serverless from 'serverless-http';
import DB from './db';

const db = new DB('customers');
const app = express();

app.use(express.json());

app.get('/.netlify/functions/api', async (req, res) => {
  let data = await db.retrieve();
  return res.json(data);
});

app.post('/.netlify/functions/api', async (req, res) => {
  let data = req.body;
  let id = await db.create(data);
  console.log(id)
  return res.json({id});
});

app.put('/.netlify/functions/api/:id', async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  try {
    let ret = await db.update(id, data);
    return res.json(ret);
  }
  catch(err) {
    res.status(404).end();
  }
});

app.delete('/.netlify/functions/api/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let ret = await db.delete(id);
    return res.json(ret);
  }
  catch(err) {
    res.status(404).end();
  }
});


export const handler = serverless(app);
