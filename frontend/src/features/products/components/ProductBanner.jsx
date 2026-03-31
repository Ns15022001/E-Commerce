import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// ✅ FIXED: Correct relative import paths (3 levels up from this file)
import banner1 from '../../../assets/images/banner1.jpg';
import banner2 from '../../../assets/images/banner2.jpg';
import banner3 from '../../../assets/images/banner3.jpg';


const slides = [
  {
    title: 'END OF SEASON',
    headline: 'MEGA SALE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices velit id velit vestibulum tincidunt.',
    buttonText: 'Shop Now',
    image: banner1,
    bgColor: '#000',
    highlightColor: '#FF007F',
    shapeColor: '#FFD700',
  },
  {
    title: 'LIMITED TIME',
    headline: 'SUMMER DEALS',
    description: 'Up to 70% OFF on fresh arrivals. Grab your favorites before they’re gone!',
    buttonText: 'Explore Now',
    image: banner2,
    bgColor: '#1e1e1e',
    highlightColor: '#00C2FF',
    shapeColor: '#FFB6C1',
  },
  {
    title: 'TRENDING NOW',
    headline: 'NEW ARRIVALS',
    description: 'Discover the latest fashion styles curated just for you.',
    buttonText: 'Check Them Out',
    image: banner3,
    bgColor: '#2C3E50',
    highlightColor: '#F39C12',
    shapeColor: '#ECF0F1',
  },
];

export const ProductBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={1}
        style={{
          width: '100%',
          height: isMobile ? '300px' : '430px',
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                backgroundColor: slide.bgColor,
                color: '#ffffff',
                px: isMobile ? 2 : 10,
                py: isMobile ? 2 : 5,
                position: 'relative',
              }}
            >
              {/* Left Text */}
              <Box sx={{ zIndex: 2, maxWidth: isMobile ? '100%' : '40%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
                  {slide.title}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: isMobile ? '2.5rem' : '4rem',
                    color: slide.highlightColor,
                    lineHeight: 1.2,
                  }}
                >
                  {slide.headline}
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '1rem', color: '#ccc' }}>
                  {slide.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    backgroundColor: slide.highlightColor,
                    color: '#fff',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': {
                      backgroundColor: '#d6006e',
                    },
                  }}
                >
                  {slide.buttonText}
                </Button>
              </Box>

              {/* Right Image */}
              <Box
                component="img"
                src={slide.image}
                alt={`Banner Image ${index + 1}`}
                sx={{
                  width: isMobile ? '100%' : '45%',
                  height: '100%',
                  objectFit: 'contain',
                  zIndex: 1,
                }}
              />

              {/* Background shape */}
              {!isMobile && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '40%',
                    height: '100%',
                    backgroundColor: slide.shapeColor,
                    clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
                    zIndex: 0,
                  }}
                />
              )}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
