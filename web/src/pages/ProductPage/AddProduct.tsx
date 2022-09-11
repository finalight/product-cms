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

const AddProduct = ({ open, handleClose }) => {
  const CREATE_PRODUCT = gql`
    # Increments a back-end counter and gets its resulting value
    mutation CreateProduct($name: String!, $price: Float!, $stockCount: Int!) {
      createProduct(
        input: { name: $name, price: $price, stockCount: $stockCount }
      ) {
        id
        name
        price
        stockCount
      }
    }
  `

  const [createProductMutation, { data, loading, error }] =
    useMutation(CREATE_PRODUCT)

  const onSubmit = (data) => {
    console.log(data)

    createProductMutation({
      variables: {
        name: data.name,
        price: parseFloat(data.price),
        stockCount: parseInt(data.stockCount),
      },
    })
  }

  const { register, handleSubmit } = useForm()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Product
        </Typography>

        <Stack spacing={2} direction={'column'}>
          <TextField
            {...register('name')}
            id="standard-helperText"
            label="Name"
            helperText="Name of the product"
            variant="standard"
          />
          <TextField
            {...register('price')}
            id="standard-helperText"
            label="Price"
            helperText="Price of the product"
            variant="standard"
          />
          <TextField
            {...register('stockCount')}
            id="standard-helperText"
            label="Stock Count"
            helperText="Stock quantity of the product"
            variant="standard"
          />
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default AddProduct
