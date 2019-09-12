# API Routes for description service

## Houses Database

#### GET  
Route: http://localhost:3010/houses/101

Example Response:
```sh
{
    "private_room": {
        "guest": 1,
        "bedrooms": [
            {
                "beds": [
                    {
                        "_id": "5d798e358da2e7077ff23728",
                        "size": "king"
                    }
                ],
                "_id": "5d798e358da2e7077ff23727"
            }
        ],
        "bath": 1
    },
    "availability": [
        "2019-8-27",
        "2019-9-1",
        "2019-9-5"
    ],
    "_id": "5d798e358da2e7077ff23726",
    "house_id": 101,
    "title": "Dui Nec Urna Suscipit Nonummy. Fusce Fermentum Fermentum",
    "location": "Virton",
    "super_host_name": "Dalton Lee",
    "super_host_photo": "super-host-photo-1.jpg",
    "rating": 25,
    "desc": "rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus.",
    "amenities": [
        {
            "_id": "5d798e358da2e7077ff2372a",
            "category": "Basic",
            "item": "Wifi",
            "desc": "Continuous access in the listing"
        },
        {
            "_id": "5d798e358da2e7077ff23729",
            "category": "Basic",
            "item": "Iron",
            "desc": ""
        }
    ],
    "__v": 0,
    "photos": [],
    "id": "5d798e358da2e7077ff23726"
}
```

#### POST  
Route: http://localhost:3010/houses/  
Content-Type: application/json  
Data:
```sh
{
  "house_id":101,
  "title":"Dui Nec Urna Suscipit Nonummy. Fusce Fermentum Fermentum",
  "location":"Virton",
  "is_entire_place":false,
  "private_room":{
    "guest":1,
    "bedrooms":[
      {
        "beds":[
          {
            "size":"king"
          }
        ]
      }
    ],
    "bath":1
  },
  "super_host_name":"Dalton Lee",
  "super_host_photo":"super-host-photo-1.jpg",
  "rating":25,
  "desc":"rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac urna. Ut tincidunt vehicula risus.",
  "amenities":[
    {
      "category":"Basic",
      "item":"Wifi",
      "desc":"Continuous access in the listing"
    },
    {
      "category":"Basic",
      "item":"Iron",
      "desc":""
    }
  ],
  "availability":[
    "2019-8-27",
    "2019-9-1",
    "2019-9-5"
  ]
}
```

Example Response:
```sh
{
    "success": true,
    "message": "Item Created",
    "id": "5d798d918da2e7077ff23713"
}
```

#### PUT  
Route: http://localhost:3010/houses/101  
Content-Type: application/json  
Data:
```sh
{
	"location": "Lake Janiehaven"
}
```

Example Response:
```sh
{
    "success": true,
    "message": "Item Updated"
}
```

#### DELETE  
Route: http://localhost:3010/houses/101

Example Response:
```sh
{
    "success": true,
    "message": "Item Deleted"
}
```

## Photos Database

#### GET  
Route: http://localhost:3010/photos/houses/2

Example Response:
```sh
[
    {
        "_id": "5d797ec7f03f9e0693b8e0a5",
        "photo_id": 8,
        "house_id": 2,
        "file_path": "house-photo-8.jpg",
        "desc": "varius ultrices, mauris ipsum porta elit, a feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue, eu tempor erat",
        "__v": 0
    },
    {
        "_id": "5d797ec7f03f9e0693b8e0a6",
        "photo_id": 9,
        "house_id": 2,
        "file_path": "house-photo-9.jpg",
        "desc": "enim diam vel arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci,",
        "__v": 0
    },
    {
        "_id": "5d797ec7f03f9e0693b8e0ab",
        "photo_id": 14,
        "house_id": 2,
        "file_path": "house-photo-14.jpg",
        "desc": "hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium",
        "__v": 0
    },
    {
        "_id": "5d797ec7f03f9e0693b8e0a8",
        "photo_id": 11,
        "house_id": 2,
        "file_path": "house-photo-11.jpg",
        "desc": "eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis",
        "__v": 0
    }
]
```

#### POST  
Route: http://localhost:3010/photos/houses/  
Content-Type: application/json  
Data:
```sh
{
    "photo_id":701,
    "house_id":2,
    "file_path":"house-photo-21.jpg",
    "desc":"senectus et netus et malesuada fames ac turpis egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer"
}
```

Example Response:
```sh
{
    "success": true,
    "message": "Item Created",
    "id": "5d79989346b36608b0339385"
}
```

#### PUT  
Route: http://localhost:3010/photos/houses/701  
Content-Type: application/json  
Data:
```sh
{
    "file_path":"house-photo-10.jpg"
}
```

Example Response:
```sh
{
    "success": true,
    "message": "Photo Updated"
}
```

#### DELETE  
Route: http://localhost:3010/photos/houses/701

Example Response:
```sh
{
    "success": true,
    "message": "Photo Deleted"
}
```
