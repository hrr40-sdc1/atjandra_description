const faker = require('faker');

const generateHouseIdFirstQuarter = (userContext, events, done) => {
  const houseId = faker.random.number({ min: 1, max: 2500000 });
  userContext.vars.houseId = houseId;
  done();
};

const generateHouseIdMiddle = (userContext, events, done) => {
  const houseId = faker.random.number({ min: 2500001, max: 7500000 });
  userContext.vars.houseId = houseId;
  done();
};

const generateHouseIdLastQuarter = (userContext, events, done) => {
  const houseId = faker.random.number({ min: 7500001, max: 10000000 });
  userContext.vars.houseId = houseId;
  done();
};

module.exports = {
  generateHouseIdFirstQuarter,
  generateHouseIdMiddle,
  generateHouseIdLastQuarter
};
