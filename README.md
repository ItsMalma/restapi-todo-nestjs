# Belajar Express

Ini adalah repositori yang saya gunakan untuk menempatkan aplikasi todo berbasis REST Api dengan menggunakan NestJS.

## Semua Yang Digunakan

- [NodeJS](https://nodejs.org)
- [NPM](https://www.npmjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [NestJS](https://nestjs.com)
- [ExpressJS](https://expressjs.com/)
- [Passport](https://www.passportjs.org/)
- [TypeORM](https://typeorm.io/)
- [ClassValidator](https://github.com/typestack/class-validator)
- [ClassTransformer](https://github.com/typestack/class-transformer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [PostgreSQL](https://www.postgresql.org)
- [Visual Studio Code](https://code.visualstudio.com/)

## Environment Variables

Untuk menjalankan projek ini, silahkan copy file `.env.example` menjadi `.env`, lalu isi variable yang sudah disediakan disana.

- `PORT` (optional) ini adalah variabel yang akan digunakan sebagai port dimana aplikasi dijalankan (default: 5000).
- `PG_HOST` (required) ini adalah variabel yang memberitahu di host mana database PostgreSQL berjalan.
- `PG_PORT` (required) ini adalah variabel yang memberitahu di port mana database PostgreSQL berjalan.
- `PG_USER` (required) ini adalah variabel yang memberitahu di user mana database PostgreSQL berada.
- `PG_PWD` (required) ini adalah variabel yang memberitahu password dari user `PG_USER`.
- `PG_NAME` (required) ini adalah variabel yang memberitahu nama database PostgreSQL yang akan digunakan.
- `JWT_ISSUER` (required) ini adalah variabel yang akan digunakan sebagai issuer dalam pembuatan / verifikasi token (JWT).
- `JWT_SECRET` (required) ini adalah variabel yang akan digunakan sebagai private key dalam pembuatan / verifikasi token (JWT).

## Cara Menjalankan

Silahkan clone repositori ini dengan ketikkan perintah ini di terminal

```bash
git clone https://github.com/ItsMalma/restapi-todo-nestjs.git
```

Lalu pergi ke direktori di mana file tersebut diclone

```bash
cd restapi-todo-nestjs
```

Setelah masuk ke direktori, silahkan ketikkan perintah berikut untuk menginstall dependensi yang nanti akan digunakan saat aplikasi dijalankan

```bash
npm install
```

Setelah semua dependensi berhasil diinstall, maka langkah selanjutnya pastikan anda mengaktifkan server PostgreSQL kalian, dan buat database yang nanti akan digunakan, lalu set variabel yang sudah disediakan di `.env.example` dengan database yang sudah dibuat.

Sebagai contoh:

```env
PG_HOST="127.0.0.1"
PG_PORT=5432
PG_USER="malma"
PG_PWD="password"
PG_NAME="todo"
```

Setelah database selesai, maka selanjutnya kalian hanya perlu mengetikkan perintah berikut untuk menjalankan server.

```bash
npm run start
```

## Authors

- [@ItsMalma](https://www.github.com/ItsMalma)

## License

[MIT](https://choosealicense.com/licenses/mit/)
