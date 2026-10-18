# Down Work

**Down Work** is a job portal designed to connect people looking for
work with employers who need to hire. It brings job discovery, job
posting, applications, user profiles, and application management
together in one place.

> **Project status:** Core features are implemented. Update the live
> URLs and project-specific details marked below before publishing this
> README.

## Table of Contents

-   [Purpose and Goals](#purpose-and-goals)
-   [Key Features](#key-features)
-   [Technology Stack](#technology-stack)
-   [Project Architecture](#project-architecture)
-   [Getting Started](#getting-started)
-   [Environment Variables](#environment-variables)
-   [API Overview](#api-overview)
-   [Authentication and Security](#authentication-and-security)
-   [Deployment](#deployment)
-   [Future Improvements](#future-improvements)
-   [Contributing](#contributing)
-   [License](#license)

## Purpose and Goals

The goal of Down Work is to make the job-search and hiring process
easier through a straightforward web application.

-   Help users discover jobs by searching and browsing categories.
-   Allow employers or job posters to publish and manage job listings.
-   Let job seekers apply for jobs and track their applications.
-   Provide profiles for relevant personal and professional information.
-   Protect authenticated API operations using Firebase ID-token
    verification.
-   Keep the application organized around a React frontend and an
    Express/MongoDB backend.

## Key Features

### Job discovery

-   Browse available job listings.
-   Search for jobs using text entered in the home-page banner.
-   Browse jobs by category.
-   View job details on a dedicated page.
-   Filter job listings using the application's search/filter
    parameters.
-   Distinguish loading, empty, and error states so users do not see
    "Zero Jobs Found" while data is still loading.

### Job posting and management

-   Create job posts.
-   View jobs posted by the current user.
-   Update job information.
-   Delete a user's own job post.
-   View applications associated with a job.

### Applications

-   Apply for jobs.
-   View jobs applied to by the current user.
-   Retrieve application information for job posters.
-   Store application data in MongoDB.

### User profiles

-   Store and update user information.
-   Retrieve existing user and profile data.
-   Support role-specific profile sections. Freelancer-oriented profile
    content can include an about section, skills, education, and
    experience where implemented in the UI.

### Authentication and request handling

-   Firebase Authentication for client-side sign-in.
-   Firebase Admin SDK for verifying ID tokens on the backend.
-   Axios secure hook attaches a Firebase ID token to authenticated
    requests.
-   Axios interceptors can manage global request loading and handle HTTP
    errors, including `403` and `404`.

> Exact access rules depend on the backend route and its authorization
> checks. A frontend-only role check is not a security boundary.

## Technology Stack

  Area                         Technologies
  ---------------------------- ---------------------------------------
  Frontend                     React
  Routing                      React Router
  Styling                      Tailwind CSS, DaisyUI
  HTTP requests                Axios
  Authentication               Firebase Authentication
  Backend                      Node.js, Express
  Database                     MongoDB Atlas, MongoDB Node.js driver
  Server-side authentication   Firebase Admin SDK
  Cross-origin requests        CORS
  Configuration                dotenv
  Backend deployment           Vercel

## Project Architecture

Down Work uses a separate frontend and backend.

``` text
down-work/
├── frontend/                 # React application (example folder name)
│   ├── src/
│   └── ...
└── down-work-server/         # Express API
    ├── index.js
    ├── package.json
    └── ...
```

The frontend communicates with the Express API through Axios. The
backend connects to MongoDB Atlas and uses Firebase Admin to verify
Firebase ID tokens for protected requests.

The frontend folder name and layout above are illustrative. Replace them
with the exact folder structure in your repository.

## Getting Started

### Prerequisites

-   Node.js (the backend package currently specifies Node.js `22.x`)
-   npm
-   A Firebase project with Authentication configured
-   A MongoDB Atlas cluster and database
-   Frontend and backend source code

### 1. Set up the backend

Open a terminal in the backend directory:

``` bash
cd down-work-server
npm install
```

Create a `.env` file in the backend directory:

``` env
MONGODB_USER=your_mongodb_username
MONGODB_PASS=your_mongodb_password
```

Configure Firebase Admin credentials using the approach supported by
your current `index.js`. If the project uses a local service-account
JSON file, place that file where the code expects it. **Never commit
service-account credentials to a public repository.**

Start the backend locally:

``` bash
npm start
```

The backend package currently uses `node index.js` as its start command.
If the entry file exports the Express app for Vercel, confirm that your
local setup still starts the server as intended.

### 2. Set up the frontend

Open a separate terminal in the frontend directory:

``` bash
npm install
npm run dev
```

Use the actual development command defined in the frontend's
`package.json`. Some React setups use `npm start` instead.

### 3. Configure the API URL

The frontend's Axios instance must point to the backend you want to use.
During local development, it may be:

``` js
baseURL: "http://localhost:3000"
```

For production, use the deployed backend URL. Keep the API base URL
centralized rather than hard-coding different URLs throughout the
codebase.

## Environment Variables

The backend uses these MongoDB environment variables:

``` env
MONGODB_USER=your_mongodb_username
MONGODB_PASS=your_mongodb_password
```

The backend connects to the `downwork_database` database. Collections
referenced by the current backend include:

-   `postedJobs`
-   `downWork_category`
-   `downWork_users`
-   `applied_jobs`

Firebase Admin credentials are also required for token verification. The
exact configuration depends on the initialization code in `index.js`.
Document the required variable names in deployment settings without
putting secret values in this file.

**Security checklist** - Do not commit `.env` files. - Do not commit
Firebase service-account private keys. - Do not expose MongoDB passwords
or private credentials in frontend code. - Add required variables to
Vercel project environment settings. - Redeploy if needed after changing
production environment variables.

## API Overview

The Express backend includes routes in the following areas. Names are
based on the current project code and should be checked against the
latest `index.js` before publishing.

  -----------------------------------------------------------------------
  Endpoint                            Purpose
  ----------------------------------- -----------------------------------
  `/jobpost`                          Create a job post

  `/jobs`                             Retrieve jobs

  `/getjobs`                          Retrieve job listings using the
                                      route's query logic

  `/jobdetails`                       Retrieve job details

  `/categorypost`                     Create or store category data

  `/category`                         Retrieve categories

  `/user`                             Create or store user data

  `/existinguser`                     Check or retrieve an existing user

  `/profile`                          Retrieve profile data

  `/updateuser`                       Update user information

  `/updatejob`                        Update job information

  `/applyjob`                         Submit a job application

  `/application`                      Retrieve application-related data

  `/myjobs`                           Retrieve jobs posted by the current
                                      user

  `/applyed`                          Retrieve applied-job data (route
                                      spelling retained from the code)

  `/myappliedjobs`                    Retrieve jobs applied to by the
                                      current user

  `/jobapplications`                  Retrieve applications for a job

  `/deletemyjob`                      Delete a user's job post
  -----------------------------------------------------------------------

Some endpoints may require query parameters, request bodies, or a
Firebase bearer token. Check each backend handler for the exact HTTP
method, payload, response shape, and authorization requirements.

## Authentication and Security

-   Firebase Authentication manages user sign-in on the client.
-   The backend uses Firebase Admin SDK token verification to validate
    bearer tokens.
-   The secure Axios instance attaches the ID token when an
    authenticated user is available.
-   Protected backend operations should validate the authenticated
    identity and resource ownership.
-   Keep secrets in environment variables or a secure credential store,
    never in public source code.
-   Configure CORS for approved frontend origins in production.

## Deployment

### Backend on Vercel

1.  Open a terminal in `down-work-server`.

2.  Install dependencies with `npm install`.

3.  Configure `MONGODB_USER`, `MONGODB_PASS`, and required Firebase
    Admin credentials in Vercel project settings.

4.  Ensure the Express app is exported and the Vercel
    entry-point/configuration matches the repository layout.

5.  Deploy using the Vercel CLI:

    ``` bash
    vercel
    vercel --prod
    ```

6.  Test the deployed API's root route and job, category, profile, and
    application endpoints.

7.  Review Vercel runtime logs if deployment or API requests fail.

### Frontend

Deploy the React frontend using your chosen hosting provider. Set its
API base URL to the deployed backend URL, and configure Firebase client
settings using the environment variables expected by the frontend.

**Live links to add before publishing** - Frontend: `https://down-work-theta.vercel.app/` -
Backend: `https://down-work-backend.vercel.app` - Repository:
`https://github.com/mdfahimpathan61/down-work`

## Future Improvements

Potential improvements for a production-ready job portal: - Add
pagination and server-side sorting for large job lists. - Improve
validation and standardize API error responses. - Add request
cancellation or stale-response protection for rapid searches. -
Centralize loading and error handling without showing empty states
before requests finish. - Restrict CORS to approved frontend origins. -
Add automated tests for authentication, job ownership, search, and
application flows. - Add API documentation with request and response
examples. - Add rate limiting and additional production security
controls. - Add clear application status indicators where appropriate.

## Contributing

Contributions and suggestions are welcome.

1.  Fork or copy the repository.
2.  Create a branch for your change.
3.  Keep changes focused and follow the existing project conventions.
4.  Test the affected frontend and backend flows.
5.  Submit a pull request or share the proposed changes for review.

## License

No license has been specified here. Add a `LICENSE` file and update this
section before allowing others to reuse or distribute the project.
