import { appImages } from "../../commons/AppImages";

export const requestHistdata = [
  {
    request_Id: '0464767584',
    created_at: new Date(),
    status: 'pending',
    name: 'Bank Detail update request',
    type:'finance_details',
    data:{
      name:'xyz vcx',
      branch_Name:'PNB',
      account_Number:'4565434567878987',
      ifsc_Code:'PUNB00476400',
      remarks:''
    }
  },
  {
    request_Id: '0464767584',
    created_at: new Date(),
    status: 'declined',
    name: 'Fssai Detail update request',
    type:'fssai',
    data:{
      document_number:'87654321234567',
      vaild_till: new Date(),
      image:appImages.profileImage,
      remarks:'',
    }
  },
  {
    request_Id: '0464767584',
    created_at: new Date(),
    status: 'approved',
    name: 'Gst Detail update request',
    type:'gst',
    data:{
      document_number:'87fgd3212345fnjf',
      vaild_till: new Date(),
      image:appImages.profileImage,
      remarks:'',
    }
  },
  {
    request_Id: '0464767584',
    created_at: new Date(),
    status: 'pending',
    name: 'PanCard Detail update request',
    type:'pancard',
    data:{
      document_number:'8732jfg1234hdkd',
      image:appImages.profileImage,
      remarks:'',
    }
  },
  {
    request_Id: '0464767584',
    created_at: new Date(),
    status: 'declined',
    name: 'Profile Detail update request',
    type:'update_profile',
    data:{
      logo_image_name:appImages.cookingImage,
      name:'The Great Dhaba',
      address:'mohali punjab',
      description:'This is a good food and services',
      dateOfFounding:new Date(),
      minimum_order_amount:150,
      order_prepare_time:'30 min',
      direction_text:'near by 5 phase',
      dir_image:appImages?.profileImage,
      assets:[],
      remarks:'',
    }
  },
  {
    request_Id: '0464767584',
    created_at: new Date(),
    status: 'pending',
    name: 'GST Detail update request',
    type:'gst',
    data:{
      document_number:'87fgd3212345fnjf',
      vaild_till: new Date(),
      image:appImages.profileImage,
      remarks:'',
    }
  },
];
