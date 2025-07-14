import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductUpdateStatus,
  selectProductUpdateStatus,
  selectSelectedProduct,
  updateProductByIdAsync
} from '../../products/ProductSlice';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { selectBrands } from '../../brands/BrandSlice';
import { selectCategories } from '../../categories/CategoriesSlice';
import { toast } from 'react-toastify';

export const ProductUpdate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productUpdateStatus = useSelector(selectProductUpdateStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // Fetch product by ID on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [id]);

  // Set form values after product is loaded
  useEffect(() => {
    if (selectedProduct) {
      setValue('title', selectedProduct.title);
      setValue('price', selectedProduct.price);
      setValue('discountPercentage', selectedProduct.discountPercentage);
      setValue('stockQuantity', selectedProduct.stockQuantity);
      setValue('thumbnail', selectedProduct.thumbnail);
      setValue('brand', selectedProduct.brand?._id);
      setValue('category', selectedProduct.category?._id);

      selectedProduct.images?.forEach((img, index) => {
        setValue(`image${index}`, img);
      });
    }
  }, [selectedProduct]);

  // Handle product update status
  useEffect(() => {
    if (productUpdateStatus === 'fullfilled') {
      toast.success('Product Updated');
      navigate('/admin/dashboard');
    } else if (productUpdateStatus === 'rejected') {
      toast.error('Error updating product, please try again later');
    }
  }, [productUpdateStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductUpdateStatus());
    };
  }, []);

  // Submit handler
  const handleProductUpdate = (data) => {
    const productUpdate = {
      ...data,
      _id: selectedProduct._id,
      images: [data?.image0, data?.image1, data?.image2, data?.image3]
    };

    delete productUpdate.image0;
    delete productUpdate.image1;
    delete productUpdate.image2;
    delete productUpdate.image3;

    dispatch(updateProductByIdAsync(productUpdate));
  };

  // Return early if data is missing
  if (
    !selectedProduct ||
    !selectedProduct.brand ||
    !selectedProduct.category
  ) {
    return <Typography mt={5}>Loading product data...</Typography>;
  }

  return (
    <Stack
      p={'0 16px'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'row'}
    >
      <Stack
        width={is1100 ? '100%' : '60rem'}
        rowGap={4}
        mt={is480 ? 4 : 6}
        mb={6}
        component={'form'}
        noValidate
        onSubmit={handleSubmit(handleProductUpdate)}
      >
        {/* Fields */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Title
            </Typography>
            <TextField
              {...register('title', { required: 'Title is required' })}
            />
          </Stack>

          <Stack flexDirection={'row'}>
            <FormControl fullWidth>
              <InputLabel id="brand-selection">Brand</InputLabel>
              <Select
                labelId="brand-selection"
                label="Brand"
                {...register('brand', { required: 'Brand is required' })}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="category-selection">Category</InputLabel>
              <Select
                labelId="category-selection"
                label="Category"
                {...register('category', { required: 'Category is required' })}
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Description
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register('description', {
                required: 'Description is required'
              })}
            />
          </Stack>

          <Stack flexDirection={'row'}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Price
              </Typography>
              <TextField
                type="number"
                {...register('price', { required: 'Price is required' })}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Discount {is480 ? '%' : 'Percentage'}
              </Typography>
              <TextField
                type="number"
                {...register('discountPercentage', {
                  required: 'Discount percentage is required'
                })}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Stock Quantity
            </Typography>
            <TextField
              type="number"
              {...register('stockQuantity', {
                required: 'Stock Quantity is required'
              })}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Thumbnail
            </Typography>
            <TextField
              {...register('thumbnail', {
                required: 'Thumbnail is required'
              })}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Product Images
            </Typography>

            <Stack rowGap={2}>
              {selectedProduct.images.map((image, index) => (
                <TextField
                  key={index}
                  {...register(`image${index}`, {
                    required: 'Image is required'
                  })}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* Actions */}
        <Stack
          flexDirection={'row'}
          alignSelf={'flex-end'}
          columnGap={is480 ? 1 : 2}
        >
          <Button size={is480 ? 'medium' : 'large'} variant="contained" type="submit">
            Update
          </Button>
          <Button
            size={is480 ? 'medium' : 'large'}
            variant="outlined"
            color="error"
            component={Link}
            to={'/admin/dashboard'}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
