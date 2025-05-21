# Book Review API

A RESTful API for a Book Review system built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- User signup/login with JWT authentication
- Add, list, and search books
- Add, update, and delete reviews (one per user per book)
- Pagination and filtering for books and reviews

## Setup

1. **Clone the repo:**
   ```
   git clone <your-repo-url>
   cd book-review-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in your values.

4. **Start MongoDB** (if running locally):
   ```
   mongod
   ```

5. **Run the server:**
   ```
   npm run dev
   ```

## Example API Requests

### Signup

```bash
curl -X POST http://localhost:5000/api/signup -H "Content-Type: application/json" -d '{"username":"alice","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/login -H "Content-Type: application/json" -d '{"username":"alice","password":"password123"}'
```

### Add Book (Authenticated)

```bash
curl -X POST http://localhost:5000/api/books -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"title":"Book Title","author":"Author Name","genre":"Fiction"}'
```

### Get Books (with pagination/filter)

```bash
curl "http://localhost:5000/api/books?page=1&limit=5&author=Rowling"
```

### Get Book Details (with reviews)

```bash
curl "http://localhost:5000/api/books/<BOOK_ID>"
```

### Add Review (Authenticated)

```bash
curl -X POST http://localhost:5000/api/books/<BOOK_ID>/reviews -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"rating":5,"comment":"Great book!"}'
```

### Update Review

```bash
curl -X PUT http://localhost:5000/api/reviews/<REVIEW_ID> -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"rating":4,"comment":"Updated comment"}'
```

### Delete Review

```bash
curl -X DELETE http://localhost:5000/api/reviews/<REVIEW_ID> -H "Authorization: Bearer <TOKEN>"
```

### Search Books

```bash
curl "http://localhost:5000/api/search?q=harry"
```

## Database Schema

- **User**: `{ username, password }`
- **Book**: `{ title, author, genre, description, createdBy }`
- **Review**: `{ book, user, rating, comment }`

## Design Decisions

- JWT is used for stateless authentication.
- One review per user per book is enforced at the DB level.
- Pagination is supported for books and reviews.
- Search is case-insensitive and partial for title/author.

---

**Happy coding!**