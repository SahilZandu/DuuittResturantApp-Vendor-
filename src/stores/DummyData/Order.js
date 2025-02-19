export const orderArray = [
  {
    id: 1,
    trackingId: '0256986327',
    status: 'Preparing',
    restaurantName: 'Suraya Fast Food',
    dishArray: [
      {
        id: 1,
        name: 'Manchurian with Fried Rice',
        quanity: 2,
        vegNonVeg: 'veg',
        price: 170,
      },
      {
        id: 2,
        name: 'Rumali Roti',
        quanity: 6,
        vegNonVeg: 'veg',
        price: 60,
      },
      {
        id: 3,
        name: 'Chicken Biriyani',
        quanity: 1,
        vegNonVeg: 'nonveg',
        price: 280,
      },
    ],
    billPayment: 'Paid',
    date: new Date(),
    total: 450,
    cookinTiming:'20 min',
    instructions:
      ' Please make extra spicy, Please make extra spicy, Please make extra spicy, Please make extra spicy.',
  },
  {
    id: 2,
    date: new Date(),
    trackingId: '0256986328',
    status: 'Packing',
    restaurantName: 'Suraya Fast Food',
    dishArray: [
      {
        id: 1,
        name: 'Manchurian with Fried Rice',
        quanity: 2,
        vegNonVeg: 'veg',
        price: 170,
      },
      {
        id: 2,
        name: 'Rumali Roti',
        quanity: 6,
        vegNonVeg: 'veg',
        price: 60,
      },
      {
        id: 3,
        name: 'Chicken Biriyani',
        quanity: 1,
        vegNonVeg: 'nonveg',
        price: 280,
      },
    ],
    total: 450,
    billPayment: 'Unpaid',
    cookinTiming:'20 min',
    date: new Date(),
    instructions:
      ' Please make extra spicy, Please make extra spicy, Please make extra spicy, Please make extra spicy.',
  },
  {
    id: 3,
    trackingId: '0256986329',
    status: 'Ready To Pickup',
    restaurantName: 'Suraya Fast Food',
    dishArray: [
      {
        id: 1,
        name: 'Manchurian with Fried Rice',
        quanity: 2,
        vegNonVeg: 'veg',
        price: 170,
      },
      {
        id: 2,
        name: 'Rumali Roti',
        quanity: 6,
        vegNonVeg: 'veg',
        price: 60,
      },
      {
        id: 3,
        name: 'Chicken Biriyani',
        quanity: 1,
        vegNonVeg: 'nonveg',
        price: 280,
      },
    ],
    total: 450,
    billPayment: 'Paid',
    cookinTiming:'20 min',
    date: new Date(),
    instructions:
      ' Please make extra spicy, Please make extra spicy, Please make extra spicy, Please make extra spicy.',
  },
  {
    id: 4,
    trackingId: '0256986330',
    status: 'Preparing',
    restaurantName: 'Suraya Fast Food',
    dishArray: [
      {
        id: 1,
        name: 'Manchurian with Fried Rice',
        quanity: 2,
        vegNonVeg: 'veg',
        price: 170,
      },
      {
        id: 2,
        name: 'Rumali Roti',
        quanity: 6,
        vegNonVeg: 'veg',
        price: 60,
      },
      {
        id: 3,
        name: 'Chicken Biriyani',
        quanity: 1,
        vegNonVeg: 'nonveg',
        price: 280,
      },
    ],
    total: 450,
    billPayment: 'Unpaid',
    cookinTiming:'20 min',
    date: new Date(),
    instructions:
      ' Please make extra spicy, Please make extra spicy, Please make extra spicy, Please make extra spicy.',
  },
];

export const orderHistory = [
  {
    id: '045',
    name: 'Rahul Garg ',
    status: 'Completed',
    date: new Date(),
    price: 180,
  },
  {
      id: '046',
      name: 'Rahul Garg ',
      status: 'Declined',
      date: new Date(),
      price: 180,
    },
    {
      id: '047',
      name: 'Rahul Garg ',
      status: 'Completed',
      date: new Date(),
      price: 180,
    },
    {
        id: '048',
        name: 'Rahul Garg ',
        status: 'Declined',
        date: new Date(),
        price: 180,
      },
      {
          id: '049',
          name: 'Rahul Garg ',
          status: 'Completed',
          date: new Date(),
          price: 180,
        },
        {
            id: '050',
            name: 'Rahul Garg ',
            status: 'Declined',
            date: new Date(),
            price: 180,
          },
];

export const restaurantOnOff = [
  {
    id: 0,
    title: 'Out of Stock',
  },
  {
    id: 1,
    title: 'Over Capacity',
  },
  {
    id: 2,
    title: 'Staffing Issues',
  },
  {
    id: 3,
    title: 'Closed for Maintenance',
  },
  {
    id: 4,
    title: 'Special Events or Holidays',
  },
  {
    id: 5,
    title: 'Other',
  },
];
