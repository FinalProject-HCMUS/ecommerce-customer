# 🛍️ E-commerce Customer

Một ứng dụng mua sắm trực tuyến hiện đại được xây dựng bằng React, TypeScript và Vite.

## 🌟 Tính năng chính

- 🔐 **Xác thực người dùng**: Đăng ký, đăng nhập, quên mật khẩu
- 🛍️ **Quản lý sản phẩm**: Duyệt, tìm kiếm, lọc sản phẩm
- 🛒 **Giỏ hàng**: Thêm, xóa, cập nhật sản phẩm
- 💳 **Thanh toán**: Hỗ trợ COD và VN Pay
- 📋 **Quản lý đơn hàng**: Theo dõi trạng thái đơn hàng
- ⭐ **Đánh giá sản phẩm**: Viết và xem đánh giá
- 💬 **Chat real-time**: Hỗ trợ khách hàng
- 📱 **Responsive**: Tối ưu cho mọi thiết bị
- 🌐 **Đa ngôn ngữ**: Tiếng Việt và English
- 👔 **Virtual Try-On**: Thử đồ ảo với AI

## 🚀 Bắt đầu nhanh

```bash
# Clone repository
git clone https://github.com/FinalProject-HCMUS/ecommerce-customer.git
cd ecommerce-customer

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📚 Tài liệu

- 📋 **[Hướng dẫn cài đặt](./INSTALLATION.md)** - Chi tiết về cách cài đặt và cấu hình
- 📖 **[Hướng dẫn sử dụng](./USER_GUIDE.md)** - Hướng dẫn sử dụng cho người dùng cuối

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18.3.1, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Library**: Ant Design, Material-UI
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier

## 🔧 Scripts có sẵn

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run preview      # Preview production build
npm run test         # Chạy tests
npm run test:watch   # Chạy tests ở watch mode
npm run lint         # Kiểm tra linting
npm run lint:fix     # Tự động sửa linting issues
npm run prettier     # Kiểm tra code formatting
npm run prettier:fix # Tự động format code
```

## 🏗️ Cấu trúc dự án

```txt
src/
├── components/     # React components
├── constants/      # Hằng số và config
├── context/        # Redux store
├── hooks/          # Custom hooks
├── interfaces/     # TypeScript interfaces
├── layout/         # Layout components
├── page/           # Page components
├── router/         # Routing config
├── services/       # API services
└── utils/          # Utility functions
```

## 🌐 Demo

- **Live Demo**: [https://finalproject-hcmus.github.io/ecommerce-customer](https://finalproject-hcmus.github.io/ecommerce-customer)
- **Repository**: [https://github.com/FinalProject-HCMUS/ecommerce-customer](https://github.com/FinalProject-HCMUS/ecommerce-customer)

## 🤝 Đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Team

- **FinalProject-HCMUS** - [GitHub](https://github.com/FinalProject-HCMUS)

## 📞 Liên hệ

Project Link: [https://github.com/FinalProject-HCMUS/ecommerce-customer](https://github.com/FinalProject-HCMUS/ecommerce-customer)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

"# frontend"
"# movie-recommendation"
#   t m d b - f r o n t e n d 
 
 
#   m o v i e s 
 
 #   m o v i e s 
 
 
#   e c o m m e r c e - c u s t o m e r 
 
 
