import MunicipalDependencies from "./municipalDependencie";

export class Ticket {
  private _id: string = '';
  private _description: string = '';
  private _descriptionLength: number = 250;
  private _lat: number = 0;
  private _lng: number = 0;
  private _finalCost: number = 0;
  private _dateTime: number = Date.now();
  private _dependency!: MunicipalDependencies;
  private _createdBy: string = '';
  private _modifiedBy: string = '';
  private _imgUrl: string = '';

  // Getter y Setter para _id
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  // Getter y Setter para _description
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  // Getter y Setter para _lat
  get lat(): number {
    return this._lat;
  }

  set lat(value: number) {
    this._lat = value;
  }

  // Getter y Setter para _lng
  get lng(): number {
    return this._lng;
  }

  set lng(value: number) {
    this._lng = value;
  }

  // Getter y Setter para _finalCost
  get finalCost(): number {
    return this._finalCost;
  }

  set finalCost(value: number) {
    this._finalCost = value;
  }

  // Getter y Setter para _dateTime
  get dateTime(): number {
    return this._dateTime;
  }

  set dateTime(value: number) {
    this._dateTime = value;
  }

  // Getter y Setter para _dependency
  get dependency(): MunicipalDependencies {
    return this._dependency;
  }

  set dependency(value: MunicipalDependencies) {

    this._dependency = value;
  }

  // Getter y Setter para _createdBy
  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  // Getter y Setter para _modifiedBy
  get modifiedBy(): string {
    return this._modifiedBy;
  }

  set modifiedBy(value: string) {
    this._modifiedBy = value;
  }

  /**
   * True if the ticket has an attached imagen.
   * False if not.
   */
  get hasImg (): boolean {
    return this._imgUrl != '';
  }
}
