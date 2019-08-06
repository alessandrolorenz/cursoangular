export interface Photo {
    id:number;
    postDate:Date;
    url:string;
    description:string;
    allowComments:boolean;
    likes:number;
    comments:number;
    userId:number;     
}

// interface para tipar photo<Photo> e acessar as propriedades
// para usar: 