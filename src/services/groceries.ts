export class GroceriesService{

  items: Array<any> = [{
    name: 'Barra Pan Bimbo Blanco',
    quantity: 2,
    type: 'Pzs.'
  },
    {
      name: 'Jamon de Pavo FUD',
      quantity: 0.5,
      type: 'Kg.'
    },
    {
      name: 'Coca Cola 2LT',
      quantity: 1,
      type: 'Pzs.'
    },
    {
      name: 'Aguacates',
      quantity: 1,
      type: 'Kg.'
    },
    {
      name: 'Leche San Marcos 1Lt',
      quantity: 6,
      type: 'Pzs.'
    },
    {
      name: 'Desodorante AXE Dark',
      quantity: 1,
      type: 'Pzs.'
    },
    {
      name: 'Barra Pan Bimbo Blanco',
      quantity: 2,
      type: 'Pzs.'
    },
    {
      name: 'Jamon de Pavo FUD',
      quantity: 0.5,
      type: 'Kg.'
    },
    {
      name: 'Coca Cola 2LT',
      quantity: 1,
      type: 'Pzs.'
    },
    {
      name: 'Aguacates',
      quantity: 1,
      type: 'Kg.'
    },
    {
      name: 'Leche San Marcos 1Lt',
      quantity: 6,
      type: 'Pzs.'
    },
    {
      name: 'Desodorante AXE Dark',
      quantity: 1,
      type: 'Pzs.'
    }

  ];

  addProduct(){

  }

  getProducts(){
    return this.items.slice();
  }

  deleteItem(index: number) {
    console.log('index: ' + index)
    this.items.splice(index, 1);
  }
}
