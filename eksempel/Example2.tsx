import { Button, View } from "native-base";
import React, { useEffect, useState } from "react";

export default function ExampleComponent({ id }: { id: string }) {
  /*
        Hva er dette? Dette er slik attributter skriver i React Functional Components. Du bruker attributten ved å skrive det første
        argumentet i arrayen, feks if (stateTest) return; 
        For å endre staten må man bruke setStateTest(ny verdi). Merk at det andre argumentet i arrayen når men definerer
        en ny attributt må starte med "set"
        Verdien inne i useState( her altså ), bruker som default-verdi før vi har satt verdien via setStateTest(ny verdi).
    */
  const [stateTest, setStateTest] = useState<string>("");

  /*
        En liten metode som logger stateTest i konsollen. Det eneste spesielle her, er kanskje () => syntaksen, men det er egentlig
        bare en veldig fancy måte å skrive en funksjon på (denne måten å skrive funksjoner på brukes hele tiden).
     */
  const methodTest = () => console.log(stateTest);

  useEffect(() => {
    /* 
        Eksempel på useEffect-hooken. Her vil vi sette en attributt til å være det som ble sendt ned til denne komponenten av props når
        komponenten lastes inn    
    */
    setStateTest(id);
  }, []);

  // Nedenfor har vi en knapp som kjører methodTest. For å skrive javascript i elementene nedenfor, må alt
  // wrappes i {} for å fortelle at det kommer js synaks. Merk at også her brukes () => methodTest, dersom det bare hadde blitt skrevet
  // methodTest(), så hadde funksjonen blitt kjørt når <Button> hadde blitt laget. Ved å skrive () => kjøres bare methodTest når
  // onPress kalles.
  return (
    <View>
      <Button
        onPress={() => methodTest()}
        width="50px"
        height="25px"
        backgroundColor="black"
      />
    </View>
  );
}
