/**
 * Dữ liệu Thực đơn Quán Hủ Tiếu Nam Vang
 * Bạn có thể dễ dàng thêm bớt món ăn, sửa giá, đổi ảnh tại đây!
 */

const RESTAURANT_INFO = {
    name: "HỦ TIẾU NAM VANG THIÊN LỘC",
    slogan: "Đậm Đà Vị Xưa - Tròn Vị Tinh Hoa Ẩm Thực",
    hotline: "090.3782.190",
    zalo: "0903782190",
    address: "376 Tân Hòa Đông, Phường Bình Trị Đông, Thành Phố Hồ Chí Minh",
    openHours: "06:00 - 22:30 (Mở cửa tất cả các ngày trong tuần)",
    deliveryTime: "Giao nhanh 20 - 35 phút"
};

const CATEGORIES = [
    { id: "all", name: "Tất Cả Món", icon: "🍜" },
    { id: "nuoc", name: "Hủ Tiếu Nước", icon: "🍲" },
    { id: "kho", name: "Hủ Tiếu Khô", icon: "🥢" },
    { id: "mon-them", name: "Topping & Xí Quách", icon: "🍖" },
    { id: "do-uong", name: "Nước Giải Khát", icon: "🥤" }
];

const MENU_ITEMS = [
    {
        id: "ht-dac-biet-nuoc",
        name: "Hủ Tiếu Nam Vang Nước Đặc Biệt",
        category: "nuoc",
        price: 65000,
        oldPrice: 75000,
        badge: "Bán Chạy Nhất",
        rating: 5.0,
        reviewsCount: 142,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        description: "Tô đặc biệt đầy ắp: Tôm sú tươi, thịt bằm, xá xíu, cật heo, gan, trứng cút, nước dùng hầm xương ống 12 tiếng ngọt thanh tự nhiên.",
        isSignature: true
    },
    {
        id: "ht-dac-biet-kho",
        name: "Hủ Tiếu Nam Vang Khô Sốt Gia Truyền",
        category: "kho",
        price: 68000,
        oldPrice: 78000,
        badge: "Cực Ngon",
        rating: 5.0,
        reviewsCount: 189,
        image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80",
        description: "Sợi hủ tiếu dai mềm trộn sốt hắc xì dầu bí truyền thơm nức mũi, rắc tóp mỡ tỏi giòn rụm, kèm chén súp sườn sụn nóng hổi.",
        isSignature: true
    },
    {
        id: "ht-xi-quach",
        name: "Hủ Tiếu Xí Quách Khổng Lồ",
        category: "nuoc",
        price: 75000,
        badge: "Món Độc Quyền",
        rating: 4.9,
        reviewsCount: 96,
        image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=800&q=80",
        description: "Xương ống to ngập tủy béo ngậy được ninh nhừ suốt đêm, thịt mềm ngọt róc xương chấm muối tiêu chanh ớt cay nồng.",
        isSignature: true
    },
    {
        id: "ht-hai-san",
        name: "Hủ Tiếu Hải Sản Tôm Mực Tươi",
        category: "nuoc",
        price: 70000,
        badge: "Mới",
        rating: 4.8,
        reviewsCount: 65,
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
        description: "Tôm sú bóc vỏ giòn ngọt kết hợp mực ống tươi Phú Quốc dai giòn, nước dùng trong vắt thanh vị biển.",
        isSignature: false
    },
    {
        id: "ht-suon-non-kho",
        name: "Hủ Tiếu Sườn Non Sốt Khô Sa Đéc",
        category: "kho",
        price: 65000,
        badge: "Khuyên Thử",
        rating: 4.9,
        reviewsCount: 88,
        image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80",
        description: "Sườn non ướp gia vị đậm đà hầm mềm tan, sợi hủ tiếu bột lọc Sa Đéc trứ danh trộn sốt chua ngọt hấp dẫn.",
        isSignature: false
    },
    {
        id: "ht-thap-cam-kho",
        name: "Hủ Tiếu Thập Cẩm Khô Tóp Mỡ Béo",
        category: "kho",
        price: 60000,
        rating: 4.8,
        reviewsCount: 74,
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
        description: "Thịt nạc xá xíu, thịt bằm tươi xào tỏi, tôm luộc, trứng cút, hành phi và tóp mỡ chiên giòn rụm khó cưỡng.",
        isSignature: false
    },
    {
        id: "ht-chay-thanh-dam",
        name: "Hủ Tiếu Chay Nấm Thơm Nước Dừa",
        category: "nuoc",
        price: 50000,
        badge: "Thuần Chay",
        rating: 4.7,
        reviewsCount: 43,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        description: "Nước dùng ninh từ củ cải, bắp ngọt, lê và nước dừa tươi thanh khiết. Ăn kèm nấm đùi gà, nấm hương, tàu hũ ky chiên giòn.",
        isSignature: false
    },
    {
        id: "dia-xi-quach-them",
        name: "Dĩa Xí Quách Thịt & Tủy Thêm",
        category: "mon-them",
        price: 45000,
        badge: "Gọi Nhiều",
        rating: 5.0,
        reviewsCount: 110,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        description: "Cục xương ống đầy thịt, sụn giòn và tủy thơm béo, rắc hành lá và tiêu thơm Phú Quốc.",
        isSignature: false
    },
    {
        id: "dia-gan-cat-trung-cut",
        name: "Dĩa Gan Cật Trụng & Trứng Cút",
        category: "mon-them",
        price: 35000,
        rating: 4.8,
        reviewsCount: 52,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        description: "Gan bùi mềm không hôi, cật heo xử lý sạch sẽ giòn sần sật và 4 trứng cút bùi ngậy.",
        isSignature: false
    },
    {
        id: "chen-top-mo-toi",
        name: "Chén Tóp Mỡ Chiên Giòn Cay Tỏi Ớt",
        category: "mon-them",
        price: 15000,
        badge: "Gây Nghiện",
        rating: 5.0,
        reviewsCount: 230,
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80",
        description: "Tóp mỡ heo chiên mới mỗi ngày, giòn tan rôm rốp, ngào mắm tỏi ớt cay cay thơm phức.",
        isSignature: false
    },
    {
        id: "nuoc-sam-rong-bien",
        name: "Nước Sâm Rong Biển Mía Lau La Hán Quả",
        category: "do-uong",
        price: 18000,
        badge: "Thanh Mát",
        rating: 4.9,
        reviewsCount: 95,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        description: "Nấu thủ công từ mía lau, lá dứa, rễ tranh, thục địa và la hán quả. Giải nhiệt mát lành, ngọt dịu tự nhiên.",
        isSignature: false
    },
    {
        id: "tra-tac-khong-lo",
        name: "Trà Tắc Mật Ong Hoa Nhài Khổng Lồ",
        category: "do-uong",
        price: 20000,
        rating: 4.8,
        reviewsCount: 78,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
        description: "Trà lài ủ lạnh thơm nức quyện cùng vị chua thanh của tắc tươi và mật ong rừng nguyên chất, cực kỳ bắt vị khi ăn hủ tiếu.",
        isSignature: false
    },
    {
        id: "sua-bap-nau-nha",
        name: "Sữa Bắp Non Nấu Nhà Thơm Ngậy",
        category: "do-uong",
        price: 20000,
        rating: 4.9,
        reviewsCount: 62,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        description: "Nấu từ 100% bắp ngọt tươi, sánh mịn béo thơm, không dùng chất bảo quản.",
        isSignature: false
    }
];

const CUSTOMER_REVIEWS = [
    {
        name: "Anh Minh Hoàng",
        role: "Thực khách Quận 1",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "Nước lèo ở đây đỉnh thật sự, ngọt thanh từ tủy xương chứ không phải bột ngọt. Sợi hủ tiếu dai dai, tóp mỡ chiên giòn thơm nức mũi. Tuần nào cũng ghé ăn 2-3 lần!"
    },
    {
        name: "Chị Thảo Vy",
        role: "Food Reviewer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "Hủ tiếu khô sốt gia truyền quá xuất sắc! Sốt quyện đều từng sợi hủ tiếu, tôm tươi giòn ngọt rực rỡ, chén xúp sườn non nóng hổi húp rất sảng khoái. Giao hàng cực nhanh nữa."
    },
    {
        name: "Bác Thanh Sơn",
        role: "Khách quen 8 năm",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "Vị hủ tiếu Nam Vang chuẩn truyền thống xưa, tôm mực tươi rói, cục xí quách to bự cắn ngập miệng. Quán sạch sẽ, phục vụ rất chu đáo niềm nở."
    }
];
