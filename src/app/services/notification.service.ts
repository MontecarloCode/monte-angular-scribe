import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) { }

  getNotifs(uid: any) {
    return this.afs.collection('users/' + uid + '/notifications', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  getUserUnread(uid: any) {
    return this.afs.collection('users/' + uid + '/unread', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  clearUnread(uid: any) {
    this.afs.collection('users/' + uid + '/unread').valueChanges().subscribe(unread => {
      unread.forEach(notif => {
        const notification: any = notif;
        this.afs.doc('users/' + uid + '/unread/' + notification.pid).delete();
      });
    });
  }
}
