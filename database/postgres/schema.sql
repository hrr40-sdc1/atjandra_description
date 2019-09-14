CREATE TABLE houses (
  house_id int PRIMARY KEY,
  title text,
  "location" text,
  is_entire_place boolean,
  super_host_name text,
  super_host_photo text,
  rating int,
  "desc" text,
  space_desc text,
  guest_desc text,
  other_desc text
);

CREATE TABLE photos (
  photo_id int PRIMARY KEY,
  house_id int,
  file_path text,
  "desc" text
);

CREATE TABLE amenities (
  id int PRIMARY KEY,
  house_id int,
  amenity_id int
);

CREATE TABLE amenity_list (
  id int PRIMARY KEY,
  category text,
  item text,
  "desc" text
);

CREATE TABLE private_room (
  id int PRIMARY KEY,
  house_id int,
  guests int,
  bath int
);

CREATE TABLE bedrooms (
  id int PRIMARY KEY,
  private_room_id int
);

CREATE TABLE beds (
  id int PRIMARY KEY,
  bedrooms_id int,
  size int
);

CREATE TABLE bedSize (
  id int PRIMARY KEY,
  size text
);
