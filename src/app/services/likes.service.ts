import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class LikesService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getLikes(pid: any) {
    return this.afs.collection('posts/' + pid + '/likes').valueChanges();
  }

  getUserLikes(uid: any) {
    return this.afs.collection('users/' + uid + '/likes', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  addLike(pid: any, uid: any) {
    const data = {
      uid: uid
    };
    this.afs.doc('posts/' + pid + '/likes/' + uid).set(data)
    .then(() => console.log('post ', pid, ' liked by user ', uid));
  }

  removeLike(pid: any, uid: any) {
    this.afs.doc('posts/' + pid + '/likes/' + uid).delete()
    .then(() => console.log('post ', pid, ' unliked by user ', uid));
  }
}
