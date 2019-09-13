const fs = require('fs');
const faker = require('faker');

const generateHouseData = (filepath, length) => {
  return new Promise((resolve, reject) => {

    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('title,location,is_entire_place,super_host_name,super_host_photo,rating,desc,space_desc\n');

    (async() => {
      for (let i = 1; i <= length; i++) {
        const title = faker.lorem.sentences(2);
        const location = faker.address.city();
        const is_entire_place = faker.random.boolean();
        const super_host_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const super_host_photo = 'super-host-photo-1.jpg';
        const rating = faker.random.number(100);
        const desc = faker.lorem.sentences(3);
        const space_desc = faker.lorem.sentences(10);

        if(!writeStream.write(`${title},${location},${is_entire_place},${super_host_name},${super_host_photo},${rating},${desc},${space_desc},`)) {
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

generateHouseData('./description/database/DataGenerator/houses1.csv', 1000)
  .then((res) => {
    console.log(res);
  });