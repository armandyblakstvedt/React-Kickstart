import React from "react";

export default function useSubmitOnEnter() {
  const handleKeyPress = (event: any, callbackFunction: Function) => {
    if (event.key === "Enter") {
      callbackFunction();
    }
  };

  return { handleKeyPress };
}
