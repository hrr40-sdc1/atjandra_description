const cassandra = require('cassandra-driver');

const cassandraContactPoint = process.env.CASSANDRA_IP || 'ec2-54-202-212-27.us-west-2.compute.amazonaws.com';

const client = new cassandra.Client({ contactPoints: [cassandraContactPoint], localDataCenter: 'datacenter1', keyspace: 'housemania' });

client.connect((err) => {
  err ? console.log(err) : console.log('connected to cassandra');
});

module.exports = client;