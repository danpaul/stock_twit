## About

This is a personal project to grab tweets related to companies traded on the NYSE.


## To Run
```
NODE_ENV=production NODE_TASK=watch node index.js
NODE_ENV=production NODE_TASK=process node index.js

NODE_ENV=development NODE_TASK=watch nodemon index.js
NODE_ENV=development NODE_TASK=process nodemon index.js
```

277000 rows in 4 minutes = aprx 1150 rows/second