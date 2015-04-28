## About

This is a personal project to grab tweets related to companies traded on the NYSE.


## To Run
```
NODE_ENV=production NODE_TASK=watch node index.js
NODE_ENV=production NODE_TASK=process node index.js

NODE_ENV=production NODE_TASK=watch forever index.js
NODE_ENV=production NODE_TASK=process forever index.js

NODE_ENV=development NODE_TASK=watch nodemon index.js
NODE_ENV=development NODE_TASK=process nodemon index.js
```