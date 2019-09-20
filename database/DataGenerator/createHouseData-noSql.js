const fs = require('fs');
const faker = require('faker');
const amenityList = require('./amenityList');
const bedSize = require('./bedSize');

const numOfRecords = 1000000;

const generateHouseData = (filepath, length, id = 1) => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('house_id|photos|title|"location"|is_entire_place|private_room|super_host_name|super_host_photo|rating|"desc"|space_desc|guest_desc|other_desc|amenities\n');

    (async() => {
      for (let i = 1; i <= length; i++) {
        //  Generate Static Data
        const house_id = id;
        const title = faker.lorem.sentences(2);
        const location = faker.address.city();
        const is_entire_place = faker.random.boolean();
        const super_host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const super_host_photo = `super-host-photo-${faker.random.number({min: 1, max: 325})}.jpg`;
        const rating = faker.random.number(100);
        const desc = faker.lorem.sentences(2);
        const space_desc = faker.lorem.sentences(5);
        const guest_desc = faker.lorem.sentences(1);
        const other_desc = faker.lorem.sentences(2);

        //  Generate Photo Array
        const photos = [];
        const numOfPictures = faker.random.number({min: 1, max:3});

        for (let j = 0; j <= numOfPictures; j++) {
          const file_path = `HousePic${faker.random.number({min: 1, max: 910})}.jpg`;
          const desc = faker.lorem.sentence();

          photos.push(helperObjToString({file_path, desc}));
        }

        //  Generate Amenities Array
        const amenities = [];
        const numOfAmenties = faker.random.number({min: 1, max:6});

        for (let k = 0; k < numOfAmenties; k++) {
          const house_id = i;
          const amenity_id = faker.random.number(amenityList.length - 1);
          amenities.push(helperObjToString(amenityList[amenity_id]));
        }

        //  Generate Private Room Array
        const private_room = {
          guest: faker.random.number({ min: 1, max: 8 }),
          bath: faker.random.number({ min: 1, max: 3 }),
          bedrooms: []
        }

        const numOfBedrooms = faker.random.number({min: 1, max:3});
        for (let l = 0; l < numOfBedrooms; l++) {
          const bedroom = { beds: [] };

          const numOfBeds = faker.random.number({min: 1, max:3});
          for (let m = 0; m < numOfBeds; m++) {
            const size_id = faker.random.number({min: 0, max:2});
            bedroom.beds.push(bedSize[size_id]);
          }

          private_room.bedrooms.push(bedroom);
        }

        //  Write to File
        if(!writeStream.write(`${house_id}|[${photos}]|${title}|${location}|${is_entire_place}|${JSON.stringify(private_room).replace(/"/gi,'')}|${super_host_name}|${super_host_photo}|${rating}|${desc}|${space_desc}|${guest_desc}|${other_desc}|[${amenities}]`)) {
          await new Promise(resolve => writeStream.once('drain', resolve));
        }
        id++;
        if (i !== length) {
          writeStream.write('\n');
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve({message: 'house data generated', id: id}));
  });
};

const helperObjToString = (obj) => {
  let objString = '{';

  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    objValue = obj[keys[i]] !== '' ? obj[keys[i]] : `""`;
    objString += `${keys[i]}:${objValue}`;

    if(i < keys.length - 1) {
      objString += ',';
    }
  }
  objString += '}';

  return objString;
}

generateHouseData('./database/DataGenerator/data/houses-nosql1.csv', numOfRecords)
  .then((res) => {
  console.log(res);
  return generateHouseData('./database/DataGenerator/data/houses-nosql2.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    return generateHouseData('./database/DataGenerator/data/houses-nosql3.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    return generateHouseData('./database/DataGenerator/data/houses-nosql4.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    return generateHouseData('./database/DataGenerator/data/houses-nosql5.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    return generateHouseData('./database/DataGenerator/data/houses-nosql6.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    return generateHouseData('./database/DataGenerator/data/houses-nosql7.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    return generateHouseData('./database/DataGenerator/data/houses-nosql8.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    return generateHouseData('./database/DataGenerator/data/houses-nosql9.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    return generateHouseData('./database/DataGenerator/data/houses-nosql10.csv', numOfRecords, res.id)
  })
  .then((res) => {
    console.log(res);
    console.log('Data Generated');
  });
