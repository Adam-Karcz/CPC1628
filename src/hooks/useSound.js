import { useRef } from "react";

const useSound = () => {
  const clockSpeed = 100000; //adjusted Clock to make sound lower, closer
  const frameDurationInSeconds = 0.02; // Assuming 1 frame = 20ms, adjust if needed
  const audioContextRef = useRef(null);

  // Helper function to apply envelope
  const applyEnvelope = (gainNode, env, audioContext, totalDuration) => {
    let currentTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, currentTime); // Initialize volume to 0

    // Calculate total frames in the ENV array
    let totalEnvFrames = env.reduce((sum, value, index) => {
      return index % 2 === 1 ? sum + value : sum;
    }, 0);

    // Convert total frames to total envelope duration in seconds
    let totalEnvDuration = totalEnvFrames * frameDurationInSeconds;

    // Go through each step defined in the ENV array
    for (let i = 0; i < env.length; i += 2) {
      const volumeChange = env[i] / 15; // Convert volume step to a value between 0 and 1
      const durationFraction =
        (env[i + 1] * frameDurationInSeconds) / totalEnvDuration; // Fraction of total duration
      const durationInSeconds = durationFraction * totalDuration; // Scale to fit within the sound duration

      const newVolume = Math.max(
        0,
        Math.min(gainNode.gain.value + volumeChange, 1)
      );
      currentTime += durationInSeconds; // Move the current time forward by the scaled duration
      gainNode.gain.linearRampToValueAtTime(newVolume, currentTime);
    }
  };

  const playSound = ({ period, duration, volume, env, ent }) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    let audioContext = audioContextRef.current;
    let frequency = clockSpeed / (16 * period);

    let newFrequency; // Extracting to higher scope
    let rampTime;

    try {
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime); // Start with initial volume

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Apply envelope if it exists
      if (env) {
        applyEnvelope(gainNode, env, audioContext, duration);
      }

      // Frequency Envelope (ENT)
      if (ent && ent.length > 0) {
        let currentTime = audioContext.currentTime;

        for (let i = 0; i < ent.length; i += 2) {
          let pitchChange = ent[i] * (clockSpeed / (16 * 65536)); // Scale pitch change
          if (!isFinite(ent[i + 1])) {
            continue; // Skip this iteration as the value is not valid
          }
          let frameDuration = ent[i + 1] * frameDurationInSeconds; // Convert frames to seconds
          newFrequency = Math.max(20, Math.min(frequency + pitchChange, 20000));
          rampTime = currentTime + frameDuration;
          oscillator.frequency.linearRampToValueAtTime(newFrequency, rampTime);
          currentTime = rampTime; // Update the current time
        }
      }

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // It's good practice to handle errors, consider logging to a monitoring service
    }
  };

  return playSound;
};

export default useSound;
