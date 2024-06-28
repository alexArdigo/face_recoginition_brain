/// TYPES
export type Image = {
    IMAGE_URL: string
}

export type BoardingBox = {
    topRow?: string
    leftCol?: string
    bottomRow?: string
    rightCol?: string
} | undefined

export type CalculatedBoardingBox = {
    topRow?: number
    leftCol?: number
    bottomRow?: number
    rightCol?: number
} | undefined

export type UserType = {
    id: number
    name: string
    email: string
    entries: number
    joined: string
}