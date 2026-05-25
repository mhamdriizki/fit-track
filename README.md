# FitTrack - Diet & Workout Tracker

FitTrack adalah aplikasi untuk melacak diet dan aktivitas workout, dirancang menggunakan arsitektur monorepo untuk frontend dan backend.

## Teknologi Utama

- **Backend**: Java 23, Spring Boot 3.4.x, Maven 3.9.9, PostgreSQL
- **Frontend**: Angular 18+ (Dalam Pengembangan)

## Struktur Folder

```text
fit-track/
├── backend/          # Spring Boot Application
└── frontend/         # Angular Application
```

## Menjalankan Backend secara Lokal

1. Pastikan Anda telah menginstal **Java 23** dan **Maven 3.9.9**.
2. Pastikan server **PostgreSQL** berjalan di lokal:
   - Host: `localhost`
   - Port: `5432`
   - Database: `fittrack`
   - Username: `postgres`
   - Password: `password`
3. Masuk ke folder backend:
   ```bash
   cd backend
   ```
4. Jalankan aplikasi Spring Boot:
   ```bash
   mvn spring-boot:run
   ```
5. Akses dokumentasi API via Swagger UI (jika aplikasi berjalan di port 8080):
   [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)