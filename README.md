<h1 align="center">
  <br>
    Expense Tracker
  <br>
</h1>

<h4 align="center">A minimal expense tracker mobile app using <a href="https://expo.dev" target="_blank">Expo React Native</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#setup-instructions">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

![screenshot](./assets/screenshot.png)

## Available Features

- CRUD Expense History
- Expense summary

## Setup Instructions

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)), [Bun](https://bun.sh), [Python](https://www.python.org) installed on your computer. From your command line:

1. Clone the repository

    ```bash
    git clone https://github.com/Shafnaa/first-expo
    ```

    or

    ```bash
    git clone git@github.com:Shafnaa/first-expo.git
    ```

2. Go into the repository

    ```bash
    cd first-expo
    ```

3. Install dependencies

    ```bash
    bun install
    ```

4. Setup your .env file

    ```bash
    cat .env.example > .env.local
    ```

5. Run the development server

    ```bash
    bun run start
    ```

6. Open a new terminal & go into the repository

    ```bash
    cd first-expo
    ```

7. Create new python virtual environment

    ```bash
    python3 -m venv .venv
    ```

8. Activate the virtual environment

    Linux:
    ```bash
    source .venv/bin/activate
    ```
    
    Windows:
    ```bash
    .venv\Scripts\Activate.bat
    ```

9. Run the Python Fast API Backend

    ```bash
    sh dev.sh
    ```

## Technical decisions and architecture

Tech Stack:

- React
- React Native + Expo
- NativeWind
- React Query
- React Native Reusables
- Axios
- Fast API
- SQLAlchemy

## Future improvements

- Authentication

---

> [saujanashafi.me](https://saujanashafi.me) &nbsp;&middot;&nbsp;
> GitHub [@Shafnaa](https://github.com/Shafnaa) &nbsp;&middot;&nbsp;
> Instagram [@saujanashafi](https://instagram.com/saujanashafi) &nbsp;&middot;&nbsp;
> X [@saujanashafi](https://x.com/saujanashafi)
