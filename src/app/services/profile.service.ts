import { Injectable, ɵLocaleDataIndex } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getUserById(userId) {
      if (userId && userId !== undefined) {
          return this.http.post('/api/profile/filter', {id : userId});
      }
  }

  getUserByFilter(radius = null, popularity = null, sexualPreference = null, interests = null, age = null) {
    const filter: any = {};

    if (age && 'min' in age && 'max' in age) {
        filter.age = age;
    }

    if (popularity && 'min' in popularity && 'max' in popularity) {
        filter.popularity = popularity;
    }

    if (sexualPreference && sexualPreference === 'male' || sexualPreference === 'female' ||
      sexualPreference === 'both') {
        filter.sexual_preference = sexualPreference;
    }

    if (radius && radius !== undefined && radius > 0) {
        filter.radius = radius;
    }

    if (interests && interests !== undefined && interests.length > 0) {
        filter.interests = interests;
    }

    return this.http.post('/api/profile/filter', filter);
  }

  checkUserOnline(userId) {
      if (userId && userId !== undefined) {
          const params: HttpParams = new HttpParams().set('user' , userId);

          return this.http.get<any>('/api/profile/online', {params});
      }
  }

  getProfile() {
      return this.http.get<any>('/api/profile');
  }

  getLocation() {
      return this.http.put('/api/profile/location', {} );
  }

  updateProfile(username = null, firstname = null, lastname = null, email = null, gender = null,
                description = null, interests = null, lastVisit = null, popularity = null,
                birthdate = null, sexualPreference = null, sexualOrientation = null) {

        const updateObject: any = {};

        if (username && username !== undefined) {
            updateObject.username = username;
        }

        if (firstname && firstname !== undefined) {
            updateObject.firstname = firstname;
        }

        if (lastname && lastname !== undefined) {
            updateObject.lastname = lastname;
        }

        if (email && email !== undefined) {
            updateObject.email = email;
        }

        if (gender && gender !== undefined) {
            updateObject.gender = gender;
        }

        if (description && description !== undefined) {
            updateObject.description = description;
        }

        if (interests && interests !== undefined && interests.length > 0) {
            updateObject.interests = interests;
        }

        if (lastVisit && lastVisit !== undefined) {
            updateObject.last_visit = lastVisit;
        }

        if (popularity && popularity !== undefined && popularity > 0) {
            updateObject.popularity = popularity;
        }

        if (birthdate && birthdate !== undefined) {
            updateObject.birthdate = birthdate;
        }

        if (sexualPreference && sexualPreference !== undefined && sexualPreference === 'male' ||
          sexualPreference === 'female' || sexualPreference === 'both') {
            updateObject.sexual_preference = sexualPreference;
        }

        if (sexualOrientation && sexualOrientation !== undefined) {
            updateObject.sexual_orientation = sexualOrientation;
        }

        return this.http.put('/api/profile', updateObject);
  }

  updateLastOnline() {
    return this.http.put('/api/profile', {last_online : new Date()});
  }

  getAllProfile() {
      return this.http.get('/api/profile/all');
  }

  changePassword(oldPassword, newPassword) {
      if (oldPassword && oldPassword !== undefined && newPassword && newPassword !== undefined) {
          return this.http.post('/api/profile/changePassword',
          {oldPassword, newPassword});
      }
  }

  getInterests() {
      return this.http.get('/api/interests');
  }

  // link to upload images in Angular https://www.techiediaries.com/angular-formdata/

}
