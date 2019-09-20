const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'housemania' });

client.connect((err) => {
  err ? console.log(err) : console.log('connected to cassandra');
});

module.exports = client;