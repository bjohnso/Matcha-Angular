export interface Message{
    id : number;
    match_id : number;
    author : number;
    content : string;
    date : Date;
    read : boolean;
}