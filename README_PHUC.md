### NFQ Asia Front-end Home Assignment

1. Set up (locally)
- Open Terminal/Command Prompt
- cd to the folder with this file
- run `npm install`
- run `npm run start`
- In your browser, open `http://localhost:8080/`


2. Tech stack
- React
- Redux-saga
- Axios for API call
- history, react-router and connected-react-router for routing

3. Features: The app consists of 2 main routes
- default / `/collection` route: Displays a list of media added to user's personal collection. This page has a filter by title (partial word filter and case-insensitive). Each item in this page has a button for user to remove media from the collection, like the media or edit media details
- `/search` route: Consists a search bar for user to call NASA's API to get media data. Each item in this page has a button to add the media to user's collection. If an item is already in the list, the button will be disabled

4. Structure
- Components: 
  - ItemList: used to display `/search` route with the search function
  - PersonalCollection: used to display the default / `/collection` route with the filter
  - Item: used to render a single media item
  - EditItem: used to display the popup to edit media item

- Reducer: 1 single reducer to manage redux store with
  - searchResultMap: a map of results returned by API call
  - personalCollectionMap: a map of media items saved to personal collection
  - loading state and error 

- saga: manages actions dispatched by components
- services: 
  - apiService: handles API calls
  - dataService: handles data transformation and operation on local storage
- styles: styling for different components

5. Possible improvement: Since time is short, I have left out certain ideas for improvement:
- Use .env file to store environment variables such as host URL for API calls
- Lazy-load or pagination for ItemList and PersonalCollection
- Handle different error codes from NASA API
  
