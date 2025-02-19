import React from "react";
import { View,} from "react-native";
import { colors } from "../theme/colors";


export default function BottomLine({ width,borderColor,borderStyle }) {
 
  return (
    <View
    style={{
     marginTop:'5%',
     marginTop: "5%",
     width: width || "100%",
     borderBottomWidth: 1.5,
     borderColor: borderColor || colors.color83,
     borderStyle: borderStyle || "dashed",
      alignSelf: "center",
      height:1
    }}
  />
  );
}
