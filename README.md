# pinterestclone

### Build
```sh
$ npm run build_prod
```
for development
```sh
$ npm run build
```

### Start
```sh
$ npm run start_prod
```
for development
```sh
$ npm run start
```

Don't forget to create a file named config.json in root directory

config.json structure
``` json
{
    "JWT_SECRET": "SECRET_JWT_KEYWORD",
    "JWT_TOKEN_SECRET": "EVEN_MORE_SECRET_JWT_KEYWORD",
    "DB": "LINK_TO_DB_example:'mongodb://localhost:27017/pinterestclone'",
    "TWITTER_CONSUMER_KEY": "TWITTER_CONSUMER_KEY(Provided by twitter)",
    "TWITTER_CONSUMER_SECRET": "TWITTER_CONSUMER_SECRET(Provided by twitter)",
    "TWITTER_CALLBACK": "http://yourdomain.com/api/user/twitterCallback"
}
```
