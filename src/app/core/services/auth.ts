import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse, User, JwtPayload, RegisterRequest, RegisterResponse } from '../../models/auth.models';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly TOKEN_KEY = 'lr_token';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = this.loadUserFromToken();
    if(user) {
      this.currentUserSubject.next(user);
    }
  }

  login(formData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.backendApiUrl}/auth/login`, formData).pipe(
      tap((res) => {
        // Handle the response, e.g., store the token in localStorage
        this.handleAuthResponse(res);
      })
    )
  }

  register(formData: RegisterRequest) {
    return this.http.post(`${environment.backendApiUrl}/auth/register`, formData);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin() : boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  handleAuthResponse(res: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, res.token);
    this.currentUserSubject.next(res.user);
  }

  loadUserFromToken(): User | null {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if(!token) return null;

    try {
      const payload = jwtDecode<JwtPayload & {user: User}>(token);
      return payload?.user;
    } catch {
      return null;
    }
  }

}
