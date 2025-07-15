# 📋 Hướng dẫn cài đặt E-commerce Customer

## 🔧 Yêu cầu hệ thống

### Phần mềm cần thiết:
- **Node.js**: phiên bản 18.0 trở lên
- **npm**: phiên bản 8.0 trở lên hoặc **yarn**: phiên bản 1.22 trở lên
- **Git**: để clone repository

### Kiểm tra phiên bản:
```bash
node --version
npm --version
git --version
```

## 🚀 Cài đặt dự án

### 1. Clone repository
```bash
git clone https://github.com/FinalProject-HCMUS/ecommerce-customer.git
cd ecommerce-customer
```

### 2. Cài đặt dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` trong thư mục gốc của dự án:
```bash
touch .env
```

Thêm các biến môi trường sau vào file `.env`:
```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:8080/api

# Email JS Configuration (cho contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# VN Pay Configuration
VITE_VNPAY_RETURN_URL=http://localhost:3000/confirm-vnpay
```

### 4. Khởi chạy ứng dụng

#### Development mode:
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

#### Production build:
```bash
npm run build
# hoặc
yarn build
```

#### Preview production build:
```bash
npm run preview
# hoặc
yarn preview
```

## 🐳 Docker (Tùy chọn)

### Chạy với Docker Compose (Development):
```bash
docker-compose -f docker-compose.dev.yml up
```

### Build Docker image:
```bash
docker build -f Dockerfile.dev -t ecommerce-customer .
```

## 🧪 Testing

### Chạy tests:
```bash
npm test
# hoặc
yarn test
```

### Chạy tests với coverage:
```bash
npm run test:coverage
# hoặc
yarn test:coverage
```

### Chạy tests ở watch mode:
```bash
npm run test:watch
# hoặc
yarn test:watch
```

## 📝 Linting và Formatting

### Kiểm tra linting:
```bash
npm run lint
# hoặc
yarn lint
```

### Tự động sửa linting issues:
```bash
npm run lint:fix
# hoặc
yarn lint:fix
```

### Kiểm tra formatting:
```bash
npm run prettier
# hoặc
yarn prettier
```

### Tự động format code:
```bash
npm run prettier:fix
# hoặc
yarn prettier:fix
```

## 🔧 Cấu hình IDE

### VS Code Extensions khuyên dùng:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### VS Code Settings:
Tạo file `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}
```

## 🌐 Cấu hình Backend

Đảm bảo backend API đang chạy tại địa chỉ được cấu hình trong `VITE_BACKEND_URL`.

### Các endpoint API cần thiết:
- Authentication: `/auth/*`
- Products: `/products/*`
- Cart: `/cart/*`
- Orders: `/orders/*`
- Users: `/users/*`
- Reviews: `/reviews/*`
- Categories: `/categories/*`
- Messages: `/messages/*`

## 📁 Cấu trúc thư mục

```
ecommerce/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   ├── constants/         # Constants và configs
│   ├── context/          # Redux store
│   ├── data/             # Static data
│   ├── helpers/          # Helper functions
│   ├── hooks/            # Custom hooks
│   ├── interfaces/       # TypeScript interfaces
│   ├── layout/           # Layout components
│   ├── locales/          # Internationalization
│   ├── page/             # Page components
│   ├── router/           # Routing configuration
│   ├── services/         # API services
│   └── utils/            # Utility functions
├── .env                   # Environment variables
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── vite.config.ts        # Vite config
```

## 🚨 Xử lý lỗi thường gặp

### 1. Port 3000 đã được sử dụng:
```bash
# Thay đổi port trong vite.config.ts
server: {
  port: 3001,
}
```

### 2. Module resolution error:
```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

### 3. TypeScript errors:
```bash
# Restart TypeScript service trong VS Code
Ctrl+Shift+P > TypeScript: Restart TS Server
```

### 4. Tailwind CSS không hoạt động:
Kiểm tra file `tailwind.config.js` và đảm bảo paths đúng:
```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)

## 🤝 Đóng góp

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## 📞 Hỗ trợ

Nếu gặp vấn đề trong quá trình cài đặt, vui lòng:
1. Kiểm tra phiên bản Node.js và npm
2. Xóa `node_modules` và reinstall
3. Kiểm tra cấu hình biến môi trường
4. Tạo issue trên GitHub repository
