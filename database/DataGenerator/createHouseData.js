const fs = require('fs');
const faker = require('faker');

const generateFile = (filepath, length) => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filepath, { encoding: 'utf8' });
    writeStream.write('[');
    for (let i = 1; i <= length; i++) {
      // console.log(i);
      const obj = {
        'title': faker.lorem.sentences(2),
        'location': faker.address.city(),
        'is_entire_place': faker.random.boolean(),
        'super_host_name': `${faker.name.firstName()} ${faker.name.lastName()}`,
        'super_host_photo': 'super-host-photo-1.jpg',
        'rating': faker.random.number(100),
        'desc': faker.lorem.sentences(3),
        'space_desc': faker.lorem.sentences(10)
      };

      writeStream.write(`${JSON.stringify(obj, null, 2)}`);
      if (i !== length) {
        writeStream.write(',');
      }
    }
    writeStream.write(']');
    writeStream.end();
    writeStream.on('finish', () => { resolve(`done with ${filepath}`); });
    writeStream.on('error', reject);
  });
};

generateFile('./description/database/DataGenerator/houses.json', 1000000)
  .then(() => {
    console.log('all done');
  });
