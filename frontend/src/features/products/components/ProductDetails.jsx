import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectSelectedProduct
} from '../ProductSlice'

import { Box, Checkbox, Rating, Stack, Typography, useMediaQuery } from '@mui/material'

import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems
} from '../../cart/CartSlice'

import { selectLoggedInUser } from '../../auth/AuthSlice'

import {
  fetchReviewsByProductIdAsync,
  resetReviewFetchStatus,
  selectReviewFetchStatus,
  selectReviews
} from '../../review/ReviewSlice'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Reviews } from '../../review/components/Reviews'
import { toast } from 'react-toastify'
import { MotionConfig, motion } from 'framer-motion'

import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'
import Favorite from '@mui/icons-material/Favorite'

import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems
} from '../../wishlist/WishlistSlice'

import { useTheme } from '@mui/material'
import Lottie from 'lottie-react'
import { loadingAnimation } from '../../../assets'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']
const COLORS = ['#020202', '#F6F6F6', '#B82222', '#BEA9A9', '#E2BB8D']

export const ProductDetails = () => {
  const { id } = useParams()
  const product = useSelector(selectSelectedProduct)
  const loggedInUser = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartItemAddStatus = useSelector(selectCartItemAddStatus)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1)

  const reviews = useSelector(selectReviews)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const theme = useTheme()
  const is1420 = useMediaQuery(theme.breakpoints.down(1420))

  const wishlistItems = useSelector(selectWishlistItems)

  const isProductAlreadyInCart = cartItems.some(item => item.product._id === id)
  const isProductAlreadyinWishlist = wishlistItems.some(item => item.product._id === id)

  const productFetchStatus = useSelector(selectProductFetchStatus)
  const reviewFetchStatus = useSelector(selectReviewFetchStatus)

  const totalReviewRating = reviews.reduce((acc, review) => acc + review.rating, 0)
  const totalReviews = reviews.length
  const averageRating = totalReviews ? Math.ceil(totalReviewRating / totalReviews) : 0

  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus)
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus)

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id))
      dispatch(fetchReviewsByProductIdAsync(id))
    }
  }, [id, dispatch])

  const handleAddToCart = () => {
    const item = { user: loggedInUser._id, product: id, quantity }
    dispatch(addToCartAsync(item))
    setQuantity(1)
  }

  return (
    <Stack justifyContent="center" alignItems="center" mb="2rem">
      {productFetchStatus === 'pending' ? (
        <Stack height="100vh" justifyContent="center">
          <Lottie animationData={loadingAnimation} />
        </Stack>
      ) : (
        <Stack width="90%">
          
          <Typography variant="h4">{product?.title}</Typography>
          <Typography>${product?.price}</Typography>

          <Rating value={averageRating} readOnly />
          <Typography>{product?.description}</Typography>

          <Box>
            <img
              src={product?.images?.[selectedImageIndex]}
              alt="product"
              style={{ width: '100%' }}
            />
          </Box>

          <Stack direction="row" gap={2}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </Stack>

          <button onClick={handleAddToCart}>
            {isProductAlreadyInCart ? "Go to Cart" : "Add to Cart"}
          </button>

        </Stack>
      )}
    </Stack>
  )
}

export default ProductDetails