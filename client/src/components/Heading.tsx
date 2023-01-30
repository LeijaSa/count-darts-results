import { Typography } from "@mui/material";
import React from "react";

const Otsikko: React.FC = (): React.ReactElement => {
   return (
      <>
         <Typography variant="h5" sx={{ marginTop: "10px" }}>
            Playing darts
         </Typography>
      </>
   );
};

export default Otsikko;
