"use strict";

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = async function (context, req) {
  let response;

  if (req.query.test && req.query.test === 'true') {
    response = 'OK';
  } else {
    let dbName = 'azurefunc';
    let collectionName = 'test';
    let dbUsername = 'selimkayali';
    let dbPassword = 'a123123';
    let limit = 999999; //const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-ysdpk.mongodb.net/test?retryWrites=true&w=majority`;  //MongoDB Atlas

    const uri = `mongodb://${dbUsername}:${dbPassword}@ds040309.mlab.com:40309/${dbName}`; // MLab

    let client = await _mongodb.default.MongoClient.connect(uri, {
      useNewUrlParser: true
    });
    let collection = await client.db(dbName).collection(collectionName);

    if (req.method === 'GET') {
      if (req.query.limit && parseInt(req.query.limit) > 0) {
        limit = parseInt(req.query.limit);
      }

      response = await collection.find().limit(limit).toArray();
    } else if (req.method === 'POST') {
      let res = await collection.insertOne(req.body);
      response = res.ops[0];
    } else if (req.method === 'PUT') {} else {
      response = await collection.deleteOne({
        _id: new _mongodb.default.ObjectId(req.body._id)
      });
    }
  }

  context.res = {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(response)
  };
};
//# sourceMappingURL=index.js.map