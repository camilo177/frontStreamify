export class Production {
  id : number;
  title:string;
  poster: string;
  genre: string;



  public constructor(id: number, genre:string, title:string, poster: string) {
      this.id = id;
      this.title = title;
      this.poster = poster;
      this.genre = genre;

  }
}

