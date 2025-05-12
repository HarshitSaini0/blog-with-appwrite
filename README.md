# blog-with-appwrite

## Overview

This website serves as a platform for creating and managing blog content, leveraging the capabilities of [Appwrite](https://appwrite.io) as its backend and [React](https://react.dev/) for the user interface. The application aims to simplify the process of building a blog by utilizing Appwrite's comprehensive suite of backend services, which include user authentication, database management, and storage solutions. The choice of React for the frontend ensures a dynamic and responsive user experience for both authors and readers.

This project shares conceptual similarities with existing open-source initiatives focused on building blogs with Appwrite and React, such as the project hosted by luckyklyist. The existence of such projects indicates a growing interest in using these technologies to create efficient and scalable blogging platforms.

## Features

This blog application offers a range of features designed to facilitate content creation, management, and consumption:

- **User Authentication**: Secure registration and login for distinguishing authors and managing their content.
- **Blog Management**: Registered users can create, edit, and delete posts.
- **Public Viewing**: Posts are displayed in an accessible and readable format.

**Planned Features:**

- Commenting system
- User profile pages
- Responsive design
- Search functionality
- Post likes

## Technologies Used

| Technology       | Description                                                                                  |
|------------------|----------------------------------------------------------------------------------------------|
| **Appwrite**     | Open-source backend-as-a-service platform for auth, database, storage, etc.                 |
| **React**        | JavaScript library for building dynamic UIs.                                                 |
| **Node.js**      | JavaScript runtime environment used in the React ecosystem.                                  |
| **npm/yarn/pnpm**| Package managers for handling dependencies (pnpm recommended based on similar projects).     |

These choices reflect a trend toward using backend-as-a-service tools combined with modern frontend frameworks to accelerate development.

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install a package manager: `npm`, `yarn`, or preferably `pnpm`
- Create a free [Appwrite account](https://appwrite.io/) and a new project in the console
- Note down your **Project ID**

### Installation

1. **Clone the Repository**:
   ```bash
   git clone [<repository-url>](https://github.com/HarshitSaini0/blog-with-appwrite)
   ```

Replace `[<repository-url>](https://github.com/HarshitSaini0/blog-with-appwrite)` with the actual URL.

2. **Navigate to the Project Directory**:

   ```bash
   cd blog-with-appwrite
   ```

3. **Install Dependencies**:

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

### Configuration

* **Appwrite SDK Setup**:
  Initialize Appwrite with your **Project ID** and endpoint (typically `https://cloud.appwrite.io/v1`). Do this in a file like `appwriteConfig.js`.

* **Environment Variables**:
  Duplicate `sample.env` to `.env` and update it with:

  * API key
  * Project ID
  * Database ID
  * Bucket ID
    Don’t forget to add `.env` to `.gitignore`.

* **Backend Setup (Optional)**:
  Create databases, collections, and storage buckets in your Appwrite console as needed. Refer to the [official Appwrite docs](https://appwrite.io/docs).

### Running the Application

Start the dev server with:

```bash
pnpm run dev
# or
npm start
# or
yarn start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Planned Features (Optional)

Future enhancements include:

* Rich text editor for blog post creation
* Image/media uploads via Appwrite Storage
* Tagging and categorization
* Pagination for large post sets
* User roles/permissions
* Social media integration for sharing posts

## Contributing

Contributions are welcome! Follow these steps:

1. **Fork the Repository** via GitHub

2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/your-username/blog-with-appwrite.git
   cd blog-with-appwrite
   ```

3. **Create a New Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**

5. **Commit Changes**:

   ```bash
   git add .
   git commit -m "Add your commit message here"
   ```

6. **Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** via GitHub

For contributing best practices, see the [Appwrite Contributing Guidelines](https://github.com/appwrite/appwrite/blob/master/CONTRIBUTING.md).

## Contact

**Harshit Saini**
📧 [harshit.saini.ngh@gmail.com](mailto:harshit.saini.ngh@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/harshitsainibcis/)

