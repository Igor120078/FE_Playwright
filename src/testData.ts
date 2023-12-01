export class TestData {
  constructor(countryCode: string) {
    this.countryCode = countryCode
  }
  private countryCode: string
  private timeId = Date.now()

  private emails = {
    CZ: [`test${this.timeId}@test.cz`, `test${this.timeId}@woltair.cz`, `autotest${this.timeId}@woltair.cz`],
    DE: [`test${this.timeId}@test.de`, `test${this.timeId}@woltair.de`, `autotest${this.timeId}@woltair.de`],
    XX: ['unknown@email.com'],
  }

  private phones = {
    CZ: ['605756378', '731740767', '731859624', '732708530'],
    DE: ['111222333', '222333444', '3334445556', '4445556667'],
    XX: ['100000001'],
  }

  private zipCodes = {
    CZ: ['14900', '25101', '29471', '62500', '31800', '76005', '46311', '58605'],
    XX: ['11000', '12000', '13000'],
  }

  private firstNames = {
    CZ: ['Adam', 'David', 'Filip', 'Jakub', 'Karel', 'Marek', 'Oliver', 'Pavel', 'Petr', 'Samuel'],
    DE: ['Karl', 'Stefan', 'Otto', 'Helmut', 'Hans', 'Johann', 'Ernst', 'Klaus'],
  }

  private lastNames = {
    CZ: ['Beneš', 'Horák', 'Novák', 'Pokorný', 'Svoboda', 'Černý', 'Král', 'Fiala', 'Urban', 'Zeman'],
    DE: ['Fischer', 'Becker', 'Hoffmann', 'Weber', 'Meyer', 'Schulz', 'Schmidt', 'Gott'],
  }

  private _getRandom(data: object) {
    let _countryCode = this.countryCode
    let _data: Array<string>
    if (!(this.countryCode in data)) {
      _countryCode = 'XX'
    }
    _data = data[_countryCode as keyof typeof data]
    let min = 1
    let max = _data.length - 1
    let i = Math.floor(Math.random() * (max - min + 1)) + min
    return _data[i]
  }

  getEmail() {
    return this._getRandom(this.emails)
  }

  getPhone() {
    return this._getRandom(this.phones)
  }
  getFirstName() {
    return this._getRandom(this.firstNames)
  }

  getLastName() {
    return this._getRandom(this.lastNames)
  }

  getZipcode() {
    return this._getRandom(this.zipCodes)
  }

  private locality = {
    DE: [
      {
        regionName: 'Hessen',
        zipCode: '35578',
      },
      {
        regionName: 'Sachsen',
        zipCode: '03265',
      },
      {
        regionName: 'Brandenburg',
        zipCode: '15728',
      },
      {
        regionName: 'Bayern',
        zipCode: '86352',
      },
      {
        regionName: 'Nordrhein-Westfalen',
        zipCode: '47625',
      },
    ],
    XX: [
      {
        regionName: 'Unknown locality',
        zipCode: 'Unknown zipCode',
      },
      {
        regionName: 'Nameless locality',
        zipCode: 'Nameless zipCode',
      },
    ],
  }

  getLocality() {
    return this._getRandom(this.locality)
  }
}
