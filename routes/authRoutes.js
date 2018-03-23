const passport = require('passport');

//we are exporting a function which takes the express app
//as an arg
module.exports = (app) => {
    //we don't use a callback as a second argument here,
    //because we want to route the user into the passport
    //authentication flow.
    //GoogleStrategy internally wires to the string 'google'
    //so 'google'(1st arg) refers GoogleStrategy defined above.
    //scope(permissions)(2nd arg) specifies to google servers what
    //access we want to have inside the users profile(here profile
    //and email).Google has many scopes apart from these(contacts, images etc)
    app.get("/auth/google", passport.authenticate("google", {
        scope: ["profile", "email"],
        //prompts the user to select an account every
        //time they login
        prompt: "select_account"
      }));

    //passport handles the callback instead of us
    //worrying about the logic.
    //after getting the (code), it gets the actual user profile
    //instead of routing the user for authentication like above
    //passport.authenticate('google') is a middleware
    //This middleware is a function that takes the incoming request,
    //further authenticates the user(in this case, it takes the code
    //out of the url and then goes and fetches the user profile and then
    //it calls our callback in GoogleStrategy)
    //After all the google authentication stuff, it then passes
    //on the request to the next middleware in the flow
    //Here, once the passport.authenticate('google) middleware
    //is done with the request, it passes the request on to the next helper
    //in the chain which in this case is the (req, res) arrow function,
    //to redirect the user to '/surveys' route.
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            //res.redirect() redirects the request to another 
            //route in the express app
            res.redirect('/surveys');
        } 
    );

    //log out users
    app.get('/api/logout', (req, res) => {
        //req.logout() is added automatically by passport
        //to the request object, just like it added req.user
        //following deserializeUser in the authentication flow
        //logout() takes the user cookie with the user id 
        //and kills the id in that cookie, so that the app 
        //no longer recognizes the id(and therefore the user) 
        req.logout();
        //sending some acknowledgement.
        //Here req.user is undefined because we no longer have
        //the user because of req.logout(). It i destroyed
        //the moment we call logout()
        //an empty string
        //res.send(req.user);
        //redirects the user to the root('/') route of our app
        res.redirect('/');
    });
    
    //after the user logs in with oAuth(the final part of login authentication flow)
    //when the user requests this route,
    //1. Request sent to this route handler 
    //2. The cookie-session extracts cookie data
    //3. Passport pulls id out of cookie data
    //4. deserializeUser turns the user id into a user
    //5. Finally, the authentication flow continues after
    //   done(null, user) in  deserializeUser and we add
    //   that user model instance to request object 
    //   as 'req.user'
    app.get('/api/current_user', (req, res) => {
        //if user logs out using /api/logout route
        //this req.user will also be undefined.
        //We need to again login with /auth/google
        res.send(req.user);
    });
};

