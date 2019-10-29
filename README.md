# URL Shortner Service

URL shortner service created with NodeJS, Express, MongoDB

## Route
POST api/url/shorten
```json
{
    "longUrl" : "very long url"
}
```
Returns : Status 200 with 
```json
{
    "longUrl" : "very long url",
    "shortUrl" : "short url",
    "urlCode" : "short url code used to hash"
}
```

## Example .env file
```
MONGO_URI=mongodburl in string
BASE_URL=url from where the redirection will work
NODE_ENV=development
PORT=port on which the app is running
```

## Usage
Clone the repository and then go inside the cloned repository ```cd url-shortner``` then run

```
npm i
``` 
to install all the dependecies

### To serve the project
Run
```
npm start
```