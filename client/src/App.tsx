import React, { useContext } from "react";
import { Button, Container, Stack } from "@mui/material";
import Heading from "./components/Heading";
import CompetitionsList from "./components/CompetitionsList";
import AddContestant from "./components/AddContestants";
import GameDialog from "./components/GameDialog";
import EndDialog from "./components/EndDialog";
import DetailedDialog from "./components/DetailedDialog";
import { CompetitionsContext } from "./context/CompetitionsContext";
import AddDartsDialog from "./components/AddDartsDialog";
import DartsGameDialog from "./components/DartsGameDialog";
import EndDartsDialog from "./components/EndDartsDialog";

function App() {
   const { setAddDialog, setAddDartsDialog, setGameName } =
      useContext(CompetitionsContext);

   const addMokkitikka = (): void => {
      setAddDialog(true);
      setGameName("Mökkitikka");
   };

   const addDarts = (): void => {
      setAddDartsDialog(true);
      setGameName("Darts 501");
   };

   return (
      <Container>
         <Stack spacing={2}>
            <Heading />

            <Button variant="contained" onClick={() => addMokkitikka()}>
               Start Mökkitikka
            </Button>
            <Button variant="contained" onClick={() => addDarts()}>
               Start Darts 501
            </Button>
            <CompetitionsList />
            <AddContestant />
            <AddDartsDialog />
            <GameDialog />
            <EndDialog />
            <DartsGameDialog />
            <EndDartsDialog />
            <DetailedDialog />
         </Stack>
      </Container>
   );
}

export default App;
