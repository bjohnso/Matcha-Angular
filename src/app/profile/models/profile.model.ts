export interface ProfileGetPayload {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    authenticated: boolean;
    suspended: boolean;
    gender: string;
    sexualOrientation: string;
    sexualPreference: string;
    description: string;
    interests: string [];
    images: string []; // are links
    profilePicture: string; // selected from images
    location: number [] ; // [lat, long]
    lastVisit: Date;
    popularity: number;
    birthdate: Date;
}

export interface ProfileUpdatePayload {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  gender: string;
  sexual_orientation: string;
  sexual_preference: string;
  description: string;
  interests: string [];
  last_visit: Date;
  popularity: number;
  birthdate: Date;
}

export class Profile implements ProfileGetPayload {
  authenticated: boolean;
  birthdate: Date;
  description: string;
  email: string;
  firstname: string;
  gender: string;
  id: number;
  images: string[];
  interests: string[];
  lastVisit: Date;
  lastname: string;
  location: number[];
  popularity: number;
  profilePicture: string;
  sexualOrientation: string;
  sexualPreference: string;
  suspended: boolean;
  username: string;

  constructor() {}
}
