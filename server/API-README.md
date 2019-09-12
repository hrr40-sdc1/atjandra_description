# API Routes for description service

1. GET
Route: http://localhost:3010/houses/101

Example Response:
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

1. POST
Route: http://localhost:3010/houses/
Content-Type: application/json
Data:
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

Example Response:
{
    "success": true,
    "message": "Item Created",
    "id": "5d798d918da2e7077ff23713"
}

1. PUT
Route: http://localhost:3010/houses/101
Content-Type: application/json
Data:
{
	"location": "Lake Janiehaven"
}

Example Response:
{
    "success": true,
    "message": "Item Updated"
}

1. DELETE
Route: http://localhost:3010/houses/101

Example Response:
{
    "success": true,
    "message": "Item Deleted"
}