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

### Request errors with Cloudflare Turnstile
- Turnstile may log a request with a 401 response in DevTools. This is it's documented fallback, and the widget token is verified server-side. [Here is the information](https://developers.cloudflare.com/cloudflare-challenges/reference/private-access-tokens/)

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
