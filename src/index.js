import mongodb from 'mongodb';

module.exports = async function(context, req) {
  let dbName = '';
  let collectionName = '';
  let dbUsername = '';
  let dbPassword = '';
  let response;
  const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-ysdpk.mongodb.net/test?retryWrites=true&w=majority`;
  let client = await mongodb.MongoClient.connect(uri, {
    useNewUrlParser: true
  });
  let collection = await client.db(dbName).collection(collectionName);
  if (req.method === 'GET') {
    response = await collection
      .find()
      .limit(10)
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
    body: JSON.stringify(response)
  };
};
