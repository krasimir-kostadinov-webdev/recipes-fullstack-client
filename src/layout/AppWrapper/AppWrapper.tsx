import { Box } from "@mui/system";
import React, { ReactNode } from "react";

interface Props {
   children: ReactNode | ReactNode[];
}

const AppWrapper = (props: Props) => {
   return (
      <Box
         sx={{
            backgroundColor: "secondary.main",
            width: "100%",
            minHeight: "100vh",
            padding: "5em 0",
         }}
      >
         {props.children}
      </Box>
   );
};

export default AppWrapper;
