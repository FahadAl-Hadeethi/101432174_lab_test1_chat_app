COMP3133 Lab Test 1 - Status Report
Overview
This lab test involved building a full-stack chat application with real-time messaging, user authentication, room management, and MongoDB storage. The main objective was to create a functional chat system where users can sign up, log in, join rooms, send messages, and see real-time updates, with all data (including messages) being stored in MongoDB.

Features Implemented
Signup Page:

Users can sign up by providing their username, first name, last name, and password.
Passwords are securely hashed using bcryptjs.
The user data is stored in MongoDB, and unique usernames are enforced via Mongoose validation.
Login/Logout Functionality:

Users can log in using their credentials, with a JWT token stored in localStorage to maintain the session.
The login page authenticates users via the /auth/login endpoint and redirects the user to the room selection page upon successful login.
A logout button has been added to the chat page that clears the session and redirects the user back to the login page.
MongoDB Integration:

MongoDB is used for storing user data, messages, and room information.
Mongoose schemas and validation are implemented for user data and messages.
All chat messages are stored in the database and displayed to users when they join a room.
Users can send messages that are saved in MongoDB and displayed in real-time to others in the same room.
Room Management:

Users can join pre-defined rooms such as "DevOps," "Sports," etc., by selecting from a drop-down list.
Socket.IO is used to handle the joining and leaving of rooms in real-time.
The chat page is dynamically updated with the correct room name and previously sent messages.
Typing Indicator:

A typing indicator is implemented using Socket.IO to show when another user in the room is typing.
The typing message is cleared once the user stops typing or sends a message.
Chat Functionality with MongoDB Storage:

Users can send messages, and all messages are saved in MongoDB.
Previous messages are retrieved from the database when a user joins a room.
All messages are emitted in real-time to other users in the same room using Socket.IO.
Styling:

The pages have been styled to be responsive and user-friendly.
The login and room selection pages are centered and visually appealing.
The chat page has a professional and clean design, with a designated space for messages, typing indicators, and message input.
Files and Technologies Used
Frontend:

HTML
CSS
JavaScript (using jQuery for DOM manipulation and Socket.IO for real-time communication)
LocalStorage for session management
Backend:

Express.js for building the server
Socket.IO for real-time communication
MongoDB for message storage
Mongoose for data modeling and validation
Challenges Faced

Session Handling: Implementing session management using localStorage was slightly tricky at first, but it was resolved by using JWT tokens for authentication.

Real-Time Features: Making sure the chat updates in real-time and the typing indicator worked for everyone in the room was a bit tricky. However, with Socket.IO, it was 
successfully implemented.
What’s Next
Further testing to ensure all chat rooms work as expected with real-time messaging.
Optimize the UI for responsiveness and clarity across different devices.
Implement more robust error handling and validations on the server-side.
Conclusion
The lab test has been successfully completed with all the necessary features implemented. The application is fully functional, with a signup page, login/logout functionality, real-time messaging, room management, MongoDB integration, and a typing indicator. The project is ready for submission!