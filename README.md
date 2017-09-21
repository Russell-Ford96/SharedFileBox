# SharedFileBox
Simple app for requesting documents from users

## Build
git clone https://github.com/Russell-Ford96/SharedFileBox.git;
cd SharedFileBox;
npm install;
node server;

## Usage
Admin should navigate to localhost:5000/admin (this will change to localhost:5000/login)
Admin creates document request in bottom right.

Navigate to localhost:5000/upload/{{ id returned by created document request}}
User can select documents to upload for each document required
