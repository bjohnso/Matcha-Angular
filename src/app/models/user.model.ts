export interface Users {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    authenticated: boolean;
    suspended: boolean;
    gender: string;
    sexual_orientation: string;
    sexual_preference: string;
    description: string;
    interests: string [];
    images: string []; // are links
    profile_picture: string; // selected from images
    location: number [] ; // [lat, long]
    last_visit: Date;
    popularity: number;
    birthDate: Date;
}
