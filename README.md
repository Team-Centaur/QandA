# Project Title: FEC Uranus

## Description


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to run this application on your local machine, you will need to have Node.js and npm installed. You can check if you have Node.js installed by running:

```node -v```

And check if you have npm installed by running:

```npm -v```


If you don't have Node.js installed, you can download it [here](https://nodejs.org/en/download/). npm is distributed with Node.js, which means that when you download Node.js, you automatically get npm installed on your computer.

### Installing

After making sure your machine meets the prerequisites, you can proceed with the following steps to get a development env running:

First, clone the repository to your local machine. You can do this by running:
```git clone https://github.com/rfp-2305-uranus/fec-uranus.git```


Then, navigate to your cloned repository by running:
```cd fec-uranus```

Inside the repository, install the necessary npm packages by running:
```npm install```

Include a `.env` file with the included variables
```
REACT_APP_API_KEY = <your_api_key_>
PORT = 3000
```

### Running the application

After installing the dependencies, you can now run the application in development mode using:
```npm run start```

The application will then be accessible at `http://localhost:3000/`.

When ready for production the app can be built using:
```npm run build```

You can host the app using the included express.js server using:
```npm run server-prod```

The app will be hosted on port `3000`

This application is built using the following technologies:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Axios](https://axios-http.com/): Promise-based HTTP client for the browser and node.js.
- [Fluent UI](https://developer.microsoft.com/en-us/fluentui): A collection of UX frameworks for creating beautiful, cross-platform apps that share code, design, and interaction behavior.
- [Prop-Types](https://www.npmjs.com/package/prop-types): Runtime type checking for React props and similar objects.
- [DayJS](https://day.js.org/): A minimalist JavaScript library for modern browsers with a largely Moment.js-compatible API.

## Authors

[Loren Johnson](https://github.com/L-ren)

Girijesh Thodupunuri,

[Tim Engle](https://github.com/TimEngleSF)


## License

This project is licensed under the ISC License.
