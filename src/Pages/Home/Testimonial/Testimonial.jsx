import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])

  return (
    <div>
      <h4 className='text-center text-[#D99904] italic mb-5'>------What Our Clients Say------</h4>
      <div className="flex flex-col justify-center items-center ">

        <div className="w-[25%] text-center  border-y-2 py-4 border-slate-300 mb-4 text-4xl"><h2>TESTIMONIALS</h2></div>

      </div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

        {
          reviews.map(review => <SwiperSlide
            key={review._id}

          >
            <div className='m-20 flex flex-col items-center'>

              <Rating

                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <img className='mt-2' src="https://i.ibb.co/s6dRbxw/quote-left-1.png" alt="" />
              <img src="" alt="" />
              <p className='mt-7'>{review.details}</p>
              <p className='text-center text-[#CD9003] text-3xl'>{review.name}</p>
            </div>

          </SwiperSlide>)
        }
      </Swiper>

    </div>
  );
};

export default Testimonial;