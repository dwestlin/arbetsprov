class House {
  constructor(number, diseased) {
    this.number = number;
    this.diseased = diseased;
  }

  get getNumber() {
    return this.number;
  }
  set setNumber(number) {
    this.number = number;
  }
  get isDiseased() {
    return this.diseased;
  }
  set isDiseased(diseased) {
    this.diseased = diseased;
  }
}
