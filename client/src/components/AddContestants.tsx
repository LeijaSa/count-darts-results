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

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Player, CompetitionsContext } from "../context/CompetitionsContext";

const AddContestants: React.FC = (): React.ReactElement => {
   const {
      addDialog,
      setAddDialog,
      openCheckbox,
      setOpenCheckbox,
      round,
      setGameDialog,
      addPlayer,
      handleSettingRound,
      checkPN,
      setCheckPN,
   } = useContext(CompetitionsContext);

   const nameRef: React.MutableRefObject<HTMLInputElement | undefined> =
      useRef();

   const [checkboxDialog, setCheckboxDialog] = useState<boolean>(false);

   const [countPlayers, setCountPlayers] = useState<number>(0);

   const addPlayers = (): void => {
      //let contestant: string = nimiRef.current!.value;
      let newPlayer: Player = {
         id: uuidv4(),
         name: nameRef.current!.value || "(nameless player)",
         points: 0,
      };
      addPlayer(newPlayer);
      setCountPlayers(Number(countPlayers + 1));

      nameRef.current!.value = "";
      if (countPlayers >= 1) {
         setCheckPN(true);
      }
   };

   const handleAdding = (): void => {
      setCheckboxDialog(true);
      setOpenCheckbox(true);
   };
   const handleGameOn = (): void => {
      setCheckPN(false);
      setCountPlayers(0);
      setAddDialog(false);
      setCheckboxDialog(false);
      setGameDialog(true);
   };

   return (
      <Dialog
         open={addDialog}
         onClose={() => setAddDialog(false)}
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
               onClick={addPlayers}
            >
               Add
            </Button>
         </DialogContent>

         {checkPN ? (
            <DialogActions>
               <Button onClick={() => handleAdding()}>Start playing</Button>
               <Button onClick={() => setAddDialog(false)}>Cancel</Button>
            </DialogActions>
         ) : (
            <>
               <DialogActions>
                  <Button disabled onClick={() => handleAdding()}>
                     Start playing
                  </Button>
                  <Button onClick={() => setAddDialog(false)}>Cancel</Button>
               </DialogActions>
            </>
         )}

         {openCheckbox ? (
            <>
               <Dialog
                  open={checkboxDialog}
                  onClose={() => setCheckboxDialog(false)}
                  fullWidth={true}
                  PaperProps={{ sx: { position: "fixed", top: 150 } }}
               >
                  <FormControl fullWidth>
                     <InputLabel id="rounds_label">Rounds</InputLabel>
                     <Select
                        id="simple-select"
                        value={round}
                        label="Rounds"
                        onChange={handleSettingRound}
                     >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                     </Select>
                  </FormControl>

                  <Button onClick={handleGameOn}>Start round 1</Button>
               </Dialog>
            </>
         ) : (
            <Box sx={{ minWidth: 120 }}></Box>
         )}
      </Dialog>
   );
};

export default AddContestants;
