# Soal Seleksi Backend Developer

## Deskripsi
Buatlah sebuah API untuk sistem manajemen inventaris sederhana menggunakan NestJS, TypeORM, PostgreSQL, JWT, dan Guard. API ini harus memiliki fitur-fitur berikut:

1. Autentikasi pengguna (login dan register)
2. CRUD untuk entitas lain (Item Inventoris)
3. Proteksi endpoint menggunakan JWT dan Guard
4. Relasi antara pengguna dan item favorit
5. Buatlah Unit Test

## Langkah-langkah Instalasi dan Menjalankan Aplikasi

### Prasyarat
- Node.js
- npm atau yarn
- MySQL

### Langkah-langkah
1. Clone repository ini
    ```bash
    git clone <repository-url>
    ```
2. Masuk ke direktori proyek
    ```bash
    cd <nama-proyek>
    ```
3. Instal dependensi
    ```bash
    npm install
    # atau jika menggunakan yarn
    yarn install
    ```
4. Buat file `.env` di root direktori dan tambahkan konfigurasi berikut:
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=yourUsername
    DB_PASSWORD=yourPassword
    DB_DATABASE=yourDatabase
    JWT_SECRET=yourSecretKey
    ```
5. Jalankan migrasi database
    ```bash
    npm run typeorm migration:run
    # atau jika menggunakan yarn
    yarn typeorm migration:run
    ```
6. Jalankan aplikasi
    ```bash
    npm run start
    # atau jika menggunakan yarn
    yarn start
    ```

## Endpoint

### Autentikasi
- **Register**
    - URL: `POST /auth/register`
    - Body:
      ```json
      {
        "username": "string",
        "password": "string"
      }
      ```

- **Login**
    - URL: `POST /auth/login`
    - Body:
      ```json
      {
        "username": "string",
        "password": "string"
      }
      ```

### Item Inventaris
- **Create Item**
    - URL: `POST /items`
    - Headers:
        - `Authorization`: `Bearer <token>`
    - Body:
      ```json
      {
        "name": "string",
        "description": "string",
        "price": "number"
      }
      ```

- **Get All Items**
    - URL: `GET /items`
    - Headers:
        - `Authorization`: `Bearer <token>`

- **Get Item by ID**
    - URL: `GET /items/:id`
    - Headers:
        - `Authorization`: `Bearer <token>`

- **Update Item**
    - URL: `PATCH /items/:id`
    - Headers:
        - `Authorization`: `Bearer <token>`
    - Body:
      ```json
      {
        "name": "string",
        "description": "string",
        "price": "number"
      }
      ```

- **Delete Item**
    - URL: `DELETE /items/:id`
    - Headers:
        - `Authorization`: `Bearer <token>`

### Favorite Item
- **Create Favorite Item**
    - URL: `POST /favorite-items`
    - Headers:
        - `Authorization`: `Bearer <token>`
    - Body:
      ```json
      {
        "userId": "number",
        "itemId": "number"
      }
      ```

- **Get All Favorite Items**
    - URL: `GET /favorite-items`
    - Headers:
        - `Authorization`: `Bearer <token>`

- **Delete Favorite Item**
    - URL: `DELETE /favorite-items/:id`
    - Headers:
        - `Authorization`: `Bearer <token>`

## Testing
Untuk menjalankan unit test, gunakan perintah berikut:
```bash
npm run test
# atau jika menggunakan yarn
yarn test
