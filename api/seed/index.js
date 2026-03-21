import { pool } from '../config/db.js';

const meals = [
    {
        name: "Phở Bò Gia Truyền",
        price: 50000,
        image: "/assets/images/food/pho-bo.jpg",
        desc: "Nước dùng ninh xương 12 tiếng, thịt bò tái chín mềm",
        fullDesc: "Phở bò gia truyền với nước dùng được ninh từ xương bò trong 12 tiếng, tái chín mềm thơm. Ăn kèm giá đỗ, rau thơm, chanh ớt tươi. Món ăn kinh điển để tiếp sức cho đêm làm việc dài.",
        time: "15 phút",
        tag: "Bán chạy",
        rating: 4.8,
        reviews: 256,
        category: "Bún/Phở",
        origin: "Hà Nội",
        calories: "450 kcal",
    },
    {
        name: "Bánh Mì Thịt Nướng",
        price: 25000,
        image: "/assets/images/food/banh-mi-thit.jpg",
        desc: "Bánh mì giòn rụm, thịt nướng than hoa thơm lừng",
        fullDesc: "Bánh mì vỏ giòn ruột mềm, nhân thịt heo nướng than hoa thơm lừng, đồ chua rau ngò rắc mỡ hành. Món ăn nhanh gọn cho những phút nghỉ ngắn giữa ca đêm.",
        time: "10 phút",
        tag: "Nhanh",
        rating: 4.6,
        reviews: 189,
        category: "Bánh mì",
        origin: "Sài Gòn",
        calories: "380 kcal",
    },
    {
        name: "Cơm Tấm Sườn Nướng",
        price: 45000,
        image: "/assets/images/food/com-tam-suon-nuong.jpg",
        desc: "Sườn nướng mắm, bì trộn, chả trứng, nước mắm pha",
        fullDesc: "Cơm tấm hạt dẻo thơm, sườn nướng mắm đậm vị, bì trộn giòn sật, chả trứng hấp mềm. Nước mắm pha ngọt thanh, ăn kèm đồ chua dưa leo. Phần ăn đầy đủ dinh dưỡng.",
        time: "20 phút",
        tag: "Đầy đủ",
        rating: 4.9,
        reviews: 312,
        category: "Cơm",
        origin: "Sài Gòn",
        calories: "650 kcal",
    },
    {
        name: "Bún Bò Huế",
        price: 55000,
        image: "/assets/images/food/bun-bo-hue.jpg",
        desc: "Bún bò cay nồng đặc trưng xứ Huế, giò heo mềm rục",
        fullDesc: "Bún bò Huế đậm đà với nước dùng ninh xương, sả, ruốc Huế cay nồng đặc trưng. Giò heo mềm rục, chả cua thơm ngậy. Tô bún nóng hổi xua tan cái lạnh đêm khuya.",
        time: "18 phút",
        tag: "Đặc sản",
        rating: 4.7,
        reviews: 198,
        category: "Bún/Phở",
        origin: "Huế",
        calories: "520 kcal",
    },
    {
        name: "Hủ Tiếu Nam Vang",
        price: 40000,
        image: "/assets/images/food/hu-tieu.jpg",
        desc: "Hủ tiếu dai mềm, nước lèo trong, tôm thịt hải sản",
        fullDesc: "Hủ tiếu Nam Vang với sợi dai mềm, nước lèo trong veo ngọt thanh từ xương heo và tôm khô. Tôm tươi, thịt bằm, gan, trứng cút đầy đặn. Món ăn nhẹ bụng cho đêm dài.",
        time: "15 phút",
        tag: "Nhẹ bụng",
        rating: 4.5,
        reviews: 145,
        category: "Bún/Phở",
        origin: "Sài Gòn",
        calories: "420 kcal",
    },
    {
        name: "Bún Chả Hà Nội",
        price: 45000,
        image: "/assets/images/food/bun-cha.jpg",
        desc: "Chả viên nướng than, bún tươi, nước chấm chua ngọt",
        fullDesc: "Bún chả Hà Nội chuẩn vị với chả viên và chả miếng nướng than hoa thơm lừng. Bún tươi trắng dẻo, rau sống tươi mát. Nước chấm pha chua ngọt vừa vặn, thêm ớt tỏi.",
        time: "20 phút",
        tag: "Truyền thống",
        rating: 4.8,
        reviews: 267,
        category: "Bún/Phở",
        origin: "Hà Nội",
        calories: "480 kcal",
    },
    {
        name: "Bò Né Sài Gòn",
        price: 55000,
        image: "/assets/images/food/bo-ne.jpg",
        desc: "Bò bít tết sốt tiêu, trứng ốp la, bánh mì nóng",
        fullDesc: "Bò né kiểu Sài Gòn với miếng bò bít tết mỡ sốt tiêu đen đặc trưng, trứng ốp la lòng đào, pate béo ngậy. Ăn kèm bánh mì nóng giòn. Bữa sáng-đêm năng lượng.",
        time: "15 phút",
        tag: "Năng lượng",
        rating: 4.6,
        reviews: 178,
        category: "Cơm/Đồ ăn",
        origin: "Sài Gòn",
        calories: "580 kcal",
    },
    {
        name: "Mì Quảng",
        price: 45000,
        image: "/assets/images/food/mi-quang.jpg",
        desc: "Mì Quảng tôm thịt, nước lèo đậm đà, bánh tráng giòn",
        fullDesc: "Mì Quảng Đà Nẵng chính gốc với sợi mì vàng dai, nước lèo đậm đà nghệ và tôm thịt. Tôm tươi, thịt heo, trứng cút, rau sống, đậu phộng rang, bánh tráng nướng giòn.",
        time: "18 phút",
        tag: "Đặc sản",
        rating: 4.9,
        reviews: 234,
        category: "Bún/Phở",
        origin: "Đà Nẵng",
        calories: "500 kcal",
    },
    {
        name: "Cơm Gà Xối Mỡ",
        price: 50000,
        image: "/assets/images/food/com-ga-xoi-mo.jpg",
        desc: "Cơm gà xối mỡ giòn rụm, nước mắm tỏi ớt đặc biệt",
        fullDesc: "Cơm gà xối mỡ với đùi gà chiên giòn rụm vàng ươm, cơm dẻo thấm nước cốt gà. Nước mắm tỏi ớt pha đặc biệt, đồ chua dưa leo tươi. Phần ăn no bụng, giá phải chăng.",
        time: "20 phút",
        tag: "No bụng",
        rating: 4.7,
        reviews: 201,
        category: "Cơm",
        origin: "Sài Gòn",
        calories: "620 kcal",
    },
];

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { force } = req.query;

        // Create table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS meals (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price INT DEFAULT 0,
                image VARCHAR(255),
                \`desc\` TEXT,
                fullDesc TEXT,
                time VARCHAR(50),
                tag VARCHAR(50),
                rating FLOAT DEFAULT 0,
                reviews INT DEFAULT 0,
                category VARCHAR(100),
                origin VARCHAR(100),
                calories VARCHAR(50)
            )
        `);

        if (force === 'true') {
            await pool.query('DELETE FROM meals');
        } else {
            // Check if data already exists
            const [existing] = await pool.query('SELECT COUNT(*) as count FROM meals');
            if (existing[0].count > 0) {
                return res.status(200).json({ message: 'Database already seeded. Use ?force=true to re-seed.' });
            }
        }

        // Insert data
        for (const meal of meals) {
            await pool.query(
                'INSERT INTO meals (name, price, image, `desc`, fullDesc, time, tag, rating, reviews, category, origin, calories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [meal.name, meal.price, meal.image, meal.desc, meal.fullDesc, meal.time, meal.tag, meal.rating, meal.reviews, meal.category, meal.origin, meal.calories]
            );
        }

        return res.status(200).json({ message: 'Seeding successful', count: meals.length });
    } catch (error) {
        console.error('Seed Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
