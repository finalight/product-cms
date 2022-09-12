import { Button, Modal, Stack, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import { useMutation } from '@redwoodjs/web'

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

const EditProduct = ({ open, handleClose, editProduct }) => {
  const UPDATE_PRODUCT = gql`
    mutation UpdateProduct(
      $id: Int!
      $name: String!
      $price: Float!
      $stockCount: Int!
    ) {
      updateProduct(
        id: $id
        input: { name: $name, price: $price, stockCount: $stockCount }
      ) {
        id
        name
        price
        stockCount
      }
    }
  `

  const [updateProductMutation, { data, loading, error }] =
    useMutation(UPDATE_PRODUCT)

  const onSubmit = (data) => {
    updateProductMutation({
      variables: {
        id: parseInt(data.id),
        name: data.name,
        price: parseFloat(data.price),
        stockCount: parseInt(data.stockCount),
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
          Edit Product
        </Typography>

        <Stack spacing={2} direction={'column'}>
          <input {...register('id')} type="hidden" value={editProduct.id} />
          <TextField
            {...register('name')}
            id="standard-helperText"
            label="Name"
            helperText="Name of the product"
            variant="standard"
            defaultValue={editProduct.name}
          />
          <TextField
            {...register('price')}
            id="standard-helperText"
            label="Price"
            helperText="Price of the product"
            variant="standard"
            defaultValue={editProduct.price}
          />
          <TextField
            {...register('stockCount')}
            id="standard-helperText"
            label="Stock Count"
            helperText="Stock quantity of the product"
            variant="standard"
            defaultValue={editProduct.stockCount}
          />
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default EditProduct
