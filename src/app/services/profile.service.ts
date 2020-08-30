import { Injectable, ɵLocaleDataIndex } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  headers : HttpHeaders;

  constructor(private http: HttpClient, private tokenService : JWTTokenService) { 
    // this.headers = new HttpHeaders().set("auth-token", tokenService.jwtToken);
    this.headers = new HttpHeaders().set("auth-token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzLCJpYXQiOjE1OTg1MjI1MzR9.tYa0OB9dm0gLwABXofuMRIW45e8G06GbW1IH0kBeCes');
  }

  getUserById(userId){
      if (userId && userId != undefined){
          return this.http.post('/api/profile/filter', {id : userId},{headers : this.headers})
      }
  }

  getUserByFilter(radius = null, popularity = null, sexual_preference = null, interests = null, age = null){
    let filter = {}  

    if (age && 'min' in age && 'max' in age)
        filter['age'] = age;

    if (popularity && 'min' in popularity && 'max' in popularity)
        filter['popularity'] = popularity;

    if (sexual_preference && sexual_preference == 'male' || sexual_preference == 'female' || sexual_preference == 'both')
        filter['sexual_preference'] = sexual_preference;

    if (radius && radius != undefined && radius > 0)
        filter['radius'] = radius;

    if (interests && interests != undefined && interests.length > 0)
        filter['interests'] = interests;

    return this.http.post('/api/profile/filter', filter, {headers : this.headers});
  }

  checkUserOnline(userId){
      if (userId && userId != undefined){
          let params : HttpParams = new HttpParams().set('user' ,userId);

          return this.http.get<any>('/profile/online', {params, headers : this.headers});
      }
  }

  getProfile(){
      return this.http.get<any>('/profile', {headers : this.headers});
  }

  getLocation(){
      return this.http.put('/api/profile/location',{} ,{headers : this.headers});
  }

  updateProfile(username = null, firstname = null, lastname = null, email = null, gender = null, 
                description = null, interests = null, last_visit = null, popularity = null, 
                birthdate = null, sexual_preference = null, sexual_orientation = null){

        let updateObject : object = {};

        if (username && username != undefined)
            updateObject['username'] = username;

        if (firstname && firstname != undefined)
            updateObject['firstname'] = firstname;

        if (lastname && lastname != undefined)
            updateObject['lastname'] = lastname;

        if (email && email != undefined)
            updateObject['email'] = email;

        if (gender && gender != undefined)
            updateObject['gender'] = gender;

        if (description && description != undefined)
            updateObject['description'] = description;

        if (interests && interests != undefined && interests.length > 0)
            updateObject['interests'] = interests;

        if (last_visit && last_visit != undefined)
            updateObject['last_visit'] = last_visit;

        if (popularity && popularity != undefined && popularity > 0)
            updateObject['popularity'] = popularity;

        if (birthdate && birthdate != undefined)
            updateObject['birthdate'] = birthdate;

        if (sexual_preference && sexual_preference != undefined && sexual_preference == 'male' || sexual_preference == 'female' || sexual_preference == 'both')
            updateObject['sexual_preference'] = sexual_preference;

        if (sexual_orientation && sexual_orientation != undefined)
            updateObject['sexual_orientation'] = sexual_orientation;
        
        return this.http.put('/api/profile', updateObject, {headers : this.headers});
  }

  updateLastOnline(){
    return this.http.put('/api/profile', {last_online : new Date()}, {headers : this.headers});
  }

  getAllProfile(){
      return this.http.get('/api/profile/all', {headers : this.headers});
  }

  changePassword(oldPassword, newPassword){
      if (oldPassword && oldPassword != undefined && newPassword && newPassword != undefined){
          return this.http.post('/api/profile/changePassword', 
          {oldPassword : oldPassword, newPassword : newPassword}, {headers : this.headers})
      }
  }

  getInterests(){
      return this.http.get('/api/interests');
  }

  //link to upload images in Angular https://www.techiediaries.com/angular-formdata/
  
}
