import React, { useContext, useState } from "react";

import { List, ListItem, ListItemText } from "@mui/material";
import {
   Competition,
   CompetitionsContext,
} from "../context/CompetitionsContext";

const CompetitionsList: React.FC = (): React.ReactElement => {
   const { competitions, setDetailedDialog, setDetailedId, setKokeilu } =
      useContext(CompetitionsContext);
   const fns = require("date-fns");

   const openDetailedDialog = (id: string): void => {
      setDetailedId(id);
      setDetailedDialog(true);
      setKokeilu(true);
   };

   return (
      <>
         <List>
            {competitions

               .sort(
                  (a: any, b: any) =>
                     new Date(b.date).valueOf() - new Date(a.date).valueOf()
               )
               .map((competition: Competition, idx: number) => {
                  return (
                     <ListItem
                        key={idx}
                        onClick={() => openDetailedDialog(competition.id)}
                     >
                        <ListItemText
                           primary={competition.name}
                           secondary={fns.format(
                              new Date(competition.date),
                              "dd-MM-yyyy' klo 'HH:mm"
                           )}
                        />
                     </ListItem>
                  );
               })}
         </List>
      </>
   );
};

export default CompetitionsList;
