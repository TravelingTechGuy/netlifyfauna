import faunadb, { query as q } from 'faunadb';
require('dotenv').config();

export default class DB {
  constructor(collection, index) {
    this.COLLECTION = collection;
    this.INDEX = index || 'all_' + this.COLLECTION; //assume default index name is all_lll
    this.client = new faunadb.Client({secret: process.env.DB_KEY});
  }

  async create(data = {}) {
    try {
      let ret = await this.client.query(
        q.Select(['ref', 'id'],                     //this will get the id out of the returned refstring
          q.Create(q.Collection(this.COLLECTION), {data})
        )
      );
      return ret;
    }
    catch(err) {
      console.error(err);
      throw err;
    }
  }

  async retrieve(id = null, pageSize = 1000) {
    try {
      if(id) {
        let ret = this.client.query(q.Ref(q.Collection(this.COLLECTION), id));
        return ret.data;
      }
      else {  //retrieve all
        let ret = await this.client.query(
          q.Map(q.Paginate(q.Match(q.Index(this.INDEX)), {size: pageSize}), q.Lambda('X', q.Get(q.Var('X'))))
        );
        return ret.data.map(e => ({id: e.ref.id, ...e.data}));
      }
    }
    catch(err) {
      console.error(err);
      throw err;
    }
  }

  async update(id, data = {}) {
    if(!id) {
      throw new Error('document id missing');
    }
    try {
      let ret = await this.client.query(q.Update(q.Ref(q.Collection(this.COLLECTION), id), {data}));
      return {id, data: ret.data};
    }
    catch(err) {
      console.error(err);
      throw err;
    }
  }

  async delete(id) {
    if(!id) {
      throw new Error('document id missing');
    }
    try {
      let ret = await this.client.query(q.Delete(q.Ref(q.Collection(this.COLLECTION), id)));
      return {id, data: ret.data};
    }
    catch(err) {
      console.error(err);
      throw err;
    }
  }
};
