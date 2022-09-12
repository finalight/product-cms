import {
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@redwoodjs/web'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  minWidth: 400,
  p: 4,
}

const ADD_ORDER = gql`
  mutation UpdateOrder(
    $id: Int!
    $productId: Int!
    $quantity: Int!
    $trackingNumber: String!
    $trackingCompany: String!
    $status: OrderStatus!
  ) {
    updateOrder(
      id: $id
      input: {
        productId: $productId
        quantity: $quantity
        trackingNumber: $trackingNumber
        trackingCompany: $trackingCompany
        status: $status
      }
    ) {
      id
      quantity
      trackingNumber
      trackingCompany
      status
      product {
        name
      }
    }
  }
`
const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    products {
      id
      name
    }
  }
`
const EditOrder = ({ open, handleClose, editOrder }) => {
  const [editOrderMutation, { data, loading, error }] = useMutation(ADD_ORDER)

  const {
    data: getAllProductsData,
    loading: getAllProductsLoading,
    error: getAllProductsError,
  } = useQuery(GET_ALL_PRODUCTS)

  const onSubmit = (data) => {
    editOrderMutation({
      variables: {
        id: parseInt(data.id),
        productId: parseInt(data.productId),
        quantity: parseInt(data.quantity),
        trackingNumber: data.trackingNumber,
        trackingCompany: data.trackingCompany,
        status: data.status,
      },
    })

    reset()
    handleClose()
  }

  const { register, handleSubmit, reset } = useForm()

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose()
        reset()
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Order
        </Typography>

        <Stack spacing={2} direction={'column'}>
          <input {...register('id')} type="hidden" value={editOrder.id} />
          <InputLabel id="demo-simple-select-label">Product</InputLabel>
          {getAllProductsData && (
            <Select
              defaultValue={editOrder.productId}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register('productId')}
            >
              {getAllProductsData.products.map((product) => (
                <MenuItem value={product.id} key={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          )}
          <TextField
            {...register('quantity')}
            id="standard-helperText"
            label="Quantity"
            helperText="Quantity"
            variant="standard"
            defaultValue={editOrder.quantity}
          />
          <TextField
            {...register('trackingNumber')}
            id="standard-helperText"
            label="Tracking Number"
            helperText="Tracking Number"
            variant="standard"
            defaultValue={editOrder.trackingNumber}
          />
          <TextField
            {...register('trackingCompany')}
            id="standard-helperText"
            label="Tracking Company"
            helperText="Tracking Company"
            variant="standard"
            defaultValue={editOrder.trackingCompany}
          />

          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register('status')}
            defaultValue={editOrder.status}
          >
            <MenuItem value={'PROCESSING'}>PROCESSING</MenuItem>
            <MenuItem value={'CANCELLED'}>CANCELLED</MenuItem>
            <MenuItem value={'DELIVERED'}>DELIVERED</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default EditOrder
