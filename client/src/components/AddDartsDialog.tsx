import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Gmcss.css";
import { Player, CompetitionsContext } from "../context/CompetitionsContext";

const AddDartsDialog: React.FC = (): React.ReactElement => {
   const {
      addDartsDialog,
      setAddDartsDialog,
      addPlayer,
      checkPN,
      setCheckPN,
      setDartsGameDialog,
   } = useContext(CompetitionsContext);

   const nameRef: React.MutableRefObject<HTMLInputElement | undefined> =
      useRef();

   const [countPlayers, setCountPlayers] = useState<number>(0);

   const addDartsPlayers = (): void => {
      let newPlayer: Player = {
         id: uuidv4(),
         name: nameRef.current!.value || "(nameless player)",
         points: 501,
      };
      addPlayer(newPlayer);
      setCountPlayers(Number(countPlayers + 1));

      nameRef.current!.value = "";
      if (countPlayers >= 1) {
         setCheckPN(true);
      }
   };

   const handleDartsGameOn = (): void => {
      setCheckPN(false);
      setCountPlayers(0);
      setAddDartsDialog(false);
      setDartsGameDialog(true);
   };

   return (
      <Dialog
         open={addDartsDialog}
         onClose={() => setAddDartsDialog(false)}
         fullWidth={true}
         PaperProps={{ sx: { position: "fixed", top: 100 } }}
      >
         <DialogTitle>Add player</DialogTitle>
         <DialogContent>
            <TextField
               inputRef={nameRef}
               variant="outlined"
               label="Name"
               sx={{ marginTop: "10px" }}
            />
            <Button
               variant="outlined"
               style={{ padding: "14px 0px" }}
               sx={{ marginTop: "10px" }}
               onClick={addDartsPlayers}
            >
               Add
            </Button>
         </DialogContent>

         {checkPN ? (
            <DialogActions>
               <Button onClick={() => handleDartsGameOn()}>
                  Start playing
               </Button>
               <Button onClick={() => setAddDartsDialog(false)}>Cancel</Button>
            </DialogActions>
         ) : (
            <>
               <DialogActions>
                  <Button disabled onClick={() => handleDartsGameOn()}>
                     Start playing
                  </Button>
                  <Button onClick={() => setAddDartsDialog(false)}>
                     Cancel
                  </Button>
               </DialogActions>
            </>
         )}
      </Dialog>
   );
};

export default AddDartsDialog;
