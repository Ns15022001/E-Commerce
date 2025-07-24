import React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ...your other imports like useParams, useEffect, etc.

const ProductDetails = () => {
  const [product, setProduct] = React.useState(null);

  // Fetch product logic here (if not already)

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
      {product?.images?.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          navigation
          pagination={{ clickable: true }}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={image}
                alt={`${product?.title} image ${index + 1}`}
                sx={{
                  width: '100%',
                  objectFit: 'contain',
                  aspectRatio: '1/1',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

export default ProductDetails;
