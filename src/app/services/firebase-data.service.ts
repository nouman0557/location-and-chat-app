import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FireBaseDataService {

  constructor(
    // private firestore: AngularFirestore
  ) { }
  localStream: any
  remoteStream: any

  servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  pc = new RTCPeerConnection(this.servers);

  addUser(User: User, editObj: any) {
    // if (editObj) {
    //   return this.firestore.collection('Users').doc(editObj.id).update(User);
    // } else {
    //   return this.firestore.collection('Users').add(User);
    // }
    return null
  }

  getAllUsers(): any {
    return null
    // return this.firestore.collection('Users');
  }

  delete(id: string): any {
    return null
    // return this.firestore.collection('Users').doc(id).delete();
  }

  // Default error handling for all actions
  private handleError(error: any) {
    console.log(error)
  }

  // 1. Setup media sources
  async videotest() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    this.localStream.getTracks().forEach((track: any) => {
      this.pc.addTrack(track, this.localStream);
    });

    // Pull tracks from remote stream, add to video stream
    this.pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        this.remoteStream.addTrack(track);
      });
    };

  }
  // 2. Create an offer
  // CreateOffer() {
  //   // Reference Firestore collections for signaling
  //   const callDoc = this.firestore.collection('calls').doc();
  //   const offerCandidates = callDoc.collection('offerCandidates');
  //   const answerCandidates = callDoc.collection('answerCandidates');

  //   // callInput.value = callDoc.id;

  //   // Get candidates for caller, save to db
  //   this.pc.onicecandidate = (event) => {
  //     event.candidate && offerCandidates.add(event.candidate.toJSON());
  //   };


  //   // Create offer

  //   const offerDescription = await this.pc.createOffer();
  //   await this.pc.setLocalDescription(offerDescription);

  //   const offer = {
  //     sdp: offerDescription.sdp,
  //     type: offerDescription.type,
  //   };

  //   await callDoc.set({ offer });

  //   // Listen for remote answer
  //   callDoc.onSnapshot((snapshot) => {
  //     const data = snapshot.data();
  //     if (!this.pc.currentRemoteDescription && data?.answer) {
  //       const answerDescription = new RTCSessionDescription(data.answer);
  //       this.pc.setRemoteDescription(answerDescription);
  //     }
  //   });

  //   // When answered, add candidate to peer connection
  //   answerCandidates.onSnapshot((snapshot: { docChanges: () => { type: string; doc: { data: () => RTCIceCandidateInit | undefined; }; }[]; }) => {
  //     snapshot.docChanges().forEach((change: { type: string; doc: { data: () => RTCIceCandidateInit | undefined; }; }) => {
  //       if (change.type === 'added') {
  //         const candidate = new RTCIceCandidate(change.doc.data());
  //         this.pc.addIceCandidate(candidate);
  //       }
  //     });
  //   });

  // }



  // // 3. Answer the call with the unique ID
  // async AnswerTheCall() {

  //   // const callId = callInput.value;
  //   const callDoc = this.firestore.collection('calls').doc('callId');
  //   const answerCandidates = callDoc.collection('answerCandidates');
  //   const offerCandidates = callDoc.collection('offerCandidates');

  //   this.pc.onicecandidate = (event) => {
  //     event.candidate && answerCandidates.add(event.candidate.toJSON());
  //   };

  //   const callData = (await callDoc.get()).data();

  //   const offerDescription = callData.offer;
  //   await this.pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  //   const answerDescription = await this.pc.createAnswer();
  //   await this.pc.setLocalDescription(answerDescription);

  //   const answer = {
  //     type: answerDescription.type,
  //     sdp: answerDescription.sdp,
  //   };

  //   await callDoc.update({ answer });

  //   offerCandidates.onSnapshot((snapshot: { docChanges: () => any[]; }) => {
  //     snapshot.docChanges().forEach((change) => {
  //       console.log(change);
  //       if (change.type === 'added') {
  //         let data = change.doc.data();
  //         this.pc.addIceCandidate(new RTCIceCandidate(data));
  //       }
  //     });
  //   });
  // };


}
