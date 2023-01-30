import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./Gmcss.css";

import { Player, CompetitionsContext } from "../context/CompetitionsContext";

const GameDialog: React.FC = (): React.ReactElement => {
   const {
      players,
      round,
      gameDialog,
      setGameDialog,
      specifiedRound,
      setSpecifiedRound,
      setEndDialog,
      addPoints,
   } = useContext(CompetitionsContext);

   const nextRound = (e: any): void => {
      e.preventDefault();
      let extraRound = Number(specifiedRound) + 1;
      setSpecifiedRound(extraRound);
      e.target.reset();
   };

   const endView = (e: any): void => {
      e.preventDefault();
      e.target.reset();
      setGameDialog(false);
      setEndDialog(true);
      setSpecifiedRound(1);
   };
   const [inputValue, setInputValue] = useState<string>("");

   return (
      <Dialog
         open={gameDialog}
         onClose={() => setGameDialog(false)}
         fullWidth={true}
         PaperProps={{ sx: { position: "fixed", top: 100 } }}
      >
         {round > specifiedRound ? (
            <>
               <DialogTitle>Game on</DialogTitle>
               <form onSubmit={nextRound}>
                  <DialogContent>
                     <Typography>
                        Round {specifiedRound}/{round}
                     </Typography>
                     <br></br>
                     {players.map((player: Player, idx: number) => {
                        return (
                           <label key={idx}>
                              {" "}
                              {`${player.name}, ${player.points} points `}
                              <input
                                 type="number"
                                 id="Points"
                                 max="50"
                                 required
                                 defaultValue={inputValue}
                                 onBlur={(e) => {
                                    if (Number(e.target.value) <= 50) {
                                       addPoints(
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
                        Add points/ Next round
                     </Button>
                  </DialogActions>
               </form>
            </>
         ) : (
            <>
               <form onSubmit={endView}>
                  <DialogTitle>Game on</DialogTitle>

                  <DialogContent>
                     <Typography>
                        Round {specifiedRound}/{round}{" "}
                     </Typography>
                     <br></br>
                     {players.map((player: Player, idx: number) => {
                        return (
                           <label key={idx}>
                              {" "}
                              {`${player.name}, ${player.points} points `}
                              <input
                                 type="number"
                                 id="Points"
                                 max="50"
                                 required
                                 defaultValue={inputValue}
                                 onBlur={(e) => {
                                    if (Number(e.target.value) <= 50) {
                                       addPoints(
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
                        Results
                     </Button>
                  </DialogActions>
               </form>
            </>
         )}
      </Dialog>
   );
};

export default GameDialog;
