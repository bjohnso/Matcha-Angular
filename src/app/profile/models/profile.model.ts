export interface ProfileInterface {
  id?: number;
  authenticated?: boolean;
  suspended?: boolean;
  images?: string [];
  profile_picture?: string;
  location?: number [];
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

export class Profile implements ProfileInterface {

  authenticated: boolean;
  birthdate: Date;
  description: string;
  email: string;
  firstname: string;
  gender: string;
  id: number;
  images: string[];
  interests: string[];
  last_visit: Date;
  lastname: string;
  location: number[];
  popularity: number;
  profile_picture: string;
  sexual_orientation: string;
  sexual_preference: string;
  suspended: boolean;
  username: string;

  constructor(data?: ProfileInterface) {
    Object.assign(this, data);
  }

  public static factory(data?: ProfileInterface): Profile {
    return new Profile(data);
  }
}
