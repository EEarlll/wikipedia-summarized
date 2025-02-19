import { Injectable } from '@angular/core';
import {
  getFirestore,
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { environment } from '../environments/environment.development';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firebaseConfig = {
    apiKey: environment.apiKey,
    authDomain: environment.authDomain,
    projectId: environment.projectId,
    storageBucket: environment.storageBucket,
    messagingSenderId: environment.messagingSenderId,
    appId: environment.appId,
    measurementId: environment.measurementId,
  };

  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
  db = getFirestore(this.app);

  constructor() {}

  async setDocument(
    pageid: string,
    title: string,
    synthesizedOutput: string,
    rawOutput: string
  ) {
    const existingData = await this.checkDocument(pageid);

    if (existingData) {
      return existingData;
    }

    await setDoc(doc(this.db, 'pages', pageid), {
      title: title,
      synthesizedOutput: synthesizedOutput,
      rawOutput: rawOutput,
      createdAt: serverTimestamp(),
    });

    return 1;
  }

  async checkDocument(pageid: string): Promise<DocumentData | null> {
    const docRef = doc(this.db, 'pages', pageid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  }
}
