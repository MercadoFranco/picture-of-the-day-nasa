# picture-of-the-day-nasa
A responsive React app which consumes NASA's api to display the picture of the day.

The app was created using Vite with TypeScript, and uses tailwind for styling.

It consist's of two screens, a list which displays the last 30 pictures of the day obtained from NASA's api, and a detailed view which includes a short description of the image.
On the Home or Gallery view, each item aside of containing a thumbnail of the image, the name and date the picture corresponds to, also has two buttons. One to "like" the picture, and another one to share it.
The sharing is done through the native web share api which means the actual execution will vary from OS to OS. In the cases where the web share api is not available, the text will instead be copied to the clipboard.
On the lower right side of the screen is a FAB which contains the "filter by liked" button, and a look up button. 
The look up button will open a modal allowing the user to go to a specific date, beyond the last 30 pictures.

The second screen, the focused view, displays the image of a day (whether accessed through the gallery or through the search modal) on full resolution and a short description.

The fetching is done using Axios, and implemented through custom hooks stored in utils/api.ts.

