/* eslint-disable camelcase */
const faker = require('faker');
const amenityList = [
  {
    'category': 'Basic',
    'item': 'Wifi',
    'desc': 'Continuous access in the listing'
  },
  {
    'category': 'Basic',
    'item': 'Iron',
    'desc': ''
  },
  {
    'category': 'Basic',
    'item': 'Dryer',
    'desc': 'In the building - free or for a fee'
  },
  {
    'category': 'Basic',
    'item': 'Heating',
    'desc': 'Central heating or a heater in the listing'
  },
  {
    'category': 'Basic',
    'item': 'TV',
    'desc': ''
  },
  {
    'category': 'Basic',
    'item': 'Air conditioning',
    'desc': ''
  },
  {
    'category': 'Basic',
    'item': 'Laptop friendly workspace',
    'desc': 'A table or desk with space for a laptop and a chair that’s comfortable to work in'
  },
  {
    'category': 'Basic',
    'item': 'Dryer',
    'desc': 'In the building - free or for a fee'
  },
  {
    'category': 'Dining',
    'item': 'Kitchen',
    'desc': 'Space where guests can cook their own meals'
  },
  {
    'category': 'Logistics',
    'item': 'Luggage dropoff allowed',
    'desc': 'For guests convenience when they have early arrival or late departure'
  },
  {
    'category': 'Bed and bath',
    'item': 'Hangers',
    'desc': ''
  },
  {
    'category': 'Bed and bath',
    'item': 'Shampoo',
    'desc': ''
  },
  {
    'category': 'Facilities',
    'item': 'Free parking on premises',
    'desc': ''
  },
  {
    'category': 'Safety features',
    'item': 'Carbon monoxide detector',
    'desc': 'Smoke detector'
  },
  {
    'category': 'Not included',
    'item': 'Private entrance',
    'desc': ''
  }
];

const bedSize = [
  {
    'size': 'normal'
  },
  {
    'size': 'queen'
  },
  {
    'size': 'king'
  }
];

const generatePostData = (userContext, events, done) => {
  userContext.vars.house_id = faker.random.number({ min: 1, max: 11000000});
  userContext.vars.title = faker.lorem.sentences(2);
  userContext.vars.location = faker.address.city();
  userContext.vars.is_entire_place = faker.random.boolean();
  userContext.vars.super_host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  userContext.vars.super_host_photo = `super-host-photo-${faker.random.number({min: 1, max: 325})}.jpg`;
  userContext.vars.rating = faker.random.number(100);
  userContext.vars.desc = faker.lorem.sentences(2);
  userContext.vars.space_desc = faker.lorem.sentences(5);
  userContext.vars.guest_desc = faker.lorem.sentences(1);
  userContext.vars.other_desc = faker.lorem.sentences(2);

  //  Generate Photo Array
  userContext.vars.photos = [];
  const numOfPictures = faker.random.number({min: 1, max: 3});

  for (let j = 0; j <= numOfPictures; j++) {
    const file_path = `HousePic${faker.random.number({min: 1, max: 910})}.jpg`;
    const desc = faker.lorem.sentence();

    userContext.vars.photos.push({file_path, desc});
  }

  //  Generate Amenities Array
  userContext.vars.amenities = [];
  const numOfAmenties = faker.random.number({min: 1, max: 6});

  for (let k = 0; k < numOfAmenties; k++) {
    const amenity_id = faker.random.number(amenityList.length - 1);
    userContext.vars.amenities.push(amenityList[amenity_id]);
  }

  //  Generate Private Room Array
  userContext.vars.private_room = {
    guest: faker.random.number({ min: 1, max: 8 }),
    bath: faker.random.number({ min: 1, max: 3 }),
    bedrooms: []
  };

  const numOfBedrooms = faker.random.number({min: 1, max: 3});
  for (let l = 0; l < numOfBedrooms; l++) {
    const bedroom = { beds: [] };

    const numOfBeds = faker.random.number({min: 1, max: 3});
    for (let m = 0; m < numOfBeds; m++) {
      const size_id = faker.random.number({min: 0, max: 2});
      bedroom.beds.push(bedSize[size_id]);
    }

    userContext.vars.private_room.bedrooms.push(bedroom);
  }

  done();
};

module.exports = {
  generatePostData
};