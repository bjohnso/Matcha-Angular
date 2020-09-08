import {forwardRef, Inject, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Profile, ProfileInterface} from '../models/profile.model';
import {ImageCompressService} from './image-compress.service';
import {NgxImageCompressService} from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient, private imageCompressService: ImageCompressService) {
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

  updateProfile(profile: Profile) {
        const updateProfile: ProfileInterface = {
          username: profile?.username,
          firstname: profile?.firstname,
          lastname: profile?.lastname,
          email: profile?.email,
          gender: profile?.gender,
          description: profile?.description,
          interests: profile?.interests,
          last_visit: profile?.last_visit,
          popularity: profile?.popularity,
          birthdate: profile?.birthdate,
          sexual_preference: profile?.sexual_preference,
          sexual_orientation: profile?.sexual_orientation,
        };
        Object.keys(updateProfile).forEach(key => {
          if (!updateProfile[key]) {
            delete updateProfile[key];
          }
        });
        return this.http.put('/api/profile', Object.assign({}, updateProfile));
  }

  updateLastOnline() {
    return this.http.put('/api/profile', {last_online : new Date()});
  }

  updateProfileImage(url) {
    if (url != null) {
      return this.http.put('/api/profile', {profile_picture : url});
    }
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

  getProfilesByLikes() {
      return this.http.get<any>('/api/profile/likes');
  }

  getProfilesByMatches() {
    return this.http.get<any>('/api/profile/match');
  }

  getProfilesByVisits() {
    return this.http.get<any>('/api/profile/visits');
  }

  // link to upload images in Angular https://www.techiediaries.com/angular-formdata/

  uploadImage(image: File) {
    console.log('FILE BEFORE COMPRESSION');
    console.log(image);
    return this.imageCompressService.compressImage(image, 200000)
      .then((result) => {
        const imageCompressed: File = result as File;
        console.log('FILE AFTER COMPRESSION');
        console.log(imageCompressed);
        const formData: FormData = new FormData();
        formData.append('image', imageCompressed);
        return this.http.post('/api/profile/image', formData);
      }
    );
  }

  deleteImage(image: string) {
    return this.http
      .request('delete', '/api/profile/image', {params: {image}});
  }

}
