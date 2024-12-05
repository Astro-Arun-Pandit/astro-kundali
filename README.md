# Astro Arun Pandit Kundali Report

Astro Arun Pandit Kundali Report is used to Kundali Report 

## Project Setup

Follow these steps to set up and run the project locally:

### Prerequisites

-   Node.js (version 18.10.0 or higher)
-   Mongodb database

### Installation

1. Clone the repository:

    ```bash
    git clone --recurse-submodules https://github.com/Astro-Arun-Pandit/astro-kundali.git

    cd astro-kundali
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

        #### Install submodules dependencies(if required)

    ```npm run mod:update```

        _Note: use this command for fetch shared modules update_


3. Create a `.env` file and add your environment variables. You can use the sample `.env.example` file provided.

    ```bash
    cp .env.example .env
    ```

4. Run database migrations:

    ```bash
    npm run migrate:latest
    ```

### Running the Project

-   For development:

    ```bash
    npm run dev
    ```

-   For production:

    ```bash
    npm start
    ```




## Environment Variables

Create a `.env` file in the project root and add the following variables:

# Basic Variables
NODE_ENV=
BASEURL=
PORT=
ALLOWED_ORIGINS=
SENTRY_DSN=
TIMEZONE=

# EMAIL CONFIG
SMPT_HOST=
SMPT_PORT=
SMPT_SERVICE=
SMPT_MAIL=
SMPT_PASSWORD=


# JWT KEY
JWT_SECRET_KEY=
JWT_EXPIRY_TIME='28days'