import { Field, Form, Formik } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input, Button } from '@chakra-ui/react';

const CreateNewUser = () => {
  function validateUsername() {
    let error;
    if (!value) {
      error = 'Username is required';
    }
  }

  function validatePassword() {
    let error;
    if (!value) {
      error = 'Password is required';
    }
  }

  function validateEmail() {
    let error;
    if (!value) {
      error = 'Email is required';
    }
  }

  return (
    <Formik

      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name='name' validate={validateUsername}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder='name' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='password' validate={validatePassword}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel>Password</FormLabel>
                <Input {...field} placeholder='password' type='password' />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewUser;