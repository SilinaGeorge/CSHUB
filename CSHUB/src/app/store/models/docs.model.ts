export interface Doc{
    msg?: string
    _id: string,
    userId: string,
    filename: string,
    filesize: string,
    description: string,
    name: string,
    topic: string,
    dateCreate: Date,
    dateModifiedString: string
}


export interface AddDoc{
    userId: string,
    file: File,
    description: string,
    name: string,
    topic:string
}

export interface GetMetaDocs{
    userId: string,
    topic?: string
}

export interface ReturnedMetaDocs{
docs: Array<Doc>
}

export interface DeleteDoc{
    _id:string,
    userId: string
}

export interface UpdateDoc{
    _id: string,
    userId: string,
    description: string,
    name: string
}