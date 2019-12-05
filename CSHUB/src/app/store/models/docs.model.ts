export interface Doc{
    _id: string,
    userId: string,
    file: File,
    name: string,
    description: string,
    topic: string
}


export interface AddDoc{
    userId: string,
    file: File,
    description: string,
    name: string,
    topic:string
}
    