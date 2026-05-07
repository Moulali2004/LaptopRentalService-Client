export interface ActiveLaptop {
    _id: string,
    name: string,
    brand: string,
    pricePerDay: number,
    specs: LapFeatures,
    availableUnits: number,
    category: string,
    images: string[],
    securityDeposit: number,
}

export interface LapFeatures {
    ram: string,
    storage: string,
    processor: string,
    screenSize: string,
    cpuModel: string,
}