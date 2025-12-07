# Attendance Management App

> Full stack app with HTML/CSS/JS frontend, Node.js backend, Java helpers for QR code and face recognition, plus setup and deployment instructions.

## Setup

### Requirements
- Node.js & npm
- Java + ZXing and OpenCV jars (see below)
- Clone this repo

### Install & Compile

1. `npm install`
2. Download:
    - [ZXing Core](https://repo1.maven.org/maven2/com/google/zxing/core/3.4.1/zxing-core-3.4.1.jar)
    - OpenCV jar from [opencv.org](https://opencv.org/)
    - Place in `backend/java-bin/libs/`
3. Compile Java:
    ```bash
    cd backend/java-bin
    javac -cp ".:libs/zxing-core-3.4.1.jar:libs/opencv-xxx.jar" QRGenerator.java FaceRecognizer.java
    ```
4. Add reference faces to `backend/java-bin/known_faces/` (name them lowercase, e.g. alice.png)

### Running

```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

- Recommended on Linux VM or Docker (see full guide above)
- Use a process manager like pm2 if needed

---

## Note

- The face recognizer demo uses image dimension comparison only. For production, integrate OpenCV facial features extraction!
