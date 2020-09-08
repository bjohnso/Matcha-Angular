import {Component, Input, OnInit} from '@angular/core';
import {CoreComponent} from '../../../core/core.component';
import {SEXUAL_PREFERENCE, GENDER, SEXUAL_ORIENTATION} from '../../../data/profile.data';
import {EDIT_PROFILE_FIELDS} from '../../constants/input-fields.constant';
import {Profile} from '../../models/profile.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent extends CoreComponent implements OnInit {

  @Input() profile;

  // META-DATA
  GENDER_OPTIONS = GENDER;
  SEXUAL_PREFERENCE_OPTIONS = SEXUAL_PREFERENCE;
  SEXUAL_ORIENTATION_OPTIONS = SEXUAL_ORIENTATION;
  EDIT_PROFILE_FIELDS = EDIT_PROFILE_FIELDS;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  onInputEvent(event: Event, item?: any) {
    if (event.type === 'input') {
      this.textInputUpdate(event);
    } else if (event.type === 'click') {
      const elem: HTMLElement = (event.target as HTMLElement);
      const id: string = (elem.id as string);
      const fieldsProperty = Object.keys(EDIT_PROFILE_FIELDS)
        .find(prop => id.includes(EDIT_PROFILE_FIELDS[prop].LINK_ID));
      if (fieldsProperty && item) {
        const profileProperty = EDIT_PROFILE_FIELDS[fieldsProperty].PROP;
        if (this.profile) {
          this.profile[profileProperty] = item;
        }
      }
    }
  }

  textInputUpdate(event) {

  }

  ngOnInit(): void {
  }

}
