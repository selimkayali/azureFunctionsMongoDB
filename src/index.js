import mongodb from 'mongodb';

module.exports = async function(context, req) {
  let dbName = '';
  let collectionName = '';
  let dbUsername = '';
  let dbPassword = '';
  let response;
  let limit = 999999;
  //const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-ysdpk.mongodb.net/test?retryWrites=true&w=majority`;  //MongoDB Atlas
  const uri = `mongodb://${dbUsername}:${dbPassword}@ds040309.mlab.com:40309/${dbName}`; // MLab

  let client = await mongodb.MongoClient.connect(uri, {
    useNewUrlParser: true
  });
  let collection = await client.db(dbName).collection(collectionName);
  if (req.method === 'GET') {
    if (req.query.limit && parseInt(req.query.limit) > 0) {
      limit = parseInt(req.query.limit);
    }
    response = await collection
      .find()
      .limit(limit)
      .toArray();
  } else if (req.method === 'POST') {
    let res = await collection.insertOne(req.body);
    response = res.ops[0];
  } else if (req.method === 'PUT') {
  } else {
    response = await collection.deleteOne({
      _id: new mongodb.ObjectId(req.body._id)
    });
  }
  context.res = {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(response)
  };
};
