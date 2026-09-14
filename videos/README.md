# Thư mục Video (Videos)

Thư mục này dùng để chứa các video quảng bá, quy trình chế biến món ăn và review của thực khách.

## Các loại video khuyên dùng:

1. **Video giới thiệu món / Quy trình nấu (`videos/intro.mp4`, `videos/cooking.mp4`)**:
   - Video hầm nước dùng xương ống sôi sùng sục, bốc khói nghi ngút.
   - Video trụng sợi hủ tiếu, xếp topping tôm thịt xá xíu, chan nước lèo hoặc chan sốt trộn đậm đà.
   - *Định dạng khuyến nghị*: MP4 (h.264 / AAC), Full HD 1080p hoặc 720p, tối ưu dung lượng (khoảng 10MB - 30MB) để web phát mượt mà không bị giật lag.

2. **Video ngắn đánh giá từ thực khách / TikTok review (`videos/review-1.mp4`)**:
   - Dạng video dọc (9:16) hoặc ngang (16:9).

## Cách nhúng video vào website:

Trong file `index.html`, tại mục `<section class="video-showcase">`, bạn có thể chỉ định đường dẫn video như sau:

```html
<video controls poster="images/video-thumbnail.jpg">
    <source src="videos/intro.mp4" type="video/mp4">
    Trình duyệt của bạn không hỗ trợ thẻ video.
</video>
```

Hoặc bạn cũng có thể nhúng link video từ **YouTube** hoặc **TikTok** bằng thẻ `<iframe>`.
