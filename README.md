# 🎯 HƯỚNG DẪN NHANH - Cấu Trúc Dự Án ReFoodVN

## 📂 CẤU TRÚC ĐÃ TẠO

### 🌐 **ReFoodVN/** (Thư mục này) - Frontend Web + Backend
```
ReFoodVN/
├── backend/src/
│   ├── config/          ← Cấu hình (database, env...)
│   ├── models/          ← Models (User, Product, Order...)
│   ├── controllers/     ← Business logic
│   ├── routes/          ← API routes
│   ├── middleware/      ← Auth, validation, error handler
│   └── utils/           ← Helper functions
│
└── src/
    ├── components/      ← React components
    │   ├── common/      ← Header, Footer, Button...
    │   ├── product/     ← ProductCard, ProductList...
    │   ├── cart/        ← CartItem, CartSummary...
    │   ├── order/       ← OrderItem, OrderTracking...
    │   ├── layout/      ← MainLayout, DashboardLayout...
    │   ├── auth/        ← LoginForm, RegisterForm...
    │   └── admin/       ← AdminSidebar, AdminTable...
    ├── pages/           ← Trang chính
    │   ├── admin/       ← Admin pages
    │   └── user/        ← User pages
    ├── context/         ← AuthContext, CartContext...
    ├── services/        ← API calls
    ├── hooks/           ← Custom hooks
    ├── utils/           ← Helpers, constants
    ├── styles/          ← CSS files
    └── assets/          ← Images, icons, fonts
```

### 📱 **ReFoodVN-Mobile/** - Mobile App (Android/iOS)
```
ReFoodVN-Mobile/
├── android/             ← CODE NATIVE ANDROID (Java/Kotlin)
├── ios/                 ← CODE NATIVE iOS (Swift)
└── src/
    ├── screens/         ← HomeScreen, CartScreen...
    ├── components/      ← Components tái sử dụng
    ├── navigation/      ← Navigation config
    ├── services/        ← API calls
    ├── utils/           ← Helpers
    ├── context/         ← Context API
    └── assets/          ← Images, fonts, icons
```

---

## 🔑 PHÂN BIỆT RÕ RÀNG

| | 🌐 WEB | 📱 MOBILE |
|---|--------|-----------|
| **Folder** | `ReFoodVN/src/` | `ReFoodVN-Mobile/src/` |
| **Backend** | `ReFoodVN/backend/` | Dùng chung backend |
| **Chạy trên** | Browser | Điện thoại Android/iOS |
| **Folder Android** | ❌ Không có | ✅ `android/` |
| **Folder iOS** | ❌ Không có | ✅ `ios/` |
| **Build ra** | HTML/CSS/JS | APK/IPA file |

---

## ✅ ĐÃ TẠO

- ✅ Cấu trúc folder Backend (Node.js + Express)
- ✅ Cấu trúc folder Frontend Web (React + Vite)
- ✅ Cấu trúc folder Mobile App (React Native)
- ✅ Tất cả folder đều **TRỐNG** (không có code mẫu)

---

## 📍 VỊ TRÍ FOLDER

```
/home/hinne/Code/ReactUDA/
├── ReFoodVN/              ← Thư mục hiện tại (Web + Backend)
├── ReFoodVN-Mobile/       ← Mobile App
└── README.md              ← Tài liệu tổng quan
```

---

## 📝 GHI NHỚ QUAN TRỌNG

1. **Backend** (`backend/`) → API phục vụ cả Web và Mobile
2. **Web** (`src/`) → Code React cho website
3. **Mobile** (`../ReFoodVN-Mobile/`) → Code React Native cho app
4. **Folder `android/`** → Chỉ có trong Mobile project, dùng build APK

**⚠️ Lưu ý**: Tất cả folder hiện tại đều TRỐNG, chỉ có cấu trúc thư mục!

Bạn cần tự viết code cho từng phần theo yêu cầu dự án.

