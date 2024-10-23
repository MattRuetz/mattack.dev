const colorVariables = [
    '--rosewater',
    '--flamingo',
    '--pink',
    '--mauve',
    '--red',
    '--maroon',
    '--peach',
    '--yellow',
    '--green',
    '--teal',
    '--sky',
    '--sapphire',
    '--blue',
    '--lavender'
] as const;

export type EmphColor = typeof colorVariables[number];

export function getRandomEmphColor(): EmphColor {
    const randomIndex = Math.floor(Math.random() * colorVariables.length);
    return colorVariables[randomIndex];
}