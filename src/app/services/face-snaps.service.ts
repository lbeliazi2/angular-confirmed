import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService{

  faceSnap$!: Observable<FaceSnap[]>;

  constructor(private http: HttpClient){}

  // observables help make the handling of asynchrone calls easier
  // HTTP request being async, we can use observables
  // if the server answers correctly the observables emits the response and completes
  // if the server has an error, the observables emits it and is destroyed
  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }


  // to get one face snap
  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }


  // combining the GET BY ID to get the ID and then take this ID to call the put function
  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    // we get the face snap by id, we keep the value and add what we need to created a face snap

    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      // switch map switches to the second observable
      // we can use the operator we want since the observable completes once, we just need it to complete first

      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
        `http://localhost:3000/facesnaps/${faceSnapId}`,
        updatedFaceSnap)
      )
    );
  }

}
