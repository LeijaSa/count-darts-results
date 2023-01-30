import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Typography,
   List,
   ListItem,
   ListItemText,
   ListSubheader,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./Gmcss.css";

import { Player, CompetitionsContext } from "../context/CompetitionsContext";

const DartsGameDialog: React.FC = (): React.ReactElement => {
   const {
      players,
      dartsGameDialog,
      setDartsGameDialog,
      specifiedRound,
      setSpecifiedRound,
      setEndDartsDialog,
      inputValue,
      finishDarts,
      setInputValue,
      subtractPoints,
      setFinishDarts,
      checkZero,
      setCheckZero,
   } = useContext(CompetitionsContext);

   const nextRound = (e: any): void => {
      e.preventDefault();
      e.target.reset();
      let extraRound = Number(specifiedRound) + 1;
      setSpecifiedRound(extraRound);
      if (checkZero === true) {
         setFinishDarts(true);
         setCheckZero(false);
      }
   };

   const endView = (e: any): void => {
      e.preventDefault();
      e.target.reset();
      setDartsGameDialog(false);
      setEndDartsDialog(true);
      setSpecifiedRound(1);
      setFinishDarts(false);
   };

   return (
      <Dialog
         open={dartsGameDialog}
         onClose={() => setDartsGameDialog(false)}
         fullWidth={true}
         PaperProps={{ sx: { position: "fixed", top: 100 } }}
      >
         {finishDarts ? (
            <>
               <form onSubmit={endView}>
                  <DialogTitle>Game Over!</DialogTitle>

                  <DialogContent>
                     <List>
                        {players.map((player: Player, idx: number) => {
                           return (
                              <ListItem key={idx}>
                                 {" "}
                                 <ListItemText
                                    primary={player.name}
                                    secondary={player.points}
                                 />
                              </ListItem>
                           );
                        })}
                     </List>
                  </DialogContent>
                  <DialogActions>
                     <Button
                        variant="outlined"
                        type="submit"
                        style={{ padding: "14px 0px" }}
                        sx={{ marginTop: "10px" }}
                     >
                        Results
                     </Button>
                  </DialogActions>
               </form>
            </>
         ) : (
            <>
               <form onSubmit={nextRound}>
                  <DialogTitle>Game on</DialogTitle>

                  <DialogContent>
                     <Typography>Round {specifiedRound}</Typography>
                     <br></br>
                     {players.map((player: Player, idx: number) => {
                        return (
                           <label key={idx}>
                              {" "}
                              {`${player.name}, ${player.points} points `}
                              <input
                                 type="number"
                                 id="Points"
                                 max="180"
                                 required
                                 defaultValue={inputValue}
                                 onBlur={(e) => {
                                    if (Number(e.target.value) <= 180) {
                                       subtractPoints(
                                          player.id,
                                          Number(e.target.value)
                                       );
                                    }
                                 }}
                              />
                              <br></br>
                              <br></br>
                              <br></br>
                           </label>
                        );
                     })}
                  </DialogContent>
                  <DialogActions>
                     <Button
                        variant="outlined"
                        type="submit"
                        style={{ padding: "14px 0px" }}
                        sx={{ marginTop: "10px" }}
                     >
                        Subtract points/ Next round
                     </Button>
                  </DialogActions>
               </form>
            </>
         )}
      </Dialog>
   );
};

export default DartsGameDialog;
