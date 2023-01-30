import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Typography,
} from "@mui/material";
import React, { useContext } from "react";
import "./Gmcss.css";

import { CompetitionsContext } from "../context/CompetitionsContext";

const DetailedDialog: React.FC = (): React.ReactElement => {
   const {
      competitions,
      detailedDialog,
      setDetailedDialog,
      detailedId,
      kokeilu,
   } = useContext(CompetitionsContext);

   const fns = require("date-fns");

   const competitionsS = [...competitions];

   const searchedCompetition = competitionsS.find(
      (competition) => competition.id === detailedId
   );

   return (
      <Dialog
         open={detailedDialog}
         onClose={() => setDetailedDialog(false)}
         fullWidth={true}
         PaperProps={{ sx: { position: "fixed", top: 100 } }}
      >
         {kokeilu ? (
            <>
               <DialogTitle>Competition info</DialogTitle>
               <DialogContent>
                  <Typography>
                     Name of the competition: {searchedCompetition.name}
                  </Typography>
                  <Typography>
                     Date of the competition:{" "}
                     {fns.format(
                        new Date(searchedCompetition.date),
                        "dd-MM-yyyy' klo 'HH:mm"
                     )}
                  </Typography>

                  <Typography>
                     Players: {searchedCompetition.contestants}
                  </Typography>
                  <Typography>
                     {" "}
                     Players' points: {searchedCompetition.contestantsPoints}
                  </Typography>
                  <Typography>
                     Winner(s): {searchedCompetition.winner}
                  </Typography>
               </DialogContent>
               <DialogActions>
                  <Button
                     variant="outlined"
                     style={{ padding: "14px 0px" }}
                     sx={{ marginTop: "10px" }}
                     onClick={() => setDetailedDialog(false)}
                  >
                     Back to the main page
                  </Button>
               </DialogActions>
            </>
         ) : (
            <>
               <DialogActions>
                  <Button
                     variant="outlined"
                     style={{ padding: "14px 0px" }}
                     sx={{ marginTop: "10px" }}
                     onClick={() => setDetailedDialog(false)}
                  >
                     Back to the main page
                  </Button>
               </DialogActions>
            </>
         )}
      </Dialog>
   );
};

export default DetailedDialog;
