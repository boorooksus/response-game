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

![ranking](https://user-images.githubusercontent.com/55964775/183592174-430a2b72-aa63-4856-9b9e-b74a4dc19936.png)

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

<img src="https://user-images.githubusercontent.com/55964775/183598786-7a59372c-1dbd-40d6-8dec-ded02ff7d1a7.png" alt="react" align="center" width="100px">
<img src="https://user-images.githubusercontent.com/55964775/183602710-3e2030e8-7909-45b6-9dca-726ef4a390eb.png" alt="react router" align="center" width="100px">
<img src="https://user-images.githubusercontent.com/55964775/183598744-edc46979-d68a-4259-abc9-6c9271278684.png" alt="Logo of the project" align="center" width="100px">
<img src="https://user-images.githubusercontent.com/55964775/183598811-8f5cbf4f-2a0d-4c45-85d8-4781a6ae6c11.png" alt="typescript" align="center" width="100px">
<img src="https://user-images.githubusercontent.com/55964775/183606003-aac551e6-6f96-4d3f-ac59-0399d4d4fe9b.png" alt="nodejs" align="center" width="100px">
<img src="https://user-images.githubusercontent.com/55964775/183606862-59aa3f5c-9ea2-4dce-8d83-0b514aef01a7.png" alt="mongodb" align="center" width="100px">

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
