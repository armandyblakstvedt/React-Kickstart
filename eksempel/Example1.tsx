import React, { useEffect } from "react";

export default function ExampleComponent(
  {
    /* Her hentes alle properties som ble sendt til komponenten når den ble lastet inn */
  }
) {
  /* 
    
    Her er skjer all logikken i komponenten. Alle attributter og metoder skjer her. 
    
    */

  useEffect(() => {
    // All logikk som må skje når komponenten lastes inn, som å hente data

    return () => {
      // All logikk som må skje når komponenten går av skjermen.
      // Feks som å huske å skru av lysene når man går ut av et rom, feks å cancle en timeout osv.
    };
  }, []);

  // Nedenfor returneres noe fra komponenten. Det er dette som vises på skjermen av komponenten. Vi former altså utseende her.

  return <div>ExampleComponent</div>;
}
