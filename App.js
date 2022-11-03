import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import ProductInput from './components/ProductInput';
import ListItem from './components/ListItem';


export default function App() {

  const [ products, setProducts ] = useState([]);

  const addProductHandler = ( productName ) => {
    setProducts(() => [ ...products, {key: uuid.v4(), value: productName} ]);
  }

  const removeProductHandler = ( productName ) => {
    console.log( productName );
    setProducts( () => products.filter((product) => product !== productName) );
  }

  return (
    <View style={ styles.container }>
      <ProductInput onProductAdd={ addProductHandler }/>
        <View style={ styles.productList }>
          { products.length === 0 
          ? (<View>
              <Text>No hay elementos en la lista</Text>
            </View>
            ) 
          : (
              <FlatList data={ products }
              renderItem={ (productData) => {

              const { key, value } = productData.item;
              console.log(key)

              return ( <ListItem 
              key={ key } 
              productName={ value } 
              onProductRemove={ removeProductHandler }/> )

              } }/>
            )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 30,
    backgroundColor: 'lightgray',
  },
  productList: {
    marginTop: 10,
    width: '90%',
    height: '80%',
    alignItems: 'center'
  }
});
