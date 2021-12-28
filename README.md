## AWS Demo
http://3.12.104.208:8080/api/

## Installing the API Locally

- Download or clone the project, access the project folder with the terminal and execute the CLI <code>npm install</code>
- Create a .env file same as .env-sample / or change constants to your database options (For this project I did not remove .env file because it will only be tested by Getir developers.)
- Run the server <code>npm start</code>
- Access <a href="http://localhost:8080/api/">http://localhost:8080/api/</a> in your browser 

### Test
- To run all tests at once `npm run test`
- To run only unit tests `npm run test-unit`
- To run only integration tests `npm run test-integration`

### Example .env
.env should provide
`DB_HOST`,
`DB_URL`,
`DB_NAME`,
`DB_OPTION`,
`APP_PORT`

## Routes
To fetch the records between `startDate`-`endDate` and sum of `counts` array range between `minCount`-`maxCount` 

```plaintext
POST /api/records
```

| Path                    | Payload          | Required| Sample Payload               |
|:-----------------------------|:--------------|:-----------------------|:--------------------|
| `api/records`                       | object        | Yes | ```{"startDate": "2014-02-13","endDate": "2017-12-30","minCount": 900,"maxCount": 1100}```| 


Body Structure:
| Field Name                    | Type          | Required 
|:-----------------------------|:--------------|:-----------------------|
| `startDate`                       | String date formatted as `YYYY-MM-DD`        | Yes |
| `endDate`                       | String date formatted as `YYYY-MM-DD`        | Yes |
| `minCount`                       | Number `must be integer`        | Yes |
| `maxCount`                       | Number `must be integer`         | Yes |

Example request:

```shell
curl --header "Content-Type: application/json" -d "{\"startDate\":\"2014-02-13\",\"endDate\":\"2015-12-30\",\"minCount\":900,\"maxCount\":1000}" http://localhost:8080/api/records
```

Example response:

```json
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "BxPIpHyv",
            "createdAt": "2015-07-27T00:15:38.365Z",
            "totalCount": 926
        },
        {
            "key": "csOfIsPQ",
            "createdAt": "2015-02-26T08:20:47.372Z",
            "totalCount": 939
        }
    ]
}
```

## Error handling

Error responses should include a common HTTP status code, message for the developer, message for the end-user. For example:
### Undefined Path * 404 - Not Found

    {
      "error": {
        "code": -1,
        "msg": "There is no endpoint like /no-path for POST request."
      }
    }

### Missing || Wrong payload * 400 - Bad Request

    {
      "error": {
        "code": -2,
        "msg": "maxCount should not be empty!"
      }
    }

### Server Errors * 500 - Internal Server Error

    {
      "error": {
        "code": -3,
        "msg": "Internal Server Error...."
      }
    }
