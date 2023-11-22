import { FormControl, FormLabel, Input, Text, Textarea, Flex, List, ListItem, Button, Divider, Stack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getItems } from '../services/items';

const CreateRecipe = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      /* console.log(items); */
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

  console.log(itemsWithTitles);

  const returnTitle = (title) => {
    return (
      <ListItem key={title}>{title}</ListItem>
    );
  };

  const returnItems = () => {
    return (
      <List className='category'>
        {
          itemsWithTitles.map((i: any) => (<ListItem className={`${i.style} list-item-container`} key={i.id}>{i.name} {i.isTitle}</ListItem>
          ))
        }
      </List>
    );
  };

  return (
    <div>
      <Flex>
        <div>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='name' />
          </FormControl>
          <Text mb='8px'>Value: {/* {value} */}</Text>
          <Textarea
            /* value={value}
            onChange={handleInputChange} */
            placeholder='Here is a sample placeholder'
            size='sm'
          />
          <Button colorScheme='teal' variant='outline'>Create</Button>
        </div>
        <Divider orientation='vertical' />
        {returnItems()}
      </Flex >
    </div>
  );
};

export default CreateRecipe;