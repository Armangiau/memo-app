export const synth = window.speechSynthesis

const awaitVoices = () => new Promise<SpeechSynthesisVoice[]>((resolve) => {
  const voiceschanged = () => {
    const voices = synth.getVoices()
    if (voices.length > 0) {
      resolve(voices)
    }
  }
  synth.addEventListener('voiceschanged', voiceschanged)
})

const voices = await awaitVoices()

export const frenchVoices = voices.filter((voice) => /French|FR|France|Fraçais/.test(voice.name) || /French|FR|France|Fraçais/.test(voice.lang))


export const speak = (text: string, nameChosenVoice: string) => {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
  }

  if (text !== "") {
    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.addEventListener('end', () => console.log("SpeechSynthesisUtterance.onend"))
    utterThis.addEventListener('error', () => console.error("SpeechSynthesisUtterance.onerror"))
    

    const selectedOption = nameChosenVoice

    const selectedVoiceIndex = voices.findIndex(voice => voice.name === selectedOption)
    utterThis.voice = voices[selectedVoiceIndex]
    
    //utterThis.pitch = pitch.value;
    //utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
} 