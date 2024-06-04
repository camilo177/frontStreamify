export class Info {
    id: number;
    title: string;
    genre: String;
    description: string;
    poster?: File | null | undefined;  
    duration: string;
    director: string;
    country: string;
    cast: string;
    release: string;
    trailer: string;
    platform: string;
  
    public constructor(
      id: number,
      title: string,
      genre: String,
      description: string,
      poster: File,
      duration: string,
      director: string,
      country: string,
      cast: string,
      release: string,
      trailer: string,
      platform: string
    ) {
      this.id = id;
      this.title = title;
      this.genre = genre;
      this.description = description;
      this.poster = poster;
      this.duration = duration;
      this.director = director;
      this.country = country;
      this.cast = cast;
      this.release = release;
      this.trailer = trailer;
      this.platform = platform;
    }
  }
  