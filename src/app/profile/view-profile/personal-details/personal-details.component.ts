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
  @Input() mode;

  // META-DATA
  GENDER_OPTIONS = GENDER;
  SEXUAL_PREFERENCE_OPTIONS = SEXUAL_PREFERENCE;
  SEXUAL_ORIENTATION_OPTIONS = SEXUAL_ORIENTATION;
  EDIT_PROFILE_FIELDS = EDIT_PROFILE_FIELDS;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  onInputEvent(event: Event, item?: any) {
    const elem: HTMLElement = (event.target as HTMLElement);
    const id: string = (elem.id as string);
    if (event.type === 'input') {
      this.textInputUpdate(elem, id);
    } else if (event.type === 'click') {
      const field: any = this.getFieldFromLink(id);
      if (field && item) {
        const prop = EDIT_PROFILE_FIELDS[field].PROP;
        this.profile[prop] = item;
        console.log(prop);
      }
    }
  }

  textInputUpdate(elem, id) {
    const field: any = this.getFieldFromID(id);
    if (field) {
      console.log('update');
      const prop = EDIT_PROFILE_FIELDS[field].PROP;
      this.profile[prop] = (elem as HTMLInputElement).value.toString();
    }
  }

  getFieldFromID(id) {
    return Object.keys(EDIT_PROFILE_FIELDS).find(key => {
      return EDIT_PROFILE_FIELDS[key].INPUT_ID === id;
    });
  }

  getFieldFromLink(link) {
    return Object.keys(EDIT_PROFILE_FIELDS).find(key => {
      return EDIT_PROFILE_FIELDS[key].LINK_ID === link.split('-')[0];
    });
  }

  ngOnInit(): void {
  }

}
