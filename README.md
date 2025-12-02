## BabyBliss – MERN Demo Baby Products Store

BabyBliss is a **demo-only mini e-commerce** web app for baby products, inspired by FirstCry.
It’s built as a **MERN + PWA** project with pastel UI, cart, dummy login, and local notifications.

### Tech Stack

- **Frontend**: React + Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB + Mongoose, JWT (demo user only)
- **PWA**: `manifest.json`, `service-worker.js`, local notification demo

---

### Folder Structure

- `client/`
  - `src/components`
  - `src/context`
  - `src/pages`
  - `src/data`
  - `src/hooks`
  - `manifest.json`
  - `service-worker.js`
- `server/`
  - `models`
  - `controllers`
  - `routes`
  - `middleware`
  - `server.js`

---

### 1. Install Dependencies

From the project root:

```bash
# 1) Frontend
cd client
npm install

# 2) Backend (in another terminal or after that)
cd ../server
npm install
```

Make sure MongoDB is running locally (default URI `mongodb://127.0.0.1:27017/babybliss_demo`)
or set `MONGO_URI` in `server/.env`.

```env
MONGO_URI=mongodb://127.0.0.1:27017/babybliss_demo
JWT_SECRET=your_super_secret
PORT=5000
```

---

### 2. Run the Backend

From `server/`:

```bash
npm run dev      # with nodemon
# or
npm start
```

Backend will start at `http://localhost:5000`:

- `GET /api/products` – list all products
- `GET /api/products/:id` – single product
- `POST /api/auth/login` – demo login (returns JWT)

The first run seeds MongoDB with 3 demo products.

---

### 3. Run the Frontend

From `client/`:

```bash
npm run dev
```

Vite dev server will be on `http://localhost:5173` with a proxy to `http://localhost:5000/api`.

Open it in a **modern desktop or mobile browser** (Chrome recommended for PWA).

---

### 4. Features to Try

- **Home Page**
  - Hero banner with pastel gradient and CTA
  - Category cards: **Bath, Toys, Skincare** (click to filter)
  - Product grid loaded from `/api/products` (falls back to local demo data if backend is off)
  - Click a product card to open a **product modal** with full details + “Add to Cart”

- **Cart Page**
  - Persistent cart (React Context + `localStorage`)
  - Increment / decrement quantity, remove item, clear cart
  - Demo checkout button (no real payment)

- **Dummy Login**
  - Hardcoded demo user:

    ```text
    Email: demo@babybliss.com
    Password: baby123
    ```

  - Sends `POST /api/auth/login`, receives JWT and stores it in `localStorage`

- **PWA & Notifications**
  - `manifest.json` + `service-worker.js` registered in `main.jsx`
  - On supported browsers, you can **install** BabyBliss as an app
  - On the home page, click **“Send Notification”** to trigger a local notification
    (you’ll be asked for notification permission first)

---

### Notes

- This is a **demo / learning project**: no real users, no real orders, no payments.
- You can customize product data via MongoDB or by editing the seed data in `server/server.js`.
- Icons in `client/public/icons` are placeholders – replace them with real PNGs for production.


