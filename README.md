# Seed data giả cho database đăng phòng trọ

1. Tải [node.js LTS](https://nodejs.org/en)
2. Clone repo
3. Chạy file ```/scripts/create.sql``` để tạo database
4. Tạo file ```.env``` trong project và thêm connection string của database vào file ```.env```. Ví dụ:

```js
DATABASE_URL="sqlserver://localhost:1433;database=thue_phong;user=sa;password=vi_du_password;encrypt=true;trustServerCertificate=true;hostNameInCertificate=*.database.windows.net;loginTimeout=30;"
```

4. Mở terminal trong project, chạy lệnh 

```console
npm install
```

5. Chạy lệnh 

```console
npx prisma db pull
```

6. Chạy lệnh 

```console
npx prisma generate
```

7. Chạy lệnh 

```console
npm run seed
```