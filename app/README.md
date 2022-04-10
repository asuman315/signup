


##Challenges.
### 1. I could not connect to mongodb database because of the error `MongoParseError: options useCreateIndex, useFindAndModify are not supported`

I was using code - to connect to the database - that was no longer supported in newer versions of mongoose. (version 6 and above)

*Code:* 
   ```diff
   - const connectDB = (url) => {
    return mongoose.connect(url, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false,
     useUnifiedTopology: true,
  })
}
   + const connectDB = (url) => {
      return mongoose.connect(url)
}
   ```
   Here is the [source](https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported)

### 2. Could not connect my front-end to the back-end.

   So the user's data for signing up couldn't be stored in the database. After looking at several solutions to the challenge and  several failed attempts, I realised that it was because;
   - 1. I was not running the server in the backend so I was getting... `network error`. Pretty obvious, uhh?
   - 2. Cors was blocking the local url - running on `http://localhost:3000`. So my front-end requests were not reaching the server.
   Solution? Setting allowed origins in Cors. Here was my [resource](https://stackoverflow.com/questions/45980173/react-axios-network-error)
   Inside the server file (`server.js`);
    ```diff
    - app.use(cors());
    + app.use(cors({ origin: ['http://localhost:5000', 'http://localhost:3000'], credentials: true }));
    ```

### 3. My API server failed to run in heroku because of the bcrypt error...
  'bcrypt invalid elf header'
  *Solution:* I fixed the error by switching from `bcrypt` to `bcryptjs` npm library.

  I had to re-run `npm install bcryptjs` and... 
  
  import `bcryptjs` package inside the `models` file
  ```diff
   - const bcrypt = require('bcrypt');
   + const bcryptjs = require('bcryptjs');
  ```
  
  After looking spending several minutes looking for a solution, I found an [answer on stack overflow](https://stackoverflow.com/questions/15809611/bcrypt-invalid-elf-header-when-running-node-app/68204439#68204439?newreg=7399f7da25c348aaaa2f02f9a8bde257)


