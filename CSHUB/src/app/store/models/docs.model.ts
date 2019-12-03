export interface Doc{
    _id: String,
    userId: String,
    file: File,
    name: String,
    description: String,
    topic: String
}


export interface AddDoc{
    userId: String,
    file: File,
    description: String,
    name: String,
    topic:String
}
    