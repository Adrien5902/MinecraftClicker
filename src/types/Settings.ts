export interface Settings{
    sound: boolean
    animation: boolean
    block_drops: boolean
}

export const defaultSettings = {
    sound: true,
    animation: true,
    block_drops: true
} as Settings