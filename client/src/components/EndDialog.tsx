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
import { v4 as uuidv4 } from "uuid";

import {
   Player,
   Competition,
   CompetitionsContext,
} from "../context/CompetitionsContext";

const EndDialog: React.FC = (): React.ReactElement => {
   const {
      players,
      setPlayers,
      endDialog,
      setEndDialog,
      addCompetition,
      setRound,
      gameName,
   } = useContext(CompetitionsContext);

   const playersS = [...players];

   const sortedPlayers = playersS.sort((a: any, b: any) =>
      b.points > a.points ? 1 : -1
   );
   const highestMaxScore = Math.max(
      ...sortedPlayers.map((member) => member.points)
   );

   const playersWithHighestScore = sortedPlayers.filter(
      (member) => member.points === highestMaxScore
   );

   const [emptyArray, setEmptyArray] = useState<[]>([]);

   const winnersLength = playersWithHighestScore.length;

   const mainPage = async () => {
      let playersPoints = [];
      for (let i = 0; i < playersS.length; i++) {
         playersPoints.push(playersS[i].points);
      }

      let names = [];
      for (let i = 0; i < playersS.length; i++) {
         names.push(playersS[i].name);
      }

      let winnerPlayers = [];
      for (let i = 0; i < playersWithHighestScore.length; i++) {
         winnerPlayers.push(playersWithHighestScore[i].name);
      }

      let newCompetition: Competition = {
         id: uuidv4(),
         name: gameName,
         date: new Date(),
         contestants: names.join(),
         contestantsPoints: playersPoints.join(),
         winner: winnerPlayers.join(),
      };
      setPlayers(emptyArray);
      setRound(1);
      addCompetition(newCompetition);
      setEndDialog(false);
   };

   return (
      <Dialog
         open={endDialog}
         onClose={() => setEndDialog(false)}
         fullWidth={true}
         PaperProps={{ sx: { position: "fixed", top: 100 } }}
      >
         <>
            {winnersLength > 1 ? (
               <>
                  <DialogTitle>Results</DialogTitle>
                  <DialogContent>
                     <Typography>Draw! Winners are:</Typography>
                     <table>
                        <tbody>
                           {playersWithHighestScore.map(
                              (player: Player, idx: number) => {
                                 return (
                                    <tr key={idx}>
                                       <td>{player.name}</td>
                                    </tr>
                                 );
                              }
                           )}
                        </tbody>
                     </table>
                     <br></br>
                     {sortedPlayers.map((player: Player, idx: number) => {
                        return (
                           <li key={idx}>
                              {player.name}, {player.points} points
                           </li>
                        );
                     })}
                  </DialogContent>
                  <DialogActions>
                     <Button
                        variant="outlined"
                        style={{ padding: "14px 0px" }}
                        sx={{ marginTop: "10px" }}
                        onClick={() => mainPage()}
                     >
                        Back to the main page
                     </Button>
                  </DialogActions>
               </>
            ) : (
               <>
                  <DialogTitle>Results</DialogTitle>
                  <DialogContent>
                     {playersWithHighestScore.map(
                        (player: Player, idx: number) => {
                           return (
                              <Typography key={idx}>
                                 Winner is: {player.name}
                              </Typography>
                           );
                        }
                     )}
                     <br></br>
                     {sortedPlayers.map((player: Player, idx: number) => {
                        return (
                           <li key={idx}>
                              {player.name}, {player.points} points
                           </li>
                        );
                     })}
                  </DialogContent>
                  <DialogActions>
                     <Button
                        variant="outlined"
                        style={{ padding: "14px 0px" }}
                        sx={{ marginTop: "10px" }}
                        onClick={() => mainPage()}
                     >
                        Back to the main page
                     </Button>
                  </DialogActions>
               </>
            )}
         </>
      </Dialog>
   );
};

export default EndDialog;
