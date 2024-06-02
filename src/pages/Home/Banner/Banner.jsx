import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import img1 from '../../../assets/home/01.jpg';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.png';
import img6 from '../../../assets/home/06.png';

const Banner = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 h-[40%]"
            >
                <SwiperSlide><img src={img1} alt="Slide 1" /></SwiperSlide>
                <SwiperSlide><img src={img2} alt="Slide 2" /></SwiperSlide>
                <SwiperSlide><img src={img3} alt="Slide 3" /></SwiperSlide>
                <SwiperSlide><img src={img4} alt="Slide 4" /></SwiperSlide>
                <SwiperSlide><img src={img5} alt="Slide 5" /></SwiperSlide>
                <SwiperSlide><img src={img6} alt="Slide 6" /></SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide><img src={img1} alt="Thumbnail 1" /></SwiperSlide>
                <SwiperSlide><img src={img2} alt="Thumbnail 2" /></SwiperSlide>
                <SwiperSlide><img src={img3} alt="Thumbnail 3" /></SwiperSlide>
                <SwiperSlide><img src={img4} alt="Thumbnail 4" /></SwiperSlide>
                <SwiperSlide><img src={img5} alt="Thumbnail 5" /></SwiperSlide>
                <SwiperSlide><img src={img6} alt="Thumbnail 6" /></SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;
