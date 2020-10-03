import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  @Output() execute = new EventEmitter<[boolean, User]>();
  @Input() user: User;
  @Input() title: string;
  @Input() acceptText: string;
  @Input() dismissText: string;
  @Input() acceptClass: string;

  // prevents that the real projects reference will be used
  public iUser: User;

  constructor() { }

  ngOnInit(): void {
    this.iUser = {
      id: this.user.id,
      username: this.user.username,
      password: this.user.password
    }
  }

  public executeEmitter(): void {
    this.execute.emit([true, this.iUser]);
  }

}
