"use client";

import { useState, useEffect, useCallback } from "react";

interface UseScrambleOptions {
    speed?: number;
    tick?: number;
    step?: number;
    scramble?: number;
    seed?: number;
    chance?: number;
    overdrive?: boolean;
    overflow?: boolean;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function useScramble(
    text: string,
    options: UseScrambleOptions = {}
): { displayText: string; replay: () => void } {
    const {
        speed = 50,
        tick = 1,
        step = 1,
        scramble = 3,
        seed = 0,
        chance = 0.8,
        overdrive = false,
        overflow = false,
    } = options;

    const [displayText, setDisplayText] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [trigger, setTrigger] = useState(0);

    const getRandomChar = useCallback(() => {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }, []);

    const animate = useCallback(() => {
        setIsAnimating(true);
        let iteration = 0;
        const targetLength = text.length;
        const maxIterations = targetLength * scramble + seed;

        const interval = setInterval(() => {
            setDisplayText((prev) => {
                const currentRevealIndex = Math.floor(iteration / scramble);
                let result = "";

                for (let i = 0; i < targetLength; i++) {
                    if (i < currentRevealIndex) {
                        // Already revealed
                        result += text[i];
                    } else if (i === currentRevealIndex) {
                        // Currently scrambling
                        if (Math.random() < chance) {
                            result += getRandomChar();
                        } else {
                            result += text[i];
                        }
                    } else {
                        // Not yet reached
                        if (overflow) {
                            result += getRandomChar();
                        } else if (overdrive && i < prev.length) {
                            result += getRandomChar();
                        } else {
                            result += " ";
                        }
                    }
                }

                return result;
            });

            iteration += step * tick;

            if (iteration >= maxIterations) {
                clearInterval(interval);
                setDisplayText(text);
                setIsAnimating(false);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, tick, step, scramble, seed, chance, overdrive, overflow, getRandomChar]);

    useEffect(() => {
        const cleanup = animate();
        return cleanup;
    }, [animate, trigger]);

    const replay = useCallback(() => {
        setTrigger((prev) => prev + 1);
    }, []);

    return { displayText, replay };
}
