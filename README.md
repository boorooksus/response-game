# 반응 속도 게임

## Demo

### 메인 페이지

![image](https://user-images.githubusercontent.com/55964775/163923006-3b94011e-3996-4a92-99f6-884ca8f7c722.png)
<br />

### 난이도별 게임 플레이

- Easy Mode
  ![easy_mode](https://user-images.githubusercontent.com/55964775/163922872-a27dbf6e-081a-4c3e-808d-565b918f1838.gif)

- Medium Mode
  ![medium_mode](https://user-images.githubusercontent.com/55964775/163922929-2092a564-08af-4180-a165-0b0045209a0f.gif)

- Hard Mode
  ![hard_mode](https://user-images.githubusercontent.com/55964775/163922946-7c6a226f-dd07-43df-b140-9814229aaa74.gif)
  <br />

### 랭킹 시스템

![image](https://user-images.githubusercontent.com/55964775/163923061-e4f6428a-3584-4cf1-963d-6511d44e29f5.png)

<br />

## Quick Start

### Prerequisites

- Make sure your NodeJS and npm versions are up to date

### Download

- [Download the latest version](https://github.com/boorooksus/response-game/archive/refs/heads/main.zip)

or

- Clone the repository

```bash
$ git clone https://github.com/boorooksus/response-game.git
```

### Installation

- Install dependencies

```bash
$ npm install
$ cd client
$ cd install
$ cd ../
```

- Set up MongoDB
  - get URI for MongoDB account.
  - create `dev.js` file in `server/config/`.
  - write code and add you MongoDB URI in it.
  ```javascript
  module.exports = {
    mongoURI: "your mongoDB URI",
  };
  ```

### Basic Usage

- start server and client

```bash
$ npm run dev
```

- Navigate to [http://localhost:3000](http://localhost:3000)

<br />

## Developing

### Built With

- React
- React Router
- TypeScript
- Tailwind CSS
- Node.js
- Express.js
- MongoDB

### Prerequisites

- Install editor `Visual Studio Code` or `WebStorm`
- Make sure your `NodeJS` and `npm` versions are up to date
- get MongoDB URI

### Setting up Dev

- Install project

```bash
$ git clone https://github.com/boorooksus/response-game.git
$ cd server
$ npm install
$ cd ../
$ cd client
$ cd install
```

- Set up MongoDB
  - get URI for MongoDB account.
  - create `dev.js` file in `server/config/`.
  - write code and add you MongoDB URI in it.
  ```javascript
  module.exports = {
    mongoURI: "your mongoDB URI",
  };
  ```
  <br />

## Directory Structure

    response-game/
    ├── client/                           # front-end
    │   ├── public/                       # static files
    │   │   └── index.html                # html template
    │   │
    │   └── src/                          # project root
    │       ├── components/               # application components
    │       │   ├── views/                # application views
    │       │   │   ├── GamePage/         # images, icons, etc.
    │       │   │   │   ├── sections/     # components for the page
    │       │   │   │   ├── GamePage.tsx  # view for game page
    │       │   │   │   └── types.tsx     # types for typescript
    │       │   │   └── ...
    │       │   └── App.tsx
    │       ├── index.css                 # common style css
    │       ├── index.tsx
    │       ├── ...
    │       └── setupProxy.js             # proxy settings
    │                                     #   for local server
    │
    ├── server/                           # back-end
    │   ├── config/                       # mongoDB key
    │   ├── middleware/                   # custom middlewares
    │   ├── models/                       # Database models
    │   ├── routes/                       # routes for api
    │   └── index.js
    ├── pakage.json                       # dependencies for server
    └── README.md

<br />
