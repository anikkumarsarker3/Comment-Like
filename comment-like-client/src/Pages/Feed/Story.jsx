import React from 'react';
import f3 from '../../assets/images/f3.png'
import f2 from '../../assets/images/f2.png'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { FreeMode, Grid, Pagination } from 'swiper/modules';

// import './styles.css';

const Story = () => {
    return (

        <Swiper
            slidesPerView="auto"
            spaceBetween={12}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper w-full"
        >
            {/* First Story */}
            <SwiperSlide className="!w-28">
                <div
                    className="w-28 h-44 bg-cover bg-center bg-no-repeat rounded-xl shadow relative"
                    style={{ backgroundImage: `url(${f3})` }}
                >
                    <div className="absolute bottom-2 left-2 bg-white p-1 rounded-full text-xs font-semibold">
                        Create Story
                    </div>
                </div>
            </SwiperSlide>

            {/* Other Stories */}
            {Array.from({ length: 8 }).map((_, s) => (
                <SwiperSlide key={s} className="!w-28">
                    <div
                        className="w-28 h-44 bg-cover bg-center bg-no-repeat rounded-xl shadow relative"
                        style={{ backgroundImage: `url(${f2})` }}
                    >
                        <div className="absolute bottom-2 left-2 bg-white p-1 rounded-full text-xs font-semibold">
                            Story {s + 1}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>





    );
};

export default Story;