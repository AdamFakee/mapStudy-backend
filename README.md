-- "EduMarket" là trang web clone từ trang 'https://mapstudy.edu.vn/'.

video demo: https://drive.google.com/file/d/1zolZ_CxOERUAbUQF5Kc-3xHYcUyVqiCu/view?usp=sharing
( do video được quay ở môi trường dev nên bị render 2 lần làm gián đoạn một ít trải nghiệm )

Source FE: https://github.com/AdamFakee/mapStudy
Source BE: https://github.com/AdamFakee/mapStudy-backend

Công nghệ: 
- FE: nextjs, react, tailwindcss.
- BE: expressjs, redis, mysql, sequelize( ORM ), jwt.


src/
├── configs/           # các cấu hình cần thiết (redis, database....)
├── consts/            # const variable
├── controllers/       # 
├── core/              # function dùng xuyên suốt project ( xử lí lỗi )
├── helpers/           # các funtion chứa logic có thể tái sử dụng
├── middlewares/       # các file trung gian như xác thực người dùng, quyền....
├── models/            # schema của từng bảng trong database
├── routers/           # đường dẫn của trang web
├── services/          # chứa các file logic giúp tương tác với database....
├── utils/             # các function không có nhiều logic nhưng có thể tái sử dụng nhiều lần
├── app.js             # file main 
└── __tests__/         # chứa các file dùng để kiểm thử ( chưa xong )