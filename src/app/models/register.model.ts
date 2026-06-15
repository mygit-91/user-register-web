export interface Occupations {
  id: number;
  name: string;
}

export interface UserModel {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  profile: string | null | undefined;
  birthDay: string | null | undefined;
  occupation: string | null | undefined;
  sex: string | null | undefined;
}

export interface UserData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: string;
  birthDay: string;
  occupation: string;
  sex: string;
}
