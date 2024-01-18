import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from '../components/FormInput';

const RestrictedArea = () => {
  const formik = new useFormik({
    initialValues: {
      // generic values for products
      name: '',
      image: '',
      description: '',
      price: '',
      available: false,
      // values for spaceship
      model: '',
      fuel_type: '',
      capacity: '',
      speed: '',
      // values for spacesuit
      size: '',
      material: '',
    },
    validationSchema: {},
    onSubmit: () => {}
  })


  return (
    <section className='text-white'>
      <h1>Admin Area</h1>
      <form action="" onSubmit={formik.handleSubmit}>
        <FormInput 
          labelText={'Photo'}
          id={'photo'}
          name={'photo'}
          type={'file'}
          whenChange={formik.handleChange}
          value={formik.values.photo}
          errorClass={formik.errors.photo ? '' : 'hidden'}
          errorText={formik.errors.photo}
        />
      </form>
    </section>
  )
}

export default RestrictedArea