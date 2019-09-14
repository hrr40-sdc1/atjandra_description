const fs = require('fs');
const faker = require('faker');
const amenityList = require('./amenityList');
const bedSize = require('./bedSize');

const numOfRecords = 10000000;

const generateHouseData = (filepath, length) => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('house_id,title,location,is_entire_place,super_host_name,super_host_photo,rating,desc,space_desc,guest_desc,other_desc\n');

    (async() => {
      for (let i = 1; i <= length; i++) {
        const house_id = i;
        const title = faker.lorem.sentences(2);
        const location = faker.address.city();
        const is_entire_place = faker.random.boolean();
        const super_host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const super_host_photo = 'super-host-photo-1.jpg';
        const rating = faker.random.number(100);
        const desc = faker.lorem.sentences(2);
        const space_desc = faker.lorem.sentences(5);
        const guest_desc = faker.lorem.sentences(1);
        const other_desc = faker.lorem.sentences(2);

        if(!writeStream.write(`${house_id},${title},${location},${is_entire_place},${super_host_name},${super_host_photo},${rating},${desc},${space_desc},${guest_desc},${other_desc}`)) {
          await new Promise(resolve => writeStream.once('drain', resolve));
        }
        if (i !== length) {
          writeStream.write('\n');
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve('house data generated'));
  });
};

const generatePhotoData = (filepath, length) => {
  return new Promise((resolve, reject) => {

    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('photo_id,house_id,file_path,desc\n');
    let id = 1;
    (async() => {
      for (let i = 1; i <= length; i++) {
        const numOfPictures = faker.random.number({min: 1, max:3});
        for (let j = 0; j <= numOfPictures; j++) {
          const photo_id = id;
          const house_id = i;
          const file_path = `HousePic${faker.random.number({min: 1, max: 910})}.jpg`;
          const desc = faker.lorem.sentences(2);

          if(!writeStream.write(`${photo_id},${house_id},${file_path},${desc}`)) {
            await new Promise(resolve => writeStream.once('drain', resolve));
          }
          if (i !== length || j !== numOfPictures) {
            id++;
            writeStream.write('\n');
          }
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve('picture data generated'));
  });
};

const generateAmenityList = (filepath) => {
  return new Promise((resolve, reject) => {

    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('id,category,item,desc\n');

    (async() => {
      for (let i = 0; i < amenityList.length; i++) {
        const id = i + 1;
        if(!writeStream.write(`${id},${amenityList[i].category},${amenityList[i].item},${amenityList[i].desc}`)) {
          await new Promise(resolve => writeStream.once('drain', resolve));
        }
        if (i !== amenityList.length) {
          writeStream.write('\n');
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve('amenity list generated'));
  });
};

const generateAmenities = (filepath, length) => {
  return new Promise((resolve, reject) => {

    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('id, house_id,amenity_id\n');
    let id = 1;
    (async() => {
      for (let i = 1; i <= length; i++) {
        const numOfAmenties = faker.random.number({min: 1, max:6});
        for (let j = 0; j < numOfAmenties; j++) {
          const house_id = i;
          const amenity_id = faker.random.number({ min: 1, max: amenityList.length });

          if(!writeStream.write(`${id},${house_id},${amenity_id}`)) {
            await new Promise(resolve => writeStream.once('drain', resolve));
          }
          if (i !== length || j !== numOfAmenties) {
            id++;
            writeStream.write('\n');
          }
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve('Amenities data generated'));
  });
};

const generatePrivateRoom = (filepath, length) => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('id,house_id,guests,bath\n');

    (async() => {
      for (let i = 1; i <= length; i++) {
        const house_id = i;
        const guests = faker.random.number({ min: 1, max: 8 });
        const bath = faker.random.number({ min: 1, max: 3 });

        if(!writeStream.write(`${i},${house_id},${guests},${bath}`)) {
          await new Promise(resolve => writeStream.once('drain', resolve));
        }
        if (i !== length) {
          writeStream.write('\n');
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve('private rooms generated'));
  });
};

const generateBedSizes = (filepath) => {
  return new Promise((resolve, reject) => {

    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('id,size\n');

    (async() => {
      for (let i = 0; i < bedSize.length; i++) {
        const id = i + 1;
        if(!writeStream.write(`${id},${bedSize[i].size}`)) {
          await new Promise(resolve => writeStream.once('drain', resolve));
        }
        if (i !== amenityList.length) {
          writeStream.write('\n');
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve('bed size list generated'));
  });
};

const generateBedrooms = (filepath, length) => {
  return new Promise((resolve, reject) => {

    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('id,private_room_id\n');
    let id = 1;
    (async() => {
      for (let i = 1; i <= length; i++) {
        const numOfBedrooms = faker.random.number({min: 1, max:3});
        for (let j = 0; j < numOfBedrooms; j++) {
          const private_room_id = i;

          if(!writeStream.write(`${id},${private_room_id}`)) {
            await new Promise(resolve => writeStream.once('drain', resolve));
          }
          if (i !== length || j !== numOfBedrooms) {
            id++;
            writeStream.write('\n');
          }
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve({message: 'bedrooms generated', bedrooms: id - 1}));
  });
};

const generateBeds = (filepath, length) => {
  return new Promise((resolve, reject) => {

    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('id,bedrooms_id,size\n');
    let id = 1;
    (async() => {
      for (let i = 1; i <= length; i++) {
        const numOfBeds = faker.random.number({min: 1, max:3});
        for (let j = 0; j < numOfBeds; j++) {
          const bedrooms_id = i;
          const size = faker.random.number({min: 1, max:3});

          if(!writeStream.write(`${id},${bedrooms_id},${size}`)) {
            await new Promise(resolve => writeStream.once('drain', resolve));
          }
          if (i !== length || j !== numOfBeds) {
            id++
            writeStream.write('\n');
          }
        }
      }
      writeStream.end();
    })();
    writeStream.on('finish', () => resolve('beds generated'));
  });
};

generateHouseData('./description/database/DataGenerator/data/houses.csv', numOfRecords)
  .then((res) => {
    console.log(res);
    return generatePhotoData('./description/database/DataGenerator/data/photos.csv', numOfRecords);
  })
  .then((res) => {
    console.log(res);
    return generateAmenityList('./description/database/DataGenerator/data/amenityList.csv');
  })
  .then((res) => {
    console.log(res);
    return generateAmenities('./description/database/DataGenerator/data/amenities.csv', numOfRecords);
  })
  .then((res) => {
    console.log(res);
    return generatePrivateRoom('./description/database/DataGenerator/data/privateRoom.csv', numOfRecords);
  })
  .then((res) => {
    console.log(res);
    return generateBedSizes('./description/database/DataGenerator/data/bedSize.csv');
  })
  .then((res) => {
    console.log(res);
    return generateBedrooms('./description/database/DataGenerator/data/bedrooms.csv', numOfRecords);
  })
  .then((res) => {
    console.log(res.message);
    return generateBeds('./description/database/DataGenerator/data/beds.csv', res.bedrooms);
  })
  .then((res) => {
    console.log(res);
    console.log('Data Generated');
  });
