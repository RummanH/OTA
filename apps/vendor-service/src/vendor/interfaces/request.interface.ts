export interface FlightSearchRequest {
  journeyType: number;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  classType: string;
  noOfInfant: number;
  noOfChildren: number;
  noOfAdult: number;
  isSpecialTexRedumtion: boolean;
  childrenAges: number[] | null;
}
