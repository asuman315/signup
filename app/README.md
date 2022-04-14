


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
    + app.use(cors({ origin: ['http://localhost:5000', 'http://localhost:3000', 'https://asuman315.github.io'], credentials: true]}));
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

  ### 4. Errors kept on crashing my server - because Express didn’t handle them for me.

  I was using asynchronous javascript logic to add data to the database. I needed to catch the errors manually using the try-catch block and invoke my 'error handler middleware' using the `next()` function. 

  ```diff
     - const signup = async (req, res) => {
   const { firstname, lastname, email, password } = req.body
   const user = await User.create({ ...req.body })
   const token = user.createJWT()
   res.status(StatusCodes.CREATED).json({ user: { firstname: user.firstname, lastname: user.lastname }, token })
}

 +  const signup = async (req, res, next) => {
  try {
   const { firstname, lastname, email, password } = req.body
   const user = await User.create({ ...req.body })
   const token = user.createJWT()
   res.status(StatusCodes.CREATED).json({ user: { firstname: user.firstname, lastname: user.lastname }, token })
  } catch (error) {
    next(error)
  }
}
```
This was the [source were I got most of what I wanted](https://scoutapm.com/blog/express-error-handling)

## Lessons Learned
###1. *Errors will always crash the server* hence bring everything down if not handled properly. I thought I would get away with not handling errors properly lol.

###2. *Fundamental understanding of middleware and how it functions - in a nut shell*. 
 - Middleware are essentialy functions that run between when the server recieves a request and before a response fires to the client.
  - They are triggered sequentially (top to bottom) based on their sequence in code.
  - They operate until the process exits, or the response has been sent back to the client.
  - The `next()` function is used to call the next middleware function in a sequence.
  - `res, req, next, error` must be passed to the Error handler middleware function for express to know that the function is an 'error handler'! Or else, it won't be invoked.
  - `error` must be passed into the `next()` function - like so `error(error)` - if the error handler middleware is to be invoked.

###3 Express catches errors automatcally if code is synchronous. Express won't handle errors automatically during asynchronous code execution. The developer needs to catch their errors.


