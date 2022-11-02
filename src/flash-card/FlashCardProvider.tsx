import { Component } from 'solid-js';
import { useParams } from '@solidjs/router'
import FlashCard from './flashCard'
import { flashCardStore, FlashCardContex } from './flashCardStore';

export const FlashCardProvider: Component = () => {
  const flashCardName = useParams().name
  return (
    <FlashCardContex.Provider value={flashCardStore(flashCardName)}>
      <FlashCard flashCardName={flashCardName}/>
    </FlashCardContex.Provider>
  )
}

export default FlashCardProvider;