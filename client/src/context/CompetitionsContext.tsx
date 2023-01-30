import React, { createContext, useEffect, useRef, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { isGeneratorFunction } from "util/types";

export const CompetitionsContext: React.Context<any> = createContext(undefined);

export interface Competition {
   id: string;
   name: string;
   date: Date;
   contestants: string;
   contestantsPoints: string;
   winner: string;
}
export interface Player {
   id: string;
   name: string;
   points: number;
}

interface Props {
   children: React.ReactNode;
}
export const CompetitionsProvider: React.FC<Props> = (
   props: Props
): React.ReactElement => {
   const fetched: React.MutableRefObject<boolean> = useRef(false);

   const [addDialog, setAddDialog] = useState<boolean>(false);

   const [addDartsDialog, setAddDartsDialog] = useState<boolean>(false);

   const [openCheckbox, setOpenCheckbox] = useState<boolean>(false);

   const [gameDialog, setGameDialog] = useState<boolean>(false);

   const [dartsGameDialog, setDartsGameDialog] = useState<boolean>(false);

   const [endDialog, setEndDialog] = useState<boolean>(false);

   const [endDartsDialog, setEndDartsDialog] = useState<boolean>(false);

   const [detailedDialog, setDetailedDialog] = useState<boolean>(false);

   const [kokeilu, setKokeilu] = useState<boolean>(false);

   const [players, setPlayers] = useState<Player[]>([]);

   const [gameName, setGameName] = useState("");

   const [round, setRound] = useState(1);

   const [detailedId, setDetailedId] = useState("");

   const [specifiedRound, setSpecifiedRound] = useState(1);

   const [checkPN, setCheckPN] = useState<boolean>(false);

   const [checkZero, setCheckZero] = useState<boolean>(false);

   const [finishDarts, setFinishDarts] = useState<boolean>(false);

   const handleSettingRound = (event: SelectChangeEvent) => {
      setRound(Number(event.target.value));
   };

   const [competitions, setCompetitions] = useState<Competition[]>([]);

   const addPlayer = (newPlayer: Player): void => {
      savePlayers([...players, newPlayer]);
   };

   const savePlayers = async (players: Player[]) => {
      setPlayers([...players]);
   };

   const addPoints = (id: string, value: number): void => {
      let changeIdx: number = players.findIndex(
         (player: Player) => player.id === id
      );

      let extraPlayers: Player[] = [...players];
      let extraNumber: number =
         Number(extraPlayers[changeIdx].points) + Number(value);

      extraPlayers[changeIdx].points = extraNumber;

      savePlayers([...extraPlayers]);
   };

   const subtractPoints = (id: string, value: number): void => {
      let changeIdx: number = players.findIndex(
         (player: Player) => player.id === id
      );

      let extraPlayers: Player[] = [...players];
      let extraNumber: number =
         Number(extraPlayers[changeIdx].points) - Number(value);

      extraPlayers[changeIdx].points = extraNumber;

      savePlayers([...extraPlayers]);
      if (extraNumber === 0) {
         setCheckZero(true);
      }
   };

   const addCompetition = (newCompetition: Competition): void => {
      saveCompetitions([...competitions, newCompetition]);
   };

   const saveCompetitions = async (competitions: Competition[]) => {
      const connection = await fetch("http://localhost:3001/api/competitions", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ competitions }),
      });

      setCompetitions([...competitions]);
   };

   const fetchCompetitions = async () => {
      const connection = await fetch("http://localhost:3001/api/competitions");
      const data = await connection.json();
      setCompetitions(data);
   };

   useEffect(() => {
      if (!fetched.current) {
         fetchCompetitions();
      }

      return () => {
         fetched.current = true;
      };
   }, []);

   return (
      <CompetitionsContext.Provider
         value={{
            competitions,
            setCompetitions,
            addDialog,
            setAddDialog,
            openCheckbox,
            setOpenCheckbox,
            round,
            setRound,
            handleSettingRound,
            gameDialog,
            setGameDialog,
            players,
            addPlayer,
            setPlayers,
            specifiedRound,
            setSpecifiedRound,
            endDialog,
            setEndDialog,
            addPoints,
            addCompetition,
            setDetailedDialog,
            detailedDialog,
            detailedId,
            setDetailedId,
            kokeilu,
            setKokeilu,
            checkPN,
            setCheckPN,
            addDartsDialog,
            setAddDartsDialog,
            gameName,
            setGameName,
            dartsGameDialog,
            setDartsGameDialog,
            subtractPoints,
            finishDarts,
            setFinishDarts,
            endDartsDialog,
            setEndDartsDialog,
            checkZero,
            setCheckZero,
         }}
      >
         {props.children}
      </CompetitionsContext.Provider>
   );
};
