import { useRef } from "react";

const useSound = () => {
  const audioContextRef = useRef(null);

  const playSound = ({ frequency, duration, volume, env, ent }) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    let audioContext = audioContextRef.current;

    try {
      // Create oscillator and gain node
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start at 0

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Envelope (Attack, Decay, Sustain, Release)
      if (env) {
        let [attack, decay, sustainLevel, release] = env;
        let currentTime = audioContext.currentTime;

        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, currentTime + attack);

        currentTime += attack;
        gainNode.gain.linearRampToValueAtTime(
          sustainLevel * volume,
          currentTime + decay
        );

        // Note held until duration
        gainNode.gain.setValueAtTime(
          sustainLevel * volume,
          currentTime + decay + duration - decay - release
        );
        gainNode.gain.linearRampToValueAtTime(
          0,
          currentTime + decay + duration - release
        );
      }

      // Frequency Envelope (ENT)
      if (ent && ent.length > 0) {
        let currentTime = audioContext.currentTime;
        oscillator.frequency.setValueAtTime(frequency, currentTime);
        for (let i = 0; i < ent.length; i += 2) {
          let pitchChange = ent[i];
          let frameDuration = ent[i + 1];
          currentTime += frameDuration;
          oscillator.frequency.linearRampToValueAtTime(
            pitchChange + frequency,
            currentTime
          );
        }
      }

      // Start and stop oscillator
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  return playSound;
};

export default useSound;
