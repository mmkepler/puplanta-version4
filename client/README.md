# Puplanta
## Atlanta area dog parks and pet shop information in one place. Vote on your favorites.

### Built with:
-  React/Vite
-  CSS
-  Supabase for DB, Auth, and Storage
-  Leaflet for maps
-  Helmet for SEO
-  Axios for requests
-  Node.js/Express for API
-  Cloudflare turnstile

### Many unavoidable console errors with Cloudflare Turnstile
- Turnstile may log a request with a 401 response in DevTools. This is it's documented fallback, and the widget token is verified server-side. As I write this there are 6 errors in the console all having to do with the service. My site's ability to sign up or sign in still works. I have no idea how this service can have so many issues. But Google's Captcha has a lot of issues with users not being able to get into the site and HCaptcha has accessibility issues so I am stuck using this. If the web was not the wild west of bots/agents a simple site like this would not need so much protection. As of now there are 4 warnings and 4 errors showing if you are on the sign in or sign up page from a script Turnstile uses. I have used both the Marisdev component and added the explicit Turnstile code and they both have the same errors. I will keep checking for updates about this.  [Here is the information](https://developers.cloudflare.com/cloudflare-challenges/reference/private-access-tokens/)

### Possible future updates
- Possibly move upload Image functions to the api
- an admin form for quick park/store additions
- a contact form that is protected from bots
- add the profile pic to the navigation menu on larger size screens
- Save the profile image url locally for faster loading. I can't currently do this with a private storage bucket on Supabase because the url has an expiration. I need to keep it private since it is a free tier and has usage limits

### Special thanks to:
- [marsidev react turnstile package](https://github.com/marsidev/react-turnstile)
- [This Stack Overflow post where I learned about stopPropagation](https://stackoverflow.com/questions/59017954/react-close-modal-on-click-outside)
- [This video shows how to keep change password routes protected while using Supabase](https://www.youtube.com/watch?v=PXTBaLQDBkQ)
- [ai-robots-txt](https://github.com/ai-robots-txt/ai.robots.txt/tree/main)
- [Leaflet](https://leafletjs.com/)
