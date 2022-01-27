export type SummaryStats = {
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number
}

export type Country = {
    Country: string,
    CountryCode: string,
    Slug: string,
    NewConfirmed: number,
    TotalConfirmed: number
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number,
    Date: string
}

export type CountryStatusStats = {
    Country: string,
        CountryCode: string,
        Lat: string,
        Lon: string,
        Cases: number,
        Status: string,
        Date: string
}


export type PopulationData = {
        country: string
        code: string,
        iso3: string,
        populationCounts: PopulationCount[]
}

export type PopulationCount = {
    year: number,
    value: number
}

export type FetchOptions = {
    country:string,
    start: string,
    end: string
}
