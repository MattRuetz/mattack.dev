<script lang="ts">
    import { onMount } from 'svelte';

    const titleArt = 
`
███    ███  █████  ████████ ████████  █████   ██████ ██   ██    ██████  ███████ ██    ██ 
████  ████ ██   ██    ██       ██    ██   ██ ██      ██  ██     ██   ██ ██      ██    ██ 
██ ████ ██ ███████    ██       ██    ███████ ██      █████      ██   ██ █████   ██    ██ 
██  ██  ██ ██   ██    ██       ██    ██   ██ ██      ██  ██     ██   ██ ██       ██  ██  
██      ██ ██   ██    ██       ██    ██   ██  ██████ ██   ██ ██ ██████  ███████   ████   
`                                                                                

    const colors = ['#f5c2e7', '#f38ba8', '#fab387', '#a6e3a1', '#89dceb', '#cba6f7'];
    let colorIndex = 0;
    let position = 0;
    let coloredArt = '';
    let isGlitching = false;

    function colorChar(char: string, color: string) {
        return char === ' ' ? ' ' : `<span style="color: ${color}">${char}</span>`;
    }

    function glitchChar(char: string) {
        const glitchChars = '!@#$%^&*()_+-={}[]|;:,.<>?';
        return Math.random() < 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
    }

    function updateColors() {
        const lines = titleArt.split('\n');
        coloredArt = lines.map((line, lineIndex) => {
            return line.split('').map((char, charIndex) => {
                if (isGlitching) {
                    char = glitchChar(char);
                    if (Math.random() < 0.1) return ''; // Occasionally remove a character
                    if (Math.random() < 0.05) return '  '; // Occasionally add extra space
                }
                const distanceFromWave = Math.abs(charIndex - position + lineIndex * 4);
                const colorPos = Math.floor(distanceFromWave / 30) % colors.length;
                return colorChar(char, colors[(colorIndex + colorPos) % colors.length]);
            }).join('');
        }).join('\n');

        position = (position + 1) % titleArt.length;
        if (position === 0) {
            colorIndex = (colorIndex + 1) % colors.length;
        }
    }

    function triggerGlitch() {
        if (Math.random() < 0.03) { // Adjust this probability to control glitch frequency
            isGlitching = true;
            setTimeout(() => {
                isGlitching = false;
            }, 100 + Math.random() * 200); // Glitch duration between 100-300ms
        }
    }

        // Initial server-side rendering
        updateColors();

    onMount(() => {
        const interval = setInterval(() => {
            updateColors();
            triggerGlitch();
        }, 60); // Adjust speed here
        return () => clearInterval(interval);
    });
</script>

<pre>{@html coloredArt}</pre>

<style>
    pre {
        font-family: monospace;
        white-space: pre;
        font-size: 10px;
        line-height: 1;
        text-align: center;
    }

    @media (max-width: 600px) {
        pre {
            font-size: 6px; /* Smaller font size for smaller screens */
        }
    }
</style>
