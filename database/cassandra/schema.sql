CREATE TYPE bed_size (
  size text
);

CREATE TYPE bedroom (
  beds list<frozen<bed_size>>
);

CREATE TYPE private_room (
  guest int,
  bedrooms list<frozen<bedroom>>,
  bath int
);

CREATE TYPE amenity (
  category text,
  item text,
  "desc" text
);

CREATE TYPE photo (
  file_path text,
  "desc" text
);

CREATE TABLE houses (
  house_id int PRIMARY KEY,
  photos list<frozen<photo>>,
  title text,
  "location" text,
  is_entire_place Boolean,
  private_room frozen<private_room>,
  super_host_name text,
  super_host_photo text,
  rating int,
  "desc" text,
  space_desc text,
  guest_desc text,
  other_desc text,
  amenities list<frozen<amenity>>
);

insert into houses(house_id,photos,title,"location",is_entire_place,private_room,super_host_name,super_host_photo,rating,"desc",space_desc,guest_desc,other_desc,amenities) Values (
  1, [{file_path: 'test.jpg', "desc": 'test'},{file_path: 'test2.jpg', "desc": 'test2'}], 'test title', 'test location', true, {guest: 2, bath: 3, bedrooms:[{beds: [{size: 'king'}]},{beds: [{size: 'king'}, {size: 'normal'}]}]}, 'host name', 'host photo', 50, 'my desc', 'space desc', 'guest desc', 'other desc', [{category: 'basic', item: 'i1', "desc": 'desc1'}, {category: 'basic', item: 'i2', "desc": 'desc2'}]);
