export const StatusCTABG = status => {
  switch (status) {
    case 'waiting_for_confirmation':
      return 'rgba(29, 114, 30, 0.25)';
    case 'cooking':
      return 'rgba(249, 189, 0, 0.20)';
    case 'packing_processing':
      return 'rgba(255, 140, 34, 0.15)';
    case 'ready_to_pickup':
      return 'rgba(13, 113, 205, 0.15)';
  }
};

export const StatusCTAColor = status => {
  switch (status) {
    case 'waiting_for_confirmation':
      return '#1D721E';
    case 'cooking':
      return '#F9BD00';
    case 'packing_processing':
      return '#FF8C22';
    case 'ready_to_pickup':
      return '#0D71CD';
  }
};

export const statusCTATitle = status => {
  switch (status) {
    case 'waiting_for_confirmation':
      return 'Accept Order';
    case 'cooking':
      return 'Order Ready & Packed ?';
    case 'packing_processing':
      return 'Order Packed ?';
    case 'ready_to_pickup':
      return 'Order Picked ?';
  }
};

export const statusCTATitleColor = status => {
  switch (status) {
    case 'waiting_for_confirmation':
      return '#1D721E';
    case 'cooking':
      return '#F9BD00';
    case 'packing_processing':
      return '#FF8C22';
    case 'ready_to_pickup':
      return '#0D71CD';
  }
}
