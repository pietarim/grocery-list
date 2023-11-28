import {
  FormControl, FormLabel, Input, FormErrorMessage, Wrap, Text, Textarea, Flex, List, ListItem, Button, useRadio,
  Box, useRadioGroup, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Card, CardBody
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { getItems } from '../services/items';

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  /* console.log(input.value.name);
  console.log('input'); */
  /* props.setSelected(input.value.name); */
  const checkbox = getCheckboxProps();
  /* console.log(checkbox); */


  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

interface Item {
  item: string;
  amount: string;
}

const CreateRecipe = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [itemArray, setItemArray] = useState<Item[]>([]);
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      console.log(items);
      setItems(items);
    };
    fetchItems();
  }, []);

  const itemsWithTitles = items.reduce((acc: any, item: any) => {
    /* const lastIndex = acc.length ? acc.length - 1 : 0; */
    /* console.log(lastIndex); */
    if (!acc.length) {
      return [{ ...item,/* : item.type, */ style: 'title', name: "", isTitle: item.type }, { ...item, style: 'item', isTitle: "" }];
    } else if (acc[acc.length - 1].type === item.type) {
      return [...acc, { ...item, style: 'item', isTitle: "" }];
    } else {
      return [...acc, { ...item, /* item: item.type, */ style: 'title', name: "", isTitle: item.type }, { ...item, style: 'item', isTitle: "" }];
    }
  }, []);

  const handleRadioChange = (e) => {
    console.log(e);
    console.log(items);
    setSelected(items[parseInt(e)]);
  };

  /* console.log(itemsWithTitles); */

  const returnTitle = (title) => {
    return (
      <ListItem key={title}>{title}</ListItem>
    );
  };

  const returnItemArray = () => {
    console.log(itemArray);
    if (!itemArray.length) {
      return (
        <>
          <Text style={{ backgroundColor: "lime", margin: '3px', borderRadius: '20px', display: 'inline-block', padding: '4px' }}>{selected.name}</Text>
          <Button onClick={() => setItemArray([{ item: selected.name, amount: itemAmount }])}>Add</Button>
        </>
      );
    } else {
      return (
        <>
          <List>
            {itemArray.map((item, id) => {
              return <ListItem style={{ backgroundColor: "lime", margin: '3px', borderRadius: '20px', display: 'inline-block', padding: '4px' }} key={id}>{item.item} {item.amount}</ListItem>;
            })}
          </List>
          <Text>{selected.name ? selected.name : "pick item"}</Text>
          <Button onClick={() => setItemArray([...itemArray, { item: selected.name, amount: itemAmount }])}>Add</Button>
        </>
      );
    }
  };


  /* const returnItems = () => {
    return (
      <List className='category'>
        {
          itemsWithTitles.map((i: any) => (<ListItem className={`${i.style} list-item-container`} key={i.id}>{i.name} {i.isTitle}</ListItem>
          ))
        }
      </List>
    );
  }; */

  function validateName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Password is required';
    }
    return error;
  }

  /* const options = ['Option 1', 'Option 2', 'Option 3']; */
  const options = items;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: handleRadioChange,
  });

  const group = getRootProps();

  return (
    <Flex>
      <Card style={{ width: '1260px' }} size='lg'>
        <CardBody>
          <Formik
            initialValues={{ name: '', password: '', public: false }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <Field name='name' validate={validateName}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Recipe name</FormLabel>
                      <Input {...field} placeholder='name' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='password' validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel>22</FormLabel>
                      <Input {...field} placeholder='password' type='password' />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='password' validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel>Password</FormLabel>
                      <Textarea
                        placeholder='Here is a sample placeholder'
                        size='sm'
                      />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <input type='file' accept='image/*' onChange={handleImageChange} />
                <label>
                  <Field type='checkbox' name='public' />
                  Make public
                </label>
                <Button
                  mt={4}
                  colorScheme='teal'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Submit
                </Button>
                {/* <Checkbox>Make publiccc</Checkbox> */}
                {/* <Text>Halojaa: {selected}</Text> */}
                {returnItemArray()}
                <NumberInput

                  onChange={(valueString) => setItemAmount(valueString)}
                  value={itemAmount}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Form>
            )}
          </Formik></CardBody>
      </Card>
      <Wrap {...group}>
        {options.map((value, n) => {
          const radio = getRadioProps({ value: n });

          return (
            <>
              <RadioCard key={n} setSelected={setSelected} {...radio}>
                {value.name}
              </RadioCard>
            </>
          );
        })}
      </Wrap>
    </Flex>
  );
};
{/* {returnItems()} */ }

{/* <div>
      <Flex>
        <div>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='name' />
          </FormControl>
          <Text mb='8px'>Value: </Text>
          <Textarea
            placeholder='Here is a sample placeholder'
            size='sm'
          />
          <Button colorScheme='teal' variant='outline'>Create</Button>
        </div>
        <Divider orientation='vertical' />
        {returnItems()}
      </Flex >
    </div> */}

export default CreateRecipe;